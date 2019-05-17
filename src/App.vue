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
    import axios from 'axios';
    import jQuery from 'jquery';

    let query_fetchUser =
        `
        query fetchUser($id: Int) {
          user(id: $id) {
            id
            username
            firstName
            lastName
            isStaff
            isActive
            isSuperuser
            lastLogin
            dateJoined
            Profiles {
              id
              dateModified
              dateCreated
            }
          }
        }
        `;

    export default {
        name: 'app',
        components: {
            Navbar,
            TopNav
        },
        computed: {
            loadDashboard() {
                if (this.isOnLoginPage()) {
                    return false
                } else if (jQuery.isEmptyObject(this.user)) {
                    this.fetchUser();
                }
                return true
            },
            user() {
                return this.$store.state.user
            }
        },
        methods: {
            isOnLoginPage: function () {
                return this.$route.path === '/login'
            },
            fetchUser: function () {
                axios({
                    method: "POST",
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    data: {
                        query: query_fetchUser,
                        variables: {
                            id: this.$cookie.get('id')
                        },
                    }
                }).then((response) => {
                    let user = response.data.data.user;
                    this.$store.commit('setUser', user);
                    console.log(user);
                });
            }
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
