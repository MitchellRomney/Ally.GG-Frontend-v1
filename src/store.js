import Vuex from "vuex";
import Vue from "vue";
import VueCookie from 'vue-cookie';


Vue.use(Vuex);
Vue.use(VueCookie);

function initialState() {
    return {
        stateLoaded: false,
        user: {},
        summoners: {},
    }
}

const store = new Vuex.Store({
    state: {
        stateLoaded: false,
        user: {},
        summoners: {},
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            state.summoners = user.Profiles[0].Summoners;
        },
        stateLoaded(state) {
            state.stateLoaded = true;
        },
        logout(state) {
            const s = initialState();

            Object.keys(s).forEach(key => {
                state[key] = s[key]
            })
        }
    }
});

export default store;