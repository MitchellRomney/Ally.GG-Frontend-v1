<template>
    <div id="leaderboard">
        <transition name="fade">
            <pulse-loader v-if="loading" :color="'#FF0081'"></pulse-loader>
            <div class="content container" v-else v-cloak>
                <h1>Leaderboard</h1>
                <table class="leaderboard-table">
                    <tr>
                        <th scope="col">Summoner Name</th>
                        <th scope="col">Tier</th>
                        <th scope="col">Wins</th>
                        <th scope="col">Losses</th>
                        <th scope="col">League Points</th>
                    </tr>
                    <tr v-for="summoner in soloLadder" :data-href="'/summoners/' + summoner.summonerName">
                        <td>
                            <router-link :to="{ name: 'summoner_profile', params: { summoner: summoner.summonerName }}">
                                {{ summoner.summonerName }}
                            </router-link>
                        </td>
                        <td>
                            <router-link :to="{ name: 'summoner_profile', params: { summoner: summoner.summonerName }}">
                                {{ summoner.rankedSolo.tier }} {{ summoner.rankedSolo.rank }}
                            </router-link>
                        </td>
                        <td>
                           <router-link :to="{ name: 'summoner_profile', params: { summoner: summoner.summonerName }}">
                                {{ summoner.rankedSolo.wins }}
                            </router-link>
                        </td>
                        <td>
                            <router-link :to="{ name: 'summoner_profile', params: { summoner: summoner.summonerName }}">
                                {{ summoner.rankedSolo.losses }}
                            </router-link>
                        </td>
                        <td>
                            <router-link :to="{ name: 'summoner_profile', params: { summoner: summoner.summonerName }}">
                                {{ summoner.rankedSolo.lp }}
                            </router-link>
                        </td>
                    </tr>
                </table>
            </div>
        </transition>
    </div>
</template>

<script>
    import axios from 'axios';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
    import $ from 'jquery';

    let query_getSoloLadder =
        `
        query {
              topSummoners {
                summonerName
                rankedSolo {
                  tier
                  rank
                  lp
                  wins
                  losses
                }
              }
            }
        `;

    let query_addSummoner =
        `
        mutation($summonerName: String) {
          createSummoner(input: {
            summonerName: $summonerName
          }) {
            created
            message
            summoner {
              summonerName
              rankedSolo {
                tier
                rank
                rankNumber
                lp
                leagueName
                wins
                losses
                ringValues
              }
            }
          }
        }
        `;

    export default {
        name: 'leaderboard',
        title: 'Leaderboard - Ally.GG',
        components: {
            PulseLoader
        },
        data() {
            return {
                // Player Lists
                soloLadder: [],

                // Loading Flags
                loading: true,

                // Error Handling
                isError: false,
                errorMessage: '',
            }
        },
        methods: {
            getSoloLadder() {
                axios({
                    method: "POST",
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    data: {
                        query: query_getSoloLadder,
                        variables: {},
                    }
                }).then((response) => {
                    this.soloLadder = response.data.data.topSummoners;

                    this.loading = false;
                });
            },
            async addSummoner() {
                let summonerName = this.addSummonerName;
                this.addSummonerName = '';

                await axios({
                    method: "POST",
                    url: "http://localhost:8040/graphql",
                    data: {
                        query: query_addSummoner,
                        variables: {
                            summonerName: summonerName
                        },
                    }
                }).then((response) => {
                    console.log(response.data.data);
                    if (!response['created']) {
                        this.isError = true;
                        this.errorMessage = response['message'];
                    }
                });
            },
        },
        mounted() {
            this.getSoloLadder()
        }
    }


    $('*[data-href]').on("click", function () {
        window.location = $(this).data('href');
        return false;
    });

    $("td > a").on("click", function (e) {
        e.stopPropagation();
    });
</script>

<style scoped lang="scss">
    @import "../styles/_variables.scss";

    #leaderboard {
        grid-area: main;
        position: relative;
        height: 100%;

        .content {
            padding: 20px;

            .leaderboard-table {
                width: 100%;
                padding: 20px;
                background-color: white;
                border-radius: 10px;
                overflow: hidden;
                border: 1px solid #DFE3E8;
                border-collapse: collapse;

                tr {
                    border: 1px solid #dfe3e8;
                    transition: all 0.25s ease;

                    &:hover {
                        background-color: #fbe1ea;
                    }

                    th {
                        background-color: #ececec;
                        padding: 15px;
                    }

                    td {
                        a {
                            display: block;
                            padding: 15px;
                        }
                    }
                }
            }
        }
    }

</style>