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
                    <div v-for="result in search_results">
                        <router-link :to="{ name: 'summoner_profile', params: { summoner: result.summonerName }}">
                            {{ result.summonerName }}
                        </router-link>
                    </div>
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
              ringValues
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
            height: calc(100vh - 65px);

            .panel {
                padding: 50px;
                background-color: white;
                width: 50%;
                border: 1px solid #DFE3E8;
                border-radius: 10px;
            }
        }
    }
</style>