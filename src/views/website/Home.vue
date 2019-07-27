<template>
    <div id="landing">
        <section id="cover" :style="{ 'background-image': 'url(' + getCover() + ')' }">
            <nav class="container">
                <router-link :to="{ name: 'landing' }">
                    <div class="logo-wrapper">
                        <img class="logo resp-img" alt="Ally.GG Logo" src="../../assets/images/logo-white.png">
                    </div>
                </router-link>

                <router-link :to="{ name: 'login' }">
                    <button>
                        Login
                    </button>
                </router-link>
            </nav>
            <div class="content">
                <div class="container">
                    <div class="blurb">
                        <h1 class="header">
                            Built to improve your League experience
                        </h1>
                        <h2 class="byline">
                            Ally.GG aims to be your all-in-1 solution for League of Legends statistics, community
                            building,
                            improvement tracking & much more.
                        </h2>
                        <div class="cta">
                            <router-link :to="{ name: 'register' }">
                                <button>
                                    Sign Up
                                </button>
                            </router-link>
                            <p class="note">
                                Not a member yet? Signing up is <span>completely free</span> and you can get started
                                immediately!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="features" class="container">
            <div class="content">
                <h3>
                    This is the cool stuff.
                </h3>
                <h2>
                    Keep track of your stats and focus on improvement.
                </h2>
                <div class="features">
                    <div class="feature">
                        <div class="icon">
                            <font-awesome-icon icon="users" size="3x"/>
                        </div>
                        <p>View in-depth details and immediate statistics on all Summoners across all regions.</p>
                    </div>
                    <div class="feature">
                        <div class="icon">
                            <font-awesome-icon icon="check-circle" size="3x"/>
                        </div>
                        <p>Log your personal improvement notes on each game to track progress and maintain
                            accountability.</p>
                    </div>
                </div>
            </div>
            <div class="hero">
                <img class="resp-img" alt="Ally.GG Summoner Page" src="../../assets/images/landing/hero.png">
            </div>
        </section>
        <section id="stats">
            <div class="content container">
                <div class="blurb">
                    <h2>❤️ We love data</h2>
                    <p>League of Legends comes with a lot of data to analyse, and we love it all. We focus on retaining
                        all
                        kills, runes, players & more to make sure we can provide our users with all the information
                        they'll
                        ever need. Not convinced yet? Take a look at some of these <strong>real*</strong> stats taken
                        straight from our database.</p>
                    <small>* These are placeholder numbers while under development..</small>
                </div>
                <div class="stats">
                    <div class="stat">
                        <div class="number">
                            <span>39.1</span> Million
                        </div>
                        <div class="label">
                            Summoner Profiles currently stored in Ally's database.
                        </div>
                    </div>
                    <div class="stat">
                        <div class="number">
                            <span>1.2</span> Billion
                        </div>
                        <div class="label">
                            Dead Teemo's.
                        </div>
                    </div>
                    <div class="stat">
                        <div class="number">
                            <span>410</span> Million
                        </div>
                        <div class="label">
                            Store Matches across all regions.
                        </div>
                    </div>
                    <div class="stat">
                        <div class="number">
                            <span>1.2</span> Thousand
                        </div>
                        <div class="label">
                            Ally.GG Registered Users.
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <footer class="container">
            <div class="logo-wrapper">
                <img class="logo resp-img" alt="Ally.GG Logo" src="../../assets/images/logo.png">
            </div>
            <div class="navigation">
                <h4>Navigation</h4>
                <ul>
                    <li>Home</li>
                    <li>Features</li>
                    <li>Login</li>
                    <li>Support</li>
                </ul>
            </div>
            <div class="social">
                <h4>Social</h4>
                <ul>
                    <li>Facebook</li>
                    <li>Twitter</li>
                    <li>Instagram</li>
                </ul>
            </div>
            <div class="business">
                <h4>Business</h4>
                <ul>
                    <li>Contact Us</li>
                    <li>Sponsors</li>
                    <li>Legal</li>
                    <li>Privacy</li>
                </ul>
            </div>
            <div class="subscribe">
                <h4>Subscribe</h4>
                <div class="input-wrapper">
                    <input id="subscribe-email" v-model="subscribeEmail" placeholder="Enter your email address"
                           autocomplete="on" @keyup.enter="subscribe" aria-label="Email Subscribe">
                    <div class="icon" @click="subscribe()">
                        <font-awesome-icon icon="paper-plane"/>
                    </div>
                </div>
                <p>Join our newsletter to stay up to ate on features and releases.</p>
            </div>
        </footer>
    </div>
</template>
<script>
    export default {
        name: 'landing',
        title: 'Ally.GG',
        data() {
            return {
                subscribeEmail: null,
            }
        },
        components: {},
        props: {},
        watch: {},
        methods: {
            getCover() {
                return require('../../assets/images/landing/cover.png');
            },
            subscribe() {

            }
        }
    }
</script>
<style scoped lang="scss">
    #ally-gg {
        #landing {
            #cover {
                height: 80vh;
                width: 100%;
                background-size: cover;

                nav {
                    height: 100px;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .logo-wrapper {
                        height: 100%;
                        width: 150px;
                    }

                    button {
                        padding: 10px 20px;
                    }
                }

                .content {
                    display: flex;
                    flex-direction: row-reverse;
                    color: white;
                    height: calc(100% - 100px);
                    padding: 0 100px;

                    .blurb {
                        width: 100%;
                        height: 100%;
                        padding-left: 50%;
                        text-align: right;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;

                        .header {
                            text-transform: uppercase;
                            font-size: 3.5rem;
                        }

                        .byline {
                            margin-top: 40px;
                            font-weight: normal;
                            font-size: 1.3rem;
                            padding-left: 100px;
                        }

                        .cta {
                            margin-top: 40px;
                            display: flex;
                            text-align: right;
                            padding-left: 200px;
                            align-items: center;

                            button {
                                padding: 5px 15px;
                                width: 160px;
                                height: 40px;
                            }

                            .note {
                                font-size: 0.8rem;
                                padding-left: 100px;

                                span {
                                    font-weight: bold;
                                }
                            }
                        }
                    }
                }
            }

            #features {
                display: grid;
                grid-template: auto / 50% 50%;
                margin: 75px auto;

                .content {
                    padding: 100px 0;

                    h2 {
                        font-size: 3rem;
                        text-transform: uppercase;
                        font-family: 'Panton Black', sans-serif;
                        margin-top: 20px;
                    }

                    h3 {
                        font-size: 1.2rem;
                        text-transform: uppercase;
                        font-family: 'Panton Black', sans-serif;
                    }

                    .features {
                        display: grid;
                        grid-template: auto / 50% 50%;
                        margin-top: 40px;

                        .feature {
                            display: flex;

                            .icon {
                                padding: 0 20px;
                                margin: 1em 0;
                            }

                            p {
                                padding: 0 40px;
                                font-size: 1.2rem;
                            }
                        }
                    }
                }

                .hero {
                }
            }

            #stats {
                background-color: #16181E;
                color: white;
                padding: 75px 0;

                .content {
                    .blurb {
                        h2 {
                            text-transform: uppercase;
                            font-family: 'Panton Black', sans-serif;
                            margin-top: 20px;
                            font-size: 3rem;
                        }

                        p {
                            padding-right: 50%;
                        }
                    }

                    .stats {
                        display: grid;
                        grid-template: auto / repeat(4, 1fr);
                        width: 100%;
                        margin-top: 50px;

                        .stat {
                            display: flex;
                            flex-direction: column;
                            align-items: center;

                            .number {
                                text-transform: uppercase;
                                font-size: 2rem;
                                font-weight: bold;

                                span {
                                    font-size: 4rem;
                                }
                            }
                        }
                    }
                }
            }

            footer {
                display: grid;
                grid-template: auto / repeat(4, 1fr) 2fr;
                grid-gap: 50px;
                padding-top: 75px;
                padding-bottom: 75px;

                .logo-wrapper {
                    height: 50px;
                }

                .navigation, .social, .business {
                    h4 {
                        text-transform: uppercase;
                        margin-bottom: 20px;
                        font-family: 'Panton Black', sans-serif;
                    }

                    ul {
                        li {
                            padding: 10px 0;
                        }
                    }
                }

                .subscribe {
                    h4 {
                        text-transform: uppercase;
                        margin-bottom: 20px;
                        font-family: 'Panton Black', sans-serif;
                    }

                    .input-wrapper {
                        width: 100%;
                        display: flex;


                        input {
                            border: none;
                            padding: 20px;
                            width: 90%;
                            color: rgba(0, 0, 0, 0.8);
                            background-color: rgba(0, 0, 0, 0.1);
                            border-radius: 2px 0 0 2px;

                            &::placeholder {
                                color: rgba(0, 0, 0, 0.5);
                                font-size: 1rem;
                            }
                        }

                        .icon {
                            background-color: rgba(0, 0, 0, 0.1);
                            display: flex;
                            align-items: center;
                            width: 10%;
                            color: rgba(0, 0, 0, 0.8);
                            border-radius: 0 2px 2px 0;
                            cursor: pointer;
                        }
                    }

                    p {
                        opacity: 0.6;
                    }
                }
            }
        }

        &.dark {
            #landing {
            }
        }
    }
</style>