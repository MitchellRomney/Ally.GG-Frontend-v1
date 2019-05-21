<template>
    <div id="content-matches">
        <h1>Matches</h1>
        <transition name="fade">
            <div class="loading" v-if="matchLoading">
                <pulse-loader class="match_loader"></pulse-loader>
                {{ matchesRemaining }} matches remaining...
            </div>
            <div class="latest-matches" v-else v-cloak>
                <div class="match"
                     :class="{ win : player.win == 'W' }"
                     :id="'match-' + player.match.gameId"
                     :key="player.match.gameId"
                     v-for="player in matches.slice(0,10)">
                    <div class="champion-splash"
                         :style="{ 'background-image': 'url(' + getChampionSplashUrl(player.champion) + ')' }">
                        <div class="triangle"></div>
                        <div class="result-wrapper">
                            <span class="result">{{ player.win }}</span>
                        </div>
                    </div>
                    <div class="main-info">
                        <span class="champion">{{ player.champion.name }}</span>
                        <span class="duration">{{ player.match.gameDurationTime }}</span>
                        <span class="timeAgo">{{ player.match.timeago }}</span>
                        <span class="queue">{{ player.match.queue }}</span>
                    </div>
                    <div class="player-info">
                        <span class="level">Level {{ player.champLevel }}</span>
                        <span class="kda">{{ player.kills }}/{{ player.deaths }}/{{ player.assists }}</span>
                        <span class="average">{{ player.kda_average }} KDA</span>
                    </div>
                    <div class="sub-info">
                        <span class="farm">{{ player.totalMinionsKilled }} ({{ player.csPmin }}) CS</span>
                        <span class="kill_p">Kill Participation<br><span>{{ player.killParticipation }}</span></span>
                    </div>
                    <div class="items">
                        <div class="trinket" data-tippy-content="hello">
                            <img v-if="player.item6.itemId != 0"
                                 :src="getItemUrl(player.item6.itemId)"
                                 :alt="player.item6.name">
                        </div>
                        <div class="item-1">
                            <img v-if="player.item0.itemId != 0"
                                 :src="getItemUrl(player.item0.itemId)"
                                 :alt="player.item0.name"/>
                        </div>
                        <div class="item-2">
                            <img v-if="player.item1.itemId != 0"
                                 :src="getItemUrl(player.item1.itemId)"
                                 :alt="player.item1.name"/>
                        </div>
                        <div class="item-3">
                            <img v-if="player.item2.itemId != 0"
                                 :src="getItemUrl(player.item2.itemId)"
                                 :alt="player.item2.name"/>
                        </div>
                        <div class="item-4">
                            <img v-if="player.item3.itemId != 0"
                                 :src="getItemUrl(player.item3.itemId)"
                                 :alt="player.item3.name"/>
                        </div>
                        <div class="item-5">
                            <img v-if="player.item4.itemId != 0"
                                 :src="getItemUrl(player.item4.itemId)"
                                 :alt="player.item4.name"/>
                        </div>
                        <div class="item-6">
                            <img v-if="player.item5.itemId != 0"
                                 :src="getItemUrl(player.item5.itemId)"
                                 :alt="player.item5.name"/>
                        </div>
                        <div class="summoner-1">
                            <img :src="getSSpellUrl(player.spell1Id)"
                                 :alt="player.spell1Id.name"/>
                        </div>
                        <div class="summoner-2">
                            <img :src="getSSpellUrl(player.spell2Id)"
                                 :alt="player.spell2Id.name"/>
                        </div>
                        <div class="rune-primary">
                            <img :src="getPrimaryRuneUrl(player.perk0)"
                                 :alt="player.perk0.name"/>
                        </div>
                        <div class="rune-secondary">
                            <img :src="getSecondaryStyleUrl(player.perkSubStyle)"
                                 :alt="player.perk4.name"/>
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
        name: 'matches',
        title: 'Matches - Ally.GG',
        components: {
            PulseLoader
        },
        props: {
            summoner: Object,
            matches: Array,
            matchLoading: Boolean,
            matchesRemaining: Number,
        },
        methods: {
            getMedalUrl(tier, rank) {
                return require('../../assets/images/ranked_medals/' + tier.toLowerCase() + '_' + rank + '.png');
            },
            getChampionSplashUrl(champion) {
                try {
                    return require('../../assets/images/history_splash/' + champion.champId + '_0.png');
                } catch {
                    return null;
                }
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
            }
        },
        mounted() {
        }
    }
</script>

<style scoped lang="scss">
    #content-matches {

        .latest-matches {
            height: 100%;
            display: grid;
            grid-template: 125px / 1fr;
            grid-auto-rows: 125px;
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
</style>