<template>
    <div id="summoners">
        <div class="content container">
            <div class="header">
                <h2>My Summoners</h2>
            </div>
            <div class="summoners">
                <div class="summoner" v-for="summoner in mySummoners">
                    <router-link
                            :to="{ name: 'summoner_profile', params: { server: summoner.server, summoner: summoner.summonerName }}">
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
            <div class="leaderboard-section">
                <pulse-loader v-if="leaderboardLoading" :color="'#FF0081'"></pulse-loader>
                <div class="leaderboard">
                    <div class="header">
                        <h2>Leaderboard</h2>
                        <div class="server-select">
                            <select id="server" aria-label="server" name="server" v-model="server">
                                <option value="BR1">Brazil</option>
                                <option value="EUN1">EU Nordic & East</option>
                                <option value="EUW1">EU West</option>
                                <option value="JP1">Japan</option>
                                <option value="KR">Korea</option>
                                <option value="LA1">Latin America North</option>
                                <option value="LA2">Latin America South</option>
                                <option value="NA1">North America</option>
                                <option value="OC1" selected="selected">Oceania</option>
                                <option value="TR1">Turkey</option>
                                <option value="RU">Russia</option>
                                <option value="PBE1">Public Beta Environment</option>
                            </select>
                        </div>
                    </div>
                    <table class="leaderboard-table">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Summoner Name</th>
                            <th scope="col">Tier</th>
                            <th class="wins-header" scope="col">Wins</th>
                            <th class="losses-header" scope="col">Losses</th>
                            <th scope="col">League Points</th>
                        </tr>
                        <tr v-for="summoner in soloLadder"
                            :data-href="'/summoners/' + summoner.server + '/' + summoner.summonerName">
                            <td>
                                <router-link
                                        :to="{ name: 'summoner_profile', params: { server: summoner.server, summoner: summoner.summonerName }}">
                                    #{{ soloLadder.indexOf(summoner) + 1 }}
                                </router-link>
                            </td>
                            <td>
                                <router-link
                                        :to="{ name: 'summoner_profile', params: { server: summoner.server, summoner: summoner.summonerName }}">
                                    {{ summoner.summonerName }}
                                </router-link>
                            </td>
                            <td>
                                <router-link
                                        :to="{ name: 'summoner_profile', params: { server: summoner.server, summoner: summoner.summonerName }}">
                                    {{ summoner.rankedSolo.tier }} {{ summoner.rankedSolo.rank }}
                                </router-link>
                            </td>
                            <td class="wins">
                                <router-link
                                        :to="{ name: 'summoner_profile', params: { server: summoner.server, summoner: summoner.summonerName }}">
                                    {{ summoner.rankedSolo.wins }}
                                </router-link>
                            </td>
                            <td class="losses">
                                <router-link
                                        :to="{ name: 'summoner_profile', params: { server: summoner.server, summoner: summoner.summonerName }}">
                                    {{ summoner.rankedSolo.losses }}
                                </router-link>
                            </td>
                            <td>
                                <router-link
                                        :to="{ name: 'summoner_profile', params: { server: summoner.server, summoner: summoner.summonerName }}">
                                    {{ summoner.rankedSolo.lp }}
                                </router-link>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
    import $ from 'jquery';

    let query_getSoloLadder =
        `query topSummoners($server: String!){
          topSummoners(server: $server) {
            summonerName
            server
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
        watch: {
            server(before, after) {
                this.getSoloLadder();
            }
        },
        data() {
            return {
                // Summoner Data
                mySummoners: this.$store.state.summoners,
                soloLadder: [],

                // Select
                server: 'OC1',

                // Loading Flags
                leaderboardLoading: false,

                // Error Handling
                isError: false,
                errorMessage: '',
            }
        },
        methods: {
            getSoloLadder() {
                this.leaderboardLoading = true;

                axios({
                    method: "POST",
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    data: {
                        query: query_getSoloLadder,
                        variables: {
                            server: this.server
                        },
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
            padding: 20px;

            @media #{$bp-md}{
                padding: 50px;
            }

            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
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

            .leaderboard-section {
                position: relative;

                .leaderboard {
                    position: relative;
                    height: 100%;
                    width: 100%;
                    margin-top: 20px;

                    .leaderboard-table {
                        width: 100%;
                        padding: 20px;
                        background-color: white;
                        border-radius: 10px;
                        overflow: hidden;
                        border-collapse: collapse;
                        text-align: center;
                        font-size: 0.8rem;

                        @media #{$bp-md}{
                            font-size: 1rem;
                        }

                        .wins, .wins-header, .losses, .losses-header {
                            display: none;

                            @media #{$bp-md}{
                                display: table-cell;
                            }
                        }

                        tr {
                            border: 1px solid #dfe3e8;
                            transition: all 0.25s ease;

                            &:hover {
                                background-color: #fbe1ea;
                            }

                            th {
                                background-color: #ececec;
                                padding: 10px;

                                @media #{$bp-md}{
                                    padding: 15px;
                                }
                            }

                            td {
                                a {
                                    display: block;
                                    padding: 10px;

                                    @media #{$bp-md}{
                                        padding: 15px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        &.dark {
            #summoners {
                background-color: $palette-dark-secondary;

                .header {
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