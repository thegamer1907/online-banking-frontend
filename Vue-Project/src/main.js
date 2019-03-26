import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vueSession from "vue-session";
import VModal from "vue-js-modal";
import VueValidate from "vee-validate";
import VueResource from "vue-resource";
import store from "./store";
import "bootstrap";

Vue.config.productionTip = false;

Vue.prototype.$API_LOCATION = "http://52.172.44.93/api";

Vue.use(vueSession);
Vue.use(VModal);
Vue.use(VueResource);
Vue.use(VueValidate);

window.$ = require("jquery");
window.JQuery = require("jquery");
window.DataTable = require("datatables.net");

var vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

global.vm = vm;
