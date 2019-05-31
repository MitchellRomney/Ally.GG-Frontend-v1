<template>
    <div id="recent-matches">
        <div class="header">
            <h2>Recent Matches</h2>
        </div>
        <transition name="fade">
            <div class="loading" v-if="matchLoading">
                <pulse-loader class="match_loader" :color="'#FF0081'"></pulse-loader>
                {{ matchesRemaining }} matches remaining...
            </div>
            <div class="match-carousel" v-else v-cloak>
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
                                {{ player.summoner.summonerName }}
                            </div>
                        </div>
                        <div class="red-team">
                            <div class="player" v-for="player in match.match.players" v-if="player.team.teamId === 200">
                                {{ player.summoner.summonerName }}
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

    export default {
        name: 'general',
        title: 'General - Ally.GG',
        components: {
            PulseLoader,
        },
        props: {
            summoner: Object,
            matches: Array,
            matchLoading: Boolean,
            matchesRemaining: Number,
        },
        data() {
            return {
                matchIndex: 0
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
                if (champion.champId === 'Fiddlesticks') {
                    return require('../../assets/images/champion-loading/FiddleSticks_0.jpg');
                } else {
                    return require('../../assets/images/champion-loading/' + champion.champId + '_0.jpg');
                }
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
    #recent-matches {
        grid-area: matches;
        background-color: white;
        border: 3px solid #f4f4f4;
        border-radius: 20px;
        position: relative;
        display: flex;
        flex-direction: column;

        .header {
            padding: 20px 20px 0 20px;
        }

        .match_loader {
            height: 100%;
            background-color: transparent;
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
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
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
                    }

                    .vs {
                        display: flex;
                        padding: 10px;
                        align-items: center;

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
</style>