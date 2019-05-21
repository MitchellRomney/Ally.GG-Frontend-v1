<template>
    <div id="ally-gg" :class="{ main: loadDashboard }">
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

                // Paths that are part of the guest website, not the main dashboard.
                let websitePaths = [
                    '/login',
                    '/contact',
                ];

                // Return false if the current path is not part of the main dashboard.
                return !websitePaths.includes(this.$route.path)
            },
        },
        methods: {},
        mounted() {
        }
    }
</script>

<style lang="scss">
    #ally-gg {
        font-family: 'Panton', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        width: 100vw;
        margin: 0;
        overflow-x: hidden;
        color: $palette-primary;
        min-height: 100vh;
        background-color: $palette-secondary;

        &.main {
            @media #{$bp-lg}{
                display: grid;
                grid-template: 65px auto / 275px auto;
                grid-template-areas: "nav tnav" "nav main";
            }
        }
    }
</style>
