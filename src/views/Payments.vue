<script setup>
import { ref, toRef } from 'vue';
import Button from '@/components/Button.vue';

const CVUText = ref('CVU');
const aliasText = ref('Alias: stevedvd.mp');

function copyCVU() {
	navigator.clipboard.writeText('0000003100071487853926');
	CVUText.value = 'Copied!';

	setTimeout(() => {
		CVUText.value = 'CVU';
	}, 2000);
}
function copyAlias() {
	navigator.clipboard.writeText('stevedvd.mp');
	aliasText.value = 'Copied!';

	setTimeout(() => {
		aliasText.value = 'Alias: stevedvd.mp';
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
			<Button @click="copyCVU">
				{{ CVUText }}
				<img src="../../public/clipboard.png" alt="" />
			</Button>
			<Button @click="copyAlias">
				{{ aliasText }}
				<img src="../../public/clipboard.png" alt="" />
			</Button>
		</div>
	</section>
</template>

<style lang="scss" scoped>
section {
	display: flex;
	flex-direction: column;
	align-items: center;
	header {
		text-align: center;
		h4 {
			color: grey;
			font-weight: 400;
		}
	}
	img {
		aspect-ratio: 1;
		width: 16px;
	}
}
</style>
