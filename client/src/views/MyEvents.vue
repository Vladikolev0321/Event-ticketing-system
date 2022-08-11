<template>
  <h1>My events</h1>
  <div class="cards-container d-flex flex-wrap">
    <div v-for="event in events" :key="event.name">
      <MDBCard class="card">
        <a v-mdb-ripple="{ color: 'light' }">
          <MDBCardImg
            src="https://mdbootstrap.com/img/new/standard/nature/184.webp"
            top
            alt="..."
          />
        </a>
        <MDBCardBody>
          <MDBCardTitle>{{ event.name }}</MDBCardTitle>
          <MDBCardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </MDBCardText>
          <MDBBtn tag="a" href="#!" color="primary">Check out</MDBBtn>
        </MDBCardBody>
      </MDBCard>
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
      events: [
        {
          name: "Event 1",
        },
        {
          name: "Event 2",
        },
      ],
    };
  },
};
</script>

<style>
.cards-container {
  margin-top: 50px;
  gap: 10px;

  /* justify-content: space-between; */
}

.card{
  height: 400px;
  width: 350px;
}
</style>