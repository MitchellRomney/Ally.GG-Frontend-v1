<template>
    <div id="top-nav" :class="{ border : border }">
        <div class="menu" @click="$emit('toggle-nav')">
            <font-awesome-icon icon="bars"/>
        </div>
        <div class="search">
            <input @keyup.enter="goSummoner()"
                   class="search-input"
                   type="text"
                   v-model="search_entry"
                   placeholder="Find a Summoner..."
                   aria-label="Summoner Search">
            <div class="server-select">
                <select aria-label="server" id="server" class="selected-server" name="server" v-model="search_server">
                    <option value="BR1">BR</option>
                    <option value="EUN1">EUN</option>
                    <option value="EUW1">EUW</option>
                    <option value="JP1">JP</option>
                    <option value="KR">KR</option>
                    <option value="LA1">LAN</option>
                    <option value="LA2">LAS</option>
                    <option value="NA1">NA</option>
                    <option value="OC1" selected="selected">OCE</option>
                    <option value="TR1">TR</option>
                    <option value="RU">RU</option>
                    <option value="PBE1">PBE</option>
                </select>
            </div>
            <div class="search-results" v-if="search_results || search_loading">
                <pulse-loader v-if="search_loading" :color="'#FF0081'"></pulse-loader>
                <ul class="results" v-else>
                    <li class="header" v-if="search_summoner_results.length > 0">Summoners</li>
                    <li class="result" v-for="summoner in search_summoner_results.slice(0,10)" :key="summoner.id">
                        <router-link
                                :to="{ name: 'summoner_profile', params: { server: summoner.server, summoner: summoner.summonerName }}">
                            <img class="resp-img"
                                 :src="summonerIcon(summoner).src">
                            <span v-on:click="clearSearch">{{ summoner.summonerName }}</span>
                            <span class="level">Level {{ summoner.summonerLevel }}</span>
                        </router-link>
                    </li>
                    <li class="header" v-if="search_champion_results.length > 0">Champions</li>
                    <li class="result" v-for="champion in search_champion_results.slice(0,10)" :key="champion.champId">
                        <router-link @click="clearSearch"
                                     :to="{ name: 'summoner_profile', params: { summoner: champion.champId }}">
                            <img class="resp-img" :src="getChampionTileUrl(champion)" :alt="champion.name"/>
                            <span>{{ champion.name }}</span>
                            <span class="level"><span v-for="tag in champion.tags"> {{ tag }} </span></span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="notifications">
            <font-awesome-icon icon="bell"/>
        </div>
        <div class="profile" v-if="user.username" v-click-outside="closeMenu">
            <div class="user" @click="toggleMenu">
                <div class="avatar">
                    <div class="img-wrapper">
                        <img class="resp-img" src="../../assets/images/placeholder.png" :alt="user.username">
                    </div>
                </div>
                <div>
                    <h4>{{ user.username }}</h4>
                    <a href="#">
                        <span><font-awesome-icon icon="circle"/>Online</span>
                    </a>
                </div>
                <div class="caret">
                    <font-awesome-icon icon="caret-down"/>
                </div>
            </div>
            <ul v-if="open_menu" class="options-dropdown">
                <li class="category">
                    Personal
                </li>
                <router-link to="/settings">
                    <li>
                        <font-awesome-icon icon="cog"/>
                        <div class="item-name">
                            User Settings
                        </div>
                    </li>
                </router-link>
                <router-link to="/admin">
                    <li v-if="user.isSuperuser">
                        <font-awesome-icon icon="tools"/>
                        <div class="item-name">
                            Admin Panel
                        </div>
                    </li>
                </router-link>
                <li class="category">
                    Special
                </li>
                <li>
                    <font-awesome-icon icon="moon"/>
                    <div class="item-name">
                        <span>Dark Mode</span>
                    </div>
                    <div class="input">
                        <toggle-button
                                @change="darkModeHandler"
                                :value="user.Profiles[0].darkMode"
                                switch-color="#141d26"
                                :sync="true"
                                :disabled="!darkModeSwitch"/>
                    </div>
                </li>
                <div class="divider"></div>
                <li class="logout" @click="logout">
                    <font-awesome-icon icon="sign-out-alt"/>
                    <div class="item-name">
                        Log Out
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

    let query_summonerSearch =
        `
        query Search($entry: String, $server: String) {
          summonerSearch(entry: $entry, server: $server) {
            summonerId
            summonerName
            summonerLevel
            profileIconId
            server
          }
          championSearch(entry: $entry) {
            name
            champId
            tags
          }
        }
        `;

    let query_updateProfile =
        `mutation($userId: Int!, $darkMode: Boolean!) {
          updateProfile(userId: $userId, darkMode: $darkMode){
            updated
            profile {
              user {
                username
              }
              darkMode
            }
          }
        }`;

    export default {
        name: 'TopNav',
        components: {
            PulseLoader
        },
        data() {
            return {
                open_menu: false,
                darkModeSwitch: true,

                // Search
                search_entry: null,
                search_summoner_results: [],
                search_champion_results: [],
                search_loading: false,
                search_server: 'OC1',
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
            closeMenu() {
                if (this.open_menu) {
                    this.open_menu = false;
                }
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
                            entry: this.search_entry,
                            server: this.search_server
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
                this.$router.push({
                    name: 'summoner_profile',
                    params: {summoner: this.search_entry, server: this.search_server}
                });
                this.search_entry = null;
                this.search_summoner_results = [];
                this.search_champion_results = [];
            },
            getChampionTileUrl(champion) {
                return require('../../assets/images/champion-tiles/' + champion.champId + '_0.jpg');
            },
            summonerIcon(summoner) {
                if (summoner.profileIconId) {
                    const summonerIcon = new Image();
                    summonerIcon.src = 'https://ddragon.leagueoflegends.com/cdn/' + this.patch + '/img/profileicon/' + summoner.profileIconId + '.png';
                    return summonerIcon
                }
            },
            darkModeHandler() {
                if (this.darkModeSwitch && this.user !== null) {
                    this.darkModeSwitch = false;
                    this.$store.state.user.Profiles[0].darkMode = !this.$store.state.user.Profiles[0].darkMode;
                    axios({
                        url: process.env.VUE_APP_API_URL + '/graphql',
                        method: 'post',
                        data: {
                            query: query_updateProfile,
                            variables: {
                                userId: this.$store.state.user.id,
                                darkMode: this.$store.state.user.Profiles[0].darkMode
                            },
                        }
                    }).then((response) => {
                        if (response.data.data.updateProfile.updated) {
                            this.darkModeSwitch = true;
                        }
                    });
                }
            }
        },
        computed: {
            patch() {
                return this.$store.state.patch
            },
            user() {
                return this.$store.state.user
            },
            search_results() {
                return this.search_summoner_results.length > 0 || this.search_champion_results.length > 0
            },
            border() {
                return this.$route.params.summoner == null
            },
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

            &.border {
                border-bottom: 1px solid #DFE3E8;
            }

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
                width: 200px;
                position: relative;

                @media #{$bp-md}{
                    margin: 0 20px;
                    width: 250px;
                }

                .search-input {
                    height: 35px;
                    width: 100%;
                    border-radius: 5px 0 0 5px;
                    border: 1px solid #DFE3E8;
                    border-right: none;
                    padding: 5px 10px;
                    background-color: white;

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
                    color: white;
                    cursor: pointer;
                    position: relative;

                    .selected-server {
                        font-weight: bold;
                        padding: 5px 10px;
                        border: none;
                        background-color: transparent;
                        color: #b5b5b5;
                        height: 100%;
                        -moz-appearance: none;
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
                display: table;
                align-items: center;
                justify-content: flex-end;
                position: relative;
                border: 1px solid #DFE3E8;
                z-index: 100;
                height: 45px;
                margin-top: 10px;
                border-radius: 5px;
                cursor: pointer;

                .user {
                    display: flex;
                    height: 45px;
                    padding: 5px 15px;

                    .avatar {
                        margin-right: 10px;
                        cursor: pointer;
                        display: flex;
                        align-content: center;

                        .img-wrapper {
                            height: 35px;
                            width: 35px;
                            border-radius: 50%;
                            overflow: hidden;
                        }
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

                    .caret {
                        margin-left: 60px;
                        display: flex;
                        align-items: center;
                    }
                }

                .options-dropdown {
                    border-radius: 5px;
                    background-color: white;
                    z-index: 1050;

                    .divider {
                        border-top: 1px solid #DFE3E8;
                        margin: 0 10px;
                    }

                    li {
                        cursor: pointer;
                        display: grid;
                        grid-template: auto / 30px auto auto;
                        font-weight: bold;
                        font-size: 0.9rem;
                        padding: 15px 10px;

                        svg {
                            opacity: 0.6;
                            display: flex;
                            align-self: center;
                            justify-self: center;
                        }

                        .item-name {
                            display: flex;
                            justify-self: baseline;
                            width: 100%;

                            span {
                                margin: auto auto auto 0;
                            }
                        }

                        &.category {
                            display: flex;
                            cursor: initial;
                            padding: 10px 10px 5px 10px;
                            opacity: 0.6;

                            &:hover {
                                background-color: initial;
                                color: initial;
                            }
                        }

                        &.logout {
                            border-radius: 0 0 5px 5px;
                        }

                        &:hover {
                            background-color: $palette-accent;
                            color: white;
                        }
                    }
                }
            }
        }

        &.dark {
            #top-nav {
                background-color: $palette-dark-primary;

                &.border {
                    border-bottom: 1px solid $palette-dark-border;
                }

                .menu {
                    color: white;
                }

                .search {
                    .server-select {
                        border: 1px solid $palette-dark-border;
                        border-left: none;

                        .selected-server {
                            option {
                                background-color: $palette-dark-primary;
                            }
                        }
                    }

                    .search-input {
                        border: 1px solid $palette-dark-border;
                        background-color: $palette-dark-primary;
                        color: white;
                        border-right: none;

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
                    border: 1px solid $palette-dark-border;
                    color: white;

                    .options-dropdown {
                        background-color: $palette-dark-primary;

                        .divider {
                            border-top: 1px solid $palette-dark-border;
                        }
                    }
                }
            }
        }
    }
</style>
