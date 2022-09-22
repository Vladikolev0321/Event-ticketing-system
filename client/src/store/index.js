import { createStore } from 'vuex';


export default createStore({
  state: {
    eventManager: null,
    dex: null,
  },
  getters: {
  },
  mutations: {
    setEventManager(state, payload) {
        state.eventManager = payload;
    },
    setDex(state, payload) {
        state.dex = payload;
    }
  },
  actions: {
  },
});