<template>
  <input
    :class="this.getDarkTheme ? 'dark_input' : 'light_input'"
    :value="modelValue"
    @input="updateInput"
    type="text"
    required
  />
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MyInput",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
  computed: {
    ...mapGetters(["getDarkTheme"]),
  },
};
</script>

<style scoped>
.dark_input {
  border: 1px solid #4d7cbc;
  border-radius: 26px;
  padding: 18px 15px;
  margin-top: 10px;
  color: white;
  background-color: transparent;
  width: 100%;
  min-width: 40%;
}
.dark_input::placeholder {
  color: white;
  padding-left: 10px;
  font-size: 18px;
}
.light_input {
  border: 1px solid #4d7cbc;
  border-radius: 26px;
  padding: 18px 15px;
  margin-top: 10px;
  color: #000;
  background-color: transparent;
  width: 100%;
  min-width: 40%;
}
.light_input::placeholder {
  color: #000;
  padding-left: 10px;
  font-size: 18px;
}
</style>
