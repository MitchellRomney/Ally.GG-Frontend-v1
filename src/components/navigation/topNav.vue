<template>
    <div id="top-nav">
        <div class="menu" @click="$emit('toggle-nav')">
            <font-awesome-icon icon="bars"/>
        </div>
        <div class="search">
            <input @keyup.enter="goSummoner()"
                   class="search-input"
                   type="text"
                   v-model="search_entry"
                   placeholder="Find a Summoner...">
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
        <div class="notifications">
            <font-awesome-icon icon="bell"/>
        </div>
        <div class="profile" v-if="user.username">
            <div class="avatar" @click="toggleMenu">
                <div class="img-wrapper">
                    <img class="resp-img" src="../../assets/images/placeholder.png" :alt="user.username">
                </div>
                <ul v-if="open_menu" class="options-dropdown">
                    <li v-if="user.isSuperuser">
                        <router-link to="/admin">Admin Panel</router-link>
                    </li>
                    <li><a @click="logout">Logout</a></li>
                </ul>
            </div>
            <div class="user">
                <router-link :to="{ name: 'user_profile', params: { user: user.username }}">
                    <h4>{{ user.username }}</h4>
                </router-link>
                <a href="#">
                    <span><font-awesome-icon icon="circle"/>Online</span>
                </a>
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
                this.search_summoner_results = [];
                this.search_champion_results = [];
            },
            goSummoner() {
                this.$router.push({name: 'summoner_profile', params: {summoner: this.search_entry}});
                this.search_entry = null;
                this.search_summoner_results = [];
                this.search_champion_results = [];
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
    #ally-gg {
        #top-nav {
            background-color: white;
            grid-area: tnav;
            justify-content: space-evenly;
            display: flex;
            height: 65px;
            width: 100%;
            transition: all 0.5s ease;

            @media #{$bp-md}{
                width: calc(100vw - 130px);
                padding: 0 40px;
                justify-content: flex-end;
            }

            .menu {
                display: flex;
                align-items: center;
                font-size: 1.5rem;
                cursor: pointer;

                @media #{$bp-md}{
                    display: none;
                }
            }

            .search {
                display: flex;
                align-items: center;
                width: 250px;
                position: relative;

                @media #{$bp-md}{
                    margin: 0 20px;
                }

                .search-input {
                    height: 35px;
                    width: 100%;
                    border-radius: 5px 0 0 5px;
                    border: 1px solid #DFE3E8;
                    border-right: none;
                    padding: 5px 10px;
                    background-color: white;
                    transition: background-color 0.5s ease;

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

            .notifications {
                opacity: 0.2;
                font-size: 1.2rem;
                display: flex;
                align-items: center;
                cursor: pointer;
                color: $palette-primary;

                @media #{$bp-md}{
                  margin-right: 20px;
                }
            }

            .profile {
                grid-area: profile;
                display: flex;
                align-items: center;
                justify-content: flex-end;

                .avatar {
                    margin-right: 10px;
                    position: relative;

                    .img-wrapper {
                        height: 40px;
                        width: 40px;
                        border-radius: 50%;
                        overflow: hidden;
                    }

                    .options-dropdown {
                        position: absolute;
                        top: 100%;
                        right: 0;
                        width: 150px;
                        padding: 10px;
                        border-radius: 10px 2px 10px 10px;
                        background-color: white;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                        transition: all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 0s linear 0.01s;
                        text-align: center;
                        z-index: 1050;
                        border: 1px solid #DFE3E8;

                        li {
                            cursor: pointer;
                        }
                    }
                }

                .user {
                    margin-right: 15px;
                    display: none;

                    @media #{$bp-md}{
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
            }
        }

        &.dark {
            #top-nav {
                background-color: $palette-dark-primary;

                .menu {
                    color: white;
                }

                .search {
                    .server-select {
                        border: 1px solid $palette-dark-border;

                        .server-dropdown {
                            border: 1px solid $palette-dark-border;
                            color: white;
                        }
                    }

                    .search-input {
                        border: 1px solid $palette-dark-border;
                        background-color: $palette-dark-primary;
                        color: white;

                        &::placeholder {
                            color: white;
                        }
                    }

                    .search-results {
                        border: 1px solid $palette-dark-border;
                        box-shadow: $dark-shadow;
                        background-color: $palette-dark-secondary;
                    }
                }

                .notifications {
                    color: white;
                }

                .profile {
                    .avatar {
                        .options-dropdown {
                            background-color: $palette-dark-secondary;
                            box-shadow: $dark-shadow;
                            border: 1px solid $palette-dark-border;
                        }
                    }
                }
            }
        }
    }
</style>
