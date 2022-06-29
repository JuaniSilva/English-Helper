<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import {
	getFirestore,
	collection,
	query,
	onSnapshot,
	orderBy,
	updateDoc,
	deleteDoc,
	doc,
	where
} from 'firebase/firestore';
import Loading from '@/components/Loading.vue';
import ExtensionPanel from '@/components/Homework/ExtensionPanel.vue';
import CreateChoreModal from '@/components/Homework/CreateChoreModal.vue';
import { getCurrentUser } from '@/composables/user/getUser';
import { async } from '@firebase/util';

const homeworkModal = ref(false);

const loading = ref(false);
const chores = ref([]);

const updatingStatus = ref(false);

const db = getFirestore();
const { user } = getCurrentUser();

onMounted(async () => {
	loading.value = true;
	// Get initial chores and update them in real time
	try {
		onSnapshot(
			query(
				collection(db, 'chores'),
				where('userUid', '==', user.value.uid),
				orderBy('createdAt', 'asc')
			),
			async (snapshot) => {
				if (snapshot.docChanges().length === 0) {
					loading.value = false;
					return;
				}
				for (let firebaseDoc of snapshot.docChanges()) {
					if (firebaseDoc.type === 'added') {
						chores.value.push({
							...firebaseDoc.doc.data(),
							id: firebaseDoc.doc.id
						});
					} else if (firebaseDoc.type === 'removed') {
						chores.value.splice(firebaseDoc.oldIndex, 1);
					}
				}
			}
		);
	} catch (error) {
		loading.value = false;
		console.error(error);
	}
});
const hasChores = computed(() => {
	return !loading.value && !chores.value.length;
});

// Check if chores had been fetched and remove loading if it did
watch(
	() => [...chores.value],
	async (newVal, oldVal) => {
		if (!oldVal.length && newVal.length) {
			loading.value = false;
		}
	}
);

async function markAsDone(targetChore) {
	updatingStatus.value = true;

	await updateDoc(doc(db, 'chores', targetChore.id), {
		isCompleted: !targetChore.isCompleted
	});

	const targetIndex = chores.value.findIndex(
		(chore) => chore.id === targetChore.id
	);

	let choreCopy = chores.value;
	choreCopy[targetIndex] = {
		...choreCopy[targetIndex],
		isCompleted: !choreCopy[targetIndex].isCompleted
	};

	updatingStatus.value = false;
	chores.value = choreCopy;
}

// modularizar esto
async function updateChore(chore) {
	await updateDoc(doc(db, 'chores', chore.id), {
		activities: chore.activities
	});
}

async function deleteChore(chore) {
	console.log('working');
	console.log(chore);
	await deleteDoc(doc(db, 'chores', chore.id));
}

function hide(val) {
	homeworkModal.value = val;
}
</script>
<template>
	<section>
		<h1>HOMEWORK</h1>
		<Loading v-if="loading" />
		<p v-else-if="hasChores">You dont have any chore</p>
		<ExtensionPanel
			v-else
			:chores="chores"
			:updating="updatingStatus"
			@handle-status="markAsDone"
			@update-chore="updateChore"
			@delete-chore="deleteChore"
		/>
		<n-button
			@click="homeworkModal = true"
			class="add-chore"
			secondary
			strong
			:focusable="false"
			>ADD CHORE</n-button
		>
		<CreateChoreModal
			v-model:show="homeworkModal"
			@update="hide"
		></CreateChoreModal>
	</section>
</template>

<style lang="scss" scoped>
section {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
	max-width: 800px;
	h1 {
		text-align: center;
	}
	.add-chore {
		align-self: stretch;
		margin-top: 1rem;
		background-color: #fff;
		box-shadow: 0 3px 1px -2px #0003, 0 2px 2px #00000024,
			0 1px 5px #0000001f;
	}
}
.flatpickr-input {
	border: 1px #000 solid;
	color: #000;
}
</style>
