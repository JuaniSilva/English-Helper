<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import router from '../routes';

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const successful = ref(false);

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
	} catch (error) {
		isLoading.value = false;
		console.log(error.code);
		alert(error.message);
	}
}
</script>

<template>
	<section>
		<h1>Create an Account</h1>
		<form @submit.prevent class="register-form">
			<v-text-field
				v-model="email"
				variant="underlined"
				density="default"
				label="Email"
				placeholder="example@example.com"
			/>
			<v-text-field
				v-model="password"
				variant="underlined"
				density="default"
				label="Password"
				type="password"
			/>
			<v-btn color="info" @click="register" type="submit">
				<v-progress-circular
					v-if="isLoading"
					width="3"
					:size="25"
					indeterminate
					class="loading"
				/>
				Submit
			</v-btn>
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
		button {
			margin-top: 1rem;
			.loading {
				margin-left: -16px;
				margin-right: 12px;
			}
		}
	}
}
</style>
