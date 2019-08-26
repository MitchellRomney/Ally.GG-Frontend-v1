<template>
    <nav id="nav">
        <div class="nav-back-top" style="height: 130px;"></div>
        <div class="nav-back-bot" style="top: 180px;"></div>
        <div class="nav-selector" style="top: 130px;"></div>
        <router-link :to="{ name: 'home' }">
            <div class="logo-wrapper">
                <img class="logo resp-img" alt="Ally.GG Logo" src="../../assets/images/ally-white-noperiod.png">
            </div>
        </router-link>
        <ul class="nav-items">
            <SidebarItem exact name="Home" link="home" icon="home"/>
        </ul>
    </nav>
</template>

<script>
    import SidebarItem from './Sidebar-Item';

    export default {
        name: 'Sidebar',
        components: {
            SidebarItem
        },
        data() {
            return {}
        },
        computed: {
            user() {
                if (Object.keys(this.$store.state.user).length !== 0) {
                    return this.$store.state.user
                } else {
                    return null
                }
            },
            summoners() {
                if (this.user !== null) {
                    return this.user.Profiles[0].Summoners
                } else {
                    return null
                }
            },
        },
        methods: {}
    }
</script>

<style scoped lang="scss">
    #ally-gg {
        nav {
            grid-area: nav;
            text-align: left;
            position: fixed;
            height: 100vh;
            width: 130px;
            flex-direction: column;
            align-items: center;
            left: -130px;
            z-index: 2000;
            opacity: 0;

            @media #{$bp-md}{
                opacity: 1;
                left: 0;
                z-index: 950;
            }

            &.open {
                left: 0;
                opacity: 1;
            }

            .nav-back-bot, .nav-back-top {
                width: 130px;
                background: $AllyPink;
                position: fixed;
                border-radius: 0 10px 10px 0;
                // box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.25);
                z-index: -1;
            }

            .nav-back-bot {
                background: $AllyPinkPurple;
                bottom: 0;
            }

            .nav-selector {
                height: 50px;
                width: 5px;
                border-radius: 10px;
                background-color: white;
                position: fixed;
            }

            .logo-wrapper {
                height: 120px;
                display: flex;
                align-items: center;

                .logo {
                    padding: 0 30px;
                }
            }

            .nav-items {
                padding: 10px 0;
                display: flex;
                flex-direction: column;
                height: calc(100vh - 90px);
                align-items: center;

            }
        }
    }
</style>
