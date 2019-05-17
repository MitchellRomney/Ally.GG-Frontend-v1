import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Leaderboard from './views/Leaderboard.vue'
import Summoners from './views/Summoners.vue'
import SummonerProfile from './views/SummonerProfile.vue'
import SummonerProfile_General from './components/summoner_profile/general.vue'
import SummonerProfile_Matches from './components/summoner_profile/matches.vue'
import SummonerProfile_Champions from './components/summoner_profile/champions.vue'
import SummonerProfile_Achievements from './components/summoner_profile/achievements.vue'
import VueCookie from 'vue-cookie'


Vue.use(VueCookie);


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
                requiresAuth: true
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
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!Vue.cookie.get('token')) {
            next({
                path: '/login',
                params: {nextUrl: to.fullPath}
            })
        }
    }
    next();
});

export default router