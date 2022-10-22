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
import Web3 from 'web3'

const Moralis = require("moralis-v1");

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
        "0x6fEB3aD001C3FeFa2bF7671BCfBA2065FE1E67bc",
      );
      const dex = new web3.eth.Contract(
        DEX.abi,
        "",//address of DEX
      );
      this.$store.commit('setEventManager', eventManager);
      this.$store.commit('setDex', dex);
    },
    async loadEvents() {
      // const ticketsCount = await this.$store.state.eventManager.methods.ticketsCount().call();

      const eventsCount = await this.$store.state.eventManager.methods.eventsCount().call();
      console.log(eventsCount);
      let events = [];
      for(let i = 0; i < eventsCount; i++) {
        // const event = await this.$store.state.eventManager.methods.getEvent(i).call();
        const eventId = await this.$store.state.eventManager.methods.eventsIds(i).call();
        // const event = await this.$store.state.eventManager.methods.getEvent(i).call();

        const uri = await this.$store.state.eventManager.methods.uri(eventId).call();
        const response = await fetch(uri);
        const metadata = await response.json();
        console.log(metadata);

        const ticketsData = await this.$store.state.eventManager.methods.getEventTickets(eventId).call();
        console.log(ticketsData);
        const tickets = [];
        for(let j = 0; j < ticketsData[0].length; j++) {
          const ticketUri = await this.$store.state.eventManager.methods.uri(ticketsData[0][j]).call();
          
          let ticketResponse;
          let ticketMetadata;
          console.log(ticketUri);
          let ticketCategory = "";
          let ticketPlace = "";
          if(ticketUri != "https://ipfs.moralis.io:2053/ipfs/"){
            ticketResponse = await fetch(ticketUri);
            ticketMetadata = await ticketResponse.json();
            ticketCategory = ticketMetadata.category;
            ticketPlace = ticketMetadata.place;
            console.log(ticketMetadata);
          }

          tickets.push({
            id: ticketsData[0][j],
            // name: ticketMetadata.name,
            category: ticketCategory,
            place: ticketPlace,
            amount: ticketsData[1][j],
            price: ticketsData[2][j],
            
          });
        }
        
        events.push({
          id: eventId,
          name: metadata.name,
          description: metadata.description,
          // tickets: metadata.tickets, // ? get from contract
          startDate: metadata.startDateTime,
          endDate: metadata.endDateTime,
          location: metadata.location,
          tickets: tickets,
          // ticketsSold: event[5],
          // owner: event[6],
        });
      }
      this.$store.commit('setEvents', events);
    },
    async loadMyEvents() {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();

      const allEvents = this.$store.state.events;
      const myEvents = [];
      for(let i = 0; i < allEvents.length; i++) {
        const balance = await this.$store.state.eventManager.methods.balanceOf(accounts[0], allEvents[i].id).call();
        if(balance > 0) {
          myEvents.push(allEvents[i]);
        }
      }

      this.$store.commit('setMyEvents', myEvents);
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
  async beforeMount() {
    await this.connectToContracts();
    // this.loadTicketsForSale();
    await this.loadMoralis();
    await this.loadEvents();
    await this.loadMyEvents();


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
