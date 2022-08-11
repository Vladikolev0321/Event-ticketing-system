import { createRouter, createWebHistory } from 'vue-router'
import EventsView from '../views/EventsView.vue'
import CreateEvent from '../views/CreateEvent.vue'
import MyEvents from '../views/MyEvents.vue'

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
    }
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;