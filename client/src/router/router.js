import { createRouter, createWebHistory } from 'vue-router'
import EventsView from '../views/EventsView.vue'

const routes = [
    { path: '/', redirect: '/home' },
    {
      path: '/home',
      component: EventsView,
    },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;