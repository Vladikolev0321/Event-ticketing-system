<template>
  <h1>Cart</h1>
  <div class="checkout-box">
    <ul class="checkout-list">
      <transition-group name="fade">
        <li
          v-for="(product, index) in /*getProductsInCart()*/ ticketsInCart"
          :key="index"
          class="checkout-product"
        >
          <img :src="product.image" alt="" class="product-image" />
          <h3 class="product-name">{{ product.name }}</h3>
          <span class="product-price">R$ {{ product.price }},00 </span>
          <button class="product-remove" @click="remove(index)">X</button>
        </li>
      </transition-group>
    </ul>
    <div v-if="!hasProduct()" class="checkout-message">
      <h3>No products...</h3>
      <router-link to="./">Back to list of products</router-link>
    </div>
    <h3 class="total" v-if="hasProduct()">Total: R$ {{ totalPrice() }}, 00</h3>
    <MDBBtn tag="a" color="primary" @click="buyTickets()">Buy</MDBBtn>
  </div>
</template>

<script>
import {
  MDBBtn,
}
from "mdb-vue-ui-kit";
import Web3 from 'web3';

export default {
  name: 'CartView',
  components: {
    MDBBtn,
  },
  data() {
    return {
      ticketsInCart: [
        {
          id: 1,
          name: 'Ticket 1',
          price: 100,
          image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp',
          inCart: true,
        },
        {
          id: 2,
          name: 'Ticket 2',
          price: 200,
          image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp',
          inCart: true,
        }
      ],
    };
  },
  methods: {
    getProductsInCart() {
      // return this.ticketsInCart.filter(product => product.inCart);
      return this.ticketsInCart;
    },
    hasProduct() {
      return this.getProductsInCart().length > 0;
    },
    totalPrice() {
      return this.getProductsInCart().reduce((total, product) => {
        return total + parseInt(product.price);
      }, 0);
    },
    remove(index) {
      this.ticketsInCart.splice(index, 1);
      this.$store.commit('removeFromCart', index);
    },
    async buyTickets() {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();


      const ticketIds = this.ticketsInCart.map(ticket => parseInt(ticket.id));
      const amounts = this.ticketsInCart.map(ticket => ticket.amount);
      const prices = this.ticketsInCart.map(ticket => parseInt(ticket.price));

      console.log(ticketIds);
      console.log(amounts);
      console.log(prices);
      
      const tx = await this.$store.state.eventManager.methods.buyTickets(ticketIds, amounts, prices).send({from: accounts[0], value: this.totalPrice()});
      console.log(tx);
    }
  },
  created() {
    this.ticketsInCart = this.$store.state.ticketsInCart;
    this.ticketsInCart.forEach(ticket => {
      ticket.amount = 1;
    });
  },
};
</script>

<style scoped>

.checkout-box {
    width: 100%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    margin: 50px auto;
    box-sizing: border-box;
    padding: 1em;
  }
  .checkout-list {
    padding: 0;
  }
  .checkout-product {
    display: grid;
    grid-template-columns: 1fr 3fr 2fr .5fr;
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(73, 74, 78, 0.1);
    border-radius: 5px;
    list-style: none;
    box-sizing: border-box;
    padding: .8em;
    margin: 1em 0;
  }
  .checkout-product * {
    place-self: center;
  }
  .product-image {
    grid-column: 1/2;
    width: 50%;
  }
  .product-name {
    box-sizing: border-box;
  }
  .product-price {
    font-size: 1.2em;
    font-weight: bold;
  }
  .product-remove {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 0;
    background-color: #E0E0E0;
    color: #fff;
    cursor: pointer;
  }
  .total {
    font-size: 2em;
    font-weight: bold;
    align-self: flex-end;
  }
  .checkout-message {
    font-size: 1.5em;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-to {
    transform: translateX(-40px);
    opacity: 0;
  }
</style>