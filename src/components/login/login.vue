<template>
    <div class="login">
        <logo-bounce v-if="loading"></logo-bounce>
        <div class="wrapper" v-else v-cloak>
            <div class="logo">
                <img class="resp-img" alt="Ally.GG Logo" src="../../assets/images/logo.png">
            </div>
            <div class="error" v-if="errorMessage">
                {{ errorMessage }}
            </div>
            <h3 class="byline">Login to your account</h3>
            <form @submit.prevent="login" class="form">
                <div class="username">
                    <label for="username_input"><b>Username:</b></label>
                    <input id="username_input" v-model="username" placeholder="Enter your username..."
                           autocomplete="on" @keyup.enter="login">
                </div>
                <div class="password">
                    <label for="password_input"><b>Password:</b></label>
                    <input id="password_input" v-model="password" type="password"
                           placeholder="Enter your password..." autocomplete="on" @keyup.enter="login">
                </div>
            </form>
            <button class="submit" @click="login">Login</button>

            <div class="register">
                <span>Don't have an account yet?</span>
                <button class="register-button" @click="$router.push('/register')">Register</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    let mutation_login =
        `mutation TokenAuth($username: String!, $password: String!) {
          login(username: $username, password: $password) {
            user {
              token
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
                  profileIconId
                  summonerLevel
                  summonerId
                }
                darkMode
                premium
                premiumStart
                dateModified
                dateCreated
              }
            }
          }
        }`;

    export default {
        name: 'login-component',
        title: 'Login - Ally.GG',
        components: {},
        data() {
            return {
                // User Login
                username: '',
                password: '',

                // Loading Flags
                loading: false,

                // Error Handling
                errorMessage: null,
            }
        },
        methods: {
            login() {
                if (this.username && this.password) {
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

                        if (response.data.data.login !== null) {

                            // Get the user information from the response and set the userId in cookies.
                            let user = response.data.data.login.user;
                            this.$cookie.set('userId', user.id);

                            // Get the JWT token and set it in the Cookies to keep session.
                            let token = user.token;
                            this.$cookie.set('token', token);

                            // Put the user information in the current state.
                            this.$store.commit('setUser', user);

                            // Redirect to home.
                            this.$router.push('/');

                        } else {
                            this.loading = false;
                            this.errorMessage = 'The username or password entered is incorrect, please try again.';
                        }
                    });
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    .login {
        display: flex;
        flex-direction: column;
        text-align: center;
        position: relative;

        .wrapper {
            margin: auto;
            padding: 10px 50px;

            .logo {
                img {
                    width: 80%;
                    @media #{$bp-lg}{
                        width: 40%;
                    }
                }
            }

            .byline {
                margin: 25px 0;
            }

            .error {
                width: 100%;
                padding: 20px;
                background-color: $palette-loss;
                color: white;
                margin: 20px 0;
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
</style>
