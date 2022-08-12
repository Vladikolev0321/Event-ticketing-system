import { createRouter, createWebHistory } from 'vue-router'
import EventsView from '../views/EventsView.vue'
import CreateEvent from '../views/CreateEvent.vue'
import MyEvents from '../views/MyEvents.vue'
import MarketPlace from '../views/Marketplace.vue'
import MyTickets from '../views/MyTickets.vue'

const routes = [
    { path: '/', redirect: '/home' },
    {
      path: '/home',
      component: EventsView,
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
      path: '/market',
      component: MarketPlace,
    },
    {
      path: '/myTickets',
      component: MyTickets,
    }
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;