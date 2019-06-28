<template>
    <div id="ally-gg" :class="{ main: loadDashboard, dark: darkMode }"
         v-touch:swipe.right="swipeRight" v-touch:swipe.left="swipeLeft">
        <Navbar v-if="loadDashboard" :class="{ open: openNav }"/>
        <transition name="fade">
            <div class="navbar-cover" v-if="openNav" @click="openNav = false" key="1"></div>
        </transition>
        <TopNav v-if="loadDashboard" @toggle-nav="openNav = !openNav"/>
        <div id="view-wrapper">
            <router-view/>
        </div>
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
        data() {
            return {
                openNav: false,
            }
        },
        computed: {
            loadDashboard() {

                // Paths that are part of the guest website, not the main dashboard.
                let websitePaths = [
                    '/login',
                    '/register',
                    '/contact',
                    '/loading',
                ];

                // Return false if the current path is not part of the main dashboard.
                return !websitePaths.includes(this.$route.path)
            },
            darkMode() {
                if (Object.keys(this.$store.state.user).length !== 0) {
                    return this.$store.state.user.Profiles[0].darkMode
                } else {
                    return false
                }
            }
        },
        methods: {
            swipeRight() {
                this.openNav = true;
            },
            swipeLeft() {
                this.openNav = false;
            }
        },
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
        color: $palette-primary;
        min-height: 100vh;
        background-color: $palette-secondary;
        transition: all 0.5s ease;

        &.main {
            display: grid;
            grid-template: 65px auto / auto;
            grid-template-areas: "tnav" "main";

            #logo_bounce {
                max-height: calc(100vh - 65px)
            }

            @media #{$bp-md}{
                display: grid;
                grid-template: 65px auto / 130px auto;
                grid-template-areas: "nav tnav" "nav main";
            }

            #view-wrapper {
                height: calc(100vh - 65px);
            }
        }

        .navbar-cover {
            position: fixed;
            z-index: 1100;
            background-color: rgba(0, 0, 0, 0.8);
            left: 0;
            top: 0;
            width: 100vw;
            height: 100vh;

            @media #{$bp-md}{
                display: none;
            }
        }

        #view-wrapper {
            grid-area: main;
            overflow-y: scroll;
            height: 100vh;
        }

        &.dark {
            background-color: $palette-dark-secondary;
        }
    }
</style>
