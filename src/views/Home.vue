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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
            fill="#574ae2"
            fill-opacity="1"
            d="M0,224L48,234.7C96,245,192,267,288,256C384,245,480,203,576,181.3C672,160,768,160,864,170.7C960,181,1056,203,1152,218.7C1248,235,1344,245,1392,250.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
    </svg>
    <div class="bg-primary"></div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import '@/styles/_variables.scss';
section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2rem auto 0;
    text-align: center;
    height: 100%;

    p {
        margin-top: 1rem;
        line-height: 1.8;
        font-size: 1.2rem;
        max-width: 40ch;
    }
}
svg {
    margin: -1rem 0;
}
.bg-primary {
    margin: 0;
    padding: 0;
    gap: 0;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: $primary-neutral !important;
}
</style>
