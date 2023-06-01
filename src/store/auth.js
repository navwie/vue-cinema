import store from "./main";
import { logout, registration } from "@/api/api_request";

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
    getAge(state) {
      return state.age;
    },
    getUserId(state) {
      return state.userid;
    },
  },
  state: {
    userid: localStorage.getItem("userId"),
    token:
      localStorage.getItem("token") == "null"
        ? null
        : localStorage.getItem("token"),
    roles: JSON.parse(localStorage.getItem("roles")),
    user: JSON.parse(localStorage.getItem("user")),
    age: JSON.parse(localStorage.getItem("age")),
  },
  mutations: {
    setToken(state, newToken) {
      state.token = newToken;
    },
    setRoles(state, newRoles) {
      state.roles = newRoles;
    },
    setUser(state, newUser) {
      state.user = newUser;
    },
    setAge(state, newAge) {
      state.age = newAge;
    },
    setUserId(state, newUserid) {
      state.userid = newUserid;
    },
  },
  actions: {
    async register(_, form) {
      store.commit("setLoading", true);
      return await registration(form)
        .then(() => {
          store.commit("setLoading", false);
        })
        .catch(() => {
          store.commit("setLoading", false);
        });
    },
    async logout({ commit }) {
      await logout();
      store.commit("setLoading", true);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      localStorage.removeItem("roles");
      localStorage.removeItem("age");
      commit("setToken", null);
      commit("setRoles", null);
      commit("setUser", null);
      commit("setAge", null);
      commit("setUserId", null);
      store.commit("setLoading", false);
    },
  },
};
