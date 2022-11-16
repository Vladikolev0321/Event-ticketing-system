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
                <!-- <h5 class="card-title">Event: {{ ticket.event.name }}</h5> -->
                <h5 class="card-title">Event: aa</h5>
                <p class="card-text">
                Category ticket: {{ ticket.category }}
                <br>
                Amount: {{ ticket.amount }}
                <br>
                Price: {{ ticket.price }}
                </p>
            </div>
        </div>
        <div v-if="isForSale">  
            <MDBBtn tag="a" color="primary" @click="buyTicket">Buy</MDBBtn>
        </div>
        <div v-else>
            <MDBBtn tag="a" color="primary" @click="sellTicket">Sell</MDBBtn>
        </div>
    </div>
   </div>
</template>

<script>

const Web3 = require('web3');
const web3 = new Web3(window.ethereum);
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
    methods: {
        async sellTicket() {
            const accounts = await web3.eth.getAccounts();
            await this.$store.state.eventManager.methods.setApprovalForAll(this.$store.state.dexAddress, true).send({ from: accounts[0] });
            const ticketAmount = 1;
            const tx = await this.$store.state.dex.methods.listTicket(this.$store.state.eventManagerAddress, this.ticket.id, /*parseInt(this.ticket.amount)*/ticketAmount, parseInt(this.ticket.price)).send({ from: accounts[0] });
            console.log(tx);
        },
        async buyTicket() {
            const accounts = await web3.eth.getAccounts();
            const tx = await this.$store.state.dex.methods.buyTicket(this.ticket.listingId).send({ from: accounts[0], value: parseInt(this.ticket.price) });
            console.log(tx);
        },
    },
    created() {
        if(this.isForSale){
            const listingId = this.$route.params.listingId;
            const ticket = this.$store.state.ticketsForSale.find((t) => t.listingId == listingId);
            this.ticket = ticket;
            /// to think
        } else {
            const ticketId = this.$route.params.ticketId;
            const ticket = this.$store.state.myTickets.find((t) => t.id == ticketId);
            this.ticket = ticket;
        } 
        
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