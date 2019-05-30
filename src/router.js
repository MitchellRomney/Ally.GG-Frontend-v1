import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UserProfile from './views/UserProfile'
import Login from './views/Login.vue'
import Leaderboard from './views/Leaderboard.vue'
import Summoners from './views/Summoners.vue'
import SummonerProfile from './views/SummonerProfile.vue'
import SummonerProfile_General from './components/summoner_profile/general.vue'
import SummonerProfile_Matches from './components/summoner_profile/matches.vue'
import SummonerProfile_Champions from './components/summoner_profile/champions.vue'
import SummonerProfile_Achievements from './components/summoner_profile/achievements.vue'
import VueCookie from 'vue-cookie'
import Vuex from "vuex";
import store from './store.js';
import axios from "axios";
import * as JWT from 'jwt-decode';


Vue.use(VueCookie);
Vue.use(Vuex);

Vue.use(Router);

let query_fetchUser =
    `
    query fetchUser($id: Int) {
      user(id: $id) {
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
    `;

let mutation_refreshToken =
    `
    mutation RefreshToken($token: String!) {
      refreshToken(token: $token) {
        token
        payload
      }
    }
    `;

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            meta: {
                requiresAuth: true
            },
            component: Home,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/profiles/:user',
            name: 'user_profile',
            meta: {
                requiresAuth: true
            },
            component: UserProfile
        },
        {
            path: '/leaderboard',
            name: 'leaderboard',
            meta: {
                requiresAuth: true
            },
            component: Leaderboard
        },
        {
            path: '/summoners/',
            meta: {
                requiresAuth: true
            },
            name: 'summoners',
            component: Summoners,
        },
        {
            path: '/summoners/:summoner',
            redirect: 'summoners/:summoner/general',
            name: 'summoner_profile',
            meta: {
                requiresAuth: true,
            },
            component: SummonerProfile,
            children: [
                {
                    path: 'general',
                    component: SummonerProfile_General
                },
                {
                    path: 'matches',
                    component: SummonerProfile_Matches
                },
                {
                    path: 'champions',
                    component: SummonerProfile_Champions
                },
                {
                    path: 'achievements',
                    component: SummonerProfile_Achievements
                }
            ]
        },
    ]
});

router.beforeEach((to, from, next) => {

    let token = Vue.cookie.get('token');
    let token_expired = false;

    if (token) {
        // If there is a JWT token, always use it as Auth header.
        Vue.prototype.$http.defaults.headers.common['Authorization'] = 'JWT ' + token;

        let token_payload = JWT(token);
        let token_creation = new Date(token_payload.origIat * 1000);
        let token_expiry = new Date(token_payload.exp * 1000);

        if (token_creation.addDays(7) < Date.now()) {
            next({
                path: '/login',
                params: {nextUrl: to.fullPath}
            })
        }

        if (token_expiry < Date.now()) {
            token_expired = true;
        }
    }

    // Check if page requires login.
    if (to.matched.some(record => record.meta.requiresAuth)) {

        // If user doesn't have a token (ie. Not authenticated), send to login.
        if (!token) {
            next({
                path: '/login',
                params: {nextUrl: to.fullPath}
            })

        } else if (token_expired) {  // If token has expired, refresh it.

            // TODO: Move this to new loading screen view.
            axios({
                method: "POST",
                url: process.env.VUE_APP_API_URL + '/graphql',
                data: {
                    query: mutation_refreshToken,
                    variables: {
                        token: Vue.cookie.get('token')
                    },
                }
            }).then((response) => {

                // Get the JWT token and set it in the Cookies to keep session.
                let token = response.data.data.refreshToken.token;
                this.$cookie.set('token', token);

                // Get the user information from the response and set the userId in cookies.
                let user = response.data.data.refreshToken.user;
                this.$cookie.set('userId', user.id);

                // Put the user information in the current state.
                this.$store.state.user = user;
            });

        } else if (!store.state.user.username) {  // If user has logged in but state doesn't know the user.

            // TODO: Move this to new loading screen view.
            axios({
                method: "POST",
                url: process.env.VUE_APP_API_URL + '/graphql',
                data: {
                    query: query_fetchUser,
                    variables: {
                        id: Vue.cookie.get('userId')
                    },
                }
            }).then((response) => {
                store.commit('setUser', response.data.data.user);
            });
        }
    }

    // Send the user to wherever they intended to go.
    next();
});

export default router