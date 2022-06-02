<script setup>
import { defineProps } from 'vue';
import Loading from '@/components/Loading.vue';

const props = defineProps({
	isLoading: {
		type: Boolean,
		default: false
	}
});
</script>
<template>
	<button>
		<Loading v-if="isLoading" />
		<slot></slot>
	</button>
</template>

<style lang="scss" scoped>
@import '../styles/variables';
button {
	padding: 0.5rem 1rem;
	background-color: $info;
	border-radius: 10px;
	margin: 1rem;
	color: white;
}
</style>
