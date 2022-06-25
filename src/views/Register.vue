<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import router from '../routes';

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const successful = ref(false);
const error = ref('');

async function register() {
	isLoading.value = true;
	try {
		await createUserWithEmailAndPassword(
			getAuth(),
			email.value,
			password.value
		);

		isLoading.value = false;
		successful.value = true;

		router.push('/homework');
	} catch (err) {
		isLoading.value = false;
		error.value = err.code;
		setTimeout(() => {
			error.value = '';
		}, 2000);
	}
}
</script>

<template>
	<section>
		<h1>Create an Account</h1>
		<form @submit.prevent class="register-form">
			<n-input
				v-model:value="email"
				type="text"
				placeholder="example@example.com"
			/>
			<n-input v-model:value="password" type="password" />
			<n-button
				strong
				secondary
				type="info"
				@click="register"
				:loading="isLoading"
				attr-type="submit"
			>
				Submit
			</n-button>
			<p v-if="error" class="error">* {{ error }} *</p>
		</form>
	</section>
</template>

<style lang="scss" scoped>
section {
	display: flex;
	flex-direction: column;
	align-items: center;

	.register-form {
		min-width: 400px;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		.error {
			color: red;
			text-align: center;
		}
	}
}
</style>
