<template>
    <div class="admin">
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
                    <button v-on:click="UpdateAllRankedSummoners">Update All Ranked Summoners</button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import axios from 'axios';

    let mutate_getAllRankedSummoners =
        `
        mutation getAllRankedSummoners($server:String!, $queue: String!){
          fetchAllRankedSummoners(server: $server, queue: $queue){
            success
          }
        }
        `;

    export default {
        name: 'admin',
        title: 'Admin Panel - Ally.GG',
        components: {},
        computed: {},
        data() {
            return {
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
            }
        },
        mounted() {
        }
    }
</script>

<style scoped lang="scss">
</style>
