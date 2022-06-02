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

<style lang="scss" scoped></style>
