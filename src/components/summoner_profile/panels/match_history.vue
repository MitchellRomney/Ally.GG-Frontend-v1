<template>
    <div id="match_history">
        <div class="history-table">
            <div class="head">
                <h2>
                    Match History
                </h2>
            </div>
            <div class="labels">
                <div class="timeago">
                    Time Ago
                </div>
                <div class="champion">
                    Champion
                </div>
                <div class="queue">
                    Queue
                </div>
                <div class="kda">
                    KDA (Avg.)
                </div>
                <div class="cs10">
                    CS
                </div>
                <div class="spells">
                    Spells
                </div>
                <div class="items">
                    Items
                </div>
                <div class="runes">
                    Runes
                </div>
            </div>
            <div class="match" v-for="match in matches.slice(0, 10)" :class="{ win : match.win }">
                <div class="timeago">
                    {{ match.match.timeago }}
                </div>
                <div class="champion-icon">
                    <div class="icon-wrapper">
                        <img class="resp-img" :src="getChampionTileUrl(match.champion)" :alt="match.champion.name"/>
                    </div>
                </div>
                <div class="champion-name">
                    {{ match.champion.name }}
                </div>
                <div class="queue">
                    {{ match.match.queue }}
                </div>
                <div class="kda">
                    {{ match.kills }}/{{ match.deaths }}/{{ match.assists }} ({{ match.kdaAverage }})
                </div>
                <div class="cs10">
                    {{ match.totalMinionsKilled }} ({{ match.csPmin }})
                </div>
                <div class="spells">
                    <div class="summoner-1">
                        <img :src="getSSpellUrl(match.spell1Id)"
                             class="resp-img"
                             :alt="match.spell1Id.name"/>
                    </div>
                    <div class="summoner-2">
                        <img :src="getSSpellUrl(match.spell2Id)"
                             class="resp-img"
                             :alt="match.spell2Id.name"/>
                    </div>
                </div>
                <div class="items">
                    <div class="trinket" :title="match.item6.name" v-tippy>
                        <img v-if="match.item6.itemId !== 0"
                             class="resp-img"
                             :src="getItemUrl(match.item6.itemId)"
                             :alt="match.item6.name">
                    </div>
                    <div class="item-1">
                        <img v-if="match.item0.itemId !== 0"
                             class="resp-img"
                             :src="getItemUrl(match.item0.itemId)"
                             :alt="match.item0.name"/>
                    </div>
                    <div class="item-2">
                        <img v-if="match.item1.itemId !== 0"
                             class="resp-img"
                             :src="getItemUrl(match.item1.itemId)"
                             :alt="match.item1.name"/>
                    </div>
                    <div class="item-3">
                        <img v-if="match.item2.itemId !== 0"
                             class="resp-img"
                             :src="getItemUrl(match.item2.itemId)"
                             :alt="match.item2.name"/>
                    </div>
                    <div class="item-4">
                        <img v-if="match.item3.itemId !== 0"
                             class="resp-img"
                             :src="getItemUrl(match.item3.itemId)"
                             :alt="match.item3.name"/>
                    </div>
                    <div class="item-5">
                        <img v-if="match.item4.itemId !== 0"
                             class="resp-img"
                             :src="getItemUrl(match.item4.itemId)"
                             :alt="match.item4.name"/>
                    </div>
                    <div class="item-6">
                        <img v-if="match.item5.itemId !== 0"
                             class="resp-img"
                             :src="getItemUrl(match.item5.itemId)"
                             :alt="match.item5.name"/>
                    </div>
                </div>
                <div class="runes">
                    <div class="rune-primary">
                        <img :src="getPrimaryRuneUrl(match.perk0)"
                             class="resp-img"
                             :alt="match.perk0.name"/>
                    </div>
                    <div class="rune-secondary">
                        <img :src="getSecondaryStyleUrl(match.perkSubStyle)"
                             class="resp-img"
                             :alt="match.perk4.name"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {ContentLoader} from 'vue-content-loader';

    export default {
        name: 'match_history',
        title: 'Match History - Ally.GG',
        data() {
            return {}
        },
        components: {
            ContentLoader,
        },
        props: {
            summoner: Object,
            matches: Array,
            matchLoading: Boolean,
            matchesRemaining: Number,
            newMatches: Number,
        },
        watch: {
            $route(before, after) {
                // Check if they've loaded a new Summoner.
                if (before.params.summoner !== after.params.summoner) {
                }
            },
        },
        methods: {
            getChampionSplashUrl(champion) {
                return require('../../../assets/images/champion-loading/' + champion.champId + '_0.jpg');
            },
            getChampionTileUrl(champion) {
                return require('../../../assets/images/champion-tiles/' + champion.champId + '_0.jpg');
            },
            getItemUrl(itemId) {
                return require('../../../assets/images/items/' + itemId + '.png');
            },
            getSSpellUrl(spellId) {
                return require('../../../assets/images/spells/' + spellId.imageFull);
            },
            getPrimaryRuneUrl(perk) {
                return require('../../../assets/images/' + perk.icon);
            },
            getSecondaryStyleUrl(style) {
                return require('../../../assets/images/perk-images/Styles/' + style + '.png');
            },
            getRoleIconUrl(role) {
                return require('../../../assets/images/lanes/' + role.toLowerCase() + '_icon.png');
            }
        }
    }
</script>

<style scoped lang="scss">
    #ally-gg {
        #match_history {
            grid-column-end: span 4;
            background-color: white;
            border: 3px solid #f4f4f4;
            border-radius: 5px;
            position: relative;
            display: flex;
            flex-direction: column;
            color: $palette-primary;
            transition: all 0.5s ease;

            @media #{$bp-md}{
                grid-row-end: span 3;
            }

            .head {
                padding: 20px 20px 0 20px;
            }

            .history-table {
                display: grid;
                height: 100%;
                grid-template: repeat(12, 1fr) / 1fr;
                grid-gap: 5px 0;

                .labels, .match {
                    display: grid;
                    grid-template: 1fr / repeat(5, 1fr);
                    align-items: center;
                    width: 100%;
                    justify-content: space-evenly;

                    @media #{$bp-md}{
                        grid-template: 1fr / repeat(11, 1fr);
                    }

                    .champion {
                        grid-column-end: span 1;

                        @media #{$bp-md}{
                            grid-column-end: span 2;
                        }
                    }

                    .items {
                        grid-column-end: span 3;
                    }

                    .items, .spells, .runes {
                        display: none;

                        @media #{$bp-md}{
                            display: block;
                        }
                    }
                }

                .labels {
                    font-weight: bold;
                    text-align: center;
                    font-size: 1.2rem;
                }

                .match {
                    background-color: rgba(255, 74, 20, 0.3);
                    transition: all 0.25s ease;

                    .kda, .queue, .cs10, .timeago, .kda-average {
                        text-align: center;
                    }

                    .champion-icon, .champion-name, .spells, .items, .runes {
                        display: flex;
                        flex-direction: row;
                        height: 100%;
                        align-items: center;
                        justify-content: center;

                        .icon-wrapper {
                            border-radius: 50%;
                            overflow: hidden;
                            height: 40px;
                            margin-right: 10px;
                        }
                    }

                    .spells, .items, .runes {
                        display: none;

                        .item-1, .item-2, .item-3, .item-4, .item-5, .item-6, .trinket, .summoner-1, .summoner-2,
                        .rune-primary, .rune-secondary {
                            border-radius: 50%;
                            overflow: hidden;
                            height: 35px;
                            width: 35px;
                            margin-right: 5px;
                        }

                        .item-1, .item-2, .item-3, .item-4, .item-5, .item-6, .trinket {
                            background-color: lightgrey;
                        }

                        @media #{$bp-md}{
                            display: flex;
                        }
                    }

                    .champion-name {
                        display: none;

                        @media #{$bp-md}{
                            display: flex;
                        }
                    }

                    &.win {
                        background-color: rgba(0, 161, 255, 0.6);
                    }

                    &:hover {
                        transform: scale(1.1);
                        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
                        cursor: pointer;
                    }
                }
            }
        }

        &.dark {
            #match_history {
                background-color: $palette-dark-primary;
                border: 3px solid $palette-dark-border;
                color: white;
            }
        }
    }
</style>