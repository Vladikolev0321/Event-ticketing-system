<template>
    <MDBNavbar class="nav" expand="lg" light bg="light" container>
        <MDBNavbarToggler target="#navbarTogglerDemo01"></MDBNavbarToggler>
        <!-- <MDBCollapse id="navbarCenterAlignExample" v-model="collapse6"> -->
          <MDBNavbarNav collapse="navbarTogglerDemo01" center class="mb-2 mb-lg-0">
            <MDBNavbarItem to="/home" active>
              Events
            </MDBNavbarItem>
            <MDBNavbarItem href="#" active>
              Market
            </MDBNavbarItem>
            <MDBNavbarItem href="/myEvents" active>
              My events
            </MDBNavbarItem>
            <MDBNavbarItem href="#" active>
              My tickets
            </MDBNavbarItem>
          </MDBNavbarNav>
        <!-- </MDBCollapse> -->
    </MDBNavbar>
</template>

<script>
import {
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    // MDBCollapse,
} from 'mdb-vue-ui-kit';
// import { ref } from 'vue';

export default {
  name: 'NavBar',
  components: {
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    // MDBCollapse,
 },
 setup() {
    // const collapse1 = ref(false);
    // const dropdown1 = ref(false);
    // return {
    //     collapse1,
    //     dropdown1
    // }
 }
}
</script>

<style> 
.nav {
    margin-right: 100px;
    margin-left: 100px;
    margin-bottom: 20px;
}
</style>
