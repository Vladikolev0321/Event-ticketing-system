import { createStore } from 'vuex';


export default createStore({
  state: {
    eventManager: null,
    dex: null,
    events: [],
    ticketsForSale: [],
    accountEvents: [],
    accountTickets: [],
    ticketsInCart: [],
    Moralis: null,
    myEvents: [],
  },
  getters: {
  },
  mutations: {
    setEventManager(state, payload) {
        state.eventManager = payload;
    },
    setDex(state, payload) {
        state.dex = payload;
    },
    setEvents(state, payload) {
        state.events = payload;
    },
    setTicketsForSale(state, payload) {
        state.ticketsForSale = payload;
    },
    setAccountEvents(state, payload) {
        state.accountEvents = payload;
    },
    setAccountTickets(state, payload) {
        state.accountTickets = payload;
    },
    setTicketsInCart(state, payload) {
        state.ticketsInCart = payload;
    },
    addTicketToCart(state, payload) {
        state.ticketsInCart.push(payload);
    },
    removeTicketFromCart(state, payload) {
        state.ticketsInCart = state.ticketsInCart.filter(ticket => ticket.id !== payload.id);
    },
    setMoralis(state, payload) {
        state.Moralis = payload;
    },
    setMyEvents(state, payload) {
        state.myEvents = payload;
    }
  },
  actions: {
  },
});