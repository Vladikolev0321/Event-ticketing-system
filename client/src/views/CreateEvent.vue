<template>
  <h1>Create event</h1>
  <form>
    <div v-show="step === 1">
      <h1>Step One</h1>
      <div>
        <legend for="name">Event name:</legend>
        <input id="name" name="name" v-model="event.name" />
      </div>
      <div>
        <legend for="urlToOfficialPage">URL to official page:</legend>
        <input id="urlToOfficialPage" name="urlToOfficialPage" v-model="event.urlToOfficialPage" />
      </div>
      <div>
        <legend for="start-time">Start date and time:</legend>
        <input id="start-time" name="start-time" type="datetime-local" v-model="event.startDateTime" />
      </div>
      <div>
        <legend for="end-time">End date and time:</legend>
        <input id="end-time" name="end-time" type="datetime-local" v-model="event.endDateTime" />
      </div>
      <div>
        <legend for="location">Location:</legend>
        <input id="location" name="location" v-model="event.location" />
      </div>
      <div>
        <legend for="posterUrl">URL to poster:</legend>
        <input id="posterUrl" name="posterUrl" v-model="event.posterUrl" />
      </div>
      <button @click.prevent="next()">Next</button>
    </div>

    <div v-show="step === 2">
      <div id="visa">
        <h1>Categories tickets</h1>
        <br><br>
        <button @click.prevent="addCategory">Add category</button>
        <br>
        <div class="previous" v-for="(category, counter) in event.categories" :key="counter">
          <span @click.prevent="deleteCategory(counter)">x</span>
          <label for="name">{{counter+1}}. Name:</label>
          <input type="text" v-model="category.name" required>
          <label for="description">Description:</label>
          <input type="text" v-model="category.description" required>
          <label for="type">Type tickets:</label>
          <select v-model="category.typeTickets">
            <option value="uniform">uniform</option>
            <option value="not uniform">not uniform</option>
          </select>
          <div v-if="category.typeTickets == 'not uniform'">
            <label for="startPlace">Start place:</label>
            <input type="number" v-model="category.startPlace" required>
            <label for="endPlace">End place:</label>
            <input type="number" v-model="category.endPlace" required>
          </div>
          <!-- <input type="text" v-model="category.typeTickets" required> -->
          <label for="price">Price per ticket</label>
          <input type="number" v-model="category.price" required>
          <label for="amount">Amount tickets</label>
          <input type="number" v-model="category.amount" required>
          <label for="type">Max tickets per address</label>
          <input type="number" v-model="category.maxTicketsPerAddress" required>
          <legend for="start-sale">Start sale:</legend>
          <input id="start-sale" name="start-sale" type="datetime-local" v-model="category.startSale" />
          <legend for="end-sale">End sale:</legend>
          <input id="end-sale" name="end-sale" type="datetime-local" v-model="category.endSale" />
        </div>
      </div>

      <button @click.prevent="prev()">Previous</button>
      <button @click.prevent="next()">Next</button>
    </div>

    <div v-show="step === 3">
      <div>
        <legend for="maxTickets">Max tickets single address can buy:</legend>
        <input id="maxTickets" name="maxTickets" type="number" v-model="event.maxTicketsPerAddress" />
      </div>
      <button @click.prevent="prev()">Previous</button>
      <input type="submit" value="Create" @click.prevent="createEvent(event)"/>
    </div>
  </form>

  <br /><br />Debug: {{ event }}
</template>

<script>
const Moralis = require("moralis-v1");
import Web3 from 'web3'

export default {
  name: "CreateEvent",
  components: {},
  data() {
    return {
      step: 1,
      event: {
        name: null,
        urlToOfficialPage: null,
        startDateTime: null,
        endDateTime: null,
        location: null,
        posterUrl: null,
        categories: [],
        maxTicketsPerAddress: null,
      },
    };
  },
  methods: {
    prev() {
      this.step--;
    },
    next() {
      this.step++;
    },
    addCategory() {
      console.log("add");
      this.event.categories.push({
        name: "",
        description: "",
        typeTickets: "",
        price: "",
        amount: "",
        discountedPrices: [],
        maxTicketsPerAddress: "",
        startSale: "",
        endSale: "",
        startPlace: "",
        endPlace: "",
        totalTickets: "",
      });
    },
    deleteCategory(counter) {
      console.log("remove");
      this.event.categories.splice(counter, 1);
    },
    async create(event) {
      console.log(event);
      // save metadata to IPFS
      const metadata = {
        name: event.name,
        urlToOfficialPage: event.urlToOfficialPage,
        startDateTime: event.startDateTime,
        endDateTime: event.endDateTime,
        location: event.location,
        posterUrl: event.posterUrl,
        categories: event.categories,
        maxTicketsPerAddress: event.maxTicketsPerAddress,
      };     
      const file = new Moralis.File("metadata.json", { base64: Buffer.from(JSON.stringify(metadata)).toString("base64") });
      await file.saveIPFS();
      console.log(file.ipfs());
      console.log(file.hash());
      const eventHash = file.hash();


      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0]);
      // console.log(this.$store.state.eventManager);

      // let ticketIds = [];
      let ticketHashes = [];
      let amounts = [];
      let prices = [];
      event.categories.forEach(async category => {
        // let ticketId;
        if(category.typeTickets == "uniform") {
          category.totalTickets = category.amount;
          amounts.push(category.amount);
          // ticketId = event.name + Math.floor(Math.random() * 100);
          // ticketIds.push(ticketId);
          ticketHashes.push("");
          prices.push(category.price);
        } else {
          category.totalTickets = category.endPlace - category.startPlace + 1;
          for(let i = category.startPlace; i <= category.endPlace; i++) {
            amounts.push(1);
            const ticketMetadata = {
              name: event.name,
              category: category.name,
              place: i,
            };
            const ticketFile = new Moralis.File("tickets.json", { base64: Buffer.from(JSON.stringify(ticketMetadata)).toString("base64") });
            await ticketFile.saveIPFS();
            console.log(ticketFile.ipfs());
            // ticketId = ticketFile.ipfs();
            // ticketIds.push(ticketId);
            console.log(ticketFile.hash());
            ticketHashes.push(ticketFile.hash());
            prices.push(category.price);
            console.log(category.price);
          }
        }
      });

      // const amounts = event.categories.map((category) => category.amount);
      // const prices = event.categories.map((category) => category.price);
      // console.log("Ticket "ticketIds);
      console.log("Amounts:", amounts);
      console.log("Prices:", prices);
      console.log("TicketHashes:", ticketHashes);


      console.log("BeforeEvent:")
      // // await this.$store.state.eventManager.methods.createEvent(accounts[0], uint256[] memory ids, uint256[] memory amounts, uint256[] memory prices);
      // const tx = await this.$store.state.eventManager.methods.createEvent(accounts[0], [1], [2], [3]).send({ from: accounts[0] });
      // const tx = await this.$store.state.eventManager.methods.createEvent(accounts[0], eventHash, ticketHashes, amounts, prices).send({ from: accounts[0] });

      // console.log(tx);
      // save metadata to blockchain
      // save event to blockchain
      return { amounts: amounts, prices: prices, ticketHashes: ticketHashes, eventHash: eventHash };
    },
    async createEvent(event){
      let info = await this.create(event);
      console.log(info);

      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0]);
      
      const tx = await this.$store.state.eventManager.methods.createEvent(accounts[0], info.eventHash, info.ticketHashes, info.amounts, info.prices).send({ from: accounts[0] });

      console.log(tx);
      
    }
  },
  created() {
    this.event.categories = [
      {
        name: "",
        description: "",
        typeTickets: "",
        price: "",
        discountedPrices: [],
        maxTicketsPerAddress: "",
        startSale: "",
        endSale: "",
        totalTickets: "",
      },
    ]
  },
};
</script>

<style scoped>
.animation-in {
  transform-origin: left;
  animation: in 0.6s ease-in-out;
}

.animation-out {
  transform-origin: bottom left;
  animation: out 0.6s ease-in-out;
}

#visa {
  margin: 20px auto;
  max-width: 700px;
}

label {
  display: block;
  margin: 20px 0 10px;
}

input {
  font-size: 30px;
  border: 1px double rgb(102, 97, 96);
  border-radius: 4px;
}

button {
  font-size: 16px;
  background: rgb(64, 179, 140);
  padding: 0.4rem 1.3rem;
  text-align: center;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  margin: 10px;
}

span {
  width: 30px;
  float: right;
  cursor: pointer;
}

span:hover {
  color: brown;
}

.previous {
  border: 1.5px solid;
  padding: 5px;
  margin-bottom: 10px;
}
</style>