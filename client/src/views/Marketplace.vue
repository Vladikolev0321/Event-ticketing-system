<template>
    <h1>Marketplace</h1>
    <div>
      <div class="cards-container d-flex flex-wrap">
        <div v-for="ticket in tickets" :key="ticket.name">
          <MDBCard class="card">
          <a v-mdb-ripple="{ color: 'light' }">
            <MDBCardImg src="https://mdbootstrap.com/img/new/standard/nature/184.webp" top alt="..." />
          </a>
          <MDBCardBody>
            <MDBCardTitle>Ticket for Event</MDBCardTitle>
            <MDBCardText>
              Category: {{ ticket.category }}
              <br>
              Price: {{ ticket.price }}
            </MDBCardText>
            <router-link :to="'/market/'+ticket.listingId"><MDBBtn tag="a" color="primary">Check out</MDBBtn></router-link>
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
  } from 'mdb-vue-ui-kit';
  
  export default {
    name: 'MarketPlace',
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
            id: 2,
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
      this.tickets = this.$store.state.ticketsForSale;
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