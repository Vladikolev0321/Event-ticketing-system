<template>
    <h1>Events</h1>
    <div>
      <router-link :to="'/createEvent'"><MDBBtn color="dark" rounded>Create event</MDBBtn></router-link>
      <div class="cards-container d-flex flex-wrap">
        <div v-for="event in events" :key="event.name">
          <MDBCard class="card">
          <a v-mdb-ripple="{ color: 'light' }">
            <MDBCardImg src="https://mdbootstrap.com/img/new/standard/nature/184.webp" top alt="..." />
          </a>
          <MDBCardBody>
            <MDBCardTitle>{{ event.name }}</MDBCardTitle>
            <MDBCardText>
              Date: {{ event.startDate }} - {{ event.endDate }}
              <br>
              Location: {{ event.location }}
            </MDBCardText>
            <router-link :to="'/home/'+event.id"><MDBBtn tag="a" color="primary">Check out</MDBBtn></router-link>
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
  name: 'EventsView',
  props: {
    msg: String
  },
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
      events: [
        {
          id: 1,
          name: "Event 1",
          startDate: "01/01/2019",
          endDate: "02/01/2019",
          location: "Location 1",
        },
        {
          id: 2,
          name: "Event 2",
          startDate: "01/01/2019",
          endDate: "02/01/2019",
          location: "Location 1",
        },
      ]
    }
  },
  created() {
    this.events = this.$store.state.events;
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
