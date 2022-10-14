<template>
    <h1>Edit event</h1>
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
                    <h5 class="card-title">Trendy Pants and Shoes</h5>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" id="name" placeholder="Enter name" v-model="event.name">
                    </div>
                    <div class="form-group">
                        <label for="uniqueCode">Unique code</label>
                        <input type="text" class="form-control" id="uniqueCode" placeholder="Enter unique code" v-model="event.uniqueCode">
                    </div>
                    <div class="form-group">
                        <label for="startDate">Start date</label>
                        <input type="date" class="form-control" id="startDate" placeholder="Enter start date" v-model="event.startDate">
                    </div>
                    <div class="form-group">
                        <label for="endDate">End date</label>
                        <input type="date" class="form-control" id="endDate" placeholder="Enter end date" v-model="event.endDate">
                    </div>
                    <div class="form-group">
                        <label for="location">Location</label>
                        <input type="text" class="form-control" id="location" placeholder="Enter location" v-model="event.location">
                    </div>
                    <div class="form-group">
                        <label for="posterUrl">Poster url</label>
                        <input type="text" class="form-control" id="posterUrl" placeholder="Enter poster url" v-model="event.posterUrl">
                    </div>
                    <div class="form-group">
                        <label for="urlToOfficialPage">Url to official page</label>
                        <input type="text" class="form-control" id="urlToOfficialPage" placeholder="Enter url to official page" v-model="event.urlToOfficialPage">
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea class="form-control" id="description" rows="3" v-model="event.description"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="tickets">Tickets:</label>
                        <div class="form-group
                        " v-for="ticket in event.tickets" :key="ticket.id">
                            <label for="ticketName">Name</label>
                            <input type="text" class="form-control" id="ticketName" placeholder="Enter name" v-model="ticket.name">
                            <label for="ticketPrice">Price</label>
                            <input type="number" class="form-control" id="ticketPrice" placeholder="Enter price" v-model="ticket.price">
                            <label for="ticketQuantity">Quantity</label>
                            <input type="number" class="form-control" id="ticketQuantity" placeholder="Enter amount" v-model="ticket.amount">
                        </div> 
                    </div>
                    <MDBBtn color="primary" rounded>Save</MDBBtn>
                </div>
            </div>
        </div>
    </div>
                    
</template>

<script>
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
    created() {
        const eventId = this.$route.params.eventId;
        const event = this.$store.state.events.find((e) => e.id == eventId);
        this.event = event;
    },
}
</script>

<style scoped>
</style>