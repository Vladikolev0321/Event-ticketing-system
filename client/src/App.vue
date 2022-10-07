<template>
  <div>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossorigin="anonymous"
    />
    <NavBar></NavBar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import DEX from '../../../Event-ticketing-system-smart-contracts/Event-ticketing-system/build/contracts/DEX.json';
import EventManager from '../../../Event-ticketing-system-smart-contracts/Event-ticketing-system/build/contracts/EventManager.json';
// import Moralis from 'moralis';
const Moralis = require("moralis-v1");
// import Moralis from 'moralis/dist/moralis.min.js';


export default {
  name: 'App',
  components: {
    NavBar,
  },
  methods: {
    async connectToContracts() {
      const Web3 = require("web3");
      const web3 = await new Web3(window.ethereum);
      const eventManager = new web3.eth.Contract(
        EventManager.abi,
        "0x5A003fef8bFcDc4bda2fc8853ed8b113DFf8Ec46",
      );
      const dex = new web3.eth.Contract(
        DEX.abi,
        "",//address of DEX
      );
      this.$store.commit('setEventManager', eventManager);
      this.$store.commit('setDex', dex);
    },
    async loadEvents() {
      const eventsCount = this.$store.state.eventManager.methods.eventsCount().call();
      let events = [];
      for(let i = 1; i <= eventsCount; i++) {
        const event = await this.$store.state.eventManager.methods.getEvent(i).call();
        const uri = await this.$store.state.eventManager.methods.uri(i).call();
        const response = await fetch(uri);
        const metadata = await response.json();
        
        events.push({
          id: event[0],
          name: metadata.name,
          description: metadata.description,
          tickets: metadata.tickets, // ? get from contract
          // ticketsSold: event[5],
          // owner: event[6],
        });
      }
      this.$store.commit('setEvents', events);
    },
    async loadTicketsForSale() {
      const ticketsCount = await this.$store.state.dex.methods.listingCount().call();
      let tickets = [];
      for(let i = 1; i <= ticketsCount; i++) {
        const listing = await this.$store.state.dex.methods.getListing(i).call();
        if(listing.status === '0'){
          const uri = await this.$store.state.eventManager.methods.uri(listing.tokenId).call();
          const response = await fetch(uri);
          const metadata = await response.json();
          tickets.push({
            id: listing.tokenId,
            name: metadata.name,
            description: metadata.description,
            price: metadata.price,
            // owner: ticket[4],//
          });
        }
      }
      this.$store.commit('setTicketsForSale', tickets);
    },
  //start moralis
  async loadMoralis() {
    let serverUrl = "https://rfwik76n3pdy.usemoralis.com:2053/server";
    let appId = "Yu28U62SBduQbzSQztPBMWk7sNlRs5T9wsC8Lqb3";
    console.log(Moralis)
    Moralis.start({ serverUrl: serverUrl, appId: appId });
    await Moralis.authenticate();
    this.$store.commit('setMoralis', Moralis);
  },
  },
  beforeMount() {
    this.connectToContracts();
    // this.loadEvents();
    // this.loadTicketsForSale();
    this.loadMoralis();
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

</style>
