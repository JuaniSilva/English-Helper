<script setup>
const props = defineProps({
	chores: Array,
	updating: Boolean
});
</script>
<template>
	<v-expansion-panels variant="accordion" class="panels">
		<v-expansion-panel v-for="(chore, i) in chores" :key="i" class="panel">
			<v-expansion-panel-title class="panel-title">
				<template v-slot:default="exapnded">
					<div class="panel-content">
						<h6>{{ chore.title }}</h6>
						<v-chip
							v-if="chore.isCompleted"
							class="mx-1 tag"
							close
							color="green"
							label
							text-color="white"
						>
							<v-icon
								start
								icon="mdi-check"
								color="green"
							></v-icon>
							Done
						</v-chip>
					</div>
				</template>
			</v-expansion-panel-title>
			<v-expansion-panel-text class="panel-text">
				<span class="due-date"
					><v-chip v-if="chore.endDate" class="ma-2">
						Due to:
						{{
							new Date(
								chore.endDate.seconds * 1000
							).toLocaleDateString()
						}}
					</v-chip></span
				>
				<ul>
					<li
						v-if="
							Array.isArray(chore.activities) &&
							chore.activities.length > 0
						"
						v-for="(activity, i) in chore.activities"
					>
						{{ activity.exercise }} - {{ activity.book }} - Page
						{{ activity.page }}
					</li>
					<li v-else>
						{{ chore.activities.exercise }} -
						{{ chore.activities.book }} - Page
						{{ chore.activities.page }}
					</li>
				</ul>
				<footer>
					<n-button
						class="update-status"
						:type="chore.isCompleted ? 'error' : 'info'"
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
			</v-expansion-panel-text>
		</v-expansion-panel>
	</v-expansion-panels>
</template>

<style lang="scss" scoped>
.panel {
	.panel-title {
		.panel-content {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			h6 {
				font-size: 14px;
			}
			.tag {
				background-color: #ffffff;
				margin: 0 1rem;
			}
		}
	}
	.panel-text {
		position: relative;
		padding: 0.5rem;
		.due-date {
			position: absolute;
			top: 4px;
			right: 24px;
		}
		footer {
			margin-top: 2rem;
			display: flex;
			width: 100%;
			justify-content: flex-end;
			.n-button {
				color: white !important;
			}
		}
	}
}
</style>
