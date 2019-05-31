<template>
    <div class="content-general">
        <div class="ranked-panel">
            <h2>Ranked Solo</h2>
            <h5 class="rank" v-if="summoner.rankedSolo" v-cloak>
                {{ summoner.rankedSolo.tier }} {{ summoner.rankedSolo.rank }}
            </h5>
            <div class="svg-item" v-if="summoner.rankedSolo" v-cloak>
                <svg width="100%" height="100%" viewBox="0 0 40 40" class="donut">
                    <defs>
                        <linearGradient id="IronGradient">
                            <stop offset="0%" stop-color="rgba(74,98,110,1)"/>
                            <stop offset="100%" stop-color="rgba(30,33,48,1)"/>
                        </linearGradient>
                        <linearGradient id="BronzeGradient">
                            <stop offset="0%" stop-color="rgba(132,40,40,1)"/>
                            <stop offset="100%" stop-color="rgba(246,119,119,1)"/>
                        </linearGradient>
                        <linearGradient id="SilverGradient">
                            <stop offset="0%" stop-color="rgba(148,241,246,1)"/>
                            <stop offset="100%" stop-color="rgba(148,189,246,1)"/>
                        </linearGradient>
                        <linearGradient id="GoldGradient">
                            <stop offset="0%" stop-color="rgba(255,246,63,1)"/>
                            <stop offset="100%" stop-color="rgba(226,0,0,1)"/>
                        </linearGradient>
                        <linearGradient id="PlatinumGradient">
                            <stop offset="0%" stop-color="rgba(15,213,172,1)"/>
                            <stop offset="100%" stop-color="rgba(34,182,198,1)"/>
                        </linearGradient>
                        <linearGradient id="DiamondGradient">
                            <stop offset="0%" stop-color="rgba(17,127,238,1)"/>
                            <stop offset="100%" stop-color="rgba(190,47,252,1)"/>
                        </linearGradient>
                        <linearGradient id="MasterGradient">
                            <stop offset="0%" stop-color="rgba(57,31,105,1)"/>
                            <stop offset="50%" stop-color="rgba(115,43,155,1)"/>
                            <stop offset="100%" stop-color="rgba(231,75,184,1)"/>
                        </linearGradient>
                        <linearGradient id="GrandmasterGradient">
                            <stop offset="0%" stop-color="#d64c7f"/>
                            <stop offset="100%" stop-color="#ee4758"/>
                        </linearGradient>
                        <linearGradient id="ChallengerGradient">
                            <stop offset="0%" stop-color="#fbd786"/>
                            <stop offset="100%" stop-color="#f7797d"/>
                        </linearGradient>
                    </defs>
                    <circle class="donut-hole" cx="20" cy="20" r="15.91549430918954" fill="#fff"></circle>
                    <circle class="donut-ring" cx="20" cy="20" r="15.91549430918954" fill="transparent"
                            stroke-width="3.5"></circle>
                    <circle class="donut-segment" cx="20" cy="20" r="15.91549430918954" fill="transparent"
                            stroke-width="3.5"
                            :stroke-dasharray="summoner.rankedSolo.ringValues"
                            stroke-dashoffset="25"
                            :stroke="'url(#' + summoner.rankedSolo.tier + 'Gradient)'"></circle>
                </svg>
                <div class="inside-svg">
                    <h2 class="total-LP">{{ summoner.rankedSolo.lp }}LP</h2>
                    <h5 class="win-loss">{{ summoner.rankedSolo.wins }}W / {{ summoner.rankedSolo.losses }}L</h5>
                    <div class="medal">
                        <img class="resp-img"
                             :src="getMedalUrl(summoner.rankedSolo.tier, summoner.rankedSolo.rankNumber)">
                    </div>
                </div>
            </div>
            <div class="league" v-if="summoner.rankedSolo" v-cloak>
                {{ summoner.rankedSolo.leagueName }}
            </div>
        </div>
        <RecentMatches :matches="matches" :matchLoading="matchLoading" :matchesRemaining="matchesRemaining"></RecentMatches>
    </div>
</template>

<script>
    import RecentMatches from './recent_matches';

    export default {
        name: 'general',
        components: {
            RecentMatches
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
        }
    }
</script>

<style scoped lang="scss">
    .content-general {
        padding: 30px 0;
        display: grid;
        grid-gap: 20px;
        grid-template: 1fr / 0.5fr repeat(12, 1fr) 0.5fr;
        grid-template-areas: ". matches matches matches matches matches matches matches matches matches ranked ranked ranked .";

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
            position: relative;

            .match_loader {
                height: 100%;
                background-color: transparent;
            }
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
</style>