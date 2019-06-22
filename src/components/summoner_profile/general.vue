<template>
    <div class="content-general container">
        <RecentMatches :matches="matches" :matchLoading="matchLoading"
                       :matchesRemaining="matchesRemaining"></RecentMatches>
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
    #ally-gg {
        .content-general {
            display: grid;
            grid-gap: 20px;
            grid-template: 400px / repeat(3, 1fr);
            grid-auto-rows: 400px;
            color: $palette-primary;
            transition: all 0.5s ease;

            .ranked-panel {
                background-color: white;
                border: 3px solid #f4f4f4;
                border-radius: 20px;
                padding: 20px;
                grid-column-end: span 3;
                transition: all 0.5s ease;
                @media #{$bp-md}{
                    grid-column-end: span 1;
                }

                h2 {
                    color: $palette-primary;
                }

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
                    height: 290px;
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
                        transition: stroke 0.5s ease;
                        stroke: lightgrey;
                    }

                    .inside-svg {
                        position: absolute;
                        display: flex;
                        flex-direction: column;
                        text-align: center;

                        .total-LP {
                            font-size: 26px;
                            color: $palette-primary;
                        }

                        .win-loss {
                            color: grey;
                            font-size: 20px;
                            font-weight: normal;
                        }

                        .medal {
                            width: 80px;
                            align-self: center;
                        }
                    }
                }
            }
        }

        &.dark {
            .content-general {
                color: white;

                .ranked-panel {
                    background-color: $palette-dark-primary;
                    border: 3px solid $palette-dark-border;

                    h2 {
                        color: white;
                    }

                    .league {
                        color: grey;
                    }

                    .svg-item {
                        .donut-ring {
                            stroke: $palette-dark-border;
                        }

                        .inside-svg {
                            .total-LP {
                                color: white;
                            }
                        }
                    }
                }
            }
        }
    }
</style>