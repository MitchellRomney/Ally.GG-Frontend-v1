<template>
    <div class="profile">
        <div class="header">
            <h1>
                {{ user.username }}
            </h1>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    let query_getUser =
        `
        query GetUser($username: String!) {
          user(username: $username) {
            username
            firstName
            lastName
            email
            isStaff
            isActive
            isSuperuser
            dateJoined
            Profiles {
              avatar
              Summoners {
                summonerName
              }
              friends {
                user {
                  username
                }
              }
            }
          }
        }
        `;

    export default {
        name: 'user_profile',
        title: 'Profile - Ally.GG',
        components: {},
        data() {
            return {
                user: {},
                profile: {},
            }
        },
        computed: {},
        methods: {
            getUser() {
                axios({
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    method: 'post',
                    data: {
                        query: query_getUser,
                        variables: {
                            username: this.$route.params.user,
                        },
                    }
                }).then((response) => {
                    this.user = response.data.data.user;
                });
            }
        },
        mounted() {
            this.getUser();
        }
    }
</script>

<style scoped lang="scss">

</style>
