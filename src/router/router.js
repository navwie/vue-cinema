import { createRouter, createWebHistory } from "vue-router";
import PageMain from "@/pages/Movie/PageMain";
import MovieId from "@/pages/Movie/MovieId";
import CreateMovie from "@/pages/Admin/CreateMovie";
import LoginPage from "@/pages/Auth/LoginPage";
import RegistrationPage from "@/pages/Auth/RegistrationPage";
import store from "../store/main";
import ProfilePage from "@/pages/User/ProfilePage";
import AdminMain from "@/pages/Admin/AdminMain";
import UpdateMovie from "@/pages/Admin/UpdateMovie";
import UpdateProfile from "@/pages/User/UpdateProfile";
import ContactPage from "@/pages/Cinema/ContactPage.vue";
import ChooseSeat from "@/pages/ChooseSeat";
import BuyTicket from "@/pages/Movie/BuyTicket.vue";
import WelcomePage from "@/pages/Cinema/WelcomePage.vue";
import CafePage from "@/pages/Cinema/CafePage.vue";
import SouvenirPage from "@/pages/Cinema/SouvenirPage.vue";
import NewsPage from "@/pages/Cinema/NewsPage.vue";
import AddNewSouvenir from "@/pages/Admin/AddNewSouvenir.vue";
import AddNewProductToCafe from "@/pages/Admin/AddNewProductToCafe.vue";
import AddNewsPage from "@/pages/Cinema/AddNewsPage.vue";
import VotingPage from "@/pages/Cinema/VotingPage.vue";
import MenuProductTypePage from "@/pages/Cinema/MenuProductTypePage.vue";

const routes = [
  {
    path: "/page-main",
    component: PageMain,
  },
  {
    path: "/menu",
    component: CafePage,
  },
  {
    path: "/news",
    component: NewsPage,
  },
  {
    path: "/shop-souvenir",
    component: SouvenirPage,
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
    path: "/create-souvenir",
    component: AddNewSouvenir,
    name: "newSouvenir",
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
    path: "/create-product-cafe",
    component: AddNewProductToCafe,
    name: "addProductCafe",
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
    component: ChooseSeat,
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
    path: "/user/update/:id",
    component: UpdateProfile,
    name: "updateProfile",
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
    path: "/voting",
    component: VotingPage,
    name: "voting",
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
    path: "/menu/type/:param",
    component: MenuProductTypePage,
    name: "menutype",
  },
  {
    path: "/",
    component: WelcomePage,
    name: "welcome",
  },
  {
    path: "/login",
    component: LoginPage,
    name: "login",
  },
  {
    path: "/buyTicket",
    component: BuyTicket,
    name: "BuyTicket",
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
    path: "/contacts",
    component: ContactPage,
    name: "contacts",
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
  {
    path: "/add-news",
    component: AddNewsPage,
    name: "addNews",
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
