<script setup lang="ts">
import { ref } from 'vue';
import {
	CheckmarkCircle,
	TrashOutline,
	Warning,
	Pencil,
	SaveOutline,
	CloseOutline
} from '@vicons/ionicons5';
import type { chore } from 'EnglishHelper';

const props = defineProps<{
	chores: chore[];
	updating: boolean;
}>();

const emit = defineEmits(['updateChore', 'deleteChore', 'handleStatus']);

const deleteModal = ref(false);
const targetedChore = ref(undefined);
const editingChore = ref(false);

function updateChore(val: boolean, chore: chore, index: number) {
	chore.activities[index].done = val;
	emit('updateChore', chore);
}
function handleDelete(chore) {
	deleteModal.value = true;
	targetedChore.value = chore;
}

function deleteChore() {
	emit('deleteChore', targetedChore.value);
	deleteModal.value = false;
}

function startEditing(chore: chore) {
	targetedChore.value = JSON.parse(JSON.stringify(chore));
	editingChore.value = true;
}

function handleEdit() {
	emit('updateChore', targetedChore.value);
	editingChore.value = false;
}
function collapseEvent() {
	editingChore.value = false;
}
function cancelEdit() {
	editingChore.value = false;
	targetedChore.value = null;
}
</script>

<template>
	<n-collapse
		arrow-placement="right"
		accordion
		@item-header-click="collapseEvent"
	>
		<n-collapse-item
			:title="chore.title"
			:name="i"
			v-for="(chore, i) in chores"
			:key="i"
			class="collapse-item"
		>
			<template #header>
				<header>
					<h4 v-if="!editingChore || targetedChore.id !== chore.id">
						{{ chore.title }}
					</h4>
					<n-input
						v-else-if="
							targetedChore.id === chore.id && editingChore
						"
						v-model:value="chore.title"
						type="text"
						class="title-input"
					/>
					<div class="actions">
						<n-tag
							v-if="chore.isCompleted"
							round
							:bordered="false"
							type="success"
						>
							Done
							<template #icon>
								<n-icon :component="CheckmarkCircle" />
							</template>
						</n-tag>
						<n-tag :bordered="false" round type="info">
							Due to:
							{{
								new Date(
									chore.endDate.seconds * 1000
								).toLocaleDateString()
							}}
						</n-tag>
						<n-button
							quaternary
							circle
							type="error"
							@click.stop="handleDelete(chore)"
						>
							<template #icon>
								<n-icon :component="TrashOutline"></n-icon>
							</template>
						</n-button>
					</div>
				</header>
			</template>

			<div class="panel-content">
				<ul class="activities" v-if="!editingChore">
					<li
						v-for="(activity, index) in chore.activities"
						:key="`${activity.book}${activity.exercise}.${index}`"
					>
						<n-checkbox
							v-model:checked="activity.done"
							@update:checked="
								(val) => updateChore(val, chore, index)
							"
						>
							{{ activity.exercise }} - {{ activity.book }} - Page
							{{ activity.page }}
						</n-checkbox>
					</li>
				</ul>
				<div v-else>
					<div
						v-for="activity in targetedChore.activities"
						class="activity-wrapper"
					>
						<n-input
							v-model:value="activity.exercise"
							type="text"
							placeholder="Basic Input"
						/>
						<n-input
							v-model:value="activity.book"
							type="text"
							placeholder="Basic Input"
						/>
						<n-input-number
							v-model:value="activity.page"
							type="text"
							placeholder="Basic Input"
						/>
					</div>
				</div>
				<n-button
					v-if="!editingChore"
					quaternary
					circle
					@click="startEditing(chore)"
				>
					<template #icon>
						<n-icon :component="Pencil"></n-icon>
					</template>
				</n-button>
				<div v-else class="editing-actions">
					<n-button
						quaternary
						circle
						type="success"
						atrr-type="submit"
						@click="handleEdit"
					>
						<template #icon>
							<n-icon :component="SaveOutline"></n-icon>
						</template>
					</n-button>
					<n-button
						quaternary
						circle
						type="error"
						@click="cancelEdit"
					>
						<template #icon>
							<n-icon :component="CloseOutline"></n-icon>
						</template>
					</n-button>
				</div>
			</div>
			<footer>
				<n-button
					class="update-status"
					secondary
					:type="chore.isCompleted ? 'error' : 'success'"
					:loading="updating"
					@click="$emit('handleStatus', chore)"
				>
					{{
						chore.isCompleted
							? 'Mark as Incompleted'
							: 'Mark as Done'
					}}
				</n-button>
			</footer>
		</n-collapse-item>
	</n-collapse>
	<n-modal
		v-model:show="deleteModal"
		preset="card"
		:style="'width: 800px'"
		content="Are you sure you want to delete this chore?"
		positive-text="Confirm"
		negative-text="Cancel"
		class="delete-modal"
	>
		<template #header>
			<div class="title">
				<n-icon :component="Warning" color="#d03050" />WAIT... are you
				sure?
			</div>
		</template>
		<div>Are you sure you want to delete this chore?</div>
		<template #action>
			<div class="actions">
				<n-button secondary type="default" @click="deleteModal = false">
					Cancel
				</n-button>
				<n-button secondary type="error" @click="deleteChore">
					Delete Chore
				</n-button>
			</div>
		</template>
	</n-modal>
</template>

<style lang="scss" scoped>
.n-collapse {
	.n-collapse-item {
		background-color: #fff;
		padding: 1rem;
		margin: 0;
		box-shadow: 0 3px 1px -2px #0003, 0 2px 2px #00000024,
			0 1px 5px #0000001f;
		::v-deep(.n-collapse-item__header) {
			padding: 0 !important;
		}
		header {
			display: flex;
			width: 100%;
			justify-content: space-between;
			align-items: center;
			.n-input {
				max-width: 200px;
			}
			.actions {
				display: flex;
				gap: 0.5rem;
				align-items: center;
			}
		}
		&:first-child {
			border-radius: 4px 4px 0 0;
		}
		&:last-child {
			border-radius: 0 0 4px 4px;
		}
		footer {
			display: flex;
			justify-content: flex-end;
		}
		.panel-content {
			padding: 1rem 0;
			display: flex;
			justify-content: space-between;

			.activities {
				display: flex;
				flex-direction: column !important;
				gap: 1rem;
				::v-deep(.n-checkbox-box-wrapper) {
					order: 2;
					margin-left: 0.75rem;
				}
				::v-deep(.n-checkbox__label) {
					padding: 0 !important;
				}
				list-style: none;
			}
			.activity-wrapper {
				display: flex;
				gap: 1rem;
				margin-bottom: 1rem;
			}
			.editing-actions {
				display: flex;
				flex-direction: column;
			}
		}
	}
}
.delete-modal {
	.title {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.actions {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
	}
}
</style>
