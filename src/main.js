import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'

import Default from './layouts/Default.Layout.vue'
import Simple from './layouts/Simple.Layout.vue'

Vue.component('default', Default)
Vue.component('simple', Simple)

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: 'my-ecloset.firebaseapp.com',
  databaseURL: 'https://my-ecloset.firebaseio.com',
  projectId: 'my-ecloset',
  storageBucket: 'my-ecloset.appspot.com',
  messagingSenderId: '836851374456',
  appId: '1:836851374456:web:e885772650b208f80ed08d'
}
firebase.initializeApp(firebaseConfig)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
