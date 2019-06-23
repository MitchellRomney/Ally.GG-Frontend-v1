<template>
    <div id="improve">
        <div class="content container">
            <div class="match-list">
                <router-link :to="'' + match.match.gameId" class="match-wrapper" v-for="match in matchList">
                    <div class="match" :class="{ win : match.win }">
                        <img class="resp-img tile" :src="getChampionTileUrl(match.champion)"
                             :alt="match.champion.name"/>
                        <div class="win" v-if="match.win">Victory</div>
                        <div class="loss" v-else v-cloak>Defeat</div>
                        <span class="level">Level {{ match.champLevel }}</span>
                        <span class="kda">{{ match.kills }}/{{ match.deaths }}/{{ match.assists }}</span>
                        <span class="average">{{ match.kdaAverage }} KDA</span>
                    </div>
                </router-link>
            </div>
            <div class="match-info">
                <transition name="fade" mode="out-in">
                    <router-view :key="key" :champion="matchList[0].champion" v-if="!loading"
                                 :summoner="summoners[selectedSummoner]">
                    </router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    let query_getSummonerInfo =
        `query SummonerProfile($summonerName: String, $games: Int) {
          summonerPlayers(summonerName: $summonerName, games: $games) {
            match {
              gameId
            }
            champion {
              key
              name
              champId
            }
            win
            kills
            deaths
            assists
            kdaAverage
            champLevel
          }
        }`;

    let query_getSummoners =
        `query Summoners($summonerIds: [String!]) {
          getSummoners(summonerIds: $summonerIds) {
            summonerName
            summonerId
          }
        }`;

    export default {
        name: 'improve',
        title: 'Improve - Ally.GG',
        components: {},
        data() {
            return {
                // Data
                matchList: [],
                selectedMatch: null,
                selectedSummoner: 0,
                summoners: [],

                // Loading Flags
                loading: true,

                // Error Handling
                isError: false,
                errorMessage: '',
            }
        },
        computed: {
            focusedMatch() {
                if (this.matchList.length > 0) {
                    if (this.selectedMatch == null) {
                        return this.matchList[0].match.gameId
                    } else {
                        return this.selectedMatch
                    }
                } else {
                    return null
                }
            },
            key() {
                return this.$route.params.match !== undefined
                    ? this.$route.params.match
                    : this.$route
            }
        },
        methods: {
            getSummonerInfo() {
                /**
                 * @param data.summonerPlayers   List of recent Player objects for a Summoner.
                 */
                axios({
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    method: 'post',
                    data: {
                        query: query_getSummonerInfo,
                        variables: {
                            summonerName: this.summoners[this.selectedSummoner].summonerName,
                            games: 50
                        },
                    }
                }).then((response) => {
                    this.matchList = response.data.data.summonerPlayers;
                    this.$router.push({name: 'improve_match', params: {match: this.matchList[0].match.gameId}});
                    this.loading = false;
                });
            },
            getSummoners() {
                let summonerIds = [];
                for (let key in this.$store.state.summoners) {
                    summonerIds.push(this.$store.state.summoners[key].summonerId);
                }

                axios({
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    method: 'post',
                    data: {
                        query: query_getSummoners,
                        variables: {
                            summonerIds: summonerIds
                        },
                    }
                }).then((response) => {
                    this.summoners = response.data.data.getSummoners;
                    this.getSummonerInfo();
                });
            },
            getChampionTileUrl(champion) {
                return require('../assets/images/champion-tiles/' + champion.champId + '_0.jpg');
            },
        },
        mounted() {
            this.getSummoners();
        }
    }
</script>

<style scoped lang="scss">
    #ally-gg {
        #improve {
            height: 100%;

            .content {
                display: grid;
                height: 100%;
                grid-template: calc(100vh - 65px) / 1fr 3fr;
                grid-template-areas: "list info";

                .match-list {
                    grid-area: list;
                    overflow-y: scroll;
                    height: 100%;

                    .match-wrapper {
                        height: 70px;
                        border-bottom: 1px solid #DFE3E8;
                        display: flex;

                        .match {
                            display: grid;
                            grid-template: 1fr 1fr / repeat(4, 1fr);
                            grid-template-areas: "tile win level ." "tile kda avg .";
                            padding: 10px 0;
                            width: 100%;
                            background-color: rgba(235, 87, 87, 0.1);

                            &.win {
                                background-color: rgba(44, 156, 218, 0.1)
                            }

                            .tile {
                                grid-area: tile;
                                border-radius: 5px;
                            }

                            .win {
                                color: $palette-win;
                                grid-area: win;
                                font-weight: bold;
                            }

                            .loss {
                                color: $palette-loss;
                                grid-area: win;
                                font-weight: bold;
                            }

                            .level {
                                grid-area: level;
                            }

                            .kda {
                                grid-area: kda;
                            }

                            .average {
                                grid-area: avg;
                            }
                        }
                    }
                }

                .match-info {
                    grid-area: info;
                    height: 100%;
                    overflow-y: scroll;
                    color: $palette-primary;
                }
            }
        }

        &.dark {
            #improve {
                .content {
                    .match-info {
                        color: white;
                    }
                }
            }
        }
    }
</style>