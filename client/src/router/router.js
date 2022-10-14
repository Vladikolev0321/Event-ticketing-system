import { createRouter, createWebHistory } from 'vue-router'
import EventsView from '../views/EventsView.vue'
import CreateEvent from '../views/CreateEvent.vue'
import MyEvents from '../views/MyEvents.vue'
import MarketPlace from '../views/Marketplace.vue'
import MyTickets from '../views/MyTickets.vue'
import EventDetails from '../views/EventDetails.vue'
import TicketDetails from '../views/TicketDetails.vue'
import CartView from '../views/CartView.vue'
import EditEvent from '../views/EditEvent.vue'

const routes = [
    { path: '/', redirect: '/home' },
    {
      path: '/home',
      component: EventsView,
    },
    {
      path: '/home/:eventId',
      component: EventDetails,
    },
    {
      path: '/createEvent',
      component: CreateEvent,
    },
    {
      path: '/myEvents',
      component: MyEvents,
    },
    {
      path: '/myEvents/:eventId',
      component: EditEvent,
    },
    {
      path: '/market',
      component: MarketPlace,
    },
    {
      path: '/market/:ticketId',
      component: TicketDetails,
      props: { isForSale: true},
    },
    {
      path: '/myTickets',
      component: MyTickets,
    },
    {
      path: '/myTickets/:ticketId',
      component: TicketDetails,
      props: { isForSale: false },
    },
    {
      path: '/cart',
      component: CartView,
    },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;