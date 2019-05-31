import Vuex from "vuex";
import Vue from "vue";
import VueCookie from 'vue-cookie';


Vue.use(Vuex);
Vue.use(VueCookie);

const store = new Vuex.Store({
    state: {
        stateLoaded: false,
        user: {},
        summoners: {},
        token: Vue.cookie.get('token')
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            state.summoners = user.Profiles[0].Summoners;
        },
        stateLoaded(state){
            state.stateLoaded = true;
        }
    }
});

export default store;