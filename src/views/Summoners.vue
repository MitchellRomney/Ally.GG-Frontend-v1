<template>
    <div id="summoners">
        <div class="content container">
            <h2>My Summoners</h2>
            <div class="summoners">
                <div class="summoner" v-for="summoner in mySummoners">
                    <router-link :to="{ name: 'summoner_profile', params: { summoner: summoner.summonerName }}">
                        <div class="avatar">
                            <img class="resp-img" v-if="summoner.profileIconId"
                                 :src="'https://ddragon.leagueoflegends.com/cdn/9.10.1/img/profileicon/' + summoner.profileIconId + '.png'">
                        </div>
                        <h3 class="name">
                            {{ summoner.summonerName }}
                        </h3>
                        <span class="level">Level: {{ summoner.summonerLevel }}</span>
                    </router-link>
                </div>
            </div>
            <pulse-loader v-if="leaderboardLoading" :color="'#FF0081'"></pulse-loader>
            <div class="leaderboard">
                <h2>Leaderboard</h2>
                <table class="leaderboard-table">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Summoner Name</th>
                        <th scope="col">Tier</th>
                        <th scope="col">Wins</th>
                        <th scope="col">Losses</th>
                        <th scope="col">League Points</th>
                    </tr>
                    <tr v-for="summoner in soloLadder" :data-href="'/summoners/' + summoner.summonerName">
                        <td>
                            <router-link :to="{ name: 'summoner_profile', params: { summoner: summoner.summonerName }}">
                                #{{ soloLadder.indexOf(summoner) + 1 }}
                            </router-link>
                        </td>
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
        </div>
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

    export default {
        name: 'summoners',
        title: 'Summoners - Ally.GG',
        components: {
            PulseLoader
        },
        data() {
            return {
                // Summoner Data
                mySummoners: this.$store.state.summoners,
                soloLadder: [],

                // Loading Flags
                leaderboardLoading: true,

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

                    this.leaderboardLoading = false;
                });
            },
        },
        mounted() {
            this.getSoloLadder();
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
    #ally-gg {
        #summoners {
            position: relative;
            padding: 50px;

            h2 {
                margin-bottom: 20px;
                color: $palette-primary;
            }

            .summoners {
                display: flex;
                justify-content: space-evenly;
                height: 100%;
                align-items: center;

                .summoner {
                    text-align: center;

                    .avatar {
                        width: 100px;
                        margin-bottom: 10px;

                        img {
                            border-radius: 50%;
                        }
                    }
                }
            }

            .leaderboard {
                position: relative;
                height: 100%;
                width: 100%;

                .leaderboard-table {
                    width: 100%;
                    padding: 20px;
                    background-color: white;
                    border-radius: 10px;
                    overflow: hidden;
                    border-collapse: collapse;
                    text-align: center;

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

        &.dark {
            #summoners {
                background-color: $palette-dark-secondary;

                h2 {
                    color: white;
                }

                .leaderboard {
                    .leaderboard-table {
                        background-color: $palette-dark-primary;

                        tr {
                            border: 1px solid $palette-dark-border;

                            th {
                                color: white;
                                background-color: $palette-dark-border;
                            }
                        }
                    }
                }
            }
        }
    }
</style>