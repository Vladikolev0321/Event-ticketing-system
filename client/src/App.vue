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
        "",
      );
      const dex = new web3.eth.Contract(
        DEX.abi,
        "",//address of DEX
      );
      this.$store.commit('setEventManager', eventManager);
      this.$store.commit('setDex', dex);
    },
    loadEvents() {
      this.$store.state.eventManager.getEvents().then((events) => { // to add method to smart contract
        this.$store.commit('setEvents', events);
      }); 
    },
  },
  beforeMount() {
    this.connectToContracts();
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
