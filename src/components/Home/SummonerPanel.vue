<template>
    <div id="SummonerPanel">
        <h2 class="panel-header">Summoner</h2>
        <div class="panel-wrapper">
            <transition name="fade" mode="out-in">
                <div class="panel-content" v-if="!summonerSwitching" :key="1">
                    <div class="avatar-wrapper" v-if="summonerIcons[selectedSummoner.summonerName]">
                        <transition name="fade" mode="out-in">
                            <div class="content-loader" v-if="!summonerIcons[selectedSummoner.summonerName].loaded">
                                <content-loader :width="100" :height="100"
                                                :primaryColor="conLoadPrimary"
                                                :secondaryColor="conLoadSecondary"></content-loader>
                            </div>
                            <div class="avatar" v-else v-cloak key="2">
                                <img class="resp-img" v-if="summonerIcons[selectedSummoner.summonerName].loaded"
                                     :onLoad="summonerIcons[selectedSummoner.summonerName].loaded = true"
                                     :alt="selectedSummoner.summonerName + '\'s Summoner Icon'"
                                     :src="summonerIcons[selectedSummoner.summonerName].icon.src">
                            </div>
                        </transition>
                    </div>
                    <div class="summoner-info">
                        <div class="name">
                            {{ selectedSummoner.summonerName }}
                        </div>
                        <div class="last-updated">
                            Last Updated: {{ selectedSummoner.lastUpdated }}
                        </div>
                    </div>
                    <div class="summoner-ranks">
                        <RankedTierIcon :rankedQueue="selectedSummoner.rankedSolo" v-if="selectedSummoner.rankedSolo"/>
                        <RankedTierIcon :rankedQueue="selectedSummoner.rankedFlex5"
                                        v-if="selectedSummoner.rankedFlex5"/>
                        <RankedTierIcon :rankedQueue="selectedSummoner.rankedFlex3"
                                        v-if="selectedSummoner.rankedFlex3"/>
                        <RankedTierIcon :rankedQueue="selectedSummoner.rankedTFT" v-if="selectedSummoner.rankedTFT"/>
                    </div>
                    <div class="buttons">
                        <button @click="$emit('update')">Update</button>
                        <button @click="summonerSwitching = true" class="switch">Switch</button>
                    </div>
                </div>
                <div class="summoner-switching" :key="2" v-else>
                    <div class="summoner" v-for="summoner in summoners" @click="switchSummoner(summoner)">
                        <div class="avatar-outer-wrapper">
                            <div class="circle" v-if="summoner.summonerName === selectedSummoner.summonerName">
                                <font-awesome-icon icon="check"></font-awesome-icon>
                            </div>
                            <div class="avatar-wrapper">
                                <transition name="fade" mode="out-in">
                                    <div class="inner-content-loader"
                                         v-if="!summonerIcons[summoner.summonerName].loaded">
                                        <content-loader :width="100" :height="100"
                                                        :primaryColor="conLoadPrimary"
                                                        :secondaryColor="conLoadSecondary"></content-loader>
                                    </div>
                                    <div class="avatar" v-else v-cloak :key="2">
                                        <img class="resp-img" v-if="summonerIcons[summoner.summonerName].loaded"
                                             :onLoad="summonerIcons[summoner.summonerName].loaded = true"
                                             :alt="summoner.summonerName + '\'s Summoner Icon'"
                                             :src="summonerIcons[summoner.summonerName].icon.src">
                                    </div>
                                </transition>
                            </div>
                        </div>
                        <div class="summoner-info">
                            <div class="name">
                                {{ summoner.summonerName }}
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import {ContentLoader} from 'vue-content-loader';
    import RankedTierIcon from './SummonerPanel/RankedTierIcon'

    export default {
        name: 'SummonerPanel',
        components: {
            ContentLoader,
            RankedTierIcon
        },
        props: {
            selectedSummoner: Object,
            summonerIcons: Object,
            summonerLoaded: Boolean,
        },
        data() {
            return {
                summonerSwitching: false,
            }
        },
        computed: {
            patch() {
                return this.$store.state.patch
            },
            summoners() {
                return this.$store.state.user.Profiles[0].Summoners
            },
            conLoadPrimary() {
                return '#f9f9f9'
            },
            conLoadSecondary() {
                return '#ecebeb'
            },
        },
        methods: {
            switchSummoner(summoner) {
                if (summoner.summonerName !== this.selectedSummoner.summonerName) {
                    this.$emit('switch', summoner);
                }
                this.summonerSwitching = false;
            }
        }
    }
</script>

<style scoped lang="scss">
    #SummonerPanel {
        grid-column-end: span 10;
        grid-row-end: span 2;
        height: 175px;
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
            padding: 20px;

            .panel-content {
                height: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .avatar-wrapper {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    overflow: hidden;
                }

                .summoner-info {
                    .name {
                        text-shadow: 0 5px 20px rgba(52, 133, 255, 0.075), 0 4px 6px rgba(46, 89, 155, 0.2);
                        font-family: 'Panton Black', sans-serif;
                        font-size: 2rem;
                    }

                    .last-updated {
                        font-size: 0.8rem;
                        opacity: 0.6;
                    }
                }

                .summoner-ranks {
                    display: flex;
                }

                .buttons {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;

                    button {
                        border-radius: 5px;
                        padding: 8px 40px;

                        &.switch {
                            background-color: #3B4B61;
                        }
                    }
                }
            }

            .summoner-switching {
                height: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;

                .summoner {
                    display: flex;
                    flex-direction: column;
                    cursor: pointer;
                    align-items: center;

                    .avatar-outer-wrapper {
                        position: relative;

                        .circle {
                            height: 25px;
                            width: 25px;
                            border-radius: 50%;
                            position: absolute;
                            bottom: 0;
                            right: 0;
                            background-color: limegreen;
                            box-shadow: 0 0 0 5px white;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            padding-top: 2px;
                        }

                        .avatar-wrapper {
                            width: 80px;
                            height: 80px;
                            border-radius: 50%;
                            overflow: hidden;
                        }
                    }

                    .summoner-info {
                        .name {
                            opacity: 0.9;
                            margin-top: 5px;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
    }
</style>