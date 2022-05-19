<script setup>
import NavBar from './components/NavBar.vue';
</script>

<template>
    <NavBar />
    <v-parallax
        height="100%"
        src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
    >
        <router-view />
    </v-parallax>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;800&display=swap');
html {
    overflow: hidden !important;
}
body {
    font-family: 'Montserrat', sans-serif;
    color: rgb(255, 255, 255);
}
h1 {
    margin: 2rem 0;
}
*,
*::after,
*::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

button {
    font-family: 'Montserrat', sans-serif;
}
a {
    text-decoration: none;
    &:focus {
        outline: none;
    }
}
input::placeholder {
    color: rgb(255, 255, 255);
}
</style>
