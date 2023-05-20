import auth from "@/store/auth";
import { createStore } from "vuex";

const store = createStore({
  state: {
    isLoading: true,
    isDarkTheme: true,
    souvenirItems: JSON.parse(localStorage.getItem("souvenirItems")) ?? [],
    movieTickets: JSON.parse(localStorage.getItem("movieTickets")) ?? [],
    productItems: JSON.parse(localStorage.getItem("productItems")) ?? [],
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
    setMovieToBasket(state, newMoviesItems) {
      state.movieTickets.push(newMoviesItems);
    },
  },
  actions: {},
  modules: {
    auth,
  },
});

export default store;
