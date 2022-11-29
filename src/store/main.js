import auth from "@/store/auth";
import { createStore } from "vuex";

const store = createStore({
  state: {
    isLoading: true,
  },
  getters: {
    getLoading(state) {
      return state.isLoading;
    },
  },
  mutations: {
    setLoading(state, newLoadingState) {
      state.isLoading = newLoadingState;
    },
  },
  actions: {},
  modules: {
    auth,
  },
});

export default store;
