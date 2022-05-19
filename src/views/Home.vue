<template>
    <section>
        <h1>Advanced Exam Helper</h1>
        <p>
            This tool was created to keep track of the performance of the
            mockups test for the advanced exam, hope you find it useful
        </p>
        <p>
            Click
            <router-link to="/feed">HERE</router-link>
            to start
        </p>
    </section>
</template>

<script setup></script>

<style lang="scss" scoped>
section {
    max-width: 800px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2rem auto;
    text-align: center;

    p {
        margin-top: 1rem;
        font-size: 1rem;
        max-width: 40ch;
    }
}
</style>
