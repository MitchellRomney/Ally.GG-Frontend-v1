import Vue from 'vue'
import Router from 'vue-router'
import Landing from './views/website/Home.vue'
import Home from './views/Home.vue'
import UserProfile from './views/UserProfile'
import Login from './views/Login.vue'
import Admin from './views/Admin.vue'
import Loading from './views/Loading.vue'
import Settings from './views/Settings'
import LoginComp from './components/login/login'
import Register from './components/login/register'
import Improve from './views/Improve.vue'
import Improve_Match from './components/improve/match.vue'
import Summoners from './views/Summoners.vue'
import SummonerProfile from './views/SummonerProfile.vue'
import SummonerProfile_General from './components/summoner_profile/general.vue'
import SummonerProfile_Matches from './components/summoner_profile/matches.vue'
import SummonerProfile_Champions from './components/summoner_profile/champions.vue'
import ChampionProfile from './views/ChampionProfile'
import Settings_Account from './components/Settings/account.vue'
import Settings_Privacy from './components/Settings/privacy.vue'
import Settings_Premium from './components/Settings/premium.vue'
import VueCookie from 'vue-cookie'
import Vuex from "vuex"
import Store from './store.js'
import * as JWT from 'jwt-decode'


Vue.use(VueCookie);
Vue.use(Vuex);

Vue.use(Router);

let router = new Router({
    mode: 'history',
    scrollBehavior() {
        return {x: 0, y: 0}
    },
    routes: [
        {
          path: '/',
          name: 'landing',
          component: Landing,
        },
        {
            path: '/home',
            name: 'home',
            meta: {
                requiresAuth: true
            },
            component: Home,
        },
        {
            path: '/login',
            component: Login,
            children: [
                {
                    name: 'login',
                    path: '',
                    component: LoginComp
                },
                {
                    name: 'register',
                    path: '/register',
                    component: Register
                }
            ]
        },
        {
            path: '/loading',
            name: 'loading',
            component: Loading,
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            meta: {
                requiresAuth: true,
                admin: true,
            }
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
            path: '/improve',
            name: 'improve',
            meta: {
                requiresAuth: true
            },
            component: Improve,
            children: [
                {
                    name: 'improve_match',
                    path: ':match',
                    component: Improve_Match
                }
            ]
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
            path: '/settings',
            redirect: 'settings/account',
            meta: {
                requiresAuth: true
            },
            name: 'settings',
            component: Settings,
            children: [
                {
                    path: 'account',
                    component: Settings_Account
                },
                {
                    path: 'privacy',
                    component: Settings_Privacy
                },
                {
                    path: 'premium',
                    component: Settings_Premium
                },
            ]
        },
        {
            path: '/summoners/:server/:summoner',
            redirect: 'summoners/:server/:summoner/general',
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
            ]
        },
        {
            path: '/champions/:champion',
            name: 'champion_profile',
            meta: {
                requiresAuth: true,
            },
            component: ChampionProfile,
        }
    ],
});

router.beforeEach((to, from, next) => {

    let token = Vue.cookie.get('token');

    if (token) {
        // If there is a JWT token, always use it as Auth header.
        Vue.prototype.$http.defaults.headers.common['Authorization'] = 'JWT ' + token;

        let token_payload = JWT(token);
        let token_creation = new Date(token_payload.origIat * 1000);

        if (token_creation.addDays(7) < Date.now()) {

            delete Vue.prototype.$http.defaults.headers.common['Authorization'];

            if (to.name !== 'login') {
                next({
                    name: 'login',
                    query: {
                        nextUrl: to.fullPath
                    }
                });
            } else {
                next();
            }
        } else if (to.name === 'login'){
            next({
                name: 'home',
            });
            router.push('loading');
        } else {
            next();
        }
    }

    // Check if page requires login.
    if (to.matched.some(record => record.meta.requiresAuth)) {

        // If user doesn't have a token (ie. Not authenticated), send to login.
        if (!token) {
            next({
                name: 'login',
            });

        } else if (!Store.state.stateLoaded) {
            next({
                name: 'loading',
                query: {
                    nextUrl: to.fullPath
                }
            })
        }
    }

    if (to.matched.some(record => record.meta.admin)) {

        // If user doesn't have a token (ie. Not authenticated), send to login.
        if (!token) {
            next({
                name: 'login',
            })

        } else if (!Store.state.stateLoaded) {
            next({
                name: 'loading',
                query: {
                    nextUrl: to.fullPath
                }
            })
        } else if (!Store.state.user.isSuperuser) {
            next({
                name: 'home'
            })
        }
    }

    // Send the user to wherever they intended to go.
    next();
});

export default router