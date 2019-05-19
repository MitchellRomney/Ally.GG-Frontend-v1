<template>
    <div id="login">
        <nav id="navigation">
            <a class="logo">
                <img class="resp-img" alt="Ally.GG Logo" src="../assets/logo.png">
            </a>
            <ul>
                <li>
                    <a href="/register">Register</a>
                </li>
                <li>
                    <a href="/contact">Contact</a>
                </li>
            </ul>
        </nav>
        <div class="angle"></div>
        <div class="content">
            <pulse-loader v-if="loading"></pulse-loader>
            <div class="reg-form" v-else v-cloak>
                <div class="blurb">
                    <h2 class="welcome">Welcome to <span>Ally.GG</span></h2>
                    <h3 class="byline">Let's improve your League of Legends experience.</h3>
                </div>
                <div class="form">
                    <div class="username">
                        <label for="username_input"><b>Username:</b></label>
                        <input id="username_input" v-model="username" placeholder="Enter your username...">
                    </div>
                    <div class="password">
                        <label for="password_input"><b>Password:</b></label>
                        <input id="password_input" v-model="password" type="password"
                               placeholder="Enter your password...">
                    </div>
                </div>
                <button class="submit" @click="login">login</button>
            </div>
        </div>
        <footer>
            <ul>
                <li>
                    <a href="/support">Support</a>
                </li>
                <li>
                    <a href="/privacy">Privacy</a>
                </li>
                <li>
                    <a href="/legal">Legal</a>
                </li>
            </ul>
        </footer>
        <div class="hero">
            <div class="image">
                <video autoplay muted loop id="neeko-hero">
                    <source src="../assets/images/neeko-hero-loop.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <!-- <img src="https://cdna.artstation.com/p/assets/images/images/014/192/376/large/jennifer-wuestling-neeko.jpg" alt="Neeko Hero Image" /> -->
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

    let mutation_login =
        `
        mutation TokenAuth($username: String!, $password: String!) {
          tokenAuth(username: $username, password: $password) {
            token
            user {
              id
              username
              firstName
              lastName
              isStaff
              isActive
              isSuperuser
              lastLogin
              dateJoined
              Profiles {
                id
                dateModified
                dateCreated
              }
            }
          }
        }
        `;

    export default {
        name: 'login',
        title: 'Login - Ally.GG',
        components: {
            PulseLoader
        },
        data() {
            return {
                // User Login
                username: '',
                password: '',

                // Loading Flags
                loading: false,

                // Error Handling
                isError: false,
                errorMessage: '',
            }
        },
        methods: {
            login() {
                this.loading = true;

                axios({
                    method: "POST",
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    data: {
                        query: mutation_login,
                        variables: {
                            username: this.username,
                            password: this.password
                        },
                    }
                }).then((response) => {

                    // Get the JWT token and set it in the Cookies to keep session.
                    let token = response.data.data.tokenAuth.token;
                    this.$cookie.set('token', token);

                    // Get the user information from the response and set the userId in cookies.
                    let user = response.data.data.tokenAuth.user;
                    this.$cookie.set('userId', user.id);

                    // Put the user information in the current state.
                    this.$store.state.user = user;

                    // Redirect to home.
                    this.$router.push('/');
                });
            },
        }
    }
</script>

<style scoped lang="scss">
    .v-spinner {
        background-color: white;
    }

    #login {
        max-height: 100vh;
        display: grid;
        grid-template: 100px auto 50px / 40vw 15vw 45vw;
        grid-template-areas: 'nav nav hero' 'content angle hero' 'footer angle hero';
        overflow: hidden;

        #navigation {
            grid-area: nav;
            background-color: white;
            z-index: 50;
            display: flex;

            .logo {
                img {
                    margin-left: 0;
                    padding: 20px 0 20px 40px;
                }
            }

            ul {
                display: flex;
                justify-content: flex-end;
                width: 100%;

                li {
                    margin: auto 20px;
                }
            }
        }

        .angle {
            grid-area: angle;
            z-index: 30;
            width: 0;
            height: 0;
            border-right: 20vw solid transparent;
            border-top: 100vh solid white;
            margin-top: -100px;
            filter: drop-shadow(30px 0px 5px rgba(0, 0, 0, 0.2));
        }

        .content {
            grid-area: content;
            background-color: white;
            z-index: 40;
            position: relative;

            .reg-form {
                padding: 0 40px;

                .blurb {
                    margin: 30px 0;

                    .welcome {
                        font-size: 2rem;
                        margin-bottom: 1rem;

                        span {
                            color: white;
                            background-color: $palette-accent;
                        }
                    }

                    .byline {
                        font-weight: normal;
                        color: $palette-primary;
                    }
                }

                form {
                    margin-top: 6vh;

                    .fields {
                        display: grid;
                        grid-template: auto / 1fr 1fr;
                        grid-gap: 20px;

                        .field {
                            display: flex;
                            flex-direction: column;

                            label {
                                padding: 5px 0;
                            }

                            .input-group {
                                display: flex;

                                input {
                                    width: 100%;
                                    padding: 20px 10px;
                                    background-color: #f7f7f7;
                                    border: none;
                                    border-bottom: 1px solid $palette-primary;
                                }
                            }

                            &.username {
                                grid-column: span 2;
                            }

                            &.email {
                                grid-column: span 2;
                            }

                            &.key {
                                grid-column: span 2;
                            }
                        }
                    }
                }

                .submit {
                    width: 100%;
                    height: 50px;
                    background-color: $palette-accent;
                    color: white;
                    border: none;
                    text-transform: uppercase;
                    font-size: 1rem;
                    margin-top: 50px;
                }
            }
        }

        footer {
            grid-area: footer;
            width: 100%;
            background-color: white;
            z-index: 20;
            display: flex;
            justify-content: center;
            align-items: center;

            ul {
                display: flex;
                width: 100%;
                justify-content: space-evenly;

                li {
                    a {
                        color: $palette-primary;
                    }
                }
            }
        }

        .hero {
            grid-area: hero;

            .image {
                height: 100vh;
                margin-left: -80%;
            }
        }
    }
</style>
