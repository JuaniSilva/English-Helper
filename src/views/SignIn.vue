<script setup>
import { ref } from 'vue';
// import { NInput, NButton, NAlert } from 'naive-ui';
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
const successful = ref(false);

async function login() {
    isLoading.value = true;
    try {
        await signInWithEmailAndPassword(
            getAuth(),
            email.value,
            password.value
        );

        isLoading.value = false;
        successful.value = true;

        setTimeout(() => {
            router.push('/feed');
        }, 500);
    } catch (error) {
        isLoading.value = false;
        console.log(error.code);
        alert(error.message);
    }
}
async function signInWIthGoogle() {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(getAuth(), provider);
        isLoading.value = false;
        successful.value = true;

        router.push('/feed');
    } catch (err) {
        console.error(err);
    }
}
</script>

<template>
    <section>
        <h1>Sign In</h1>
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
            <v-btn color="info" @click="signInWithEmailAndPassword">
                Submit
            </v-btn>
            <v-btn color="info" @click="signInWIthGoogle">
                Sign In with Google
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
        }
        .google-login {
            font-weight: 600 !important;
        }
    }
}
</style>
