<template>
    <div id="top-nav">
        <div class="search">
            <input @keyup.enter="goSummoner()"
                   class="search-input"
                   type="text"
                   v-model="search_entry"
                   placeholder="Find a Summoner..."
            >
            <div class="server-select">
                <div class="selected-server">{{ search_server }}</div>
                <div class="server-dropdown">
                    <div class="server" v-for="server in search_server_options" v-if="server !== search_server">
                        {{ server }}
                    </div>
                </div>
            </div>
            <div class="search-results" v-if="search_results || search_loading">
                <pulse-loader v-if="search_loading" :color="'#FF0081'"></pulse-loader>
                <ul class="results" v-else>
                    <li class="header" v-if="search_summoner_results.length > 0">Summoners</li>
                    <li class="result" v-for="summoner in search_summoner_results.slice(0,10)" :key="summoner.id">
                        <router-link :to="{ name: 'summoner_profile', params: { summoner: summoner.summonerName }}">
                            <img class="resp-img"
                                 :src="'https://ddragon.leagueoflegends.com/cdn/9.10.1/img/profileicon/' + summoner.profileIconId + '.png'">
                            <span v-on:click="clearSearch">{{ summoner.summonerName }}</span>
                            <span class="level">Level {{ summoner.summonerLevel }}</span>
                        </router-link>
                    </li>
                    <li class="header" v-if="search_champion_results.length > 0">Champions</li>
                    <li class="result" v-for="champion in search_champion_results.slice(0,10)" :key="champion.champId">
                        <router-link :to="{ name: 'summoner_profile', params: { summoner: champion.champId }}">
                            <img class="resp-img" :src="getChampionTileUrl(champion)" :alt="champion.name"/>
                            <span v-on:click="clearSearch">{{ champion.name }}</span>
                            <span class="level"><span v-for="tag in champion.tags"> {{ tag }} </span></span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="profile" v-if="user.username">
            <div class="notifications">
                <font-awesome-icon icon="bell"/>
            </div>
            <div class="avatar">
                <img class="resp-img" src="../../assets/images/placeholder.png" :alt="user.username">
            </div>
            <div class="user">
                <router-link :to="{ name: 'user_profile', params: { user: user.username }}">
                    <h4>{{ user.username }}</h4>
                </router-link>
                <a href="#">
                    <span><font-awesome-icon icon="circle"/>Online</span>
                </a>
            </div>
            <div class="acc-options">
                <a href="#" @click="toggleMenu">
                    <font-awesome-icon icon="caret-down"/>
                </a>
                <ul v-if="open_menu" class="options-dropdown">
                    <li><router-link to="/admin">Admin Panel</router-link></li>
                    <li><a @click="logout">Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

    let query_summonerSearch =
        `
        query Search($entry: String) {
          summonerSearch(entry: $entry) {
            summonerId
            summonerName
            summonerLevel
            profileIconId
          }
          championSearch(entry: $entry) {
            name
            champId
            tags
          }
        }
        `;

    export default {
        name: 'TopNav',
        components: {
            PulseLoader
        },
        data() {
            return {
                open_menu: false,

                // Search
                search_entry: null,
                search_summoner_results: [],
                search_champion_results: [],
                search_loading: false,
                search_server: 'OCE',
                search_server_options: ['OCE', 'NA', 'KR', 'EUW']
            }
        },
        watch: {
            search_entry(after, before) {
                if (after === null) {
                    this.search_entry = [];
                } else {
                    this.search_loading = true;
                    setTimeout(() => {
                        if (after === this.search_entry) {
                            this.fetchSearch();
                        }
                    }, 1000);
                }
            }
        },
        methods: {
            toggleMenu() {
                this.open_menu = !this.open_menu;
            },
            logout() {
                this.$cookie.delete('token');
                this.$store.commit('logout');
                this.$router.go();
            },
            fetchSearch() {
                axios({
                    method: "POST",
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    data: {
                        query: query_summonerSearch,
                        variables: {
                            entry: this.search_entry
                        },
                    }
                }).then((response) => {
                    this.search_summoner_results = response.data.data.summonerSearch;
                    this.search_champion_results = response.data.data.championSearch;

                    for (let key in this.search_champion_results) {
                        this.search_champion_results[key].tags = this.search_champion_results[key].tags.replace(/\[*[',\]]/gi, '').split(" ");
                    }

                    this.search_loading = false;
                });
            },
            clearSearch() {
                this.search_entry = null;
                this.search_results = null;
            },
            goSummoner() {
                this.$router.push({name: 'summoner_profile', params: {summoner: this.search_entry}});
                this.search_entry = null;
                this.search_results = null;
            },
            getChampionTileUrl(champion) {
                return require('../../assets/images/champion-tiles/' + champion.champId + '_0.jpg');
            },
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            search_results() {
                return this.search_summoner_results.length > 0 || this.search_champion_results.length > 0
            }
        },
    }
</script>

<style scoped lang="scss">
    #top-nav {
        background-color: white;
        grid-area: tnav;
        justify-content: flex-end;
        padding: 0 40px;
        display: flex;
        height: 65px;
        width: 100%;

        .search {
            display: flex;
            align-items: center;
            width: 250px;
            margin: 0 20px;
            position: relative;

            .search-input {
                height: 35px;
                width: 100%;
                border-radius: 5px 0 0 5px;
                border: 1px solid #DFE3E8;
                border-right: none;
                padding: 5px 10px;

                &:focus {
                    + .server-select + .search-results {
                        display: block;
                    }
                }

                &:active {
                    + .search-results {
                        display: block;
                    }
                }
            }

            .server-select {
                border: 1px solid #DFE3E8;
                border-left: none;
                border-radius: 0 5px 5px 0;
                height: 35px;
                display: flex;
                align-items: center;
                background-color: $palette-accent;
                color: white;
                cursor: pointer;
                position: relative;

                .selected-server {
                    font-weight: bold;
                    padding: 5px 10px;
                }

                &:focus {
                    .server-dropdown {
                        display: block;
                    }
                }

                &:hover {
                    .server-dropdown {
                        display: block;
                    }
                }

                &:active {
                    .server-dropdown {
                        display: block;
                    }
                }

                .server-dropdown {
                    display: none;
                    position: absolute;
                    top: 100%;
                    width: 100%;
                    border: 1px solid #DFE3E8;
                    color: $palette-primary;
                    z-index: 100;
                    text-align: center;
                }
            }

            .search-results {
                position: absolute;
                top: 90%;
                z-index: 500;
                width: 100%;
                border: 1px solid #DFE3E8;
                display: none;
                padding: 10px;
                min-height: 100px;
                max-height: 300px;
                overflow-y: scroll;
                flex-direction: column;
                border-radius: 5px;
                box-shadow: $shadow;
                background-color: white;


                &:hover {
                    display: flex;
                }

                .v-spinner {
                    height: 100%
                }

                .results {
                    .header {
                        font-weight: bold;
                        width: 100%;
                        padding: 5px;
                        font-size: 0.6rem;
                        opacity: 0.5;
                    }

                    .result {
                        transition: all 0.5s ease;
                        border-radius: 5px;
                        width: 100%;
                        padding: 5px;
                        margin: 2px 0;
                        font-weight: bold;

                        a {
                            width: 100%;
                            display: flex;
                            align-items: center;
                            font-size: 0.8rem;

                            img {
                                height: 25px;
                                border-radius: 50%;
                                margin: 0 5px 0 0;
                            }

                            .level {
                                margin-left: auto;
                                opacity: 0.6;
                                font-size: 0.6rem;
                            }
                        }

                        &:hover {
                            background-color: $palette-accent;

                            a {
                                color: white;
                            }
                        }
                    }
                }
            }
        }

        .profile {
            grid-area: profile;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            .notifications {
                opacity: 0.4;
                margin-right: 20px;
                font-size: 1.2rem;
                display: none;

                @media #{$bp-lg}{
                    display: block;
                }
            }

            .avatar {
                height: 40px;
                width: 40px;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 10px;
            }

            .user {
                margin-right: 15px;
                display: none;

                @media #{$bp-lg}{
                    display: block;
                }

                span {
                    color: grey;
                    font-weight: 600;
                    font-size: 0.8rem;
                    display: flex;

                    svg {
                        color: limegreen;
                        margin-right: 5px;
                    }
                }
            }

            .acc-options {
                position: relative;
                display: none;

                @media #{$bp-lg}{
                    display: block;
                }

                a {
                    color: $palette-primary;
                }

                .options-dropdown {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    width: 150px;
                    padding: 10px;
                    border-radius: 10px 2px 10px 10px;
                    background-color: white;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
                    transition: all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 0s linear 0.01s;
                    text-align: center;
                    z-index: 2000;

                    li {
                        cursor: pointer;
                    }
                }

                i {
                    font-size: 1.4rem;
                }
            }
        }
    }
</style>
