<script setup>
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
const items = ref([
    {
        title: 'Homework',
        route: '/homework'
    },
    {
        title: 'Payments',
        route: '/payments'
    }
]);
</script>

<template>
    <nav>
        <ul>
            <li class="home">
                <router-link to="/">Home</router-link>
            </li>
            <li v-if="isLoggedIn">
                <router-link to="/feed">Feed</router-link>
            </li>
            <v-menu transition="slide-y-transition" left>
                <template v-slot:activator="{ props }">
                    <a v-bind="props" class="dropdown"> Class Stuff </a>
                </template>
                <v-list>
                    <v-list-item v-for="(item, i) in items" :key="i">
                        <router-link :to="item.route" class="dropdown-item">{{
                            item.title
                        }}</router-link>
                    </v-list-item>
                </v-list>
            </v-menu>
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
    .dropdown {
        padding: 0 1rem;
    }
}
a.dropdown-item {
    color: black;
    &:hover {
        text-decoration: underline;
        color: $primary-neutral;
        transition: all 0.15s ease-in-out;
    }
}
</style>
