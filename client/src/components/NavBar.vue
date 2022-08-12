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
    margin-right: 100px;
    margin-left: 100px;
    margin-bottom: 20px;
}
</style>
