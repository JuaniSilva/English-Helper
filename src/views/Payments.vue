<script setup>
import { ref, toRef } from 'vue';
import Button from '@/components/Button.vue';

const CVUText = ref('CVU');
const aliasText = ref('Alias: stevedvd.mp');

function copyText(actualText, copyText) {
	const placeholder = actualText;

	navigator.clipboard.writeText(copyText);
	[actualText][0].value = 'Copied!';

	setTimeout(() => {
		[actualText][0].value = placeholder;
	}, 2000);
}
</script>
<template>
	<section>
		<header>
			<h1>Payments</h1>
			<h4>Fee: $4000 per month</h4>
		</header>
		<div>
			<font-awesome-icon icon="phone" />
			<Button @click="copyText(ref(CVUText), '0000003100071487853926')">
				{{ CVUText }}
			</Button>
			<Button @click="copyText(ref(aliasText), 'stevedvd.mp')">
				{{ aliasText }}
			</Button>
		</div>
	</section>
</template>

<style lang="scss" scoped>
section {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	header {
		text-align: center;
		h4 {
			color: grey;
			font-weight: 400;
		}
	}
}
</style>
