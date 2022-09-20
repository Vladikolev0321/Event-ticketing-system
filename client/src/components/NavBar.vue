<template>
    <MDBNavbar class="nav" expand="lg" light bg="light" container>
        <MDBNavbarToggler target="#navbarTogglerDemo01"></MDBNavbarToggler>
          <MDBNavbarNav collapse="navbarTogglerDemo01" center class="mb-2 mb-lg-0">
            <MDBNavbarItem to="/home" active>
              Events
            </MDBNavbarItem>
            <MDBNavbarItem to="/market" active>
              Market
            </MDBNavbarItem>
            <MDBNavbarItem to="/myEvents" active>
              My events
            </MDBNavbarItem>
            <MDBNavbarItem to="/myTickets" active>
              My tickets
            </MDBNavbarItem>
            <MDBNavbarItem to="/cart" active>
              Cart
            </MDBNavbarItem>
            <MDBNavbarItem active>
              <!-- <MDBBtn>Connect to wallet</MDBBtn> -->
              <MetamaskConnect></MetamaskConnect>
            </MDBNavbarItem>
            
          </MDBNavbarNav>
    </MDBNavbar>
</template>

<script>
import {
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    // MDBBtn
} from 'mdb-vue-ui-kit';
import MetamaskConnect from './MetamaskConnect.vue';

export default {
  name: 'NavBar',
  data() {
    return {
      // : false,
    };
  },
  components: {
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    // MDBBtn,
    MetamaskConnect
},
}
</script>

<style> 
.nav {
    margin-top: 0px;
    /* margin-right: 100px; */
    /* margin-left: 100px; */
    margin-bottom: 20px;
}
a.active {
  color: #f1a80a;
  border-color: #f1a80a;
  /* background-color: #1a037e; */
}
</style>
