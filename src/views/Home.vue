<template>
    <div class="home">
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
                <div v-else class="summoners">
                    <div class="summoner" v-for="summoner in summoners">
                        <router-link :to="{ name: 'summoner_profile', params: { summoner: summoner.summonerName }}">
                            <div class="avatar">
                                <img class="resp-img" v-if="summoner.profileIconId"
                                     :src="'https://ddragon.leagueoflegends.com/cdn/9.10.1/img/profileicon/' + summoner.profileIconId + '.png'">
                            </div>
                            <h3 class="name">
                                {{ summoner.summonerName }}
                            </h3>
                            <span class="level">Level: {{ summoner.summonerLevel }}</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home',
        title: 'Home - Ally.GG',
        components: {},
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

            }
        },
        mounted() {
        }
    }
</script>

<style scoped lang="scss">
    .home {
        background-color: #F6F7FB;
        padding: 50px;
        min-height: calc(100vh - 65px);
        border-top: 1px solid #DFE3E8;

        .page-header {
            text-align: center;
            font-family: 'Panton Black', sans-serif;
            padding-bottom: 50px;

            h1 {

                span {
                    color: $palette-accent;
                }
            }
        }

        .content {
            display: grid;
            grid-template: 300px / repeat(3, 1fr);
            grid-auto-columns: 300px;

            .panel {
                background-color: white;
                border: 3px solid #f4f4f4;
                border-radius: 20px;
                padding: 20px;
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
</style>
