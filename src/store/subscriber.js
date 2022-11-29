import store from "./main";
//import axios from "axios";

store.subscribe((mutation, state) => {
  // The code inside the curly brackets fires any time a mutation occurs.
  // When a mutation occurs, we'll stringify our entire state object - which
  // contains our todo list. We'll put it in the users localStorage, so that
  // their data will persist even if they refresh the page.
  localStorage.setItem("token", state.auth.token);
  localStorage.setItem("user", JSON.stringify(state.auth.user));
  localStorage.setItem("roles", JSON.stringify(state.auth.roles));
});

/*store.subscribe((mutation) => {
  switch (mutation.type) {
    case "auth/setToken":
      //debugger; // eslint-disable-line
      if (mutation.payload) {
        console.log(mutation.payload);
        axios.defaults.headers.common[
          "Authorization"
        ] = `BEARER ${mutation.payload}`;
        console.log("token");
        localStorage.setItem("token", mutation.payload);
      } else {
        console.log("else");
        axios.defaults.headers.common["Authorization"] = null;
        localStorage.setItem("token", mutation.payload);

        // localStorage.removeItem("token");
      }
      break;
  }
});*/
