<template>
  <select
    :class="this.getDarkTheme ? 'dark_select' : 'light_select'"
    @change="changeOption"
  >
    <option
      :class="this.getDarkTheme ? 'dark_option' : 'light_option'"
      disabled
      value=""
    >
      Choose the option
    </option>
    <option
      :class="this.getDarkTheme ? 'dark_option' : 'light_option'"
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MySelect",
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters(["getDarkTheme"]),
  },
  methods: {
    changeOption(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style scoped>
.dark_select {
  width: 100%;
  border: 1px solid #4d7cbc;
  padding: 18px 15px;
  margin-top: 10px;
  color: white;
  border-radius: 20px;
  background-color: transparent;
}
.light_select {
  width: 100%;
  border: 1px solid #4d7cbc;
  padding: 18px 15px;
  margin-top: 10px;
  color: black;
  border-radius: 20px;
  background-color: transparent;
  margin-bottom: 30px;
}
.dark_option {
  background-color: #333333;
  color: white;
}
.light_option {
  background-color: #fff;
  color: black;
}
</style>
