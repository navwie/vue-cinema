import store from "./main";
import { registration } from "@/api/api_request";

export default {
  namespaced: true,
  getters: {
    isAuth(state) {
      return state.token !== null;
    },
    getRoles(state) {
      return state.roles;
    },
    getToken(state) {
      return state.token;
    },
    getUser(state) {
      return state.user;
    },
  },
  state: {
    token: localStorage.getItem("token"),
    roles: JSON.parse(localStorage.getItem("roles")),
    user: JSON.parse(localStorage.getItem("user")),
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setRoles(state, roles) {
      state.roles = roles;
    },
    addRole(state, role) {
      state.roles.push(...role);
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async register(_, form) {
      store.commit("setLoading", true);
      return await registration(form)
        .then(() => {
          store.commit("setLoading", false);
        })
        .catch((e) => {
          store.commit("setLoading", false);
          console.log(e);
        });
    },
    logout({ commit }) {
      store.commit("setLoading", true);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("roles");
      commit("setToken", null);
      commit("setRoles", null);
      commit("setUser", null);
      store.commit("setLoading", false);
    },
  },
};
