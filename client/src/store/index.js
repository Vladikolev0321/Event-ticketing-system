import { createStore } from 'vuex';
import DEX from '../../../../Event-ticketing-system-smart-contracts/Event-ticketing-system/build/contracts/DEX.json';
import EventManager from '../../../../Event-ticketing-system-smart-contracts/Event-ticketing-system/build/contracts/EventManager.json';
import { ethers } from "ethers";


const Web3 = require("web3");
const web3 = await new Web3(window.ethereum);
const eventManager = new web3.eth.Contract(
    EventManager.abi,
    "0x9fD14D3fe1a9d13DA61Ba3bA7b054D1Fb2B6C921"
);
const dex = new web3.eth.Contract(
    DEX.abi,
    "0x7501fA5E3f9240A6C1BB63EC00dC048A168eB6aE",//address of DEX
);
const provider = new ethers.providers.Web3Provider(window.ethereum);

provider.on('accountsChanged', () => {
    console.log("accountsChanged");
})

export default createStore({
    state: {
        eventManager: eventManager,
        dex: dex,
        eventManagerAddress: "0x9fD14D3fe1a9d13DA61Ba3bA7b054D1Fb2B6C921",
        dexAddress: "0x7501fA5E3f9240A6C1BB63EC00dC048A168eB6aE",
        events: [],
        ticketsForSale: [],
        accountEvents: [],
        accountTickets: [],
        ticketsInCart: [],
        Moralis: null,
        myEvents: [],
        myTickets: [],
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
        },
        setMyTickets(state, payload) {
            state.myTickets = payload;
        }
    },
    actions: {
        async init({ dispatch }) {
            await dispatch("connectToMoralis");
            await dispatch("connectToBlockchain");
            await dispatch("getEvents");
            await dispatch("getTicketsForSale");
            await dispatch("getAccountEvents");
            await dispatch("getAccountTickets");
            await dispatch("getMyEvents");
            await dispatch("getMyTickets");
        },
        async setupEventListeners({ state }) {
            let options = {
                filter: {
                    value: [],
                },
                fromBlock: 0
            };
            console.log("setupEventListeners");
            state.eventManager.events.EventCreated(options)
                .on('data', event => console.log("Data:",event))
                .on('changed', changed => console.log("Changed:",changed))
                // .on('error', err => throw err);
                .on('connected', str => console.log("Connected:", str))
        }
    },
});