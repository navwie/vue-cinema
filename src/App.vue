<template>
  <navbar :isDarkTheme="isDarkTheme" @themeChanged="changeTheme"></navbar>
  <div
    class="app"
    :class="{ 'dark-theme': isDarkTheme, 'light-theme': !isDarkTheme }"
  >
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/NavbarPage";
import { mapMutations } from "vuex";

export default {
  components: { Navbar },
  data() {
    return {
      isDarkTheme: this.existedThemePreference(),
    };
  },
  methods: {
    changeTheme(isDarkThemeFlag) {
      this.isDarkTheme = isDarkThemeFlag;

      localStorage.setItem("darkTheme", isDarkThemeFlag);
      this.setDarkTheme(isDarkThemeFlag);
    },
    existedThemePreference() {
      let darkTheme = localStorage.getItem("darkTheme");

      if (darkTheme === null) {
        localStorage.setItem("darkTheme", true);
        this.setDarkTheme(true);
        return true;
      }
      this.setDarkTheme(darkTheme === "true");

      return darkTheme === "true";
    },
    ...mapMutations([
      "setDarkTheme", // map `this.increment()` to `this.$store.commit('increment')`
    ]),
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.app {
  padding-bottom: 50px;
  height: 100%;
  min-height: 100vh;
}

.light-theme {
  background-color: #fff;
  color: #333;
}

.dark-theme {
  background-color: #080c14;
  color: #fff;
}
</style>
