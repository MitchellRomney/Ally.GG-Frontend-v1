import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faHome, faUsers, faTrophy, faBell, faCaretDown, faCircle, faArrowLeft, faArrowRight,
    faEllipsisH, faUserSecret, faStar, faCrown, faCheck, faBars
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import router from './router'
import titleMixin from './mixins/titleMixin'
import VueCookie from 'vue-cookie'
import Axios from 'axios'
import LogoBounce from './components/loading/logoBounce'
import VueNativeSock from 'vue-native-websocket'


Vue.use(VueNativeSock, process.env.VUE_APP_WS_URL, {
    store: store,
    connectManually: true,
});

Vue.use(VueCookie);
Vue.use(Vuex);

import store from './store.js'
import {createProvider} from './vue-apollo'

Vue.mixin(titleMixin);

library.add(
    faHome,
    faUsers,
    faTrophy,
    faBell,
    faCaretDown,
    faCircle,
    faEllipsisH,
    faUserSecret,
    faStar,
    faCrown,
    faCheck,
    faArrowLeft,
    faArrowRight,
    faBars
);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('logo-bounce', LogoBounce);

Vue.config.productionTip = false;

Vue.config.devtools = true;

Vue.prototype.$http = Axios;
Vue.prototype.$http.xsrfCookieName = 'csrftoken';
Vue.prototype.$http.xsrfHeaderName = 'X-CSRFToken';

if (process.env.NODE_ENV !== 'development') {
    Vue.prototype.$http.defaults.headers.common['secure'] = true;
    Vue.prototype.$http.defaults.headers.common['httpOnly'] = true;
}

Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount(
    '#app'
);
