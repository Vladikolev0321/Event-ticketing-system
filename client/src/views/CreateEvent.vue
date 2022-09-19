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
        <input
          id="urlToOfficialPage"
          name="urlToOfficialPage"
          v-model="event.urlToOfficialPage"
        />
      </div>
      <div>
        <legend for="start-time">Start date and time:</legend>
        <input
          id="start-time"
          name="start-time"
          type="datetime-local"
          v-model="event.startDateTime"
        />
      </div>
      <div>
        <legend for="end-time">End date and time:</legend>
        <input
          id="end-time"
          name="end-time"
          type="datetime-local"
          v-model="event.endDateTime"
        />
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
      <button @click.prevent="addVisa">Add category</button>
      <br>
      <div class="previous"
      v-for="(category, counter) in event.categories"
      :key="counter">
        <span @click.prevent="deleteVisa(counter)">x</span>
        <label for="name">{{counter+1}}. Name:</label>
        <input type="text" v-model="category.name" required>
        <label for="description">Description:</label>
        <input type="text" v-model="category.description" required>
        <label for="type">Type tickets:</label>
        <input type="text" v-model="category.typeTickets" required>
        <label for="price">Price per ticket</label>
        <input type="text" v-model="category.price" required>
        <label for="type">Max tickets per address</label>
        <input type="text" v-model="category.maxTicketsPerAddress" required>
        <legend for="start-sale">Start sale:</legend>
        <input
          id="start-sale"
          name="start-sale"
          type="datetime-local"
          v-model="category.startSale"
        />
        <legend for="end-sale">End sale:</legend>
        <input
          id="end-sale"
          name="end-sale"
          type="datetime-local"
          v-model="category.endSale"
        />
      </div>
    </div>

      <button @click.prevent="prev()">Previous</button>
      <button @click.prevent="next()">Next</button>
    </div>

    <div v-show="step === 3">
      <h1>Step Three</h1>

      <div>
        <legend for="maxTickets">Max tickets single address can buy:</legend>
        <input
          id="maxTickets"
          name="maxTickets"
          type="number"
          v-model="event.maxTicketsPerAddress"
        />
      </div>
      <button @click.prevent="prev()">Previous</button>
      <input type="submit" value="Save" />
    </div>
  </form>

  <br /><br />Debug: {{ event }}
</template>

<script>
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
    addVisa() {
      console.log("add");
      this.event.categories.push({
        name: "",
            description: "",
            typeTickets: "",
            price: "",
            discountedPrices: [],
            maxTicketsPerAddress: "",
            startSale: "",
            endSale: "",
            totalTickets: "",
      });
    },
    deleteVisa(counter) {
      console.log("remove");
      this.event.categories.splice(counter, 1);
    },
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