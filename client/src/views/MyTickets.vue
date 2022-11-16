<template>
  <h1>My tickets</h1>
  <div>
      <div class="cards-container d-flex flex-wrap">
        <div v-for="ticket in tickets" :key="ticket.name">
          <MDBCard class="card">
          <a v-mdb-ripple="{ color: 'light' }">
            <MDBCardImg src="https://mdbootstrap.com/img/new/standard/nature/184.webp" top alt="..." />
          </a>
          <MDBCardBody>
            <MDBCardTitle>Ticket for AAS</MDBCardTitle>
            <MDBCardText>
              Category: {{ ticket.category }}
              <br>
              Amount: {{ ticket.amount }}
              <br>
              Price: {{ ticket.price }}
            </MDBCardText>
            <router-link :to="'/myTickets/'+ticket.id"><MDBBtn tag="a" color="primary">Check out</MDBBtn></router-link>
          </MDBCardBody>
          </MDBCard>
        </div>
      </div>
    </div>  
</template>

<script>
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImg,
  mdbRipple
} from "mdb-vue-ui-kit";

export default {
  name: "MyEvents",
  components: {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImg,
  },
  directives: {
      mdbRipple
  },
  data() {
    return {
      tickets: [
          {
            id: 1,
            event: {
                name: "Event 1",
            },
            categoryName: "Category 1",
            price: "100",
          },
          {
            event: {
                name: "Event 2",
            },
            categoryName: "Category 2",
            price: "100",
          },
        ],
    };
  },
  created() {
    this.tickets = this.$store.state.myTickets;
  },
};
</script>

<style scoped>
.cards-container {
  margin-top: 50px;
  gap: 10px;
}

.card{
  height: 400px;
  width: 350px;
}
</style>