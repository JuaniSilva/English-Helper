<script setup>
import NavBar from './components/NavBar.vue';
</script>

<template>
    <NavBar />
    <router-view />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;800&display=swap');
html {
    overflow: hidden !important;
}
body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    color: rgb(255, 255, 255);
    background-color: #f5f5f5;
    color: rgba(0, 0, 0, 0.87);
}
h1 {
    margin: 2rem 0;
    text-transform: uppercase;
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
