<template>
    <h1>Edit event</h1>
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="https://mdbcdn.b-cdn.net/wp-content/uploads/2020/06/vertical.webp"
                    alt="Trendy Pants and Shoes" class="img-fluid rounded-start" />
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">Edit event</h5>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" id="name" placeholder="Enter name" v-model="event.name">
                    </div>
                    <div class="form-group">
                        <label for="uniqueCode">Unique code</label>
                        <input type="text" class="form-control" id="uniqueCode" placeholder="Enter unique code"
                            v-model="event.uniqueCode">
                    </div>
                    <div class="form-group">
                        <label for="startDate">Start date</label>
                        <input type="date" class="form-control" id="startDate" placeholder="Enter start date"
                            v-model="event.startDate">
                    </div>
                    <div class="form-group">
                        <label for="endDate">End date</label>
                        <input type="date" class="form-control" id="endDate" placeholder="Enter end date"
                            v-model="event.endDate">
                    </div>
                    <div class="form-group">
                        <label for="location">Location</label>
                        <input type="text" class="form-control" id="location" placeholder="Enter location"
                            v-model="event.location">
                    </div>
                    <div class="form-group">
                        <label for="posterUrl">Poster url</label>
                        <input type="text" class="form-control" id="posterUrl" placeholder="Enter poster url"
                            v-model="event.posterUrl">
                    </div>
                    <div class="form-group">
                        <label for="urlToOfficialPage">Url to official page</label>
                        <input type="text" class="form-control" id="urlToOfficialPage"
                            placeholder="Enter url to official page" v-model="event.urlToOfficialPage">
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea class="form-control" id="description" rows="3" v-model="event.description"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="tickets">Tickets:</label>
                        <div class="form-group
                        " v-for="ticket in event.tickets" :key="ticket.id">
                            <label for="ticketCategory">Category</label>
                            <input type="text" class="form-control" id="ticketName" placeholder="Enter name"
                                v-model="ticket.category">
                            <label for="ticketPrice">Price</label>
                            <input type="number" class="form-control" id="ticketPrice" placeholder="Enter price"
                                v-model="ticket.price">
                            <label for="ticketQuantity">Quantity</label>
                            <input type="number" class="form-control" id="ticketQuantity" placeholder="Enter amount"
                                v-model="ticket.amount">
                        </div>
                        <br>
                    </div>
                    <MDBBtn color="primary" rounded @click="updateInfo">Save</MDBBtn>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
const Moralis = require("moralis-v1");
import Web3 from 'web3'

import {
    MDBBtn,
} from 'mdb-vue-ui-kit';
export default {
    name: "EditEvent",
    components: {
        MDBBtn,
    },
    data() {
        return {
            event: {
                name: "",
                startDate: "",
                endDate: "",
                location: "",
                description: "",
                image: "",
                tickets: [
                    {
                        name: "",
                        price: "",
                        quantity: "",
                        description: "",
                    },
                ],
            },
        };
    },
    methods: {
        async updateInfo() {
            let metadata = {
                name: this.event.name,
                urlToOfficialPage: this.event.urlToOfficialPage,
                startDateTime: this.event.startDate,
                endDateTime: this.event.endDate,
                location: this.event.location,
                posterUrl: this.event.posterUrl,
                categories: this.event.categories,
                maxTicketsPerAddress: this.event.maxTicketsPerAddress,
            };

            console.log(metadata);

            const file = new Moralis.File("metadata.json", { base64: Buffer.from(JSON.stringify(metadata)).toString("base64") });
            await file.saveIPFS();
            console.log(file.ipfs());
            console.log(file.hash());
            const eventHash = file.hash();
        
            const web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.getAccounts();
            console.log(accounts[0]);
            const tx = await this.$store.state.eventManager.methods.editInfo(this.event.id, eventHash).send({ from: accounts[0] });
            console.log(tx);


        }

    },
    created() {
        const eventId = this.$route.params.eventId;
        const event = this.$store.state.events.find((e) => e.id == eventId);
        this.event = event;
    },

}
</script>

<style scoped>
.card {
    margin: 0 auto;
    float: none;
    margin-bottom: 10px;
}
</style>