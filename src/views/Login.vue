<template>
    <div id="login">
        <div class="content">
            <logo-bounce v-if="loading"></logo-bounce>
            <div id="form" v-else v-cloak>
                <div class="wrapper">
                    <div class="logo">
                        <img class="resp-img" alt="Ally.GG Logo" src="../assets/images/logo.png">
                    </div>
                    <h3 class="byline">Login to your account</h3>
                    <form @submit.prevent="login" class="form">
                        <div class="username">
                            <label for="username_input"><b>Username:</b></label>
                            <input id="username_input" v-model="username" placeholder="Enter your username..."
                                   autocomplete="on">
                        </div>
                        <div class="password">
                            <label for="password_input"><b>Password:</b></label>
                            <input id="password_input" v-model="password" type="password"
                                   placeholder="Enter your password..." autocomplete="on">
                        </div>
                    </form>
                    <button class="submit" @click="login">Login</button>

                    <div class="register">
                        <span>
                            Don't have an account yet?
                        </span>
                        <router-link to="#" class="register-button">Register</router-link>
                    </div>
                </div>
            </div>
            <footer>
                <ul>
                    <li>
                        <a href="#">Support</a>
                    </li>
                    <li>
                        <a href="#">Privacy</a>
                    </li>
                    <li>
                        <a href="#">Legal</a>
                    </li>
                </ul>
            </footer>
        </div>
        <div class="hero">
            <div class="image">
                <video autoplay muted loop id="neeko-hero">
                    <source src="../assets/images/neeko-hero-loop.mp4" type="video/mp4">
                </video>
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
                Summoners {
                  summonerName
                }
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
                    this.$store.commit('setUser', user);

                    // Redirect to home.
                    this.$router.push('/');
                });
            },
        }
    }
</script>

<style scoped lang="scss">
    #login {
        max-height: 100vh;
        display: grid;
        grid-template: auto / 40vw 60vw;
        grid-template-areas: 'content content';
        overflow: hidden;
        @media #{$bp-lg}{
            grid-template-areas: 'content hero';
        }

        .content {
            grid-area: content;
            background-color: white;
            z-index: 40;
            position: relative;
            display: grid;
            grid-template: auto 50px / auto;
            grid-template-areas: 'content' 'footer';
            padding: 50px;
            height: 100vh;

            #form {
                display: flex;
                flex-direction: column;
                text-align: center;

                .wrapper {
                    margin: auto;

                    .logo {
                        img {
                            width: 100%;
                            @media #{$bp-lg}{
                                width: 60%;
                            }
                        }
                    }

                    .byline {
                        margin: 25px 0;
                    }

                    form {
                        width: 100%;
                        margin: auto;
                        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                        @media #{$bp-lg}{
                            width: 60%;
                        }

                        .username, .password {
                            display: flex;
                            flex-direction: column;
                            padding: 10px 20%;
                            border: 1px solid #DFE3E8;
                        }

                        .username {
                            border-radius: 5px 5px 0 0;
                        }

                        .password {
                            border-radius: 0 0 5px 5px;
                            border-top: none;
                        }

                        label {
                            opacity: 0.6;
                            font-size: 0.8rem;
                            padding: 5px;
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

                    .submit {
                        width: 100%;
                        height: 50px;
                        background-color: $palette-accent;
                        color: white;
                        border: none;
                        text-transform: uppercase;
                        font-size: 1rem;
                        margin-top: 20px;
                        border-radius: 5px;
                        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                        @media #{$bp-lg}{
                            width: 60%;
                        }
                    }
                }

                .register {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-top: 50px;

                    .span {
                        opacity: 0.6;
                    }

                    .register-button {
                        width: 100%;
                        height: 50px;
                        background-color: white;
                        color: $palette-accent;
                        border: 1px solid #DFE3E8;
                        text-transform: uppercase;
                        font-size: 1rem;
                        margin-top: 5px;
                        border-radius: 5px;
                        box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
                        align-items: center;
                        display: flex;
                        justify-content: center;
                        @media #{$bp-lg}{
                            width: 60%;
                        }
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
        }

        .hero {
            grid-area: hero;
            height: 100vh;

            .image {
                height: 100vh;
                margin-left: -30%;

                video {
                    height: 100%;
                }
            }
        }
    }
</style>
