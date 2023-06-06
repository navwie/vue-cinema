import store from "./main";

store.subscribe((mutation, state) => {
  localStorage.setItem("token", state.auth.token);
  localStorage.setItem("userId", state.auth.userid);
  localStorage.setItem("user", JSON.stringify(state.auth.user));
  localStorage.setItem("roles", JSON.stringify(state.auth.roles));
  localStorage.setItem("age", JSON.stringify(state.auth.age));
  localStorage.setItem("addressId", JSON.stringify(state.auth.addressid));
  localStorage.setItem("cafeId", JSON.stringify(state.auth.cafeid));
  localStorage.setItem("shopId", JSON.stringify(state.auth.shopid));
  localStorage.setItem("souvenirItems", JSON.stringify(state.souvenirItems));
  localStorage.setItem("movieTickets", JSON.stringify(state.movieTickets));
  localStorage.setItem("productItems", JSON.stringify(state.productItems));
});
