<template>
    <h1>Ticket Details</h1>
    <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
        <div class="col-md-4">
        <img
            src="https://mdbcdn.b-cdn.net/wp-content/uploads/2020/06/vertical.webp"
            alt="Trendy Pants and Shoes"
            class="img-fluid rounded-start"
        />
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">Event: {{ ticket.event.name }}</h5>
                <p class="card-text">
                Category ticket: {{ ticket.categoryName }}
                <br>
                Price: {{ ticket.price }}
                </p>
            </div>
        </div>
        <div v-if="isForSale">  
            <MDBBtn tag="a" color="primary">Buy</MDBBtn>
        </div>
        <div v-else>
            <MDBBtn tag="a" color="primary">Sell</MDBBtn>
        </div>
    </div>
   </div>
</template>

<script>

import {
    MDBBtn,
 } from "mdb-vue-ui-kit";

export default {
    name: "TicketDetails",
    components: {
        MDBBtn,
    },
    props: {
        isForSale: Boolean,
    },
    data() {
        return {
            ticket: {},
            tickets: [
                {
                    id: 1,
                    event:{
                        name: "Event 1",
                        uniqueCode: "1",
                        urlToOfficialPage: "https://www.eventbrite.com/e/event-1-tickets-92389788984",
                        startDate: "01/01/2019",
                        endDate: "02/01/2019",
                        location: "Location 1",
                        posterUrl: "https://mdbootstrap.com/img/new/standard/nature/184.webp",
                    },
                    categoryName: "Category 1",
                    price: "100",
                    ticketState: "ForSale",
                }
            ],
            isForSales: false,
        };
    },
    created() {
        const ticketId = this.$route.params.ticketId;
        const ticket = this.tickets.find((t) => t.id == ticketId);
        this.ticket = ticket;
        console.log(this.isForSale);
        // this.isForSale = this.$route.params.isForSale;
    },
}

</script>

<style scoped>
.card {
  height: 400px;
  width: 700px;
  margin: auto;
}
.cards-container {
  margin-top: 50px;
  gap: 10px;
}
</style>