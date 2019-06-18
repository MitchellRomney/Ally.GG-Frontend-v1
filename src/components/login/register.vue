<template>
    <div class="register">
        <logo-bounce v-if="loading"></logo-bounce>
        <div class="wrapper" v-else v-cloak>
            <div class="logo">
                <img class="resp-img" alt="Ally.GG Logo" src="../../assets/images/logo.png">
            </div>
            <div v-if="!user_registered">
                <h3 class="byline">Register your account.</h3>
                <form @submit.prevent="register" class="form">
                    <div class="username" :class="{ valid : valid_username, invalid : valid_username === false }">
                        <label for="username_input"><b>Username:</b></label>
                        <input id="username_input" v-model="username" placeholder="Create your username..."
                               autocomplete="on">
                    </div>
                    <div class="email" :class="{ valid : valid_email, invalid : valid_email === false }">
                        <label for="email"><b>Email:</b></label>
                        <input id="email" v-model="email" placeholder="Enter your email..." autocomplete="on">
                    </div>
                    <div class="password" :class="{ valid : valid_password, invalid : valid_password === false }">
                        <div class="password1">
                            <label for="password_input"><b>Password:</b></label>
                            <input id="password_input" v-model="password" type="password"
                                   placeholder="Create your password..." autocomplete="off">
                        </div>
                        <div class="password2">
                            <label for="password_input2"><b>Enter Password Again:</b></label>
                            <input id="password_input2" v-model="password2" type="password"
                                   placeholder="Re-Enter your password..." autocomplete="off">
                        </div>
                    </div>
                    <div class="key" :class="{ valid : valid_key, invalid : valid_key === false }">
                        <label for="key"><b>Early Access Key:</b></label>
                        <input id="key" v-model="key" placeholder="Enter your Access Key..."
                               spellcheck="false" autocomplete="off">
                    </div>
                </form>
                <button class="submit" :class="{ disabled : !valid_form }" @click="register">Register</button>

                <div class="login">
                    <span>Already have an account?</span>
                    <button class="login-button" @click="$router.push('/login')">Login</button>
                </div>
            </div>
            <div class="registered" v-else v-cloak>
                <h3>Your account with Ally.GG has been registered! Check your email to confirm and login.</h3>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    let query_checkUserExists =
        `query CheckUserExists($username: String!){
          user(username: $username){
            id
          }
        }`;

    let query_checkAccessKey =
        `query checkAccessKey($key: String!){
          key(key: $key){
            used
          }
        }`;

    let mutation_register =
        `mutation Register($username: String!, $password: String!, $email: String!, $key: String!){
          register(input: {username: $username, password: $password, email: $email, key: $key}){
            success
            errors
          }
        }`;

    let mutation_login =
        `mutation TokenAuth($username: String!, $password: String!) {
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
                  summonerId
                }
                dateModified
                dateCreated
              }
            }
          }
        }`;

    export default {
        name: 'register',
        title: 'Register - Ally.GG',
        components: {},
        data() {
            return {
                // Registration
                username: '',
                password: '',
                password2: '',
                email: '',
                key: '',

                // Valid Fields
                valid_username: null,
                valid_password: null,
                valid_email: null,
                valid_key: null,

                // Loading
                loading: false,
                username_loading: false,
                password_loading: false,
                password2_loading: false,
                email_loading: false,
                key_loading: false,

                // User Registered
                user_registered: false,
            }
        },
        watch: {
            username(after, before) {
                this.username_loading = true;
                setTimeout(() => {
                    if (after === this.username) {
                        this.checkUserExists();
                    }
                }, 1000);
            },
            email(after, before) {
                this.email_loading = true;
                setTimeout(() => {
                    if (after === this.email) {
                        this.checkEmail();
                    }
                }, 1000);
            },
            password(after, before) {
                this.password_loading = true;
                setTimeout(() => {
                    if (after === this.password) {
                        this.checkPasswords();
                    }
                }, 1000);
            },
            password2(after, before) {
                this.password2_loading = true;
                setTimeout(() => {
                    if (after === this.password2) {
                        this.checkPasswords();
                    }
                }, 1000);
            },
            key(after, before) {
                this.key_loading = true;
                setTimeout(() => {
                    if (after === this.key) {
                        this.checkKey();
                    }
                }, 1000);
            },
        },
        computed: {
            valid_form() {
                return this.valid_username && this.valid_password && this.valid_email && this.valid_key
            }
        },
        methods: {
            register() {
                if (this.valid_form) {
                    this.loading = true;

                    axios({
                        method: "POST",
                        url: process.env.VUE_APP_API_URL + '/graphql',
                        data: {
                            query: mutation_register,
                            variables: {
                                username: this.username,
                                password: this.password,
                                email: this.email,
                                key: this.key
                            },
                        }
                    }).then((response) => {
                        if (response.data.data.register.success) {
                            this.login();
                            this.loading = false;
                            this.user_registered = true;
                        }
                    });
                }
            },
            login() {
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
                });
            },
            checkUserExists() {
                axios({
                    method: "POST",
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    data: {
                        query: query_checkUserExists,
                        variables: {
                            username: this.username
                        },
                    }
                }).then((response) => {
                    this.valid_username = response.data.data.user == null;
                });
            }
            ,
            checkEmail() {
                let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                this.valid_email = regex.test(String(this.email).toLowerCase());
            }
            ,
            checkPasswords() {
                this.valid_password = this.password === this.password2;
            }
            ,
            checkKey() {
                axios({
                    method: "POST",
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    data: {
                        query: query_checkAccessKey,
                        variables: {
                            key: this.key
                        },
                    }
                }).then((response) => {
                    if (response.data.data.key !== null) {
                        this.valid_key = !response.data.data.key.used;
                    } else {
                        this.valid_key = false;
                    }
                });
            },
        },
        mounted() {
        }
    }
</script>

<style scoped lang="scss">
    .register {
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

            form {
                width: 100%;
                margin: auto;
                @media #{$bp-lg}{
                    width: 60%;
                }

                .username, .password, .email, .key {
                    display: flex;
                    flex-direction: column;
                    padding: 10px 5%;
                    border: 1px solid #DFE3E8;
                    border-radius: 5px;
                    margin-bottom: 10px;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);

                    .password1, .password2 {
                        display: flex;
                        flex-direction: column;
                    }

                    .password1 {
                        padding-bottom: 10px;
                    }

                    &:last-child {
                        margin-bottom: 0;
                    }

                    &.valid {
                        border-color: $palette-win;
                        color: $palette-win;
                    }

                    &.invalid {
                        border-color: $palette-loss;
                        color: $palette-loss;
                    }
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

                &.disabled {
                    background-color: lightgrey;
                    cursor: initial;
                }
            }
        }

        .registered {
            margin-top: 50px;
            font-size: 1.2rem;
        }

        .login {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 50px;

            .span {
                opacity: 0.6;
            }

            .login-button {
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

