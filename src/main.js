import { createApp } from "vue";
import App from "./App.vue";
import components from "@/components/UI";
import router from "@/router/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/src/jquery.js";
import "popper.js";
import moment from "moment";
import directives from "@/directives";
import store from "./store/main";
const app = createApp(App);
require("./store/subscriber");

directives.forEach((directive) => {
  app.directive(directive.name, directive);
});
app.config.globalProperties.$moment = moment;

components.forEach((component) => {
  app.component(component.name, component);
});

app.use(router).use(store).mount("#app");
