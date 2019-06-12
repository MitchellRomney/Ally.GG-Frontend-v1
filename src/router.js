import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UserProfile from './views/UserProfile'
import Login from './views/Login.vue'
import Admin from './views/Admin.vue'
import Loading from './views/Loading.vue'
import Improve from './views/Improve.vue'
import Improve_Match from './components/improve/match.vue'
import Summoners from './views/Summoners.vue'
import SummonerProfile from './views/SummonerProfile.vue'
import SummonerProfile_General from './components/summoner_profile/general.vue'
import SummonerProfile_Matches from './components/summoner_profile/matches.vue'
import SummonerProfile_Champions from './components/summoner_profile/champions.vue'
import SummonerProfile_Achievements from './components/summoner_profile/achievements.vue'
import VueCookie from 'vue-cookie'
import Vuex from "vuex"
import Store from './store.js'
import * as JWT from 'jwt-decode'


Vue.use(VueCookie);
Vue.use(Vuex);

Vue.use(Router);

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
    ],
    scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0}
    }
});

router.beforeEach((to, from, next) => {

    let token = Vue.cookie.get('token');
    let goLogin = false;

    if (token) {
        // If there is a JWT token, always use it as Auth header.
        Vue.prototype.$http.defaults.headers.common['Authorization'] = 'JWT ' + token;

        let token_payload = JWT(token);
        let token_creation = new Date(token_payload.origIat * 1000);

        if (token_creation.addDays(7) < Date.now()) {
            next({
                path: '/login',
                query: {
                    nextUrl: to.fullPath
                }
            });
            console.log('1');
            goLogin = true;
        }
    }

    // Check if page requires login.
    if (to.matched.some(record => record.meta.requiresAuth)) {
        console.log('lol');
        // If user doesn't have a token (ie. Not authenticated), send to login.
        if (!token || goLogin) {
            console.log('2');
            next({
                path: '/login',
            })

        } else if (!Store.state.stateLoaded) {
            next({
                path: '/loading',
                query: {
                    nextUrl: to.fullPath
                }
            })
        }
    }

    if (to.matched.some(record => record.meta.admin)) {
        console.log('4');
        // If user doesn't have a token (ie. Not authenticated), send to login.
        if (!token || goLogin) {
            next({
                path: '/login',
            })

        } else if (!Store.state.stateLoaded) {
            next({
                path: '/loading',
                query: {
                    nextUrl: to.fullPath
                }
            })
        } else if (!Store.state.user.isSuperuser) {
            next({
                path: '/'
            })
        }
    }
    console.log('3');

    // Send the user to wherever they intended to go.
    next();
});

export default router