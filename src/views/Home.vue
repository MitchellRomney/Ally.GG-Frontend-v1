<template>
    <div class="home">
        <transition name="fade">
            <verify-modal v-if="showVerifyModal" @close="showVerifyModal = false"></verify-modal>
        </transition>
        <div class="page-header">
            <h1>
                Hey <span>{{ user.username }}</span>, what are we doing today?
            </h1>
        </div>
        <div class="content">
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
                                     :src="'https://ddragon.leagueoflegends.com/cdn/9.10.1/img/profileicon/' + summoner.profileIconId + '.png'">
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

    export default {
        name: 'home',
        title: 'Home - Ally.GG',
        components: {
            VerifyModal
        },
        data() {
            return {
                showVerifyModal: false,
            }
        },
        computed: {
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
            background-color: #F6F7FB;
            min-height: calc(100vh - 65px);
            border-top: 1px solid #DFE3E8;
            transition: all 0.5s ease;
            padding: 20px;

            @media #{$bp-md}{
                padding: 50px;
            }

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

                @media #{$bp-md}{
                    grid-template: 300px / repeat(3, 1fr);
                }

                .panel {
                    background-color: white;
                    border: 3px solid #f4f4f4;
                    border-radius: 20px;
                    padding: 20px;
                    transition: all 0.5s ease;
                }

                #summoners {
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
                            transition: all 0.5s ease;

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
