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
                    <div class="generate-key">
                        <span v-if="newKey">{{ newKey }}</span>
                        <button @click="CreateAccessKey">Generate Early Access Key</button>
                    </div>
                </div>
                <div class="stats">
                    <div class="ranked">
                        <div class="header">
                            <h2>Ranked Summoners</h2>
                            <button @click="UpdateAllRankedSummoners">Update All Ranked Summoners</button>
                        </div>
                        <div class="rank">
                            <img alt="Iron Tier" class="resp-img" src="../assets/images/ranked_medals/iron_1.png">
                            <h3>{{ stats.ironCount }}</h3>
                            <span>Iron Summoners</span>
                        </div>
                        <div class="rank">
                            <img alt="Bronze Tier" class="resp-img" src="../assets/images/ranked_medals/bronze_1.png">
                            <h3>{{ stats.bronzeCount }}</h3>
                            <span>Bronze Summoners</span>
                        </div>
                        <div class="rank">
                            <img alt="Silver Tier" class="resp-img" src="../assets/images/ranked_medals/silver_1.png">
                            <h3>{{ stats.silverCount }}</h3>
                            <span>Silver Summoners</span>
                        </div>
                        <div class="rank">
                            <img alt="Gold Tier" class="resp-img" src="../assets/images/ranked_medals/gold_1.png">
                            <h3>{{ stats.goldCount }}</h3>
                            <span>Gold Summoners</span>
                        </div>
                        <div class="rank">
                            <img alt="Platinum Tier" class="resp-img"
                                 src="../assets/images/ranked_medals/platinum_1.png">
                            <h3>{{ stats.platinumCount }}</h3>
                            <span>Platinum Summoners</span>
                        </div>
                        <div class="rank">
                            <img alt="Diamond Tier" class="resp-img" src="../assets/images/ranked_medals/diamond_1.png">
                            <h3>{{ stats.diamondCount }}</h3>
                            <span>Diamond Summoners</span>
                        </div>
                        <div class="rank">
                            <img alt="Master Tier" class="resp-img" src="../assets/images/ranked_medals/master_1.png">
                            <h3>{{ stats.masterCount }}</h3>
                            <span>Master Summoners</span>
                        </div>
                        <div class="rank">
                            <img alt="Grandmaster Tier" class="resp-img"
                                 src="../assets/images/ranked_medals/grandmaster_1.png">
                            <h3>{{ stats.grandmasterCount }}</h3>
                            <span>Grandmaster Summoners</span>
                        </div>
                        <div class="rank">
                            <img alt="Challenger Tier" class="resp-img"
                                 src="../assets/images/ranked_medals/challenger_1.png">
                            <h3>{{ stats.challengerCount }}</h3>
                            <span>Challenger Summoners</span>
                        </div>
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

    let mutate_GetStats =
        `mutation {
          getStats {
            unrankedCount
            ironCount
            bronzeCount
            silverCount
            goldCount
            platinumCount
            diamondCount
            masterCount
            grandmasterCount
            challengerCount
            updatedSummonerCount
            summonerCount
            matchCount
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
                stats: {},

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
            },
            GetStats() {
                axios({
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    method: 'post',
                    data: {
                        query: mutate_GetStats,
                    }
                }).then((response) => {
                    this.stats = response.data.data.getStats;
                });
            },
            getMedalUrl(tier, rank) {
                return require('../assets/images/ranked_medals/' + tier.toLowerCase() + '_' + rank + '.png');
            },
        },
        mounted() {
            this.GetStats();
        }
    }
</script>

<style scoped lang="scss">
    #ally-gg {
        .admin {
            background-color: #F6F7FB;
            color: $palette-primary;
            min-height: calc(100vh - 65px);
            padding: 20px;

            @media #{$bp-md}{
                padding: 50px;
            }

            .content {
                .header {
                    text-align: center;

                    @media #{$bp-md}{
                        text-align: left;
                    }
                }

                .buttons {
                    display: flex;

                    button {
                        margin-right: 10px;
                    }
                }

                .stats {
                    margin-top: 20px;

                    .ranked {
                        display: flex;
                        padding: 20px;
                        background-color: white;
                        border: 3px solid #f4f4f4;
                        border-radius: 20px;
                        justify-content: space-evenly;
                        flex-wrap: wrap;

                        .header {
                            width: 100%;
                            margin-bottom: 20px;
                            display: flex;
                            justify-content: space-between;
                        }

                        .rank {
                            display: grid;
                            grid-gap: 5px;
                            grid-template: 1fr 1fr / 70px auto;
                            height: 70px;

                            img {
                                grid-row: span 2;
                            }

                            h3 {
                                margin-top: auto;
                            }

                            span {
                                opacity: 0.8;
                                margin-bottom: auto;
                            }
                        }
                    }
                }
            }
        }

        &.dark {
            .admin {
                color: white;
                background-color: $palette-dark-secondary;

                .content {
                    .stats {
                        .ranked {
                            background-color: $palette-dark-primary;
                            border: 3px solid $palette-dark-border;
                            color: white;
                        }
                    }
                }
            }
        }
    }
</style>
