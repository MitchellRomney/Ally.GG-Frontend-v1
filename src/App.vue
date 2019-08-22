<template>
    <div id="ally-gg" :class="{ main: loadDashboard, dark: darkMode, landing: landingPage }"
         v-touch:swipe.right="swipeRight" v-touch:swipe.left="swipeLeft">
        <Sidebar v-if="loadDashboard" :class="{ open: openNav }"/>
        <transition name="fade">
            <div class="navbar-cover" v-if="openNav" @click="openNav = false" key="1"></div>
        </transition>
        <div id="view-wrapper">
            <transition name="fade" mode="out-in">
                <router-view/>
            </transition>
        </div>
    </div>
</template>

<script>
    import Sidebar from './components/Navigation/Sidebar';

    export default {
        name: 'app',
        components: {
            Sidebar,
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
                    '/',
                    '/login',
                    '/login/',
                    '/register',
                    '/contact',
                    '/loading',
                ];

                // Return false if the current path is not part of the main dashboard.
                return !websitePaths.includes(this.$route.path)
            },
            landingPage() {

                // Paths that are part of the guest website, not the main dashboard.
                let websitePaths = [
                    '/',
                ];

                // Return false if the current path is not part of the main dashboard.
                return websitePaths.includes(this.$route.path)
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
            (function () {
                let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
                link.type = 'image/x-icon';
                link.rel = 'icon';
                if (process.env.NODE_ENV === 'development') {
                    link.href = '/favicon/dev-favicon-32x32.png';
                } else {
                    link.href = '/favicon/favicon-32x32.png';
                }
                document.getElementsByTagName('head')[0].appendChild(link);
            })();
        }
    }
</script>

<style lang="scss">
    #ally-gg {
        width: 100vw;
        margin: 0;
        color: $AllyBlack;
        min-height: 100vh;
        background-color: $AllyBackground;

        &.main {
            display: grid;
            grid-template: auto / auto;

            #logo_bounce {
                max-height: 100vh;
            }

            @media #{$bp-md}{
                display: grid;
                grid-template: auto auto / 130px auto;
                grid-template-areas: "nav main" "nav main";
            }

            #view-wrapper {
                grid-area: main;
                height: 100vh;
                overflow-y: scroll;
                background-color: $AllyBackground;
            }
        }

        &.landing {
            #view-wrapper {
                overflow-y: scroll;
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
    }
</style>
