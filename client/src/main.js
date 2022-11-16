import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import 'mdb-vue-ui-kit/css/mdb.min.css';
import { plugin, defaultConfig } from '@formkit/vue';
import store from './store/index';

const app = createApp(App);
app.use(router).use(plugin, defaultConfig).use(store);
app.mount('#app');
