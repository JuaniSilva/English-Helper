<script setup lang="ts">
import { ref, watch } from 'vue';
import { addDoc, getFirestore, collection } from '@firebase/firestore';
import { getCurrentUser } from '../../composables/user/getUser';
const { user } = getCurrentUser();

const props = defineProps(['show']);
const emit = defineEmits(['update']);

const creatingChore = ref(false);
const db = getFirestore();

let newChore = ref({
	title: '',
	endDate: +new Date(),
	activities: [
		{
			exercise: '',
			book: '',
			page: 0,
			done: false
		}
	],
	createdAt: null,
	editedAt: '',
	isCompleted: false
});

async function addChore() {
	try {
		creatingChore.value = true;

		const endDate = new Date(newChore.value.endDate);

		newChore.value.createdAt = new Date();

		let docRef = await addDoc(collection(db, 'chores'), {
			...newChore.value,
			endDate: endDate,
			userUid: user.value.uid
		});

		creatingChore.value = false;
		emit('update', false);

		newChore.value = {
			title: '',
			endDate: +new Date(),
			activities: [
				{
					exercise: '',
					book: '',
					page: 0,
					done: false
				}
			],
			createdAt: '',
			editedAt: '',
			isCompleted: false
		};

		console.log('Document written with ID: ', docRef.id);
		return;
	} catch (e) {
		creatingChore.value = false;
		console.error('Error adding document: ', e);
	}
}

function onCreate() {
	return {
		exercise: '',
		book: '',
		page: '',
		done: false
	};
}
</script>
<template>
	<n-modal
		:show="show"
		preset="card"
		:style="'width: 800px'"
		@update:show="(val) => emit('update', val)"
	>
		<template #header>
			<div>New Chore</div>
		</template>
		<form>
			<n-input
				v-model:value="newChore.title"
				type="text"
				placeholder="Title"
			/>
			<n-divider title-placement="left"> Activities </n-divider>
			<n-dynamic-input
				v-model:value="newChore.activities"
				:on-create="onCreate"
			>
				<template #create-button-default> Add Activities </template>
				<template #default="{ value }">
					<div class="activities-container">
						<n-input
							v-model:value="value.exercise"
							type="text"
							placeholder="Exercise"
						/>
						<n-input
							v-model:value="value.book"
							type="text"
							placeholder="Book"
						/>
						<n-input-number
							v-model:value="value.page"
							placeholder="Page"
						/>
					</div>
				</template>
			</n-dynamic-input>
			<n-divider> </n-divider>
			<n-date-picker
				v-model:value="newChore.endDate"
				type="date"
				clearable
			/>
		</form>
		<template #action>
			<div class="actions">
				<n-button
					secondary
					type="primary"
					@click="addChore"
					:loading="creatingChore"
				>
					Create Chore
				</n-button>
				<n-button secondary type="error" @click="emit('update', false)">
					Cancel
				</n-button>
			</div>
		</template>
	</n-modal>
</template>

<style lang="scss" scoped>
.activities-container {
	display: flex;
	gap: 1rem;
	width: 100%;
}
.actions {
	display: flex;
	justify-content: flex-end;
	gap: 1rem;
}
</style>
