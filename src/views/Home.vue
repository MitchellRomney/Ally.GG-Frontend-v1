<template>
    <div id="home">
        <div class="content container">
            <RankedGrowthPanel :loaded="summonerLoaded" :matches="sortedMatches"/>
            <SummonerPanel :selectedSummoner="summoner" :summonerIcons="summonerIcons"
                           :summonerLoaded="summonerLoaded" v-on:update="updateSummoner(-1)"
                           v-on:switch="switchSummoner"/>
            <div class="recent-stats-wrapper">
                <div class="panel-header">
                    <h2>Recent Statistics</h2>
                    <select v-model="recentStatsScope">
                        <option value="10">Past 10 Games</option>
                        <option selected value="20">Past 20 Games</option>
                        <option value="30">Past 30 Games</option>
                        <option value="40">Past 40 Games</option>
                    </select>
                </div>
                <div class="recent-stats-flex">
                    <div class="recent-stats-grid">
                        <SmallStatisticPanel :content="homeStats.averageKda" :gradient="true"
                                             :loaded="homeStatsLoaded" :scope="recentStatsScope"/>
                        <SmallStatisticPanel :content="homeStats.averageCs" :loaded="homeStatsLoaded"
                                             :scope="recentStatsScope"/>
                        <SmallStatisticPanel :content="homeStats.averageVision" :loaded="homeStatsLoaded"
                                             :scope="recentStatsScope"/>
                        <SmallStatisticPanel :content="homeStats.winrate" :loaded="homeStatsLoaded"
                                             :scope="recentStatsScope"/>
                    </div>
                </div>
            </div>
            <MatchHistoryPanel :matches="sortedMatches"/>
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
            rankedSolo {
              tier
              rank
              rankNumber
              lp
              leagueName
              wins
              losses
            }
            rankedFlex5 {
              tier
              rank
              rankNumber
              lp
              leagueName
              wins
              losses
            }
            rankedFlex3 {
              tier
              rank
              rankNumber
              lp
              leagueName
              wins
              losses
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
                recentStatsScope: '20',
                summoner: {},
                homeStats: {},
                matches: [],
                remaining_matches: 0,

                homeStatsLoaded: false,
                summonerLoaded: false,
            }
        },
        watch: {
            recentStatsScope() {
                this.homeStatsLoaded = false;
                this.getHomeStats();
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
            summonerIcons() {
                let summonerIcons = {};
                let summoners = this.$store.state.user.Profiles[0].Summoners;
                for (let key in summoners) {
                    // Grab the Summoner
                    let summoner = summoners[key];

                    // Load the image.
                    const icon = new Image();
                    icon.src = 'https://ddragon.leagueoflegends.com/cdn/' + this.patch + '/img/profileicon/' + summoner.profileIconId + '.png';

                    // Build the Icon object with a loaded flag.
                    const summonerIcon = {
                        icon: icon,
                        loaded: false
                    };

                    summonerIcons[summoner.summonerName] = summonerIcon;
                }
                return summonerIcons
            },
            sortedMatches() {
                return this.matches.sort(function (a, b) {
                    let x = a['match']['timestamp'];
                    let y = b['match']['timestamp'];
                    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                });
            },
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
                            games: 30
                        },
                    }
                }).then((response) => {
                    let data = response.data.data;

                    if (data.summoner !== null) {
                        this.summoner = data.summoner;
                        this.matches = data.summonerPlayers;
                        this.summonerLoaded = true;

                        this.webSocketManager();

                        for (let key in this.summonerIcons) {
                            let summonerIcon = this.summonerIcons[key];

                            if (summonerIcon.icon.complete) {
                                summonerIcon.loaded = true;
                            } else {
                                summonerIcon.icon.addEventListener('load', () => {
                                    summonerIcon.loaded = true;
                                })
                            }
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
                            games: parseInt(this.recentStatsScope)
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
                    // Store the data in an easier to use variable.
                    let data = response.data.data.updateSummoner;
                    this.remaining_matches = data.newMatches;
                })
            },
            switchSummoner(summoner) {
                this.summonerLoaded = false;
                this.selectedSummoner = summoner;
                this.summoner = summoner;

                this.webSocketManager();
                this.getSummonerInfo();
                this.getHomeStats();
            },
            webSocketManager() {
                this.$disconnect();
                if (this.$options.sockets.onmessage) {
                    delete this.$options.sockets.onmessage;
                }

                this.$connect(
                    process.env.VUE_APP_WS_URL + '/summoner/' + this.summoner.server + '/' + this.summoner.summonerId, {
                        format: 'json',
                        store: this.$store,
                    });

                this.$options.sockets.onmessage = (response) => {

                    // Parse and store data in variable.
                    let data = JSON.parse(response.data);

                    // If there is proper data in the response...
                    if (data.data) {

                        // If data is a new match...
                        if ('match' in data.data) {

                            // Decrease the remaining matches count by 1.
                            this.remaining_matches += -1;

                            let player = JSON.parse(data.data.match).player;

                            // Add new match to match list.
                            this.matches.push(player);

                            // Else if data is new Summoner data..
                        } else if ('summoner' in data.data) {

                            // Store the new Summoner information.
                            this.summoner = JSON.parse(data.data.summoner).summoner;

                            // Declare the Summoner as loaded.
                            this.summonerLoaded = true;

                            if (this.summonerIcon.complete) {
                                this.summonerIconLoaded = true;
                            } else {
                                this.summonerIcon.addEventListener('load', () => {
                                    this.summonerIconLoaded = true;
                                })
                            }
                        }
                    }
                };
            }
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
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
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
