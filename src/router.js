import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Leaderboard from './views/Leaderboard.vue'
import Summoners from './views/Summoners.vue'
import SummonerProfile from './views/SummonerProfile.vue'
import SummonerProfile_General from './components/summoner_profile/general.vue'
import SummonerProfile_Matches from './components/summoner_profile/matches.vue'
import SummonerProfile_Champions from './components/summoner_profile/champions.vue'
import SummonerProfile_Achievements from './components/summoner_profile/achievements.vue'


Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/leaderboard',
            name: 'leaderboard',
            component: Leaderboard
        },
        {
            path: '/summoners/',
            name: 'summoners',
            component: Summoners,
        },
        {
            path: '/summoners/:summoner',
            redirect: 'summoners/:summoner/general',
            name: 'summoner_profile',
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
})