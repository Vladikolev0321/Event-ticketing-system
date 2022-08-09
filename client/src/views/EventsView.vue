<template>
    <h1>Events</h1>
    <div>
      <MDBNavbar class="nav" expand="lg" light bg="light" container>
        <MDBNavbarToggler
          target="#navbarCenterAlignExample"
          @click="collapse6 = !collapse6"
        ></MDBNavbarToggler>
        <MDBCollapse id="navbarCenterAlignExample" v-model="collapse6">
          <MDBNavbarNav center class="mb-2 mb-lg-0">
            <MDBNavbarItem to="#" active>
              Events
            </MDBNavbarItem>
            <MDBNavbarItem href="#" active>
              Tickets for sale
            </MDBNavbarItem>
            <MDBNavbarItem href="#" active>
              My events
            </MDBNavbarItem>
            <MDBNavbarItem href="#" active>
              My tickets
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
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
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBCollapse,
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
      MDBNavbar,
      MDBNavbarToggler,
      MDBNavbarNav,
      MDBNavbarItem,
      MDBCollapse,
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

  /* justify-content: space-between; */
}

.card{
  height: 400px;
  width: 350px;
}

.nav {
    margin-right: 100px;
    margin-left: 100px;
    margin-bottom: 20px;
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
