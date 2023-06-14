import auth from "@/store/auth";
import { createStore } from "vuex";

const store = createStore({
  state: {
    isLoading: true,
    isDarkTheme: true,
    souvenirItems: JSON.parse(localStorage.getItem("souvenirItems")) ?? [],
    movieTickets: JSON.parse(localStorage.getItem("movieTickets")) ?? [],
    productItems: JSON.parse(localStorage.getItem("productItems")) ?? [],
    session: JSON.parse(localStorage.getItem("session")) ?? [],
  },
  getters: {
    getLoading(state) {
      return state.isLoading;
    },
    getDarkTheme(state) {
      return state.isDarkTheme;
    },
    getSouvenirItems(state) {
      return state.souvenirItems;
    },
    getMovieTickets(state) {
      return state.movieTickets;
    },
    getProductItems(state) {
      return state.productItems;
    },
    getSession(state) {
      return state.session;
    },
  },
  mutations: {
    setLoading(state, newLoadingState) {
      state.isLoading = newLoadingState;
    },
    setDarkTheme(state, newDarkThemeState) {
      state.isDarkTheme = newDarkThemeState;
    },
    setSouvenirToBasket(state, newSouvenirItems) {
      state.souvenirItems = newSouvenirItems;
    },
    setProductToBasket(state, newProductItems) {
      state.productItems = newProductItems;
    },
    setSession(state, newSession) {
      state.session = newSession;
    },

    setMovieToBasket(state, payload) {
      const operation = payload.action;
      const newMoviesItems = payload.data;

      switch (operation) {
        case "rewrite":
          state.movieTickets = newMoviesItems;
          break;
        case "push":
          state.movieTickets.push(newMoviesItems);
          break;
      }
    },
  },
  actions: {},
  modules: {
    auth,
  },
});

export default store;
