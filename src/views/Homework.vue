<script setup>
import { onMounted, ref, watch } from 'vue';
import {
	getFirestore,
	collection,
	query,
	addDoc,
	onSnapshot,
	orderBy,
	updateDoc,
	doc,
	where
} from 'firebase/firestore';
import Loading from '@/components/Loading.vue';
import ExtensionPanel from '@/components/Homework/ExtensionPanel.vue';
import { getCurrentUser } from '@/composables/user/getUser';

const homeworkModal = ref(false);

const loading = ref(false);

let newChore = ref({
	title: '',
	endDate: '',
	activities: {
		exercise: '',
		book: '',
		page: ''
	},
	createdAt: '',
	editedAt: '',
	isCompleted: false
});

const chores = ref([]);

const db = getFirestore();
const { user } = getCurrentUser();

onMounted(async () => {
	loading.value = true;
	// Get initial chores and update them in real time
	onSnapshot(
		query(
			collection(db, 'chores'),
			where('userUid', '==', user.value.uid),
			orderBy('createdAt', 'asc')
		),
		async (snapshot) => {
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

async function addChore() {
	try {
		loading.value = true;

		if (newChore.value.endDate)
			newChore.value.endDate = new Date(newChore.value.endDate);

		newChore.value.createdAt = new Date();

		let docRef = await addDoc(collection(db, 'chores'), {
			...newChore.value,
			userUid: user.value.uid
		});

		loading.value = false;
		homeworkModal.value = false;

		newChore.value = {
			title: '',
			endDate: '',
			activities: {
				exercise: '',
				book: '',
				page: ''
			},
			createdAt: '',
			editedAt: '',
			isCompleted: false
		};

		console.log('Document written with ID: ', docRef.id);
		return;
	} catch (e) {
		loading.value = false;
		console.error('Error adding document: ', e);
	}
}

async function handleStatus(targetChore) {
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
</script>
<template>
	<section>
		<h1>HOMEWORK</h1>
		<Loading v-if="loading" />
		<ExtensionPanel v-else :chores="chores" @handle-status="handleStatus" />

		<v-btn @click="homeworkModal = true" class="add-chore">ADD CHORE</v-btn>
		<v-dialog v-model="homeworkModal">
			<v-card>
				<v-card-title>
					<h2>New Chore</h2>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>
							<!-- Chore Title -->
							<v-col cols="12">
								<v-text-field
									v-model="newChore.title"
									label="Chore Title"
									required
								></v-text-field>
							</v-col>
							<!-- Activity -->
							<v-divider></v-divider>
							<v-col cols="12">
								<h3>Activity</h3>
							</v-col>
							<v-col cols="12" sm="6" md="4">
								<v-text-field
									v-model="newChore.activities.exercise"
									label="Activity Part"
									hint="ex: Part 1, Exam Task..."
									persistent-hint
									required
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="4">
								<v-text-field
									v-model="newChore.activities.book"
									label="Book"
									hint="ex: Student's Book"
									persistent-hint
									required
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="4">
								<v-text-field
									v-model.number="newChore.activities.page"
									label="Page"
									required
								></v-text-field>
							</v-col>
							<!-- End Date -->
							<v-divider></v-divider>
							<v-col col="12">
								<h3>Due Date</h3>
								<input type="date" v-model="newChore.endDate" />
								<!-- <el-date-picker v-model="newChore.endDate" type="date" placeholder="Due Date" /> -->
							</v-col>
						</v-row>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="blue-darken-1"
						text
						@click="homeworkModal = false"
					>
						Close
					</v-btn>
					<Loading v-if="loading" size="small" />
					<v-btn v-else color="blue-darken-1" text @click="addChore">
						Save
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
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
</style>
