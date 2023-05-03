import auth from "@/store/auth";
import { createStore } from "vuex";

const store = createStore({
  state: {
    isLoading: true,
    isDarkTheme: true,
  },
  getters: {
    getLoading(state) {
      return state.isLoading;
    },
    getDarkTheme(state) {
      return state.isDarkTheme;
    },
  },
  mutations: {
    setLoading(state, newLoadingState) {
      state.isLoading = newLoadingState;
    },
    setDarkTheme(state, newDarkThemeState) {
      state.isDarkTheme = newDarkThemeState;
    },
  },
  actions: {},
  modules: {
    auth,
  },
});

export default store;
