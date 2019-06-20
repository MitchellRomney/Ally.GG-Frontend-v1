<template>
    <div id="summonerProfile" v-images-loaded:on.done="isImagesLoaded">
        <transition name="fade">
            <logo-bounce v-if="!load_page"></logo-bounce>
        </transition>
        <div class="content" :class="{ loaded : load_page }">
            <div class="top-wrapper container">
                <div class="avatar-wrapper">
                    <div class="avatar">
                        <img class="resp-img" v-if="summoner.profileIconId"
                             :src="'https://ddragon.leagueoflegends.com/cdn/9.10.1/img/profileicon/' + summoner.profileIconId + '.png'">
                        <span class="level">{{ summoner.summonerLevel }}</span>
                    </div>
                </div>
                <div class="update">
                    <span class="last-updated">Last Updated: <span>{{ summoner.lastUpdated }}</span></span>
                    <button v-on:click="updateSummoner">Update Summoner</button>
                </div>
                <div class="title">
                    <h1 class="summonerName" :style="'font-size: ' + nameFontSize">{{ summoner.summonerName }}</h1>
                    <div class="badges" v-if="summoner.userProfile">
                        <div class="badge verified" v-if="summoner.userProfile !== null">
                            <img class="resp-img" src="../assets/images/badges/verified.png" alt="Verified"/>
                        </div>
                        <div class="badge premium" v-if="summoner.userProfile.premium">
                            <img class="resp-img" src="../assets/images/badges/premium.png" alt="Premium"/>
                        </div>
                    </div>
                </div>
                <div class="options">
                    <a href="#">
                        <font-awesome-icon icon="ellipsis-h"/>
                    </a>
                    <a href="#" class="star">
                        <font-awesome-icon icon="star"/>
                    </a>
                </div>
                <div class="ranked-stats">
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
                    <router-link to="achievements">
                        <li class="achievements">Achievements</li>
                    </router-link>
                    <span class="selector"></span>
                </ul>
            </div>
            <div id="summoner-content-wrapper">
                <router-view :matches="sortedMatches" :summoner="summoner"
                             :matchLoading="loading_matches" :matchesRemaining="remaining_matches"></router-view>
            </div>
            <footer>
                Footer
            </footer>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
    import imagesLoaded from 'vue-images-loaded'

    let query_getSummonerInfo =
        `query SummonerProfile($summonerName: String, $games: Int) {
          summoner(summonerName: $summonerName) {
            summonerId
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
          summonerPlayers(summonerName: $summonerName, games: $games) {
            match {
              gameId
              queue
              gameDurationTime
              timeago
              timestamp
              players {
                participantId
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
        `mutation updateSummoner($summonerId: String!){
          updateSummoner(summonerId: $summonerId){
            newMatches
          }
        }`;

    export default {
        name: 'summoner_profile',
        directives: {
            imagesLoaded
        },
        components: {
            PulseLoader
        },
        data() {
            return {
                // Summoner Data
                summoner: {},
                matches: [],

                // Misc Data
                remaining_matches: 0,

                // Loading Flags]
                imagesLoaded: false,
                summonerLoaded: false,

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
                    this.getSummonerInfo();
                    this.webSocketManager();
                }
            }
        },
        computed: {
            sortedMatches() {
                return this.matches.sort(function (a, b) {
                    let x = a['match']['timestamp'];
                    let y = b['match']['timestamp'];
                    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                });
            },
            loading_matches() {
                return this.remaining_matches !== 0;
            },
            load_page() {
                return this.imagesLoaded && this.summonerLoaded;
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
                        return '30px';
                    } else if (summonerName.length > 10) {
                        return '40px';
                    } else {
                        return '50px';
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
                            games: 10
                        },
                    }
                }).then((summonerProfileInfo) => {
                    this.summoner = summonerProfileInfo.data.data.summoner;
                    this.matches = summonerProfileInfo.data.data.summonerPlayers;
                    this.webSocketManager();
                    this.summonerLoaded = true;
                });
            },
            updateSummoner() {
                /**
                 * @param data.newMatches   List of new matches not yet in the database.
                 */
                this.summonerLoaded = false;

                axios({
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    method: 'post',
                    data: {
                        query: mutation_updateSummoner,
                        variables: {
                            summonerId: this.summoner.summonerId,
                        },
                    }
                }).then((response) => {
                    // Store the data in an easier to use variable.
                    let data = response.data.data.updateSummoner;
                    console.log(data);

                    this.remaining_matches = data.newMatches;
                })
            },
            getMedalUrl(tier, rank) {
                return require('../assets/images/ranked_medals/' + tier.toLowerCase() + '_' + rank + '.png');
            },
            isImagesLoaded() {
                this.imagesLoaded = true;
            },
            webSocketManager() {
                this.$disconnect();
                if (this.$options.sockets.onmessage) {
                    delete this.$options.sockets.onmessage;
                }

                this.$connect(
                    process.env.VUE_APP_WS_URL + '/summoner/' + this.summoner.summonerId, {
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
                            let player = JSON.parse(data.data.match).player;

                            console.log(data.message);

                            // Add new match to match list.
                            this.matches.push(player);

                            // Decrease the remaining matches count by 1.
                            this.remaining_matches += -1;

                            // Else if data is new Summoner data..
                        } else if ('summoner' in data.data) {

                            // Store the new Summoner information.
                            this.summoner = JSON.parse(data.data.summoner).summoner;

                            // Declare the Summoner as loaded.
                            this.summonerLoaded = true;

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
        }
    }
</script>

<style scoped lang="scss">

    #summonerProfile {
        width: 100%;
        position: relative;

        .content {
            height: calc(100vh - 65px);
            overflow: hidden;

            &.loaded {
                height: 100%;
            }

            .top-wrapper {
                margin-top: 10px;
                display: grid;
                background-color: white;
                width: 100%;
                grid-gap: 15px;
                grid-template: auto / repeat(4, 1fr);
                grid-template-areas: "avatar title title title" "ranked ranked ranked ranked" "update update update options" "menu menu menu menu";
                padding: 0 20px;

                @media #{$bp-md}{
                    grid-template: 100px 90px 60px / 100px repeat(11, 1fr);
                    grid-template-areas: "avatar title title title title title title title title title options options" "update ranked ranked ranked ranked ranked ranked ranked ranked ranked ranked ranked" "menu menu menu menu menu menu menu menu menu menu menu menu";
                }

                .avatar-wrapper {
                    grid-area: avatar;
                    border-radius: 20px;
                    text-align: center;
                    display: flex;
                    flex-direction: column;

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

                    .summonerName {
                        font-family: 'Panton Black', sans-serif;
                        margin-bottom: -20px;
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
                    align-items: center;
                    justify-content: center;

                    @media #{$bp-md}{
                        flex-direction: row-reverse;
                    }

                    a {
                        width: 40px;
                        height: 40px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: #DFE3E8;
                        border-radius: 50%;
                        margin: 0 10px;

                        &.star {
                            background-color: #F2C94C;

                            svg {
                                color: white;
                            }
                        }

                        svg {
                            color: #828282;
                            font-size: 1.25rem;
                        }
                    }
                }

                .ranked-stats {
                    grid-area: ranked;
                    display: flex;

                    .unranked {
                        .text {
                            @media #{$bp-md}{
                                margin-left: 10px;
                            }
                        }
                    }

                    .ranked-stat, .unranked {
                        position: relative;
                        height: 100%;
                        display: flex;
                        width: 33%;
                        flex-direction: column;
                        align-content: center;
                        text-align: center;
                        margin: auto;

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

                    .unranked {
                        .text {
                            .rank {
                                color: $palette-primary;
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
                    overflow-x: scroll;

                    a {
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
                            margin: 0 10px;

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
            }
        }
    }
</style>