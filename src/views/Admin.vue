<template>
    <div class="admin" v-if="user.isSuperuser">
        <transition name="fade">
            <logo-bounce v-if="loading"></logo-bounce>
            <div class="content" v-else>
                <div class="header">
                    <h1>
                        Admin Panel
                    </h1>
                </div>
                <div class="success" v-if="success !== null">
                    {{ success }}
                </div>
                <div class="buttons">
                    <button @click="UpdateAllRankedSummoners">Update All Ranked Summoners</button>
                    <div class="generate-key">
                        <span v-if="newKey">{{ newKey }}</span>
                        <button @click="CreateAccessKey">Generate Early Access Key</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import axios from 'axios';

    let mutate_getAllRankedSummoners =
        `mutation getAllRankedSummoners($server:String!, $queue: String!){
          fetchAllRankedSummoners(server: $server, queue: $queue){
            success
          }
        }`;

    let mutate_CreateAccessKey =
        `mutation CreateAccessKey {
          createAccessKey {
            key
          }
        }`;

    export default {
        name: 'admin',
        title: 'Admin Panel - Ally.GG',
        components: {},
        computed: {
            user() {
                return this.$store.state.user
            },
        },
        data() {
            return {
                newKey: '',

                loading: false,
                success: null,
            }
        },
        methods: {
            UpdateAllRankedSummoners() {
                this.loading = true;

                axios({
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    method: 'post',
                    data: {
                        query: mutate_getAllRankedSummoners,
                        variables: {
                            server: 'OC1',
                            queue: 'RANKED_SOLO_5x5'
                        },
                    }
                }).then((response) => {
                    this.loading = false;
                    this.success = response.success;
                });
            },
            CreateAccessKey() {
                axios({
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    method: 'post',
                    data: {
                        query: mutate_CreateAccessKey,
                    }
                }).then((response) => {
                    console.log(response);
                    this.newKey = response.data.data.createAccessKey.key;
                });
            }
        },
        mounted() {
        }
    }
</script>

<style scoped lang="scss">
</style>
