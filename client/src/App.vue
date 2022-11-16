<template>
  <div>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
    <NavBar></NavBar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
// import DEX from '../../../Event-ticketing-system-smart-contracts/Event-ticketing-system/build/contracts/DEX.json';
// import EventManager from '../../../Event-ticketing-system-smart-contracts/Event-ticketing-system/build/contracts/EventManager.json';
import Web3 from 'web3'
// import * as dotenv from 'dotenv'
const Moralis = require("moralis-v1");
const web3 = new Web3(window.ethereum);
// dotenv.config()

export default {
  name: 'App',
  components: {
    NavBar,
  },
  methods: {
    async loadEvents() {
      // const ticketsCount = await this.$store.state.eventManager.methods.ticketsCount().call();

      const eventsCount = await this.$store.state.eventManager.methods.eventsCount().call();
      console.log(eventsCount);
      let events = [];
      for (let i = 0; i < eventsCount; i++) {
        const eventId = await this.$store.state.eventManager.methods.eventsIds(i).call();

        const uri = await this.$store.state.eventManager.methods.uri(eventId).call();
        const response = await fetch(uri);
        const metadata = await response.json();
        console.log(metadata);

        const ticketsData = await this.$store.state.eventManager.methods.getEventTickets(eventId).call();
        console.log(ticketsData[3]);
        const tickets = [];
        for (let j = 0; j < ticketsData[0].length; j++) {
          if (!ticketsData[3][j]) {
            const ticketUri = await this.$store.state.eventManager.methods.uri(ticketsData[0][j]).call();

            let ticketResponse;
            let ticketMetadata;
            console.log(ticketUri);
            let ticketCategory = "";
            let ticketPlace = "";
            if (ticketUri != "https://ipfs.moralis.io:2053/ipfs/") {
              ticketResponse = await fetch(ticketUri);
              ticketMetadata = await ticketResponse.json();
              ticketCategory = ticketMetadata.category;
              ticketPlace = ticketMetadata.place;
              console.log(ticketMetadata);
            }

            tickets.push({
              id: ticketsData[0][j],
              category: ticketCategory,
              place: ticketPlace,
              amount: ticketsData[1][j],
              price: ticketsData[2][j],

            });
          }
        }

        events.push({
          id: eventId,
          name: metadata.name,
          description: metadata.description,
          startDate: metadata.startDateTime,
          endDate: metadata.endDateTime,
          location: metadata.location,
          tickets: tickets,
        });
      }
      this.$store.commit('setEvents', events);
    },
    async loadMyEvents() {
      const accounts = await web3.eth.getAccounts();

      const allEvents = this.$store.state.events;
      const myEvents = [];
      for (let i = 0; i < allEvents.length; i++) {
        const balance = await this.$store.state.eventManager.methods.balanceOf(accounts[0], allEvents[i].id).call();
        if (balance > 0) {
          myEvents.push(allEvents[i]);
        }
      }

      this.$store.commit('setMyEvents', myEvents);
    },
    async loadMyTickets() {
      const accounts = await web3.eth.getAccounts();

      const ticketsCount = await this.$store.state.eventManager.methods.ticketsCount().call();
      const myTickets = [];
      console.log("Tickets count:", ticketsCount);
      for (let i = 0; i < ticketsCount; i++) {
        const ticketId = await this.$store.state.eventManager.methods.ticketsIds(i).call();
        // const ticketOwner = await this.$store.state.eventManager.methods.ticketIdToOwner(ticketId).call();
        const balance = await this.$store.state.eventManager.methods.balanceOf(accounts[0], ticketId).call();
        console.log(balance, ticketId);
        if (balance > 0) {

          const currTicket = await this.$store.state.eventManager.methods.getTicketInfo(ticketId).call(); // (currTicket.eventId, currTicket.amount, currTicket.price)
          console.log(currTicket);
          const ticketUri = await this.$store.state.eventManager.methods.uri(ticketId).call();
          let ticketResponse;
          let ticketMetadata;
          let ticketCategory = "";
          let ticketPlace = "";
          if (ticketUri != "https://ipfs.moralis.io:2053/ipfs/") {
            ticketResponse = await fetch(ticketUri);
            ticketMetadata = await ticketResponse.json();
            ticketCategory = ticketMetadata.category;
            ticketPlace = ticketMetadata.place;
            console.log(ticketMetadata);
          }

          // get my ticket amount and price
          myTickets.push({
            id: ticketId,
            // name: ticketMetadata.name,
            category: ticketCategory,
            place: ticketPlace,
            amount: balance, // balance of
            price: currTicket[2],
          });
        }
      }
      console.log(myTickets);
      this.$store.commit('setMyTickets', myTickets);
    },
    async loadTicketsForSale() {
      const ticketsCount = await this.$store.state.dex.methods.listingCount().call();
      let tickets = [];
      for (let i = 1; i <= ticketsCount; i++) {
        const listing = await this.$store.state.dex.methods.getListing(i).call();
        if (listing.status === '0') {
          const uri = await this.$store.state.eventManager.methods.uri(listing.tokenId).call();
          if (uri != "https://ipfs.moralis.io:2053/ipfs/") {
            const response = await fetch(uri);
            const metadata = await response.json();
            console.log(metadata);
            tickets.push({
              listingId: i,
              name: metadata.name,
              category: metadata.category,
              place: metadata.place,
              price: listing.price,
              seller: listing.seller,
            });
          } else {
            tickets.push({
              listingId: i,
              name: "Ticket",
              category: "Category",
              place: "No Place",
              price: listing.price,
              seller: listing.seller,
            });
          }
        }
      }
      console.log("Tickets for sale:", tickets);
      this.$store.commit('setTicketsForSale', tickets);
    },
    //start moralis
    async loadMoralis() {
      let serverUrl = process.env.VUE_APP_MORALIS_SERVER_URL;
      let appId = process.env.VUE_APP_MORALIS_APP_ID;
      console.log(Moralis)
      Moralis.start({ serverUrl: serverUrl, appId: appId });
      await Moralis.authenticate();
      this.$store.commit('setMoralis', Moralis);
    },
  },
  async beforeMount() {
    await this.loadMoralis();
    await this.loadEvents();
    await this.loadMyEvents();
    await this.loadMyTickets();
    await this.loadTicketsForSale();
    await this.$store.dispatch('setupEventListeners');
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
