<script setup>
import { ref, toRef } from 'vue';
import { CopyOutline } from '@vicons/ionicons5';

const CBUText = ref('CVU');
const aliasText = ref('Alias: stevedvd.mp');

function copyCBU() {
	navigator.clipboard.writeText('0000003100071487853926');
	CBUText.value = 'Copied!';

	setTimeout(() => {
		CBUText.value = 'CBU';
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
		<div class="buttons-container">
			<n-button secondary type="info" @click="copyCBU">
				{{ CBUText }}
				<template #icon>
					<n-icon><copy-outline /></n-icon>
				</template>
			</n-button>
			<n-button secondary type="info" @click="copyAlias">
				{{ aliasText }}
				<template #icon>
					<n-icon><copy-outline /></n-icon>
				</template>
			</n-button>
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
	.buttons-container {
		display: flex;
		gap: 1rem;
		margin-top: 1rem;
	}
}
</style>
