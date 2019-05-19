<template>
    <div id="ally-gg" :class="{ main: !isOnLoginPage() }">
        <Navbar v-if="loadDashboard"/>
        <TopNav v-if="loadDashboard"/>
        <router-view/>
    </div>
</template>

<script>
    import Navbar from './components/navigation/navbar';
    import TopNav from './components/navigation/topNav';

    export default {
        name: 'app',
        components: {
            Navbar,
            TopNav
        },
        computed: {
            loadDashboard() {
                return !this.isOnLoginPage();
            },
        },
        methods: {
            isOnLoginPage: function () {
                return this.$route.path === '/login'
            },
        },
        mounted() {
        }
    }
</script>

<style lang="scss">
    #ally-gg {
        font-family: 'Roboto', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        width: 100vw;
        margin: 0;
        overflow-x: hidden;
        color: $palette-primary;
        min-height: 100vh;
        background-color: $palette-secondary;

        &.main {
            display: grid;
            grid-template: 65px auto / 275px auto;
            grid-template-areas: "nav tnav" "nav main";
        }
    }
</style>
