<template>
    <div id="loading">
        <logo-bounce></logo-bounce>
    </div>
</template>

<script>
    import * as JWT from 'jwt-decode';
    import axios from 'axios';

    let mutate_initialLoad =
        `mutation InitialLoad($userId: Int) {
          initialLoad(userId: $userId) {
            user {
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
                avatar
                Summoners {
                  summonerName
                  profileIconId
                  summonerId
                  server
                  summonerLevel
                }
                darkMode
                premium
                premiumStart
                dateModified
                dateCreated
              }
            }
            patch
          }
        }
        `;

    let mutation_refreshToken =
        `
        mutation RefreshToken($token: String!) {
          refreshToken(token: $token) {
            token
            payload
          }
        }
        `;

    export default {
        name: 'loading',
        title: 'Loading - Ally.GG',
        components: {},
        props: ["nextUrl"],
        data() {
            return {
                userLoaded: false,
                token_expired: true,
            }
        },
        computed: {
            stateLoaded: function () {
                return this.userLoaded && !this.token_expired;
            }
        },
        watch: {
            stateLoaded: function (before, after) {
                this.goNext();
            }
        },
        methods: {
            loadState() {
                let token = this.$cookie.get('token');
                let token_payload = JWT(token);
                let token_expiry = new Date(token_payload.exp * 1000);

                if (token_expiry > Date.now()) {
                    this.token_expired = false;
                }

                if (this.token_expired) {  // If token has expired, refresh it.
                    axios({
                        method: "POST",
                        url: process.env.VUE_APP_API_URL + '/graphql',
                        data: {
                            query: mutation_refreshToken,
                            variables: {
                                token: this.$cookie.get('token')
                            },
                        }
                    }).then((response) => {

                        // Get the JWT token and set it in the Cookies to keep session.
                        let token = response.data.data.refreshToken.token;
                        this.$cookie.set('token', token);
                        this.token_expired = false;

                        // Get the user information from the response and set the userId in cookies.
                        let user = response.data.data.refreshToken.user;
                        this.$cookie.set('userId', user.id);

                        // Put the user information in the current state.
                        this.$store.state.user = user;
                    });

                } else if (Object.keys(this.$store.state.user).length === 0) {  // If user has logged in but state doesn't know the user.
                    axios({
                        method: "POST",
                        url: process.env.VUE_APP_API_URL + '/graphql',
                        data: {
                            query: mutate_initialLoad,
                            variables: {
                                userId: this.$cookie.get('userId')
                            },
                        }
                    }).then((response) => {
                        if ('errors' in response.data){
                            for (let key in response.data.errors){
                                let error = response.data.errors[key];
                                if (error.message === 'Error decoding signature'){
                                    this.$cookie.delete('token');
                                    this.$store.commit('logout');
                                    this.$router.go();
                                }
                            }
                        } else {
                            this.userLoaded = true;
                            this.$store.commit('setUser', response.data.data.initialLoad.user);
                            this.$store.commit('setPatch', response.data.data.initialLoad.patch);
                            this.webSocketManager();
                        }
                    });
                } else {
                    this.userLoaded = true;
                    this.webSocketManager();
                }
            },
            goNext() {
                this.$store.commit('loadState');

                if (this.$route.query.nextUrl != null) {
                    this.$router.push(this.$route.query.nextUrl);
                } else {
                    this.$router.push({ name: 'home'});
                }
            },
            webSocketManager() {
                if (this.$options.sockets.onmessage) {
                    delete this.$options.sockets.onmessage;
                }

                this.$connect(
                    process.env.VUE_APP_WS_URL + '/dashboard/' + this.$store.state.user.id, {
                        format: 'json',
                        store: this.$store,
                    });
                this.$options.sockets.onmessage = (response) => {
                    let data = JSON.parse(response.data);
                    console.log(data);
                };
            }
        },
        mounted() {
            this.loadState();
        }
    }
</script>

<style scoped lang="scss">
    #loading {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: white;

    }
</style>