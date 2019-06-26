<template>
    <div id="verify-modal">
        <div class="modal-wrapper">
            <div class="modal-container">
                <button class="close" @click="$emit('close')">
                    X
                </button>

                <div class="modal-header" v-if="!verified">
                    <h2 class="header">
                        Connect your Summoner to your Ally.GG account
                    </h2>
                </div>

                <div class="modal-body">
                    <transition name="fade" mode="out-in">
                        <PulseLoader v-if="loading" :color="'#FF0081'" key="1"></PulseLoader>
                        <div class="step1" v-else-if="!loading && !verified && verify_key === ''" key="2">
                            <h3>Enter your Summoner's name & server:</h3>
                            <form @submit.prevent="getKey">
                                <div class="summonerName">
                                    <label for="summonerName">Summoner Name</label>
                                    <input id="summonerName" v-model="summonerName"
                                           placeholder="Enter your Summoner name..."
                                           autocomplete="on" @keyup.enter="getKey">

                                </div>
                                <div class="server">
                                    <label for="server">Server</label>
                                    <select id="server" name="server" v-model="server">
                                        <option disabled value="">Select your server</option>
                                        <option value="BR1">Brazil</option>
                                        <option value="EUN1">EU Nordic & East</option>
                                        <option value="EUW1">EU West</option>
                                        <option value="JP1">Japan</option>
                                        <option value="KR">Korea</option>
                                        <option value="LA1">Latin America North</option>
                                        <option value="LA2">Latin America South</option>
                                        <option value="NA1">North America</option>
                                        <option value="OC1">Oceania</option>
                                        <option value="TR1">Turkey</option>
                                        <option value="RU">Russia</option>
                                        <option value="PBE1">Public Beta Environment</option>
                                    </select>
                                </div>
                            </form>
                            <button :class="{ disabled: summonerName === '' || server === '' }" @click="getKey">Next
                            </button>
                        </div>
                        <div class="step2" v-else-if="!loading && !verified && verify_key !== ''">
                            <p>To verify that you own this Summoner, log into your account for <span>{{ summonerName }}</span>
                            in the League of Legends client. Then head to your client settings, find the 'Verification' tab
                            under the 'About' section, then enter the below code into the given field and press save. Once
                            saved, hit the 'Verify' button below.</p>
                            <strong>Verification Code:</strong> {{ verify_key }}
                            <button @click="verify">Verify</button>
                        </div>
                        <div class="verified" v-else-if="!loading && verified" key="3">
                            Congratulations, <span>{{ summonerName }}</span> is verified and connected to your Ally.GG
                            account.
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

    let query_getKey =
        `query GetKey($summonerName: String!, $userId: Int!, $server: String!){
          thirdParty(summonerName: $summonerName, userId: $userId, server: $server){
            id
            verified
            key
          }
        }`;

    let mutate_verifySummoner =
        `mutation VerifySummoner($verificationId: Int!){
          verifySummoner(verificationId: $verificationId){
            verified
            summoner {
              summonerName
              profileIconId
              summonerLevel
              summonerId
            }
            profile {
              user {
                username
              }
            }
          }
        }`;

    export default {
        name: 'verify',
        title: 'Verify - Ally.GG',
        components: {
            PulseLoader
        },
        data() {
            return {
                // User Input
                summonerName: '',
                server: '',

                // Key
                verify_key: '',
                key_id: null,

                // Flags
                loading: false,
                verified: false,
                failed: false,
            }
        },
        methods: {
            getKey() {
                // Show loading icon.
                this.loading = true;

                // Make callout for information.
                axios({
                    method: "POST",
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    data: {
                        query: query_getKey,
                        variables: {
                            summonerName: this.summonerName,
                            userId: this.$store.state.user.id,
                            server: this.server
                        },
                    }
                }).then((response) => {

                    // Load data into variable.
                    let data = response.data.data.thirdParty;

                    this.key_id = data.id;

                    if (!data.verified) {
                        // Send key to render.
                        this.verify_key = data.key;
                    } else {
                        // Tell user that they're already verified.
                        this.verified = true;
                    }

                    // Remove loading indicator.
                    this.loading = false;
                })
            },
            verify() {
                // Show loading icon.
                this.loading = true;

                // Make callout for information.
                axios({
                    method: "POST",
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    data: {
                        query: mutate_verifySummoner,
                        variables: {
                            verificationId: this.key_id
                        },
                    }
                }).then((response) => {

                    // Load data into variable.
                    let data = response.data.data.verifySummoner;

                    if (data.verified) {
                        this.verified = true;
                        this.$store.commit('addSummoner', data.summoner);
                    } else {
                        this.failed = true;
                    }

                    // Remove loading indicator.
                    this.loading = false;
                })
            }
        }
    }
</script>

<style scoped lang="scss">

    #verify-modal {
        position: fixed;
        z-index: 2000;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, .5);
        display: flex;
        transition: opacity .3s ease;

        .modal-wrapper {
            display: flex;
            width: 100%;

            .modal-container {
                margin: auto 20px;
                background-color: #fff;
                box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
                transition: all .3s ease;
                border: 3px solid #f4f4f4;
                border-radius: 20px;
                position: relative;
                z-index: 2100;
                min-height: 300px;
                display: flex;
                flex-direction: column;

                @media #{$bp-md}{
                    width: 600px;
                    margin: auto;
                }

                .close {
                    position: absolute;
                    right: 10px;
                    top: 10px;
                    background-color: transparent;
                    color: $palette-primary;
                    opacity: 0.8;
                }

                .modal-header {
                    padding: 20px;
                    text-align: center;
                    border-bottom: 3px solid #f4f4f4;

                    .header {
                        padding-right: 20px;
                    }
                }

                .modal-body {
                    padding: 20px;
                    position: relative;
                    min-height: 200px;
                    margin: auto;
                    display: flex;
                    align-items: center;
                    width: 100%;

                    .step1 {
                        display: flex;
                        flex-direction: column;
                        margin: auto;

                        form {
                            width: 100%;
                            margin: 20px auto;
                            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

                            .summonerName, .server {
                                display: flex;
                                flex-direction: column;
                                padding: 10px 10%;
                                border: 1px solid #DFE3E8;
                            }

                            .summonerName {
                                border-radius: 5px 5px 0 0;
                            }

                            .server {
                                border-radius: 0 0 5px 5px;
                                border-top: none;
                            }

                            label {
                                opacity: 0.6;
                                font-size: 0.8rem;
                                padding: 5px;
                                text-align: center;
                            }

                            input {
                                border: none;
                                text-align: center;
                                font-size: 1rem;
                                font-family: 'Panton', sans-serif;

                                &:-webkit-autofill {
                                    -webkit-box-shadow: 0 0 0 30px white inset !important;

                                    &:hover {
                                        -webkit-box-shadow: 0 0 0 30px white inset !important;
                                    }

                                    &:focus {
                                        -webkit-box-shadow: 0 0 0 30px white inset !important;
                                    }

                                    &:active {
                                        -webkit-box-shadow: 0 0 0 30px white inset !important;
                                    }
                                }
                            }
                        }

                        button {
                            &.disabled {
                                cursor: none;
                                background-color: grey;
                            }
                        }
                    }

                    .step2 {
                        display: flex;
                        flex-direction: column;
                        margin: auto;
                        text-align: center;

                        p {
                            margin-bottom: 20px;

                            span {
                                color: $palette-accent;
                                font-weight: bold;
                            }
                        }

                        button {
                            margin-top: 20px;
                        }
                    }

                    .verified {
                        font-weight: bold;
                        text-align: center;
                        font-size: 1.2rem;

                        span {
                            color: $palette-accent;
                        }
                    }


                    .v-spinner {
                        background-color: white;
                        height: 100%;
                        border: none;
                        border-radius: 20px;
                    }
                }
            }
        }
    }
</style>