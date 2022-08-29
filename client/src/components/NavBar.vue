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
            <div class="d-flex align-items-center">
            <!-- Icon -->
            <!-- <a class="text-reset me-3" href="#">
              <i class="fas fa-shopping-cart"></i>
            </a> -->
            </div>
          </MDBNavbarNav>
    </MDBNavbar>
</template>

<script>
import {
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
} from 'mdb-vue-ui-kit';

export default {
  name: 'NavBar',
  components: {
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
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
