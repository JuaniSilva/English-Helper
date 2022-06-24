<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import {
	getFirestore,
	collection,
	query,
	onSnapshot,
	orderBy,
	updateDoc,
	doc,
	where
} from 'firebase/firestore';
import Loading from '@/components/Loading.vue';
import ExtensionPanel from '@/components/Homework/ExtensionPanel.vue';
import CreateChoreModal from '@/components/Homework/CreateChoreModal.vue';
import { getCurrentUser } from '@/composables/user/getUser';

const homeworkModal = ref(false);

const loading = ref(false);

const chores = ref([]);

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

	chores.value = choreCopy;
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
		<ExtensionPanel v-else :chores="chores" @handle-status="markAsDone" />
		<v-btn @click="homeworkModal = true" class="add-chore">ADD CHORE</v-btn>
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
	}
}
.flatpickr-input {
	border: 1px #000 solid;
	color: #000;
}
</style>
