import { createRouter, createWebHistory } from "vue-router";
import PageMain from "@/pages/PageMain";
import MovieId from "@/pages/MovieId";
import CreateMovie from "@/pages/Admin/CreateMovie";
import LoginPage from "@/pages/LoginPage";
import RegistrationPage from "@/pages/RegistrationPage";
import store from "../store/main";
import ProfilePage from "@/pages/ProfilePage";
import AdminMain from "@/pages/Admin/AdminMain";
import BuyTicket from "@/components/BuyTicket";
import UpdateMovie from "@/pages/Admin/UpdateMovie";

const routes = [
  {
    path: "/",
    component: PageMain,
  },
  {
    path: "/adminMain",
    component: AdminMain,
    name: "adminMain",
    beforeEnter: (to, from, next) => {
      if (
        !store.getters["auth/isAuth"] &&
        store.getters["auth/getRoles"] !== "ROLE_ADMIN"
      ) {
        return next({
          name: "login",
        });
      }
      next();
    },
  },
  {
    path: "/movie/:id",
    component: MovieId,
  },
  {
    path: "/movie/create",
    component: CreateMovie,
    name: "createMovie",
    beforeEnter: (to, from, next) => {
      if (
        !store.getters["auth/isAuth"] &&
        store.getters["auth/getRoles"] !== "ROLE_ADMIN"
      ) {
        return next({
          name: "login",
        });
      }
      next();
    },
  },
  {
    path: "/schedule/:id",
    component: BuyTicket,
    name: "buy",
    beforeEnter: (to, from, next) => {
      if (
        !store.getters["auth/isAuth"] &&
        store.getters["auth/getRoles"] === "ROLE_ADMIN"
      ) {
        return next({
          name: "login",
        });
      }
      next();
    },
  },
  {
    path: "/movie/update/:id",
    component: UpdateMovie,
    name: "updateMovie",
    beforeEnter: (to, from, next) => {
      if (
        !store.getters["auth/isAuth"] &&
        store.getters["auth/getRoles"] === "ROLE_ADMIN"
      ) {
        return next({
          name: "login",
        });
      }
      next();
    },
  },
  {
    path: "/register",
    component: RegistrationPage,
    name: "register",
  },
  {
    path: "/login",
    component: LoginPage,
    name: "login",
  },
  {
    path: "/profile",
    component: ProfilePage,
    name: "profile",
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/isAuth"]) {
        return next({
          name: "login",
        });
      }
      next();
    },
  },
];

export default createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});
