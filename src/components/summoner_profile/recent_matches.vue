<template>
    <div id="recent-matches">
        <div class="match-progress" :class="{ loading: matchLoadingPercentage !== '0' }"
             :style="{ 'right': matchLoadingPercentage + '%' }"></div>
        <div class="header">
            <h2>Recent Matches</h2>
            <div class="remaining" v-if="matchesRemaining >  0">
                Loading {{ matchesRemaining }} new matches...
            </div>
        </div>
        <transition name="fade" mode="out-in">
            <PulseLoader v-if="matchLoading" :color="'#FF0081'" key="1"></PulseLoader>
            <div class="match-carousel" v-else v-cloak key="2">
                <div class="previous-button" @click="prevMatchIndex()" :class="{ disabled : matchIndex === 0 }">
                    <font-awesome-icon icon="arrow-left"/>
                </div>
                <div class="next-button" @click="nextMatchIndex()"
                     :class="{ disabled : matchIndex === matches.length - 1 }">
                    <font-awesome-icon icon="arrow-right"/>
                </div>
                <div class="match" v-for="(match, index) in matches"
                     :class="{
                        subPreviousMatch : index === matchIndex - 2,
                        previousMatch : index === matchIndex - 1,
                        focusedMatch : index === matchIndex,
                        nextMatch : index === matchIndex + 1,
                        subNextMatch : index === matchIndex + 2
                     }">
                    <div class="splash-wrapper">
                        <div class="splash"
                             :style="{ 'background-image': 'url(' + getChampionSplashUrl(match.champion) + ')' }">
                        </div>
                    </div>
                    <div class="head">
                        <h3 class="champion">{{ match.champion.name }}</h3>
                        <div class="vs" v-if="match.laneOpponent">
                            vs.
                            <img class="resp-img" v-for="opponent in match.laneOpponent"
                                 :src="getChampionTileUrl(opponent.champion)"
                                 :alt="opponent.champion.name"/>
                        </div>
                        <div class="result">
                            <h3 class="win" v-if="match.win">Win</h3>
                            <h3 class="loss" v-if="!match.win">Loss</h3>
                            <h4 class="time">{{ match.match.gameDurationTime }}</h4>
                        </div>
                        <div class="match-info">
                            <img v-if="match.lane !== 'NONE'" class="resp-img role" :src="getRoleIconUrl(match.lane)"
                                 :alt="match.lane"/>
                            <div class="info">
                                <span class="queue">{{ match.match.queue }}</span>
                                <span class="timeago">{{ match.match.timeago }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="stats">
                        <div class="items">
                            <div class="trinket">
                                <img v-if="match.item6.itemId !== 0"
                                     :src="getItemUrl(match.item6.itemId)"
                                     :alt="match.item6.name">
                            </div>
                            <div class="item-1">
                                <img v-if="match.item0.itemId !== 0"
                                     :src="getItemUrl(match.item0.itemId)"
                                     :alt="match.item0.name"/>
                            </div>
                            <div class="item-2">
                                <img v-if="match.item1.itemId !== 0"
                                     :src="getItemUrl(match.item1.itemId)"
                                     :alt="match.item1.name"/>
                            </div>
                            <div class="item-3">
                                <img v-if="match.item2.itemId !== 0"
                                     :src="getItemUrl(match.item2.itemId)"
                                     :alt="match.item2.name"/>
                            </div>
                            <div class="item-4">
                                <img v-if="match.item3.itemId !== 0"
                                     :src="getItemUrl(match.item3.itemId)"
                                     :alt="match.item3.name"/>
                            </div>
                            <div class="item-5">
                                <img v-if="match.item4.itemId !== 0"
                                     :src="getItemUrl(match.item4.itemId)"
                                     :alt="match.item4.name"/>
                            </div>
                            <div class="item-6">
                                <img v-if="match.item5.itemId !== 0"
                                     :src="getItemUrl(match.item5.itemId)"
                                     :alt="match.item5.name"/>
                            </div>
                            <div class="summoner-1">
                                <img :src="getSSpellUrl(match.spell1Id)"
                                     :alt="match.spell1Id.name"/>
                            </div>
                            <div class="summoner-2">
                                <img :src="getSSpellUrl(match.spell2Id)"
                                     :alt="match.spell2Id.name"/>
                            </div>
                            <div class="rune-primary">
                                <img :src="getPrimaryRuneUrl(match.perk0)"
                                     :alt="match.perk0.name"/>
                            </div>
                            <div class="rune-secondary">
                                <img :src="getSecondaryStyleUrl(match.perkSubStyle)"
                                     :alt="match.perk4.name"/>
                            </div>
                        </div>
                        <div class="player-info">
                            <span class="level">Level {{ match.champLevel }}</span>
                            <span class="kda">{{ match.kills }}/{{ match.deaths }}/{{ match.assists }}</span>
                            <span class="average">{{ match.kdaAverage }} KDA</span>
                        </div>
                        <div class="sub-info">
                            <span class="farm">{{ match.totalMinionsKilled }} ({{ match.csPmin }}) CS</span>
                            <span class="kill_p">Kill Participation<br><span>{{ match.killParticipation }}</span></span>
                        </div>
                    </div>
                    <div class="players">
                        <div class="blue-team">
                            <div class="player" v-for="player in match.match.players" v-if="player.team.teamId === 100">
                                <div v-if="player.summoner.summonerName">
                                    <router-link
                                            :to="{ name: 'summoner_profile', params: { summoner: player.summoner.summonerName }}">
                                        {{ player.summoner.summonerName }}
                                    </router-link>
                                </div>
                                <div v-else v-cloak>
                                    <router-link
                                            :to="{ name: 'champion_profile', params: { champion: player.summoner.champion.champId }}">
                                        {{ player.summoner.champion.name }}
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <div class="red-team">
                            <div class="player" v-for="player in match.match.players" v-if="player.team.teamId === 200">
                                <div v-if="player.summoner">
                                    <router-link
                                            :to="{ name: 'summoner_profile', params: { summoner: player.summoner.summonerName }}">
                                        {{ player.summoner.summonerName }}
                                    </router-link>
                                </div>
                                <div v-else v-cloak>
                                    <router-link
                                            :to="{ name: 'champion_profile', params: { champion: player.champion.champId }}">
                                        {{ player.champion.name }}
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
    import {ContentLoader} from 'vue-content-loader';


    export default {
        name: 'general',
        title: 'General - Ally.GG',
        components: {
            PulseLoader,
            ContentLoader,
        },
        props: {
            summoner: Object,
            matches: Array,
            matchLoading: Boolean,
            matchesRemaining: Number,
            newMatches: Number,
        },
        data() {
            return {
                matchIndex: 0
            }
        },
        watch: {
            $route(before, after) {
                // Check if they've loaded a new Summoner.
                if (before.params.summoner !== after.params.summoner) {
                    this.matchIndex = 0;
                }
            },
        },
        computed: {
            matchLoadingPercentage() {
                if (this.matchesRemaining > 0) {
                    let matchesLoaded = this.newMatches - this.matchesRemaining;
                    console.log(matchesLoaded.toString() + ' matches loaded.');
                    return (100 - ((matchesLoaded / this.newMatches) * 100)).toString()
                } else return '0'
            }
        },
        methods: {
            prevMatchIndex() {
                if (this.matchIndex > 0) {
                    this.matchIndex += -1;
                }
            },
            nextMatchIndex() {
                if (this.matchIndex < this.matches.length - 1) {
                    this.matchIndex += 1;
                }
            },
            getChampionSplashUrl(champion) {
                return require('../../assets/images/champion-loading/' + champion.champId + '_0.jpg');
            },
            getChampionTileUrl(champion) {
                return require('../../assets/images/champion-tiles/' + champion.champId + '_0.jpg');
            },
            getItemUrl(itemId) {
                return require('../../assets/images/items/' + itemId + '.png');
            },
            getSSpellUrl(spellId) {
                return require('../../assets/images/spells/' + spellId.imageFull);
            },
            getPrimaryRuneUrl(perk) {
                return require('../../assets/images/' + perk.icon);
            },
            getSecondaryStyleUrl(style) {
                return require('../../assets/images/perk-images/Styles/' + style + '.png');
            },
            getRoleIconUrl(role) {
                return require('../../assets/images/lanes/' + role.toLowerCase() + '_icon.png');
            }
        }
    }
</script>

<style scoped lang="scss">
    #ally-gg {
        #recent-matches {
            grid-column-end: span 3;
            background-color: white;
            border: 3px solid #f4f4f4;
            border-radius: 20px;
            position: relative;
            display: flex;
            flex-direction: column;
            color: $palette-primary;
            transition: all 0.5s ease;

            @media #{$bp-md}{
                grid-column-end: span 2;
            }

            .match-progress {
                position: absolute;
                height: 100%;
                opacity: 0;
                top: 0;
                left: 0;
                transition: all 0.5s ease;
                border-radius: 20px;
                background-image: repeating-linear-gradient(
                                -45deg,
                                transparent,
                                transparent 1rem,
                                $palette-dark-border 1rem,
                                $palette-dark-border 2rem
                );
                background-size: 200% 200%;
                animation: barberpole 10s linear infinite;

                &.loading {
                    opacity: 0.8;
                }
            }

            .header {
                padding: 20px 20px 0 20px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-content: center;
                z-index: 50
            }

            .match_loader {
                height: 100%;
                background-color: transparent;
            }

            .v-spinner {
                height: 100%;
                border-radius: 20px;
            }

            .match-carousel {
                position: relative;
                height: 100%;
                padding: 10px 0;
                overflow: hidden;

                .previous-button, .next-button {
                    height: 50px;
                    width: 50px;
                    position: absolute;
                    cursor: pointer;
                    background-color: $palette-accent;
                    top: 45%;
                    border-radius: 50%;
                    display: flex;
                    z-index: 100;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 1.5rem;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

                    &.disabled {
                        background-color: grey;
                        cursor: pointer;
                    }
                }

                .previous-button {
                    left: 5%;
                }

                .next-button {
                    right: 5%;
                }

                .match {
                    background-color: white;
                    overflow: hidden;
                    border: 3px solid #f4f4f4;
                    border-radius: 20px;
                    display: none;
                    top: 5%;
                    bottom: 5%;
                    transition: all 0.5s ease;
                    position: absolute;
                    width: 75%;
                    box-shadow: $shadow;
                    grid-template: 60px 1fr 2fr / 1fr 4fr;
                    grid-template-areas: 'splash head' 'splash stats' 'splash players';

                    &.subPreviousMatch {
                        display: grid;
                        left: -100%;
                        right: 25%;
                        transform: scale(0.5, 0.5);
                    }

                    &.previousMatch {
                        display: grid;
                        left: -50%;
                        right: 75%;
                        transform: scale(0.5, 0.5);
                    }

                    &.focusedMatch {
                        display: grid;
                        left: 12.5%;
                        right: 12.5%;
                    }

                    &.nextMatch {
                        display: grid;
                        right: -50%;
                        left: 75%;
                        transform: scale(0.5, 0.5);
                    }

                    &.subNextMatch {
                        display: block;
                        left: 125%;
                        right: -100%;
                        transform: scale(0.5, 0.5);
                    }

                    .splash-wrapper {
                        grid-area: splash;
                        border-right: 3px solid #f4f4f4;
                        overflow: hidden;
                        transition: border 0.5s ease;

                        .splash {
                            background-position: center;
                            background-size: cover;
                            transform: scale(1.1, 1.1);
                            height: 100%;
                        }
                    }

                    .head {
                        grid-area: head;
                        padding: 0 10px;
                        display: flex;
                        align-items: center;

                        .champion {
                            font-family: 'Panton Black', sans-serif;
                            font-size: 2.5rem;
                            height: 50px;
                            color: $palette-primary;
                        }

                        .vs {
                            display: flex;
                            padding: 10px;
                            align-items: center;
                            color: $palette-primary;

                            img {
                                width: 35px;
                                height: 35px;
                                border-radius: 10px;
                                margin-left: 10px;
                            }
                        }

                        .result {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            margin: 0 10px;
                            color: $palette-primary;

                            .win {
                                color: #2D9CDB;
                                font-weight: bold;
                            }

                            .loss {
                                color: #EB5757;
                                font-weight: bold;
                            }

                            .time {
                                font-weight: normal;
                            }
                        }

                        .match-info {
                            margin-left: auto;
                            display: flex;
                            flex-direction: row-reverse;
                            align-items: center;
                            font-size: 0.8rem;
                            opacity: 0.6;
                            color: $palette-primary;

                            .role {
                                height: 40px;
                            }

                            .info {
                                display: flex;
                                flex-direction: column;
                                text-align: right;

                                .queue {
                                    font-weight: bold;
                                }
                            }
                        }
                    }

                    .stats {
                        grid-area: stats;
                        padding: 10px;
                        display: grid;
                        grid-template: 1fr / 1fr 1fr 1fr;
                        border-bottom: 1px solid #f4f4f4;
                        transition: border 0.5s ease;
                        color: $palette-primary;

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
                                transition: background-color 0.5s ease;
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
                    }

                    .players {
                        grid-area: players;
                        padding: 10px;
                        display: grid;
                        grid-template: auto / 1fr 1fr;
                        grid-gap: 20px;

                        .blue-team, .red-team {
                            display: flex;
                            flex-wrap: wrap;
                            align-content: space-around;

                            .player {
                                width: 100%;
                            }
                        }

                        .blue-team {
                            text-align: right;
                        }
                    }
                }
            }
        }

        &.dark {
            #recent-matches {
                background-color: $palette-dark-primary;
                border: 3px solid $palette-dark-border;
                color: white;

                .v-spinner {
                    background-color: $palette-dark-primary;
                }

                .match-carousel {
                    .match {
                        background-color: $palette-dark-primary;
                        border: 3px solid $palette-dark-border;
                        box-shadow: $dark-shadow;

                        .splash-wrapper {
                            border-right: 3px solid $palette-dark-border;
                        }

                        .head {
                            .champion, .match-info, .result, .vs {
                                color: white;
                            }
                        }

                        .stats {
                            border-bottom: 1px solid $palette-dark-border;
                            color: white;

                            .items {
                                .trinket, .item-1, .item-2, .item-3, .item-4, .item-5, .item-6, .summoner-1, .summoner-2 {
                                    background-color: $palette-dark-border;
                                }
                            }

                            .player-info {
                                .kda {
                                    color: white;
                                }

                                .average {
                                    color: grey;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>