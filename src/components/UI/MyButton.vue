<template>
  <button :class="this.getDarkTheme ? 'dark_btn' : 'light_btn'">
    <slot></slot>
  </button>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MyButton",
  computed: {
    ...mapGetters(["getDarkTheme"]),
  },
};
</script>

<style scoped>
.dark_btn {
  padding: 10px 15px;
  color: white;
  background: none;
  border: 1px solid #4d7cbc;
}
.light_btn {
  padding: 10px 15px;
  color: #4d7cbc;
  background: none;
  border: 1px solid #4d7cbc;
}
</style>
