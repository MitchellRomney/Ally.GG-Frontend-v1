<template>
    <div id="top-champions">
        <div class="champions">
            <div class="head">
                <h2>
                    Top Champions
                </h2>
            </div>
            <div class="champion" v-for="champion in topChampions" v-if="summonerStatsLoaded">
                <router-link :to="{ name: 'champion_profile', params: { champion: champion.champion.champId }}">
                    <div class="champion-icon">
                        <div class="icon-wrapper" :title="champion.champion.name" v-tippy>
                            <img class="resp-img" :src="getChampionTileUrl(champion.champion)"
                                 :alt="champion.champion.name"/>
                        </div>
                    </div>
                    <div class="name">
                        {{ champion.champion.name }}
                    </div>
                    <div class="winrate">
                    <span :class="{
                        high : champion.winrate >= 60,
                        average : champion.winrate > 40 && champion.winrate < 60,
                        low : champion.winrate <= 40}">
                        {{ champion.winrate }}%
                    </span> | {{ champion.games }} Played
                    </div>
                </router-link>
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
            topChampions: Array,
            summonerStatsLoaded: Boolean
        },
        watch: {
            $route(before, after) {
                // Check if they've loaded a new Summoner.
                if (before.params.summoner !== after.params.summoner) {
                }
            },
        },
        methods: {
            getChampionTileUrl(champion) {
                return require('../../../assets/images/champion-tiles/' + champion.champId + '_0.jpg');
            },
        }
    }
</script>
<style scoped lang="scss">
    #ally-gg {
        #top-champions {
            grid-column-end: span 4;
            grid-row-end: span 2;
            background-color: white;
            border: 3px solid #f4f4f4;
            border-radius: 5px;
            position: relative;
            display: flex;
            flex-direction: column;
            color: $palette-primary;
            padding: 20px;

            @media #{$bp-md}{
                grid-column-end: span 2;
            }

            .champions {
                display: grid;
                grid-template: auto repeat(2, 1fr) / repeat(3, 1fr);
                grid-gap: 20px;
                height: 100%;
                align-items: center;

                .head {
                    grid-column-end: span 3;
                }

                .champion a {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-self: center;
                    font-weight: bold;
                    text-align: center;

                    .champion-icon {
                        height: 75px;
                        width: 75px;
                        border-radius: 50%;
                        overflow: hidden;
                    }

                    .name {
                        font-size: 1.1rem;
                        margin: 5px 0;
                    }

                    .winrate {
                        font-size: 0.9rem;

                        span {
                            &.high {
                                color: $palette-win;
                            }

                            &.average {
                                color: orange;
                            }

                            &.low {
                                color: $palette-loss;
                            }
                        }
                    }
                }
            }
        }

        &.dark {
            #top-champions {
                background-color: $palette-dark-primary;
                border: 3px solid $palette-dark-border;
                color: white;
            }
        }
    }
</style>

