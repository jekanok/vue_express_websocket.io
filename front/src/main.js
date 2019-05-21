import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import animal from "animate.css";
import Vuelidate from 'vuelidate'
import VueSession from 'vue-session'
// import "https://necolas.github.io/normalize.css/8.0.1/normalize.css");";
// import "../src/assets/css/bootstrap-grid.css";
import style from "../src/assets/css/style.css";
import uimini from "../src/assets/css/uimini.css";
// import firebase from 'firebase/app'

// var config = {
//   apiKey: "AIzaSyCyTKsjvIwxjAlXBhzLoPmc7l67kXZzK3o",
//   authDomain: "sms24-dddc5.firebaseapp.com",
//   databaseURL: "https://sms24-dddc5.firebaseio.com",
//   projectId: "sms24-dddc5",
//   storageBucket: "sms24-dddc5.appspot.com",
//   messagingSenderId: "424570005902"
// };
// firebase.initializeApp(config);
Vue.use(require('vue-moment'));
Vue.config.productionTip = false;
Vue.use(Vuelidate);
new Vue({
  router,
  uimini,
  style,
  VueSession,
  animal,
  render: h => h(App)
}).$mount("#app");