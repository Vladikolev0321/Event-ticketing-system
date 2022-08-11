<template>
    <h1>Events</h1>
    <div>
      <MDBBtn color="dark" rounded>Create event</MDBBtn>
      <div class="cards-container d-flex flex-wrap">
        <li v-for="event in events" :key="event.name">
          <MDBCard class="card">
          <a v-mdb-ripple="{ color: 'light' }">
            <MDBCardImg src="https://mdbootstrap.com/img/new/standard/nature/184.webp" top alt="..." />
          </a>
          <MDBCardBody>
            <MDBCardTitle>{{ event.name }}</MDBCardTitle>
            <MDBCardText>
              Some quick example text to build on the card title and make up the bulk of the
              card's content.
            </MDBCardText>
            <MDBBtn tag="a" href="#!" color="primary">Check out</MDBBtn>
          </MDBCardBody>
          </MDBCard>
        </li>
      </div>
    </div>  
</template>

<script>
import {
    // MDBNavbar,
    // MDBNavbarToggler,
    // MDBNavbarNav,
    // MDBNavbarItem,
    // MDBCollapse,
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
      // MDBNavbar,
      // MDBNavbarToggler,
      // MDBNavbarNav,
      // MDBNavbarItem,
      // MDBCollapse,
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
          name: 'Event 1',
        },
        {
          name: 'Event 2',
        },
        {
          name: 'Event 1',
        },
        {
          name: 'Event 2',
        },
        {
          name: 'Event 1',
        },
        {
          name: 'Event 2',
        }
      ]
    }
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


h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
