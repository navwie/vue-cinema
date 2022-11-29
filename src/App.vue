<template>
  <navbar></navbar>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/NavbarPage";

export default {
  components: { Navbar },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
  box-sizing: border-box;
  background-color: #11141a;
}

.app {
  padding: 20px;
  height: 100%;
  background-color: #11141a;
}
</style>
