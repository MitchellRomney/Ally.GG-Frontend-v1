import Vuex from "vuex";
import Vue from "vue";
import VueCookie from 'vue-cookie';


Vue.use(Vuex);
Vue.use(VueCookie);

const store = new Vuex.Store({
    state: {
        user: {},
        token: Vue.cookie.get('token')
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        }
    }
});

export default store;