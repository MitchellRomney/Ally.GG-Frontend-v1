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
        socket: {
            isConnected: false,
            message: '',
            reconnectError: false,
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            if (user.Profiles[0].Summoners.length > 0) {
                state.summoners = user.Profiles[0].Summoners;
            }
        },
        addSummoner(state, summoner) {
          if (summoner) {
              state.user.Profiles[0].Summoners.push(summoner);
              state.summoners = state.user.Profiles[0].Summoners;
          }
        },
        loadState(state) {
            state.stateLoaded = true;
        },
        logout(state) {
            state.stateLoaded = false;
            state.user = {};
            state.summoners = {};
        },
        SOCKET_ONOPEN(state, event) {
            console.log('Connected to WebSocket: ' + event.currentTarget.url);

            Vue.prototype.$socket = event.currentTarget;
            state.socket.isConnected = true
        },
        SOCKET_ONCLOSE(state, event) {
            console.log('Disconnected from WebSocket');

            state.socket.isConnected = false
        },
        SOCKET_ONERROR(state, event) {
            console.error(state, event)
        },
        // default handler called for all methods
        SOCKET_ONMESSAGE(state, message) {
            state.socket.message = message
        },
        // mutations for reconnect methods
        SOCKET_RECONNECT(state, count) {
            console.info(state, count)
        },
        SOCKET_RECONNECT_ERROR(state) {
            state.socket.reconnectError = true;
        },
    },
    actions: {
        sendMessage: function (context, message) {
            Vue.prototype.$socket.send(message);
        }
    }
});

export default store;