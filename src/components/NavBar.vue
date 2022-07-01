<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import router from '../routes';

const isLoggedIn = ref(false);

let auth;

onMounted(() => {
	auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		if (user) isLoggedIn.value = true;
		else isLoggedIn.value = false;
	});
});

async function handleSignOut() {
	try {
		await signOut(auth);
		alert('You have loged out');
		router.push('/');
	} catch (err) {
		console.error(err);
	}
}
const options = ref([
	{
		label: 'Homework',
		key: 'homework',
		route: '/homework'
	},
	{
		label: 'Payments',
		key: 'payments',
		route: '/payments'
	}
]);
function handleSelect(key) {
	const route = options.value.find((option) => option.key === key).route;
	router.push(route);
}
</script>

<template>
	<nav>
		<ul>
			<li class="home">
				<router-link to="/">Home</router-link>
			</li>
			<li>
				<n-dropdown :options="options" @select="handleSelect">
					<n-button class="dropdown">User profile</n-button>
				</n-dropdown>
			</li>
			<li v-if="!isLoggedIn">
				<router-link to="/register">Register</router-link>
			</li>
			<li v-if="!isLoggedIn">
				<router-link to="/sign-in">Sign In</router-link>
			</li>
			<li v-if="isLoggedIn">
				<button @click="handleSignOut">Log Out</button>
			</li>
		</ul>
	</nav>
</template>

<style lang="scss" scoped>
@import '@/styles/_variables.scss';
nav {
	display: flex;
	height: 50px;
	background-color: $primary-neutral;
	ul {
		list-style: none;
		display: flex;
		gap: 0.75rem;
		padding: 0;
		margin: 0 0.75rem;
		width: 100%;
		justify-content: flex-end;
		align-items: center;
		a {
			cursor: pointer;
			color: $light;
			&:hover {
				text-decoration: underline;
				color: $secondary;
				transition: all 0.15s ease-in-out;
			}
		}

		.home {
			margin-right: auto;
		}
		button {
			background-color: transparent;
			border: none;
			color: $light;
			&:hover {
				text-decoration: underline;
				color: $secondary;
				transition: all 0.15s ease-in-out;
			}
		}
	}
}
.n-button {
	::v-deep(div) {
		border: none !important;
	}
	::v-deep(.n-base-wave-active) {
		animation: none !important;
	}
	padding: 0;
	&:hover,
	&:active,
	&:focus {
		color: #fff;
		text-decoration: none;
	}
}
</style>
