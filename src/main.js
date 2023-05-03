import { createApp } from "vue";
import App from "./App.vue";
import components from "@/components/UI";
import router from "@/router/router";
import i18n from "@/i18n";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/src/jquery.js";
import "popper.js";
import moment from "moment";
import directives from "@/directives";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import store from "./store/main";
//import VueGeolocation from "vue3-geolocation/src";
import VueGoogleMaps from "@fawmi/vue-google-maps";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const app = createApp(App);
require("./store/subscriber");

directives.forEach((directive) => {
  app.directive(directive.name, directive);
});
app.config.globalProperties.$moment = moment;

components.forEach((component) => {
  app.component(component.name, component);
});
app.use(VueSweetalert2);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCcCOhoVhUS3Rs10gvrZt5_1Aje794NV70",
  },
});
app.use(router).use(store).use(i18n).mount("#app");
