<template>
    <div id="summonerProfile">
        <transition name="fade">
            <pulse-loader v-if="loading"></pulse-loader>
            <div class="content" v-else v-cloak>
                <div class="top-wrapper">
                    <div class="avatar-wrapper">
                        <div class="avatar">
                            <img class="resp-img"
                                 :src="'http://ddragon.leagueoflegends.com/cdn/9.9.1/img/profileicon/' + summoner.profileIconId + '.png'">
                            <span class="level">{{ summoner.summonerLevel }}</span>
                        </div>
                        <span class="updated">Last Updated: <span>{{ summoner.lastUpdated }}</span></span>
                        <button v-on:click="updateSummoner">Update Summoner</button>
                    </div>
                    <div class="title">
                        <h1 class="summonerName" :style="'font-size: ' + nameFontSize">{{ summoner.summonerName }}</h1>
                        <span class="updated">Last Updated: <span>{{ summoner.last_updated }}</span></span>
                        <button v-on:click="updateSummoner">Update Summoner</button>
                    </div>
                    <div class="ranked-stats">
                        <div class="ranked-solo" v-if="summoner.rankedSolo" v-cloak>
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
                        <div class="ranked-solo" v-if="summoner.rankedFlex3" v-cloak>
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
                        <div class="ranked-solo" v-if="summoner.rankedFlex5" v-cloak>
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
                    <router-view :matches="matches" :summoner="summoner"></router-view>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import axios from 'axios';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
    // import $ from 'jquery';

    let query_getSummonerInfo =
        `
            query SummonerProfile($summonerName: String, $games: Int){
              summoner(summonerName: $summonerName) {
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
              summonerPlayers(summonerName: $summonerName, games: $games){
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
            }
        `;

    function getFontSize(viewport, summonerName) {
        if (viewport >= 768) {
            if (summonerName.length > 14) {
                return '5rem';
            } else if (summonerName.length > 10) {
                return '6rem';
            } else {
                return '7rem';
            }
        } else {
            if (summonerName.length > 14) {
                return '1.5rem';
            } else if (summonerName.length > 10) {
                return '2.5rem';
            } else {
                return '3.5rem';
            }
        }
    }

    export default {
        name: 'summoner_profile',
        title: 'Summoner - Ally.GG',
        components: {
            PulseLoader
        },
        data() {
            return {
                // Summoner Data
                summoner: {},
                matches: [],

                // Misc Data
                nameFontSize: getFontSize(document.documentElement.clientWidth, this.$route.params.summoner),

                // Loading Flags
                loading: true,

                // Error Handling
                isError: false,
                errorMessage: '',
            }
        },
        methods: {
            getSummonerInfo() {
                axios.defaults.xsrfCookieName = 'csrftoken';
                axios.defaults.xsrfHeaderName = 'X-CSRFToken';
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
                    this.loading = false;
                });
            },
            updateSummoner() {

            },
            getMedalUrl(tier, rank) {
                return require('../assets/images/ranked_medals/' + tier.toLowerCase() + '_' + rank + '.png');
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
            padding: 3vw;
            min-height: calc(100vh - 65px);

            .top-wrapper {
                display: grid;
                width: 100%;
                grid-gap: 10px 15px;
                grid-template: 120px 95px 95px / repeat(12, 1fr);
                grid-template-areas: "avatar avatar avatar avatar title title title title title title title title" "ranked ranked ranked ranked ranked ranked ranked ranked ranked ranked ranked ranked" "menu menu menu menu menu menu menu menu menu menu menu menu";
                @media #{$bp-md}{
                    grid-template-areas: "avatar avatar avatar title title title title title title title title title" "avatar avatar avatar ranked ranked ranked ranked ranked ranked ranked ranked ranked" "avatar avatar avatar menu menu menu menu menu menu menu menu menu";
                }

                .avatar-wrapper {
                    grid-area: avatar;
                    padding: 5px 10px;
                    background-color: white;
                    border: 3px solid #f4f4f4;
                    border-radius: 20px;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    @media #{$bp-md}{
                        padding: 10px 20px;
                    }

                    .avatar {
                        position: relative;
                        @media #{$bp-md}{
                            height: 80%;
                        }

                        img {
                            border-radius: 10px;
                        }

                        .level {
                            position: absolute;
                            bottom: -10px;
                            right: 0;
                            padding: 2px 20px;
                            background-color: white;
                            border-top-left-radius: 10px;
                            font-size: 1rem;
                            font-weight: bold;
                            @media #{$bp-md}{
                                font-size: 2rem;
                            }
                        }
                    }

                    button {
                        width: 100%;
                        background-color: $palette-accent;
                        padding: 8px;
                        color: white;
                        font-size: 0.8rem;
                        font-weight: bold;
                        border-radius: 10px;
                        margin-top: 5px;
                        cursor: pointer;
                        display: none;
                        @media #{$bp-md}{
                            display: block;
                        }
                    }

                    .updated {
                        font-size: 0.8rem;
                        opacity: 0.8;
                        margin-top: auto;
                        display: none;
                        @media #{$bp-md}{
                            display: block;
                        }
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
                        font-family: Roboto-Black, sans-serif;
                    }

                    .user {
                        display: flex;
                        margin: 50px 20px 30px;

                        .avatar {
                            margin-right: 10px;
                            width: 50px;

                            img {
                                border-radius: 50%;
                            }
                        }

                        a {
                            margin: auto 0;
                            color: grey;
                        }
                    }

                    button {
                        width: 100%;
                        background-color: $palette-accent;
                        padding: 8px;
                        color: white;
                        font-size: 0.8rem;
                        font-weight: bold;
                        border-radius: 10px;
                        margin-top: 5px;
                        cursor: pointer;
                        @media #{$bp-md}{
                            display: none;
                        }
                    }

                    .updated {
                        font-size: 0.8rem;
                        opacity: 0.8;
                        margin-top: auto;
                        @media #{$bp-md}{
                            display: none;
                        }
                    }
                }

                .ranked-stats {
                    grid-area: ranked;
                    display: flex;

                    .ranked-solo, .ranked-flexSR, .ranked-flexTT {
                        padding: 5px;
                        background-color: white;
                        border: 3px solid #f4f4f4;
                        border-radius: 20px;
                        position: relative;
                        height: 100%;
                        margin-right: 10px;
                        display: flex;
                        min-width: 250px;

                        .medal {
                            width: 25%;
                            height: 100%;
                            display: flex;
                            margin: 0 5px;
                            align-items: center;
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
                            }

                            .winrate {
                                span {
                                    font-weight: normal;
                                }
                            }
                        }
                    }
                }

                #summoner-menu {
                    grid-area: menu;
                    background-color: white;
                    border: 3px solid #f4f4f4;
                    border-radius: 20px;
                    width: 100%;
                    padding: 0;
                    display: grid;
                    grid-template: auto / 1fr 1fr 1fr 1fr;
                    position: relative;

                    li {
                        border-right: 3px solid #f4f4f4;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 1.5rem;
                        opacity: 0.6;
                        cursor: pointer;
                        transition: all 0.25s ease;

                        &.general {
                            font-weight: bold;
                            opacity: 1;
                        }
                    }

                    .selector {
                        width: 25%;
                        position: absolute;
                        bottom: 0;
                        height: 10px;
                        background-color: $palette-accent;
                        border-radius: 0;
                        border-bottom-left-radius: 20px;
                        transition: all 0.25s ease;
                        left: 0;

                        &.s_matches {
                            left: 25%;
                            border-radius: 0;
                        }

                        &.s_champions {
                            left: 50%;
                            border-radius: 0;
                        }

                        &.s_achievements {
                            left: 75%;
                            border-radius: 0;
                            border-bottom-right-radius: 20px;
                        }
                    }

                    &.s_matches {
                        .matches {
                            opacity: 1;
                            font-weight: bold;
                        }

                        .general, .champions, .achievements {
                            opacity: 0.6;
                            font-weight: normal;
                        }
                    }

                    &.s_champions {
                        .champions {
                            opacity: 1;
                            font-weight: bold;
                        }

                        .general, .matches, .achievements {
                            opacity: 0.6;
                            font-weight: normal;
                        }
                    }

                    &.s_achievements {
                        .achievements {
                            opacity: 1;
                            font-weight: bold;
                        }

                        .general, .champions, .matches {
                            opacity: 0.6;
                            font-weight: normal;
                        }
                    }
                }
            }

            #summoner-content-wrapper {
                width: 100%;
                margin-top: 20px;

                .content-general, .content-matches {
                    display: grid;
                    grid-gap: 20px;
                    grid-template: 1fr 1fr / repeat(3, 1fr);
                    min-height: 100vh;
                    grid-template-areas: "matches matches ranked" ". . .";

                    .ranked-panel {
                        grid-area: ranked;
                        background-color: white;
                        border: 3px solid #f4f4f4;
                        border-radius: 20px;
                        padding: 20px;

                        .rank {
                            color: $palette-accent;
                            margin-top: 5px;
                        }

                        .league {
                            text-align: right;
                            color: grey;
                        }

                        .svg-item {
                            width: 100%;
                            height: 36vh;
                            position: relative;
                            display: flex;
                            align-items: center;
                            justify-content: center;

                            .donut-segment {
                                animation: donut-chart-fill 1s reverse ease-in;
                                transform-origin: center;
                                transform: scaleX(-1);
                                stroke-linecap: round;
                            }

                            .donut-ring {
                                stroke: lightgrey;
                            }

                            .inside-svg {
                                position: absolute;
                                top: 25%;
                                text-align: center;

                                .total-LP {
                                    font-size: 2.5rem;
                                    color: $palette-primary;
                                }

                                .win-loss {
                                    color: grey;
                                    font-size: 1rem;
                                    font-weight: normal;
                                }

                                .medal {
                                    width: 7vw;
                                }
                            }
                        }
                    }

                    .latest-matches-panel {
                        grid-area: matches;
                        background-color: white;
                        border: 3px solid #f4f4f4;
                        border-radius: 20px;
                        padding: 20px;
                    }

                    .latest-matches {
                        height: 100%;
                        display: grid;
                        grid-template: 1fr 1fr 1fr / 1fr;
                        grid-gap: 10px;
                        padding: 20px 0;

                        .match {
                            border: 3px solid #f4f4f4;
                            display: grid;
                            grid-template: auto / 2.2fr 1fr 0.8fr 1fr 1.5fr;
                            grid-gap: 5px;
                            overflow: hidden;
                            border-radius: 10px;
                            background-color: white;

                            .champion-splash {
                                overflow: hidden;
                                position: relative;
                                background-position: center;
                                background-size: cover;

                                .triangle {
                                    width: 0;
                                    height: 0;
                                    border-left: 3vw solid transparent;
                                    border-right: 0;
                                    border-top: 7vw solid white;
                                    position: absolute;
                                    right: 0;
                                    top: 0;
                                }

                                .result-wrapper {
                                    position: absolute;
                                    right: 0;
                                    display: flex;
                                    height: 100%;
                                    top: 0;
                                    align-items: center;
                                    font-weight: bold;
                                    width: 30%;

                                    .result {
                                        width: 100%;
                                        background-color: white;
                                        padding: 2px 40px 2px 10px;
                                        text-align: center;
                                        border-radius: 10px;
                                        font-size: 1.8rem;
                                        color: $palette-primary;

                                        &.win {
                                            color: $palette-accent;
                                        }
                                    }
                                }
                            }

                            .main-info {
                                display: flex;
                                text-align: center;
                                flex-direction: column;
                                align-self: center;

                                .champion {
                                    color: $palette-primary;
                                    font-weight: bold;
                                    font-size: 1.2rem;
                                }

                                .timeAgo {
                                    font-size: 0.9rem;
                                    color: grey;
                                }

                                .queue {
                                    font-size: 0.8rem;
                                }
                            }

                            .player-info {
                                display: flex;
                                text-align: center;
                                flex-direction: column;
                                align-self: center;

                                .kda {
                                    color: $palette-primary;
                                    font-weight: bold;
                                    font-size: 1.7rem;
                                }

                                .average {
                                    color: grey;
                                }
                            }

                            .sub-info {
                                display: flex;
                                text-align: center;
                                flex-direction: column;
                                align-self: center;

                                .farm {
                                    font-size: 1.1rem;
                                }

                                .kill_p {
                                    font-size: 0.9rem;

                                    span {
                                        font-size: 1.2rem;
                                        font-weight: bold;
                                    }
                                }
                            }

                            .items {
                                display: grid;
                                grid-template: 1fr 1fr / repeat(6, 1fr);
                                grid-template-areas: "trinket item1 item2 item3 summoner1 rune-primary" "trinket item4 item5 item6 summoner2 rune-secondary";
                                align-items: center;
                                grid-gap: 2px;

                                img {
                                    width: 30px;
                                    border-radius: 5px;
                                }

                                .trinket, .item-1, .item-2, .item-3, .item-4, .item-5, .item-6, .summoner-1, .summoner-2 {
                                    height: 30px;
                                    width: 30px;
                                    background-color: lightgrey;
                                    border-radius: 4px;
                                }

                                .trinket {
                                    grid-area: trinket;
                                    margin-right: 4px;
                                }

                                .item-1 {
                                    grid-area: item1;
                                    align-self: end;
                                }

                                .item-2 {
                                    grid-area: item2;
                                    align-self: end;
                                }

                                .item-3 {
                                    grid-area: item3;
                                    align-self: end;
                                }

                                .item-4 {
                                    grid-area: item4;
                                    align-self: start;
                                }

                                .item-5 {
                                    grid-area: item5;
                                    align-self: start;
                                }

                                .item-6 {
                                    grid-area: item6;
                                    align-self: start;
                                }

                                .summoner-1 {
                                    grid-area: summoner1;
                                    align-self: end;
                                    margin-left: 4px;
                                }

                                .summoner-2 {
                                    grid-area: summoner2;
                                    align-self: start;
                                    margin-left: 4px;

                                }

                                .rune-primary {
                                    grid-area: rune-primary;
                                    align-self: end;
                                    margin: 0 4px;
                                }

                                .rune-secondary {
                                    grid-area: rune-secondary;
                                    align-self: start;
                                    margin: 0 4px;
                                }
                            }
                        }
                    }
                }

                &.general {
                    .content-general {
                        display: grid;
                    }

                    .content-matches, .content-champions, .content-achievements {
                        display: none;
                    }
                }

                &.matches {
                    .content-matches {
                        display: block;
                    }

                    .content-general, .content-champions, .content-achievements {
                        display: none;
                    }
                }

                &.champions {
                    .content-champions {
                        display: block;
                    }

                    .content-matches, .content-general, .content-achievements {
                        display: none;
                    }
                }

                &.achievements {
                    .content-achievements {
                        display: block;
                    }

                    .content-matches, .content-champions, .content-general {
                        display: none;
                    }
                }
            }
        }
    }
</style>