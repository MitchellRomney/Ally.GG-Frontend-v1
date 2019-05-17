import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faHome, faUsers, faTrophy, faBell, faCaretDown} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import router from './router'
import titleMixin from './mixins/titleMixin'
import VueCookie from 'vue-cookie'
import Axios from 'axios'


Vue.use(VueCookie);
Vue.use(Vuex);

Vue.mixin(titleMixin);

library.add(faHome);
library.add(faUsers);
library.add(faTrophy);
library.add(faBell);
library.add(faCaretDown);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.config.devtools = true;

Vue.prototype.$http = Axios;
const token = Vue.cookie.get('token');
if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

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

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount(
    '#app'
);
