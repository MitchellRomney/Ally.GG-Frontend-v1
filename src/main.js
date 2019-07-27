import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faHome, faUsers, faTrophy, faBell, faCaretDown, faCircle, faArrowLeft, faArrowRight,
    faEllipsisH, faUserSecret, faStar, faCrown, faCheck, faBars, faCog, faSignOutAlt, faMoon,
    faTools, faFire, faCheckCircle, faPaperPlane
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import router from './router'
import titleMixin from './mixins/titleMixin'
import VueCookie from 'vue-cookie'
import Axios from 'axios'
import LogoBounce from './components/loading/logoBounce'
import VueNativeSock from 'vue-native-websocket'
import Vue2TouchEvents from 'vue2-touch-events'
import store from './store.js'
import VueAnalytics from 'vue-analytics'
import VueTippy from 'vue-tippy'
import ToggleButton from 'vue-js-toggle-button'


Vue.use(VueTippy);
Vue.use(Vue2TouchEvents);
Vue.use(VueCookie);
Vue.use(Vuex);
Vue.use(ToggleButton);

Vue.use(VueAnalytics, {
    id: 'UA-142475995-1',
    router
});

Vue.use(VueNativeSock, process.env.VUE_APP_WS_URL, {
    store: store,
    connectManually: true,
});

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
    faBars,
    faCog,
    faSignOutAlt,
    faMoon,
    faTools,
    faFire,
    faCheckCircle,
    faPaperPlane
);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('logo-bounce', LogoBounce);

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
});

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
