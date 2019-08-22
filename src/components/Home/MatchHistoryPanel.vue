<template>
    <div id="MatchHistoryPanel">
        <h2 class="panel-header">Match History</h2>
        <div class="panel-wrapper">
            <div class="filter">
                Filter
            </div>
            <div class="grid-headers">
                <span>Champion</span>
                <span>Time</span>
                <span>Queue</span>
                <span>Result</span>
                <span>KDA (Ratio)</span>
                <span>CS (pMin)</span>
                <span>Build</span>
            </div>
            <div class="match" v-for="match in matches.slice(0, 10)" :key="match.match.gameId">
                <div class="champion-icon">
                    <div class="icon-wrapper" :title="match.champion.name" v-tippy>
                        <img class="resp-img" :src="getChampionTileUrl(match.champion)" :alt="match.champion.name"/>
                    </div>
                </div>
                <div class="time">
                    <span class="duration">{{ match.match.gameDurationTime }}</span>
                    <span>{{ match.match.timeago }}</span>
                </div>
                <div class="queue">
                    {{ match.match.queue }}
                </div>
                <div class="result">
                    <span class="victory" v-if="match.win">Victory</span>
                    <span class="defeat" v-else>Defeat</span>
                </div>
                <div class="kda" :class="{ legendary : match.kdaAverage > 4.00 }">
                    {{ match.kills }}/{{ match.deaths }}/{{ match.assists }} ({{ match.kdaAverage }})
                </div>
                <div class="cs10">
                    {{ match.totalMinionsKilled + match.neutralMinionsKilled }} ({{ match.csPmin }})
                </div>
                <div class="build">
                    <div class="items">
                        <div class="trinket" :title="match.item6.name" v-tippy>
                            <img v-if="match.item6.itemId !== 0"
                                 class="resp-img"
                                 :src="getItemUrl(match.item6.itemId)"
                                 :alt="match.item6.name">
                        </div>
                        <div class="item-1" :title="match.item0.name" v-tippy>
                            <img v-if="match.item0.itemId !== 0"
                                 class="resp-img"
                                 :src="getItemUrl(match.item0.itemId)"
                                 :alt="match.item0.name"/>
                        </div>
                        <div class="item-2" :title="match.item1.name" v-tippy>
                            <img v-if="match.item1.itemId !== 0"
                                 class="resp-img"
                                 :src="getItemUrl(match.item1.itemId)"
                                 :alt="match.item1.name"/>
                        </div>
                        <div class="item-3" :title="match.item2.name" v-tippy>
                            <img v-if="match.item2.itemId !== 0"
                                 class="resp-img"
                                 :src="getItemUrl(match.item2.itemId)"
                                 :alt="match.item2.name"/>
                        </div>
                        <div class="item-4" :title="match.item3.name" v-tippy>
                            <img v-if="match.item3.itemId !== 0"
                                 class="resp-img"
                                 :src="getItemUrl(match.item3.itemId)"
                                 :alt="match.item3.name"/>
                        </div>
                        <div class="item-5" :title="match.item4.name" v-tippy>
                            <img v-if="match.item4.itemId !== 0"
                                 class="resp-img"
                                 :src="getItemUrl(match.item4.itemId)"
                                 :alt="match.item4.name"/>
                        </div>
                        <div class="item-6" :title="match.item5.name" v-tippy>
                            <img v-if="match.item5.itemId !== 0"
                                 class="resp-img"
                                 :src="getItemUrl(match.item5.itemId)"
                                 :alt="match.item5.name"/>
                        </div>
                    </div>
                    <div class="spells">
                        <div class="summoner-1" :title="match.spell1Id.name" v-tippy>
                            <img :src="getSSpellUrl(match.spell1Id)"
                                 class="resp-img"
                                 :alt="match.spell1Id.name"/>
                        </div>
                        <div class="summoner-2" :title="match.spell2Id.name" v-tippy>
                            <img :src="getSSpellUrl(match.spell2Id)"
                                 class="resp-img"
                                 :alt="match.spell2Id.name"/>
                        </div>
                    </div>
                    <div class="runes">
                        <div class="rune-primary" :title="match.perk0.name" v-tippy>
                            <img :src="getPrimaryRuneUrl(match.perk0)"
                                 class="resp-img"
                                 :alt="match.perk0.name"/>
                        </div>
                        <div class="rune-secondary" :title="match.perk4.name" v-tippy>
                            <img :src="getSecondaryStyleUrl(match.perkSubStyle)"
                                 class="resp-img"
                                 :alt="match.perk4.name"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pagination">
                1 2 3
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MatchHistoryPanel',
        components: {},
        props: {
            matches: Array,
        },
        data() {
            return {}
        },
        computed: {},
        methods: {
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
        }
    }
</script>

<style scoped lang="scss">
    #MatchHistoryPanel {
        grid-column-end: span 14;
        grid-row-end: span 8;
        display: flex;
        flex-direction: column;

        .panel-header {
            text-shadow: 0 5px 20px rgba(52, 133, 255, 0.075), 0 4px 6px rgba(46, 89, 155, 0.2);
            padding-bottom: 10px;
        }

        .panel-wrapper {
            background-color: white;
            box-shadow: 0 5px 20px rgba(52, 133, 255, 0.15), 0 4px 6px rgba(46, 89, 155, 0.4);
            border-radius: 5px;
            height: 100%;
            width: 100%;
            display: grid;
            grid-template: 0.75fr repeat(11, 1fr) 0.75fr / auto;

            .filter {
                padding: 5px;
                border-bottom: 1px solid $palette-border;
                display: flex;
                align-items: center;
                font-weight: bold;
            }

            .grid-headers {
                display: grid;
                grid-template: auto / repeat(4, 1fr) 1.5fr 1fr 2fr;
                align-items: center;
                justify-items: center;
                padding: 5px;
                border-bottom: 1px solid $palette-border;
                font-weight: bold;
            }

            .match {
                display: grid;
                grid-template: auto / repeat(4, 1fr) 1.5fr 1fr 2fr;
                align-items: center;
                justify-items: center;
                padding: 5px;
                border-bottom: 1px solid $palette-border;
                text-align: center;

                .champion-icon {
                    display: flex;
                    flex-direction: row;
                    height: 100%;

                    .icon-wrapper {
                        border-radius: 50%;
                        overflow: hidden;
                        height: 40px;
                        margin: auto;
                    }
                }

                .time {
                    display: flex;
                    flex-direction: column;

                    .duration {
                        opacity: 0.8;
                    }
                }

                .result {
                    font-weight: bold;

                    .victory {
                        color: $palette-win;
                    }

                    .defeat {
                        color: $palette-loss;
                    }
                }

                .kda {
                    font-weight: bold;

                    &.legendary {
                        background: $AllyPinkPurple;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                    }
                }

                .build {
                    display: flex;

                    .spells, .runes {
                        display: grid;
                        grid-template: 1fr 1fr / auto;
                        grid-gap: 2px;
                    }

                    .items {
                        display: grid;
                        grid-template: 1fr 1fr / repeat(4, 1fr);
                        grid-gap: 2px;
                    }

                    .items, .spells {
                        margin-right: 5px;
                    }

                    .spells, .items, .runes {
                        .trinket {
                            grid-row-end: span 2;
                            align-self: center;
                        }

                        .item-1, .item-2, .item-3, .item-4, .item-5, .item-6, .trinket, .summoner-1, .summoner-2,
                        .rune-primary, .rune-secondary {
                            border-radius: 50%;
                            overflow: hidden;
                            height: 25px;
                            width: 25px;
                        }

                        .item-1, .item-2, .item-3, .item-4, .item-5, .item-6, .trinket {
                            background-color: lightgrey;
                        }
                    }
                }
            }

            .pagination {
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
</style>