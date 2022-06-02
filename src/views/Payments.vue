<script setup>
import Button from '@/components/Button.vue';
</script>
<template>
	<section>
		<header>
			<h1>Payments</h1>
			<h4>Fee: $4000 per month</h4>
		</header>
		<div>
			<Button> test </Button>
		</div>
	</section>
</template>

<style lang="scss" scoped>
section {
	display: flex;
	flex-direction: column;
	justify-content: center;
	header {
		text-align: center;
		h4 {
			color: grey;
			font-weight: 400;
		}
	}
}
</style>
