<template>
    <div id="summoners">
        <transition name="fade">
            <pulse-loader v-if="loading"></pulse-loader>
            <div class="content" v-else v-cloak>
                <div class="panel">
                    <h1>Find Summoner</h1>
                    <input id="summonerSearch" aria-label="summonerSearch" type="text" v-model="search_entry"
                           @keyup.enter="summonerSearch"/>
                    <button @click="summonerSearch">Find Summoner</button>

                    <table class="results-table">
                        <tr>
                            <th scope="col">Summoner Name</th>
                            <th scope="col">Tier</th>
                            <th scope="col">Wins</th>
                            <th scope="col">Losses</th>
                            <th scope="col">League Points</th>
                        </tr>
                        <tr v-for="summoner in search_results" :data-href="'/summoners/' + summoner.summonerName">
                            <td>
                                <router-link
                                        :to="{ name: 'summoner_profile', params: { summoner: summoner.summonerName }}">
                                    {{ summoner.summonerName }}
                                </router-link>
                            </td>
                            <td v-if="summoner.rankedSolo">
                                <router-link
                                        :to="{ name: 'summoner_profile', params: { summoner: summoner.summonerName }}">
                                    {{ summoner.rankedSolo.tier }} {{ summoner.rankedSolo.rank }}
                                </router-link>
                            </td>
                            <td v-else v-cloak>
                                Unranked
                            </td>
                            <td v-if="summoner.rankedSolo">
                                <router-link
                                        :to="{ name: 'summoner_profile', params: { summoner: summoner.summonerName }}">
                                    {{ summoner.rankedSolo.wins }}
                                </router-link>
                            </td>
                            <td v-else v-cloak>
                                -
                            </td>
                            <td v-if="summoner.rankedSolo">
                                <router-link
                                        :to="{ name: 'summoner_profile', params: { summoner: summoner.summonerName }}">
                                    {{ summoner.rankedSolo.losses }}
                                </router-link>
                            </td>
                            <td v-else v-cloak>
                                -
                            </td>
                            <td v-if="summoner.rankedSolo">
                                <router-link
                                        :to="{ name: 'summoner_profile', params: { summoner: summoner.summonerName }}">
                                    {{ summoner.rankedSolo.lp }}
                                </router-link>
                            </td>
                            <td v-else v-cloak>
                                -
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import axios from 'axios';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

    let query_summonerSearch =
        `
        query SummonerSearch($entry: String) {
          summonerSearch(entry: $entry) {
            summonerId
            summonerName
            summonerLevel
            rankedSolo {
              tier
              rank
              rankNumber
              lp
              leagueName
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
                // Player Lists
                search_results: [],

                // Misc. Data
                search_entry: '',

                // Loading Flags
                loading: false,

                // Error Handling
                isError: false,
                errorMessage: '',
            }
        },
        methods: {
            summonerSearch() {
                this.loading = true;

                axios({
                    method: "POST",
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    data: {
                        query: query_summonerSearch,
                        variables: {
                            entry: this.search_entry
                        },
                    }
                }).then((response) => {
                    this.search_results = response.data.data.summonerSearch;
                    this.loading = false;
                });
            }
        },
        mounted() {
        }
    }
</script>

<style scoped lang="scss">
    @import "../styles/_variables.scss";

    .v-spinner {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: calc(100vh - 65px);
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $palette-secondary;
    }

    #summoners {
        grid-area: main;
        position: relative;

        .content {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: calc(100vh - 65px);

            .panel {
                padding: 25px;
                background-color: white;
                width: 50%;
                border: 1px solid #DFE3E8;
                border-radius: 10px;
                text-align: center;

                .results-table {
                    width: 100%;
                    background-color: white;
                    border-radius: 10px;
                    overflow: hidden;
                    border: 1px solid #DFE3E8;
                    margin-top: 25px;

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
    }
</style>