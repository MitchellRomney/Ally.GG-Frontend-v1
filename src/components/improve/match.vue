<template>
    <div id="match" class="container">
        <transition name="fade">
            <logo-bounce v-if="loading"></logo-bounce>
            <div class="content" v-if="!loading">
                <h1 class="header">Match {{ match.gameId }}</h1>
                <div class="log" v-if="!emptyLog || editLog">
                    <h2 class="header">
                        Improvement Log
                        <button @click="updateImprovementLog" v-if="editLog">Save</button>
                        <button @click="editLog = true" v-else>Edit</button>
                    </h2>
                    <div>
                        <h4>What I did well:</h4>
                        <div v-if="editLog">
                            <editor-menu-bar :editor="good_editor" v-slot="{ commands, isActive }">
                                <button :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
                                    Bold
                                </button>
                            </editor-menu-bar>
                            <editor-content :editor="good_editor"/>
                        </div>
                        <span v-else v-html="log_good"></span>
                    </div>
                    <div>
                        <h4>What I need to improve on:</h4>
                        <editor-content :editor="bad_editor" v-if="editLog"/>
                        <span v-else v-html="log_bad"></span>
                    </div>
                    <form>
                        <div>
                            <label for="lpInput" v-if="player.win">LP Gained:</label>
                            <label for="lpInput" v-else>LP Lost:</label>
                            <input id="lpInput" type="number" v-model="log_lp" v-if="editLog"/>
                            <span v-else>{{ log_lp }}</span>
                        </div>
                        <div>
                            <h4 v-if="log_opponent.length > 1">Opponents:</h4>
                            <h4 v-else>Opponent:</h4>
                            <span v-for="champion in log_opponent"> {{ champion.name }}</span>
                        </div>
                    </form>
                </div>
                <div class="empty-log" v-else>
                    <h2 class="header">Improvement Log
                        <button @click="editLog = true">Improve</button>
                    </h2>
                    You haven't logged your personal development thoughts on this game yet.
                </div>
                <div class="players">
                    <h2 class="header">Players</h2>
                    <div class="player" v-for="player in match.players">
                        <router-link
                                :to="{ name: 'summoner_profile', params: { summoner: player.summoner.summonerName }}">
                            {{ player.summoner.summonerName }}
                        </router-link>
                        <div class="stats">
                            <div class="items">
                                <div class="trinket">
                                    <img v-if="player.item6.itemId !== 0"
                                         :src="getItemUrl(player.item6.itemId)"
                                         :alt="player.item6.name">
                                </div>
                                <div class="item-1">
                                    <img v-if="player.item0.itemId !== 0"
                                         :src="getItemUrl(player.item0.itemId)"
                                         :alt="player.item0.name"/>
                                </div>
                                <div class="item-2">
                                    <img v-if="player.item1.itemId !== 0"
                                         :src="getItemUrl(player.item1.itemId)"
                                         :alt="player.item1.name"/>
                                </div>
                                <div class="item-3">
                                    <img v-if="player.item2.itemId !== 0"
                                         :src="getItemUrl(player.item2.itemId)"
                                         :alt="player.item2.name"/>
                                </div>
                                <div class="item-4">
                                    <img v-if="player.item3.itemId !== 0"
                                         :src="getItemUrl(player.item3.itemId)"
                                         :alt="player.item3.name"/>
                                </div>
                                <div class="item-5">
                                    <img v-if="player.item4.itemId !== 0"
                                         :src="getItemUrl(player.item4.itemId)"
                                         :alt="player.item4.name"/>
                                </div>
                                <div class="item-6">
                                    <img v-if="player.item5.itemId !== 0"
                                         :src="getItemUrl(player.item5.itemId)"
                                         :alt="player.item5.name"/>
                                </div>
                                <div class="summoner-1">
                                    <img :src="getSSpellUrl(player.spell1Id)"
                                         :alt="player.spell1Id.name"/>
                                </div>
                                <div class="summoner-2">
                                    <img :src="getSSpellUrl(player.spell2Id)"
                                         :alt="player.spell2Id.name"/>
                                </div>
                                <div class="rune-primary">
                                    <img :src="getPrimaryRuneUrl(player.perk0)"
                                         :alt="player.perk0.name"/>
                                </div>
                                <div class="rune-secondary">
                                    <img :src="getSecondaryStyleUrl(player.perkSubStyle)"
                                         :alt="player.perk4.name"/>
                                </div>
                            </div>
                            <div class="player-info">
                                <div class="level">Level {{ player.champLevel }}</div>
                                <div class="kda">{{ player.kills }}/{{ player.deaths }}/{{ player.assists }}</div>
                                <div class="average">{{ player.kdaAverage }} KDA</div>
                            </div>
                            <div class="sub-info">
                                <div class="farm">{{ player.totalMinionsKilled }} ({{ player.csPmin }}) CS</div>
                                <div class="kill_p">Kill Participation<br><span>{{ player.killParticipation }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import axios from 'axios'
    import {Editor, EditorContent, EditorMenuBar} from 'tiptap'
    import {Bold} from 'tiptap-extensions'

    let query_getMatch =
        `query ($gameId: Int!, $summonerId: String = "") {
          log(summonerId: $summonerId, gameId: $gameId) {
            good
            bad
            lp
            opponent {
              name
            }
          }
          player(summonerId: $summonerId, gameId: $gameId) {
            summoner {
              summonerName
            }
            champion {
              name
              champId
            }
            lane
            win
            kills
            deaths
            assists
            kdaAverage
            champLevel
            killParticipation
            totalMinionsKilled
            csPmin
            item0 {
              itemId
              name
            }
            item1 {
              itemId
              name
            }
            item2 {
              itemId
              name
            }
            item3 {
              itemId
              name
            }
            item4 {
              itemId
              name
            }
            item5 {
              itemId
              name
            }
            item6 {
              itemId
              name
            }
            spell1Id {
              name
              imageFull
            }
            spell2Id {
              name
              imageFull
            }
            perk0 {
              name
              icon
            }
            perkSubStyle
            perk4 {
              name
            }
          }
          match(gameId: $gameId) {
            platformId
            gameId
            seasonId
            mapId
            players {
              summoner {
                summonerName
              }
              champion {
                name
                champId
              }
              lane
              win
              kills
              deaths
              assists
              kdaAverage
              champLevel
              killParticipation
              totalMinionsKilled
              csPmin
              item0 {
                itemId
                name
              }
              item1 {
                itemId
                name
              }
              item2 {
                itemId
                name
              }
              item3 {
                itemId
                name
              }
              item4 {
                itemId
                name
              }
              item5 {
                itemId
                name
              }
              item6 {
                itemId
                name
              }
              spell1Id {
                name
                imageFull
              }
              spell2Id {
                name
                imageFull
              }
              perk0 {
                name
                icon
              }
              perkSubStyle
              perk4 {
                name
              }
            }
            gameMode
            gameType
            gameVersion
            timestamp
            queue
            timeago
            gameDurationTime
          }
        }`;

    let mutation_updateImprovmentLog =
        `
        mutation UpdateImprovementLog($summonerId: String!, $gameId: Int!, $good: String!, $bad: String!, $lp: Int!, $opponent: [String!]) {
          updateImprovementLog(input: {summonerId: $summonerId, gameId: $gameId, good: $good, bad: $bad, lp: $lp, opponent: $opponent}) {
            result
          }
        }
        `;

    export default {
        name: 'match',
        title: 'Match - Ally.GG',
        props: {
            champion: Object,
            summoner: Object,
        },
        components: {
            EditorContent,
            EditorMenuBar,
        },
        data() {
            return {
                // Data
                match: {},
                player: {},

                // Editing
                editLog: false,
                good_editor: null,
                bad_editor: null,
                lp_editor: null,
                opponent_editor: null,

                // Log
                log_good: null,
                log_bad: null,
                log_lp: null,
                log_opponent: [],
                emptyLog: false,

                // Loading Flags
                loading: true,

                // Error Handling
                isError: false,
                errorMessage: '',
            }
        },
        computed: {
            gameId() {
                return this.$route.params.match
            },
        },
        watch: {
            match() {
                this.loadEditors();
            },
        },
        methods: {
            getChampionSplashUrl(champion) {
                if (champion.champId === 'FiddleSticks') {
                    return require('../../assets/images/champion-loading/Fiddlesticks_0.jpg');
                } else {
                    return require('../../assets/images/champion-loading/' + champion.champId + '_0.jpg');
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
            },
            getMatchInfo() {
                axios({
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    method: 'post',
                    data: {
                        query: query_getMatch,
                        variables: {
                            gameId: this.gameId,
                            summonerId: this.summoner.summonerId
                        },
                    }
                }).then((response) => {
                    let log = response.data.data.log;

                    // Match Data
                    this.match = response.data.data.match;

                    // Player Data
                    this.player = response.data.data.player;

                    // Log Data
                    if (log) {
                        this.log_good = log.good;
                        this.log_bad = log.bad;
                        this.log_lp = log.lp;
                        this.log_opponent = log.opponent;

                        this.loadEditors();
                    } else {
                        this.emptyLog = true;
                    }

                    // Loading
                    this.loading = false;
                });
            },
            updateImprovementLog() {
                this.log_good = this.good_editor.getHTML();
                this.log_bad = this.bad_editor.getHTML();
                this.editLog = false;

                axios({
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    method: 'post',
                    data: {
                        query: mutation_updateImprovmentLog,
                        variables: {
                            summonerId: this.summoner.summonerId,
                            gameId: this.gameId,
                            good: this.log_good,
                            bad: this.log_bad,
                            lp: this.log_lp,
                            opponent: [],

                        },
                    }
                }).then((response) => {
                    this.loading = false;
                    this.editLog = false;
                });
            },
            loadEditors() {
                // Good
                if (this.log_good) {
                    this.good_editor = new Editor({
                        extensions: [
                            new Bold(),
                        ],
                        content: this.log_good,
                    });
                } else {
                    this.good_editor = new Editor({
                        extensions: [
                            new Bold(),
                        ],
                        content: '<p></p>',
                    })
                }

                // Bad
                if (this.log_bad) {
                    this.bad_editor = new Editor({
                        extensions: [
                            new Bold(),
                        ],
                        content: this.log_bad,
                    });
                } else {
                    this.bad_editor = new Editor({
                        extensions: [
                            new Bold(),
                        ],
                        content: '<p></p>',
                    })
                }

                this.lp_editor = new Editor({
                    content: this.log_lp,
                });
                this.opponent_editor = new Editor({
                    // content: this.log_opponent,
                });
            }
        },
        mounted() {
            this.getMatchInfo();
        }
    }
</script>

<style scoped lang="scss">
    #match {
        position: relative;
        height: 100%;
        padding: 20px;

        .content {

            .header {
                margin-bottom: 10px;
            }

            .log, .empty-log {
                .header {
                    border-bottom: 1px solid #DFE3E8;
                }
            }

            .players {
                display: grid;
                grid-template: auto / 1fr 1fr;
                grid-gap: 10px;
                margin: 20px 0;

                .header {
                    grid-column: span 2;
                    border-bottom: 1px solid #DFE3E8;
                }

                .player {
                    .stats {
                        display: flex;
                        text-align: center;

                        .items {
                            display: grid;
                            grid-template: 1fr 1fr / repeat(6, 1fr);
                            grid-template-areas: "trinket item1 item2 item3 summoner1 rune-primary" "trinket item4 item5 item6 summoner2 rune-secondary";
                            align-items: center;
                            grid-gap: 2px;

                            img {
                                width: 30px;
                                border-radius: 5px;
                            }

                            .trinket, .item-1, .item-2, .item-3, .item-4, .item-5, .item-6, .summoner-1, .summoner-2 {
                                height: 30px;
                                width: 30px;
                                background-color: lightgrey;
                                border-radius: 4px;
                            }

                            .trinket {
                                grid-area: trinket;
                                margin-right: 4px;
                            }

                            .item-1 {
                                grid-area: item1;
                                align-self: end;
                            }

                            .item-2 {
                                grid-area: item2;
                                align-self: end;
                            }

                            .item-3 {
                                grid-area: item3;
                                align-self: end;
                            }

                            .item-4 {
                                grid-area: item4;
                                align-self: start;
                            }

                            .item-5 {
                                grid-area: item5;
                                align-self: start;
                            }

                            .item-6 {
                                grid-area: item6;
                                align-self: start;
                            }

                            .summoner-1 {
                                grid-area: summoner1;
                                align-self: end;
                                margin-left: 4px;
                            }

                            .summoner-2 {
                                grid-area: summoner2;
                                align-self: start;
                                margin-left: 4px;

                            }

                            .rune-primary {
                                grid-area: rune-primary;
                                align-self: end;
                                margin: 0 4px;
                            }

                            .rune-secondary {
                                grid-area: rune-secondary;
                                align-self: start;
                                margin: 0 4px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>