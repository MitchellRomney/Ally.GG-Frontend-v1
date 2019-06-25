<template>
    <nav id="nav">
        <div class="logo-wrapper">
            <img class="logo resp-img" alt="Ally.GG Logo" src="../../assets/images/icon.png">
        </div>
        <ul class="nav-items">
            <NavItem exact name="Home" link="/" icon="home"/>
            <NavItem name="Summoners" link="/summoners" icon="users"/>
            <NavItem name="Improve" link="/improve" icon="trophy" v-if="summoners.length > 0"/>
            <NavItem name="Improve" link='None' icon="trophy"
                     message="You need to verify at least 1 Summoner to use this feature."
                     v-if="summoners.length === 0"/>
            <li class="dark-mode">
                <button @click="darkMode">Dark Mode</button>
            </li>
        </ul>
    </nav>
</template>

<script>
    import NavItem from './navItem';
    import axios from 'axios';

    let query_updateProfile =
        `mutation($userId: Int!, $darkMode: Boolean!) {
          updateProfile(userId: $userId, darkMode: $darkMode){
            updated
            profile {
              user {
                username
              }
              darkMode
            }
          }
        }`;

    export default {
        name: 'Navbar',
        components: {
            NavItem
        },
        data() {
            return {
                darkModeSwitch: true
            }
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
        methods: {
            darkMode() {
                if (this.darkModeSwitch && this.user !== null) {
                    this.darkModeSwitch = false;
                    this.$store.state.user.Profiles[0].darkMode = !this.$store.state.user.Profiles[0].darkMode;
                    axios({
                        url: process.env.VUE_APP_API_URL + '/graphql',
                        method: 'post',
                        data: {
                            query: query_updateProfile,
                            variables: {
                                userId: this.$store.state.user.id,
                                darkMode: this.$store.state.user.Profiles[0].darkMode
                            },
                        }
                    }).then((response) => {
                        if (response.data.data.updateProfile.updated) {
                            this.darkModeSwitch = true;
                        }
                    });
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    #ally-gg {
        nav {
            grid-area: nav;
            border-right: 1px solid #DFE3E8;
            text-align: left;
            background-color: white;
            position: fixed;
            height: 100vh;
            width: 130px;
            flex-direction: column;
            align-items: center;
            transition: all 0.5s ease;
            left: -130px;
            z-index: 2000;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
            opacity: 0;

            @media #{$bp-md}{
                box-shadow: none;
                opacity: 1;
            }

            &.open {
                left: 0;
                opacity: 1;
            }

            @media #{$bp-md}{
                left: 0;
                z-index: 950;
            }

            .logo-wrapper {
                height: 90px;
                display: flex;
                align-items: center;

                .logo {
                    padding: 0 30px;
                }
            }

            .nav-items {
                padding: 10px;
                display: flex;
                flex-direction: column;
                height: calc(100vh - 90px);
                align-items: center;

            }

            .dark-mode {
                margin-top: auto;
                margin-bottom: 20px;
            }
        }

        &.dark {
            nav {
                background-color: $palette-dark-primary;
                border-right: 1px solid $palette-dark-border;
            }
        }
    }
</style>
