<template>
    <div id="home">
        <div class="content container">
            <RankedGrowthPanel/>
            <SummonerPanel :summoner="summoner" :summonerIconLoaded="summonerIconLoaded"
                           :summonerLoaded="summonerLoaded" v-on:update="updateSummoner(-1)"/>
            <div class="recent-stats-wrapper">
                <h2 class="panel-header">Recent Statistics</h2>
                <div class="recent-stats-flex">
                    <div class="recent-stats-grid">
                        <SmallStatisticPanel :content="homeStats.averageKda" :gradient="true" :loaded="homeStatsLoaded"/>
                        <SmallStatisticPanel :content="homeStats.averageCs" :loaded="homeStatsLoaded"/>
                        <SmallStatisticPanel :content="homeStats.averageVision" :loaded="homeStatsLoaded"/>
                        <SmallStatisticPanel :content="homeStats.winrate" :loaded="homeStatsLoaded"/>
                    </div>
                </div>
            </div>
            <MatchHistoryPanel :matches="matches"/>
            <ActivityHeatmapPanel/>
        </div>
    </div>
</template>

<script>
    import ActivityHeatmapPanel from '../components/Home/ActivityHeatmapPanel'
    import MatchHistoryPanel from '../components/Home/MatchHistoryPanel'
    import RankedGrowthPanel from '../components/Home/RankedGrowthPanel'
    import SmallStatisticPanel from '../components/Home/SmallStatisticPanel'
    import SummonerPanel from '../components/Home/SummonerPanel'
    import axios from 'axios'

    let query_getSummonerInfo =
        `query SummonerProfile($summonerName: String, $server: String, $games: Int) {
          summoner(summonerName: $summonerName, server: $server) {
            summonerId
            server
            summonerName
            profileIconId
            summonerLevel
            lastUpdated
            userProfile {
              friends {
                user {
                  id
                  username
                }
              }
              premium
              premiumStart
              user {
                username
              }
            }
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
            rankedFlex5 {
              tier
              rank
              rankNumber
              lp
              leagueName
              wins
              losses
              ringValues
            }
            rankedFlex3 {
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
          summonerPlayers(summonerName: $summonerName, server: $server, games: $games) {
            match {
              gameId
              queue
              gameDurationTime
              timeago
              timestamp
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
            totalMinionsKilled
            neutralMinionsKilled
            csPmin
            item0 {
              itemId
              name
            }
            item1 {
              itemId
              name
            }
            item2 {
              itemId
              name
            }
            item3 {
              itemId
              name
            }
            item4 {
              itemId
              name
            }
            item5 {
              itemId
              name
            }
            item6 {
              itemId
              name
            }
            spell1Id {
              name
              imageFull
            }
            spell2Id {
              name
              imageFull
            }
            perk0 {
              name
              icon
            }
            perkSubStyle
            perk4 {
              name
            }
          }
        }`;

    let mutate_getHomeStats =
        `mutation getHomeStats($summonerName: String!, $server: String!, $games: Int!) {
          homeStats(summonerName: $summonerName, server: $server, games: $games) {
            averageKda {
              statistic
              icon
              value
              growth
              scope
            }
            averageCs {
              statistic
              icon
              value
              growth
              scope
            }
            averageVision {
              statistic
              icon
              value
              growth
              scope
            }
            winrate {
              statistic
              icon
              value
              growth
              scope
            }
          }
        }`;

    let mutation_updateSummoner =
        `mutation updateSummoner($summonerId: String!, $server: String!, $games: Int!){
          updateSummoner(summonerId: $summonerId, server: $server, games: $games){
            newMatches
          }
        }`;

    export default {
        name: 'home',
        title: 'Home - Ally.GG',
        components: {
            ActivityHeatmapPanel,
            MatchHistoryPanel,
            RankedGrowthPanel,
            SmallStatisticPanel,
            SummonerPanel
        },
        data() {
            return {
                selectedSummoner: this.$store.state.user.Profiles[0].Summoners[0],
                summoner: {},
                homeStats: {},
                matches: [],

                homeStatsLoaded: false,
                summonerLoaded: false,
                summonerIconLoaded: false,
            }
        },
        computed: {
            patch() {
                return this.$store.state.patch
            },
            user() {
                return this.$store.state.user
            },
            summoners() {
                return this.user.Profiles[0].Summoners
            },
            summonerIcon() {
                if (this.summoner.profileIconId) {
                    const summonerIcon = new Image();
                    summonerIcon.src = 'https://ddragon.leagueoflegends.com/cdn/' + this.patch + '/img/profileicon/' + this.summoner.profileIconId + '.png';
                    return summonerIcon
                }
            }
        },
        methods: {
            getSummonerInfo() {
                axios({
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    method: 'post',
                    data: {
                        query: query_getSummonerInfo,
                        variables: {
                            summonerName: this.selectedSummoner.summonerName,
                            server: this.selectedSummoner.server,
                            games: 20
                        },
                    }
                }).then((response) => {
                    let data = response.data.data;

                    if (data.summoner !== null) {
                        this.summoner = data.summoner;
                        this.matches = data.summonerPlayers;
                        this.summonerLoaded = true;

                        if (this.summonerIcon.complete) {
                            this.summonerIconLoaded = true;
                        } else {
                            this.summonerIcon.addEventListener('load', () => {
                                this.summonerIconLoaded = true;
                            })
                        }
                    }
                });
            },
            getHomeStats() {
                axios({
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    method: 'post',
                    data: {
                        query: mutate_getHomeStats,
                        variables: {
                            summonerName: this.selectedSummoner.summonerName,
                            server: this.selectedSummoner.server,
                            games: 20
                        },
                    }
                }).then((response) => {
                    let data = response.data.data;

                    if (data.homeStats !== null) {
                        this.homeStats = data.homeStats;
                        this.homeStatsLoaded = true;
                    }
                });
            },
            updateSummoner(games) {
                this.summonerLoaded = false;
                this.summonerIconLoaded = false;

                axios({
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    method: 'post',
                    data: {
                        query: mutation_updateSummoner,
                        variables: {
                            summonerId: this.summoner.summonerId,
                            server: this.summoner.server,
                            games: games
                        },
                    }
                }).then((response) => {
                    console.log(response);
                })
            },
        },
        mounted() {
            this.getSummonerInfo();
            this.getHomeStats();
        }
    }
</script>

<style scoped lang="scss">
    #home {
        .content {
            display: grid;
            grid-gap: 30px;
            grid-template: repeat(12, 1fr) / repeat(24, 1fr);
            grid-auto-rows: 1fr;
            grid-auto-columns: 1fr;
            padding-top: 50px;
            padding-bottom: 50px;
            min-height: 100vh;

            .recent-stats-wrapper {
                grid-column-end: span 10;
                grid-row-end: span 6;
                display: flex;
                flex-direction: column;

                .panel-header {
                    text-shadow: 0 5px 20px rgba(52, 133, 255, 0.075), 0 4px 6px rgba(46, 89, 155, 0.2);
                    padding-bottom: 10px;
                }

                .recent-stats-flex {
                    display: flex;
                    height: 100%;

                    .recent-stats-grid {
                        height: 100%;
                        width: 100%;
                        display: grid;
                        grid-gap: 30px;
                        grid-template: 1fr 1fr / 1fr 1fr;
                    }
                }
            }
        }
    }
</style>
