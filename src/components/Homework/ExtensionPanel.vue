<script setup>
import { CheckmarkCircle } from '@vicons/ionicons5';
const props = defineProps({
	chores: Array,
	updating: Boolean
});

const emit = defineEmits(['updateChore']);

function updateChore(val, chore, index) {
	chore.activities[index].done = val;
	emit('updateChore', chore);
}
</script>

<template>
	<n-collapse arrow-placement="right" accordion>
		<n-collapse-item
			:title="chore.title"
			:name="i"
			v-for="(chore, i) in chores"
			:key="i"
			class="collapse-item"
		>
			<template #header>
				<header>
					<h4>{{ chore.title }}</h4>
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
				</header>
			</template>

			<div class="panel-content">
				<ul class="activities">
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
				<n-tag :bordered="false" round type="info">
					Due to:
					{{
						new Date(
							chore.endDate.seconds * 1000
						).toLocaleDateString()
					}}
				</n-tag>
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
		}
	}
}
</style>
