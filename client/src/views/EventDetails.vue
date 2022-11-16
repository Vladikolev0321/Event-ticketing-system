<template>
  <h1>Event details</h1>
  <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="https://mdbcdn.b-cdn.net/wp-content/uploads/2020/06/vertical.webp" alt="Trendy Pants and Shoes"
          class="img-fluid rounded-start" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ event.name }}</h5>
          <p class="card-text">
            Unique code: {{ event.uniqueCode }}
            <br>
            Date: {{ event.startDate }} - {{ event.endDate }}
            <br>
            Location: {{ event.location }}
            <br>
            Poster url: {{ event.posterUrl }}
            <br>
              <span v-if="event.tickets.length > 0">
                Category tickets:
                <ul>
                  <li :key="ticket.id" v-for="ticket in event.tickets">
                    {{ ticket.name }} - Category:{{ ticket.category }} Type: {{ ticket.type }} Price:{{ ticket.price }}
                    Amount: {{ ticket.amount }}
                    <MDBBtn tag="a" color="primary" @click="addTicketToCart(ticket)">Buy</MDBBtn>
                  </li>
                </ul>
              </span>
              <span v-else>
                No tickets available
              </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  MDBBtn,
  //   MDBCard,
  // MDBCardBody,
  // MDBCardTitle,
  // MDBCardText,
  //   MDBCardImg,
  mdbRipple,
} from "mdb-vue-ui-kit";

export default {
  name: "EventDetails",
  props: {
    msg: String,
  },
  components: {
    MDBBtn,
    // MDBCard,
    // MDBCardBody,
    // MDBCardTitle,
    // MDBCardText,
    // MDBCardImg,
  },
  directives: {
    mdbRipple,
  },
  data() {
    return {
      event: {},
      events: [
        {
          id: 1,
          name: "Event 1",
          uniqueCode: "1",
          urlToOfficialPage: "https://www.eventbrite.com/e/event-1-tickets-92389788984",
          startDate: "01/01/2019",
          endDate: "02/01/2019",
          location: "Location 1",
          posterUrl: "https://mdbootstrap.com/img/new/standard/nature/184.webp",
          categoriesTickets: [
            {
              id: 1,
              name: "Category 1",
              description: "Description 1",
              price: 10,
              maxTicketsPerAddress: 10,
              startSale: "01/01/2019",
              endSale: "02/01/2019",
              soldTickets: 0,
              totalTickets: 100,
              participants: [
                {
                  address: "0x1234567890123456789012345678901234567890",
                  tickets: 10,
                }
              ],
              type: "type 1",
            },
            {
              id: 1,
              name: "Category 1",
              description: "Description 1",
              price: 10,
              maxTicketsPerAddress: 10,
              startSale: "01/01/2019",
              endSale: "02/01/2019",
              soldTickets: 0,
              totalTickets: 100,
              participants: [
                {
                  address: "0x1234567890123456789012345678901234567890",
                  tickets: 10,
                }
              ],
              type: "type 1",
            }
          ]
        },
        {
          id: 2,
          name: "Event 2",
          startDate: "01/01/2019",
          endDate: "02/01/2019",
          location: "Location 1",
        },
      ],
    };
  },
  methods: {
    addTicketToCart(ticket) {
      console.log(ticket);
      let ticketToAdd = {
        id: ticket.id,
        category: ticket.category,
        price: ticket.price,
        amount: ticket.amount,
        place: ticket.place,
        eventName: this.event.name,
      };
      if (ticketToAdd.amount > 1) {
        ticketToAdd.amount = 1;
      }
      this.$store.commit('addTicketToCart', ticketToAdd);
    }
  },
  created() {
    const eventId = this.$route.params.eventId;
    const event = this.$store.state.events.find((e) => e.id == eventId);
    this.event = event;
    console.log(event.tickets);
  },
};
</script>

<style scoped>
.card {
  height: 600px;
  width: 700px;
  margin: auto;
}

.cards-container {
  margin-top: 50px;
  gap: 10px;
}
</style>