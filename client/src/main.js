import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap"
import 'mdb-vue-ui-kit/css/mdb.min.css';
import { plugin, defaultConfig } from '@formkit/vue';
/* import the fontawesome core */
// import { library } from '@fortawesome/fontawesome-svg-core'

// /* import font awesome icon component */
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// /* import specific icons */
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

// /* add icons to the library */
// library.add(faUserSecret)


const app = createApp(App);
// .component('font-awesome-icon', FontAwesomeIcon);
// app.use(BootstrapVue)
// app.use(IconsPlugin)

app.use(router).use(plugin, defaultConfig);
app.mount('#app');

// import 'bootstrap/dist/css/bootstrap.js'