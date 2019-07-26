<template>
    <div class="home">
        <transition name="fade">
            <verify-modal v-if="showVerifyModal" @close="showVerifyModal = false"></verify-modal>
        </transition>
        <div class="content container">
            <Slides />
            <Feed />
            <div id="summoners" class="panel">
                <div class="panel-header">
                    <h2>Your Summoners</h2>
                    <button @click="connectSummoner">Add+</button>
                </div>
                <div v-if="summoners.length === 0">
                    You have not verified any Summoners yet!
                </div>
                <transition-group name="fade" tag="div" v-else class="summoners">
                    <div class="summoner" v-for="summoner in summoners" :key="summoner.summonerId">
                        <router-link :to="{ name: 'summoner_profile', params: { server: summoner.server, summoner: summoner.summonerName }}">
                            <div class="avatar">
                                <img class="resp-img" v-if="summoner.profileIconId" alt="SummonerIcon"
                                     :src="'https://ddragon.leagueoflegends.com/cdn/' + patch + '/img/profileicon/' + summoner.profileIconId + '.png'">
                            </div>
                            <h3 class="name">
                                {{ summoner.summonerName }}
                            </h3>
                            <span class="level">Level: {{ summoner.summonerLevel }}</span>
                        </router-link>
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
    import VerifyModal from '../components/verify_modal'
    import Slides from '../components/Home/slides.vue'
    import Feed from '../components/Home/feed.vue'

    export default {
        name: 'home',
        title: 'Home - Ally.GG',
        components: {
            Slides,
            Feed,
            VerifyModal
        },
        data() {
            return {
                showVerifyModal: false,
            }
        },
        computed: {
            patch() {
              return this.$store.state.patch
            },
            user() {
                return this.$store.state.user
            },
            summoners() {
                return this.user.Profiles[0].Summoners
            }
        },
        methods: {
            connectSummoner() {
                this.showVerifyModal = true;
            }
        },
        mounted() {
        }
    }
</script>

<style scoped lang="scss">
    #ally-gg {
        .home {
            .page-header {
                text-align: center;
                font-family: 'Panton Black', sans-serif;
                padding-bottom: 50px;
                color: $palette-primary;

                h1 {
                    span {
                        color: $palette-accent;
                    }
                }
            }

            .content {
                display: grid;
                grid-template: 300px / 1fr;
                grid-auto-columns: 300px;
                min-height: calc(100vh - 65px);
                padding: 20px;
                grid-gap: 20px;

                @media #{$bp-md}{
                    grid-template: 1fr 1fr / repeat(3, 1fr);
                    grid-template-areas: "summoners summoners feed" "slides slides feed";
                }

                .panel {
                    background-color: white;
                    border: 3px solid #f4f4f4;
                    border-radius: 5px;
                }

                #summoners {
                    grid-area: summoners;
                    padding: 20px;

                    .panel-header {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                    }

                    .summoners {
                        display: flex;
                        justify-content: space-evenly;
                        height: 100%;
                        align-items: center;

                        .summoner {
                            text-align: center;

                            .avatar {
                                width: 100px;
                                margin-bottom: 10px;

                                img {
                                    border-radius: 50%;
                                }
                            }
                        }
                    }
                }
            }
        }

        &.dark {
            .home {
                background-color: $palette-dark-secondary;
                border-top: 1px solid $palette-dark-border;

                .page-header {
                    color: white;

                    h1 {
                        span {
                            color: $palette-accent;
                        }
                    }
                }

                .content {
                    .panel {
                        background-color: $palette-dark-primary;
                        border: 3px solid $palette-dark-border;
                        color: white;
                    }
                }
            }
        }
    }
</style>
