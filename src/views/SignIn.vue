<script setup>
import { ref } from 'vue';
import {
	getAuth,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup
} from 'firebase/auth';
import router from '../routes';

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const error = ref('');

async function login() {
	isLoading.value = true;
	try {
		await signInWithEmailAndPassword(
			getAuth(),
			email.value,
			password.value
		);

		isLoading.value = false;

		router.push('/homework');
	} catch (err) {
		isLoading.value = false;
		error.value = err.code;
		setTimeout(() => {
			error.value = '';
		}, 1000);
	}
}
async function signInWithGoogle() {
	const provider = new GoogleAuthProvider();
	try {
		await signInWithPopup(getAuth(), provider);

		router.push('/homework');
	} catch (err) {
		error.value = err.code;
		setTimeout(() => {
			error.value = '';
		}, 1000);
	}
}
</script>

<template>
	<section>
		<h1>Sign In</h1>
		<form @submit.prevent class="register-form">
			<n-input
				v-model:value="email"
				type="text"
				placeholder="example@example.com"
			/>
			<n-input v-model:value="password" type="password" />
			<div class="buttons-container">
				<n-button
					strong
					secondary
					type="info"
					@click="login"
					:loading="isLoading"
					attr-type="submit"
				>
					Submit
				</n-button>
				<n-button
					strong
					secondary
					type="info"
					@click="signInWithGoogle"
				>
					Sign In with Google
				</n-button>
			</div>
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
		.buttons-container {
			display: flex;
			width: 100%;
			gap: 1rem;
			.n-button {
				flex-grow: 1;
			}
		}
		.error {
			color: red;
			text-align: center;
		}
	}
}
</style>
