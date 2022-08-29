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
            Date: {{ event.startDate }} - {{ event.endDate }}
            <br>
            Location: {{ event.location }}
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
          startDate: "01/01/2019",
          endDate: "02/01/2019",
          location: "Location 1",
        },
        {
          name: "Event 2",
          startDate: "01/01/2019",
          endDate: "02/01/2019",
          location: "Location 1",
        },
      ],
    };
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