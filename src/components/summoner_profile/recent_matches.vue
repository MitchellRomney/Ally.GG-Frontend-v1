<template>
    <div id="recent-matches">
        <div class="header">
            <h2>Recent Matches</h2>
        </div>
        <transition name="fade">
            <div class="loading" v-if="matchLoading">
                <pulse-loader class="match_loader"></pulse-loader>
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
                        <h3>{{ match.champion.name }}</h3>
                    </div>
                    <div class="stats"></div>
                    <div class="players"></div>
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
            getMedalUrl(tier, rank) {
                return require('../../assets/images/ranked_medals/' + tier.toLowerCase() + '_' + rank + '.png');
            },
            getChampionSplashUrl(champion) {
                try {
                    return require('../../assets/images/champion-loading/' + champion.champId + '_0.jpg');
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
                grid-template: 1fr 1fr 2fr / 1fr 4fr;
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
                    padding: 10px;

                    h3 {
                        font-family: 'Panton Black', sans-serif;
                        font-size: 2.5rem;
                    }
                }

                .stats {
                    grid-area: stats;
                    padding: 10px;
                }

                .players {
                    grid-area: players;
                    padding: 10px;
                }
            }
        }
    }
</style>