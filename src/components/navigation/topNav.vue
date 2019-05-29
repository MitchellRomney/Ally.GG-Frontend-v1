<template>
    <div id="top-nav">
        <div class="search">
            <input @keyup.enter="goSummoner()"
                   class="search-input"
                   type="text"
                   v-model="search_entry"
                   placeholder="Find a Summoner..."
            >
            <ul class="search-results" v-if="search_results && search_results.length > 0">
                <li v-for="summoner in search_results.slice(0,6)" :key="summoner.id">
                    <router-link :to="{ name: 'summoner_profile', params: { summoner: summoner.summonerName }}">
                        <span v-on:click="clearSearch">{{ summoner.summonerName }}</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="profile">
            <div class="notifications">
                <font-awesome-icon icon="bell"/>
            </div>
            <div class="avatar">
                <img class="resp-img" src="../../assets/images/placeholder.png" :alt="user.username">
            </div>
            <div class="user">
                <a :href="'/profiles/' + user.username">
                    <h4>{{ user.username }}</h4>
                </a>
                <a href="#">
                    <span><font-awesome-icon icon="circle"/>Online</span>
                </a>
            </div>
            <div class="acc-options">
                <a href="#" @click="toggleMenu">
                    <font-awesome-icon icon="caret-down"/>
                </a>
                <ul v-if="open_menu" class="options-dropdown">
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
        query SummonerSearch($entry: String) {
          summonerSearch(entry: $entry) {
            summonerId
            summonerName
            summonerLevel
            rankedSolo {
              tier
              rank
              rankNumber
              lp
              leagueName
              wins
              losses
            }
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
                search_results: [],
                search_loading: false,
            }
        },
        watch: {
            search_entry(after, before) {
                if (after === null) {
                    console.log(this.search_entry);
                    console.log(after);
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
                this.$cookie.delete('user');
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
                    this.search_results = response.data.data.summonerSearch;
                    this.search_loading = false;
                });
            },
            clearSearch() {
                this.search_entry = null;
            },
            goSummoner() {
                this.$router.push({ name: 'summoner_profile', params: { summoner: this.search_entry } });
            }
        },
        computed: {
            user() {
                return this.$store.state.user
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
        display: none;
        height: 65px;
        width: 100%;

        @media #{$bp-lg}{
            display: flex;
        }

        .logo {
            grid-area: logo;
            display: flex;
            padding: 25px;

            img {
                align-self: center;
                margin-left: 0;
            }
        }

        .search {
            display: flex;
            align-items: center;
            width: 250px;
            margin: 0 20px;
            position: relative;

            .search-input {
                height: 30px;
                width: 100%;
                border-radius: 10px;
                border: 1px solid #DFE3E8;
                padding: 5px;

                &:focus {
                    + .search-results {
                        display: block;
                    }
                }
            }

            .search-results {
                position: absolute;
                top: 100%;
                z-index: 500;
                text-align: right;
                width: 100%;
                border: 1px solid #DFE3E8;
                display: none;

                &:hover {
                    display: block;
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

                a {
                    color: $palette-primary;
                }

                .options-dropdown {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    width: 100px;
                    padding: 10px;
                    border-radius: 10px 2px 10px 10px;
                    background-color: white;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
                    transition: all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 0s linear 0.01s;
                    text-align: center;

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
