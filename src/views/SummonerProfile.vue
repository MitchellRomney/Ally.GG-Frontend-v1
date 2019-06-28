<template>
    <div id="summonerProfile">
        <div class="page-content">
            <div class="top-wrapper container">
                <div class="avatar-wrapper">
                    <transition name="fade" mode="out-in">
                        <div class="content-loader" v-if="!summonerIconLoaded" key="1">
                            <content-loader :width="150" :height="150"
                                            :primaryColor="conLoadPrimary"
                                            :secondaryColor="conLoadSecondary"></content-loader>
                        </div>
                        <div class="avatar" v-else v-cloak key="2">
                            <img class="resp-img" v-if="summonerLoaded"
                                 :onLoad="summonerIconLoaded = true"
                                 :alt="summoner.summonerName + '\'s Summoner Icon'"
                                 :src="summonerIcon.src">
                            <span class="level">{{ summoner.summonerLevel }}</span>
                        </div>
                    </transition>
                </div>
                <div class="update">
                    <transition name="fade" mode="out-in">
                        <div class="content-loader" v-if="!summonerLoaded" key="1">
                            <content-loader :width="150" :height="50"
                                            :primaryColor="conLoadPrimary"
                                            :secondaryColor="conLoadSecondary"></content-loader>
                        </div>
                        <div class="content" v-else v-cloak key="2">
                            <span class="last-updated">Last Updated: <span>{{ summoner.lastUpdated }}</span></span>
                            <button v-on:click="updateSummoner">Update Summoner</button>
                        </div>
                    </transition>
                </div>
                <div class="title">
                    <transition name="fade" mode="out-in">
                        <div class="content-loader" v-if="!summonerLoaded" key="1">
                            <content-loader :width="150" :height="20"
                                            :primaryColor="conLoadPrimary"
                                            :secondaryColor="conLoadSecondary"></content-loader>
                        </div>
                        <div class="content" v-else v-cloak key="2">
                            <h1 class="summonerName" :style="'font-size: ' + nameFontSize">{{ summoner.summonerName
                                }}</h1>
                            <div class="badges" v-if="summoner.userProfile">
                                <div class="badge verified" v-if="summoner.userProfile !== null">
                                    <img class="resp-img" src="../assets/images/badges/verified.png" alt="Verified"/>
                                </div>
                                <div class="badge premium" v-if="summoner.userProfile.premium">
                                    <img class="resp-img" src="../assets/images/badges/premium.png" alt="Premium"/>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
                <div class="options">
                    <transition name="fade" mode="out-in">
                        <div class="content-loader" v-if="!summonerLoaded" key="1">
                            <content-loader :width="150" :height="60"
                                            :primaryColor="conLoadPrimary"
                                            :secondaryColor="conLoadSecondary"></content-loader>
                        </div>
                        <div class="content" v-else v-cloak key="2">
                            <a href="#">
                                <font-awesome-icon icon="ellipsis-h"/>
                            </a>
                            <a href="#" class="star">
                                <font-awesome-icon icon="star"/>
                            </a>
                        </div>
                    </transition>
                </div>
                <div class="ranked-stats">
                    <transition name="fade" mode="out-in">
                        <div class="content-loader" v-if="!summonerLoaded" key="1">
                            <content-loader :width="150" :height="40"
                                            :primaryColor="conLoadPrimary"
                                            :secondaryColor="conLoadSecondary"></content-loader>
                        </div>
                        <div class="content" v-else v-cloak key="2">
                            <div class="ranked-stat" v-if="summoner.rankedSolo" v-cloak>
                                <div class="medal">
                                    <img class="resp-img"
                                         :src="getMedalUrl(summoner.rankedSolo.tier, summoner.rankedSolo.rankNumber)">
                                </div>
                                <div class="text">
                                    <h5 class="faded">Ranked Solo</h5>
                                    <h2 class="rank">
                                        {{ summoner.rankedSolo.tier }} {{ summoner.rankedSolo.rank }}
                                    </h2>
                                    <h5 class="winrate">
                                        {{ summoner.rankedSolo.lp }}LP |
                                        <span> {{ summoner.rankedSolo.wins }}W / {{ summoner.rankedSolo.losses }}L</span>
                                    </h5>
                                </div>
                            </div>
                            <div class="unranked" v-else v-cloak>
                                <div class="medal">
                                    <img class="resp-img" src="../assets/images/unranked.png"/>
                                </div>
                                <div class="text">
                                    <h5 class="faded">Ranked Solo</h5>
                                    <h2 class="rank">
                                        Unranked
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <transition name="fade" mode="out-in">
                        <div class="content-loader" v-if="!summonerLoaded" key="1">
                            <content-loader :width="150" :height="40"
                                            :primaryColor="conLoadPrimary"
                                            :secondaryColor="conLoadSecondary"></content-loader>
                        </div>
                        <div class="content" v-else v-cloak key="2">
                            <div class="ranked-stat" v-if="summoner.rankedFlex3" v-cloak>
                                <div class="medal">
                                    <img class="resp-img"
                                         :src="getMedalUrl(summoner.rankedFlex3.tier, summoner.rankedFlex3.rankNumber)">
                                </div>
                                <div class="text">
                                    <h5 class="faded">Flex 3v3</h5>
                                    <h2 class="rank">
                                        {{ summoner.rankedFlex3.tier }} {{ summoner.rankedFlex3.rank }}
                                    </h2>
                                    <h5 class="winrate">
                                        {{ summoner.rankedFlex3.lp }}LP |
                                        <span> {{ summoner.rankedFlex3.wins }}W / {{ summoner.rankedFlex3.losses }}L</span>
                                    </h5>
                                </div>
                            </div>
                            <div class="unranked" v-else v-cloak>
                                <div class="medal">
                                    <img class="resp-img" src="../assets/images/unranked.png"/>
                                </div>
                                <div class="text">
                                    <h5 class="faded">Flex 3v3</h5>
                                    <h2 class="rank">
                                        Unranked
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <transition name="fade" mode="out-in">
                        <div class="content-loader" v-if="!summonerLoaded" key="1">
                            <content-loader :width="150" :height="40"
                                            :primaryColor="conLoadPrimary"
                                            :secondaryColor="conLoadSecondary"></content-loader>
                        </div>
                        <div class="content" v-else v-cloak key="2">
                            <div class="ranked-stat" v-if="summoner.rankedFlex5" v-cloak>
                                <div class="medal">
                                    <img class="resp-img"
                                         :src="getMedalUrl(summoner.rankedFlex5.tier, summoner.rankedFlex5.rankNumber)">
                                </div>
                                <div class="text">
                                    <h5 class="faded">Flex 5v5</h5>
                                    <h2 class="rank">
                                        {{ summoner.rankedFlex5.tier }} {{ summoner.rankedFlex5.rank }}
                                    </h2>
                                    <h5 class="winrate">
                                        {{ summoner.rankedFlex5.lp }}LP |
                                        <span> {{ summoner.rankedFlex5.wins }}W / {{ summoner.rankedFlex5.losses }}L</span>
                                    </h5>
                                </div>
                            </div>
                            <div class="unranked" v-else v-cloak>
                                <div class="medal">
                                    <img class="resp-img" src="../assets/images/unranked.png"/>
                                </div>
                                <div class="text">
                                    <h5 class="faded">Flex 5v5</h5>
                                    <h2 class="rank">
                                        Unranked
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
                <ul id="summoner-menu">
                    <router-link to="general">
                        <li class="general">General</li>
                    </router-link>
                    <router-link to="matches">
                        <li class="matches">Matches</li>
                    </router-link>
                    <router-link to="champions">
                        <li class="champions">Champions</li>
                    </router-link>
                </ul>
            </div>
            <div id="summoner-content-wrapper">
                <router-view :matches="sortedMatches" :summoner="summoner" :summonerLoaded="summonerLoaded"
                             :matchLoading="!matchesLoaded" :matchesRemaining="remaining_matches"
                             :newMatches="newMatches"></router-view>
            </div>
            <footer>
                <div class="teis-logo">
                    <a href="https://www.theearthissquare.com" target="_blank">
                        <transition name="fade" mode="out-in">
                            <img class="resp-img" src="../assets/images/teis-logo.png" v-if="!darkMode"/>
                            <img class="resp-img" src="../assets/images/teis-logo-white.png" v-else v-cloak />
                        </transition>
                    </a>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
    import {ContentLoader} from 'vue-content-loader';

    let query_getSummonerInfo =
        `query SummonerProfile($summonerName: String, $server: String) {
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
        }`;

    let query_getSummonerMatches =
        `query SummonerPlayers($summonerName: String, $server: String, $games: Int) {
          summonerPlayers(summonerName: $summonerName, server: $server, games: $games) {
            match {
              gameId
              queue
              gameDurationTime
              timeago
              timestamp
              players {
                participantId
                champion {
                  champId
                  name
                }
                team {
                  teamId
                }
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
              }
            }
            champion {
              key
              name
              champId
            }
            lane
            laneOpponent {
              champion {
                key
                name
                champId
              }
            }
            win
            kills
            deaths
            assists
            kdaAverage
            champLevel
            killParticipation
            totalMinionsKilled
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

    let mutation_updateSummoner =
        `mutation updateSummoner($summonerId: String!, $server: String!){
          updateSummoner(summonerId: $summonerId, server: $server){
            newMatches
          }
        }`;

    export default {
        name: 'summoner_profile',
        components: {
            PulseLoader,
            ContentLoader
        },
        data() {
            return {
                // Summoner Data
                summoner: {},
                matches: [],

                // Misc Data
                remaining_matches: 0,
                newMatches: 0,

                // Loading Flags
                summonerIconLoaded: false,
                summonerLoaded: false,
                matchesLoaded: false,

                // Error Handling
                isError: false,
                errorMessage: '',
            }
        },
        watch: {
            $route(before, after) {
                // Check if they've loaded a new Summoner.
                if (before.params.summoner !== after.params.summoner) {
                    this.summonerLoaded = false;
                    this.matchesLoaded = false;
                    this.summonerIconLoaded = false;

                    this.getSummonerInfo();
                    this.getMatches();
                }
            },
        },
        computed: {
            darkMode() {
                if (this.$store.state.stateLoaded){
                    return this.$store.state.user.Profiles[0].darkMode
                } else return null
            },
            conLoadPrimary() {
                if (this.darkMode) {
                    return '#141d26'
                } else {
                    return '#f9f9f9'
                }
            },
            conLoadSecondary() {
                if (this.darkMode) {
                    return '#17171c'
                } else {
                    return '#ecebeb'
                }
            },
            sortedMatches() {
                return this.matches.sort(function (a, b) {
                    let x = a['match']['timestamp'];
                    let y = b['match']['timestamp'];
                    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                });
            },
            summonerIcon() {
                if (this.summoner.profileIconId) {
                    const summonerIcon = new Image();
                    summonerIcon.src = 'https://ddragon.leagueoflegends.com/cdn/9.12.1/img/profileicon/' + this.summoner.profileIconId + '.png';
                    return summonerIcon
                }
            },
            nameFontSize() {
                // Get Summoner name from route.
                let summonerName = this.$route.params.summoner;

                // If the Summoner data is loaded, use that instead (if a user changes name on update, this is important)
                if (this.summoner.summonerName) {
                    summonerName = this.summoner.summonerName;
                }

                if (document.documentElement.clientWidth >= 768) {  // If window is past mobile/tablet breakpoint.
                    if (summonerName.length > 14) {
                        return '60px';
                    } else if (summonerName.length > 10) {
                        return '80px';
                    } else {
                        return '100px';
                    }
                } else {
                    if (summonerName.length > 14) {
                        return '25px';
                    } else if (summonerName.length > 10) {
                        return '30px';
                    } else {
                        return '40px';
                    }
                }
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
                            summonerName: this.$route.params.summoner,
                            server: this.$route.params.server
                        },
                    }
                }).then((summonerProfileInfo) => {
                    this.summoner = summonerProfileInfo.data.data.summoner;
                    this.summonerLoaded = true;

                    this.webSocketManager();

                    if (this.summonerIcon.complete) {
                        this.summonerIconLoaded = true;
                    } else {
                        this.summonerIcon.addEventListener('load', () => {
                            this.summonerIconLoaded = true;
                        })
                    }
                });
            },
            getMatches() {
                console.log('Getting Matches')
                axios({
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    method: 'post',
                    data: {
                        query: query_getSummonerMatches,
                        variables: {
                            summonerName: this.$route.params.summoner,
                            server: this.$route.params.server,
                            games: 10
                        },
                    }
                }).then((response) => {
                    console.log('Got Matches')
                    this.matches = response.data.data.summonerPlayers;
                    this.matchesLoaded = true;
                });
            },
            updateSummoner() {
                /**
                 * @param data.newMatches   List of new matches not yet in the database.
                 */
                this.summonerLoaded = false;
                this.summonerIconLoaded = false;

                axios({
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    method: 'post',
                    data: {
                        query: mutation_updateSummoner,
                        variables: {
                            summonerId: this.summoner.summonerId,
                            server: this.summoner.server
                        },
                    }
                }).then((response) => {
                    // Store the data in an easier to use variable.
                    let data = response.data.data.updateSummoner;

                    this.remaining_matches = data.newMatches;
                    this.newMatches = data.newMatches;
                })
            },
            getMedalUrl(tier, rank) {
                return require('../assets/images/ranked_medals/' + tier.toLowerCase() + '_' + rank + '.png');
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
                            console.log(data.data);

                            // Decrease the remaining matches count by 1.
                            this.remaining_matches += -1;

                            let player = JSON.parse(data.data.match).player;

                            console.log(data.message);

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

                            // If Summoner has updated with a name change, change URL path.
                            if (this.summoner.summonerName !== this.$route.params.summoner) {
                                this.$router.replace('/summoners/' + this.summoner.summonerName);
                            }
                        }
                    }
                };
            }
        },
        mounted() {
            this.getSummonerInfo();
            this.getMatches();
        }
    }
</script>

<style scoped lang="scss">
    #ally-gg {
        #summonerProfile {
            width: 100%;
            position: relative;
            color: $palette-primary;

            .page-content {
                background-color: white;
                transition: all 0.5s ease;

                &.loaded {
                    height: 100%;
                }

                .top-wrapper {
                    padding-top: 10px;
                    display: grid;
                    background-color: white;
                    width: 100%;
                    grid-gap: 15px;
                    grid-template: 1fr auto 0.5fr 0.5fr / repeat(4, 1fr);
                    grid-template-areas: "avatar title title title" "ranked ranked ranked ranked" "update update update options" "menu menu menu menu";
                    padding: 0 20px;
                    transition: all 0.5s ease;

                    @media #{$bp-md}{
                        grid-gap: 0 15px;
                        grid-template: 150px 90px 60px / 150px repeat(11, 1fr);
                        grid-template-areas: "avatar title title title title title title title title title options options" "update ranked ranked ranked ranked ranked ranked ranked ranked ranked ranked ranked" "menu menu menu menu menu menu menu menu menu menu menu menu";
                    }

                    .avatar-wrapper {
                        grid-area: avatar;
                        border-radius: 20px;
                        text-align: center;
                        display: flex;
                        flex-direction: column;
                        position: relative;

                        .avatar {
                            position: relative;
                            overflow: hidden;

                            img {
                                border-radius: 10px;
                                height: auto;
                                width: auto;
                            }

                            .level {
                                position: absolute;
                                bottom: -5px;
                                right: 0;
                                padding: 2px 10px;
                                background-color: white;
                                border-top-left-radius: 10px;
                                font-size: 12px;
                                font-weight: bold;
                                transition: background-color 0.5s ease;

                                @media #{$bp-md}{
                                    font-size: 24px;
                                    padding: 2px 20px;
                                    bottom: -10px;
                                }
                            }
                        }
                    }

                    .update {
                        grid-area: update;
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        text-align: center;

                        .last-updated {
                            font-size: 0.7rem;
                            opacity: 0.8;
                            margin: 0.35rem 0;
                        }

                        button {
                            width: 100%;
                        }
                    }

                    .title {
                        grid-area: title;
                        display: flex;
                        align-items: center;
                        flex-wrap: wrap;
                        @media #{$bp-md}{
                            justify-content: flex-start;
                        }

                        .content {
                            display: flex;
                            align-items: center;
                            flex-wrap: wrap;
                        }

                        .summonerName {
                            font-family: 'Panton Black', sans-serif;
                            margin-bottom: -20px;
                            color: $palette-primary;
                        }

                        .badges {
                            margin-left: 25px;
                            display: flex;

                            .badge {
                                width: 40px;
                                cursor: pointer;
                                margin-right: 10px;
                            }
                        }
                    }

                    .options {
                        grid-area: options;
                        display: flex;

                        .content {
                            display: flex;
                            align-items: center;
                            justify-content: space-evenly;
                            flex-direction: row-reverse;
                            width: 100%;
                        }

                        a {
                            width: 30px;
                            height: 30px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            background-color: #DFE3E8;
                            border-radius: 50%;

                            @media #{$bp-md}{
                                width: 40px;
                                height: 40px;
                                margin: 0 10px;
                            }

                            &.star {
                                background-color: #F2C94C;

                                svg {
                                    color: white;
                                }
                            }

                            svg {
                                color: #828282;
                                font-size: 1rem;

                                @media #{$bp-md}{
                                    font-size: 1.25rem;
                                }
                            }
                        }
                    }

                    .ranked-stats {
                        grid-area: ranked;
                        display: flex;

                        .content-loader {
                            width: 33%;
                            margin-right: 10px;
                        }

                        .content {
                            width: 33%;
                            text-align: center;
                            margin: auto;
                            position: relative;
                            height: 100%;

                            .unranked {
                                .text {
                                    .rank {
                                        color: $palette-primary;
                                    }

                                    @media #{$bp-md}{
                                        margin-left: 10px;
                                    }
                                }
                            }

                            .ranked-stat, .unranked {
                                display: flex;
                                align-content: center;
                                flex-direction: column;

                                @media #{$bp-md}{
                                    width: 300px;
                                    flex-direction: row;
                                    margin-right: 10px;
                                    text-align: left;
                                }

                                .medal {
                                    width: 50%;
                                    height: 100%;
                                    display: flex;
                                    align-items: center;
                                    margin: auto;

                                    @media #{$bp-md}{
                                        margin: 0 5px;
                                        width: 25%;
                                    }
                                }

                                .text {
                                    padding: 5px 0;
                                    display: flex;
                                    justify-content: center;
                                    flex-direction: column;

                                    .faded {
                                        color: grey;
                                        font-weight: normal;
                                    }

                                    .rank {
                                        color: $palette-accent;
                                        font-weight: bold;
                                        font-size: 1rem;

                                        @media #{$bp-md}{
                                            font-size: 1.5em;
                                        }
                                    }

                                    .winrate {
                                        span {
                                            font-weight: normal;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    #summoner-menu {
                        grid-area: menu;
                        border-radius: 20px;
                        width: 100%;
                        position: relative;
                        display: flex;
                        text-align: center;
                        justify-content: space-evenly;

                        @media #{$bp-md}{
                            justify-content: flex-start;
                        }

                        a {

                            @media #{$bp-md}{
                                margin-right: 20px;
                            }

                            &.router-link-exact-active {
                                li {
                                    opacity: 1;
                                    border-bottom: 2px solid $palette-accent;
                                    font-weight: bold
                                }
                            }

                            li {
                                align-items: center;
                                justify-content: center;
                                font-size: 1rem;
                                opacity: 0.6;
                                cursor: pointer;
                                transition: all 0.25s ease;
                                border-bottom: 2px solid transparent;
                                height: 100%;
                                width: 100%;
                                display: flex;
                                padding: 10px;

                                @media #{$bp-md}{
                                    font-size: 1.5rem;
                                }
                            }
                        }
                    }
                }

                #summoner-content-wrapper {
                    background-color: #F6F7FB;
                    border-top: 3px solid #f4f4f4;
                    min-height: calc(100vh - 315px);
                    padding: 20px;
                    transition: all 0.5s ease;

                    @media #{$bp-md}{
                        padding: 20px 0;
                    }
                }

                footer {
                    height: 100px;
                    background-color: #F6F7FB;
                    border-top: 3px solid #f4f4f4;
                    display: flex;
                    flex-direction: row-reverse;
                    padding: 20px;
                    align-items: center;

                    .teis-logo {
                        width: 100px;
                        display: flex;
                        align-items: center;
                        padding: 10px;
                    }
                }
            }
        }

        &.dark {
            #summonerProfile {
                color: white;

                .page-content {
                    background-color: $palette-dark-primary;

                    .top-wrapper {
                        background-color: $palette-dark-primary;

                        .avatar-wrapper {
                            .avatar {
                                .level {
                                    background-color: $palette-dark-primary;
                                }
                            }
                        }

                        .title {
                            .summonerName {
                                color: white;
                            }
                        }


                        .ranked-stats {
                            .ranked-stat, .unranked {
                                .text {
                                    .faded {
                                        color: grey;
                                    }

                                    .rank {
                                        color: $palette-accent;
                                    }
                                }
                            }

                            .unranked {
                                .text {
                                    .rank {
                                        color: white;
                                    }
                                }
                            }
                        }
                    }

                    #summoner-content-wrapper {
                        background-color: $palette-dark-secondary;
                        border-top: 3px solid $palette-dark-border;
                    }

                    footer {
                        background-color: $palette-dark-secondary;
                        border-top: 3px solid $palette-dark-border;
                    }
                }
            }
        }
    }
</style>