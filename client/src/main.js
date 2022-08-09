import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap"
import 'mdb-vue-ui-kit/css/mdb.min.css';

const app = createApp(App);
// app.use(BootstrapVue)
// app.use(IconsPlugin)

app.use(router);
app.mount('#app');

// import 'bootstrap/dist/css/bootstrap.js'