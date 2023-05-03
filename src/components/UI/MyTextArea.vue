<template>
  <textarea
    :class="this.getDarkTheme ? 'dark_textarea' : 'light_textarea'"
    :value="modelValue"
    @input="updateTextArea"
    type="text"
  />
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MyTextArea",
  props: {
    modelValue: [String, Number],
  },
  computed: {
    ...mapGetters(["getDarkTheme"]),
  },
  methods: {
    updateTextArea(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style scoped>
.dark_textarea {
  width: 100%;
  border: 1px solid #4d7cbc;
  padding: 18px 15px;
  background-color: transparent;
  color: white;
  margin-top: 10px;
}
.dark_textarea::placeholder {
  color: white;
}

.light_textarea {
  width: 100%;
  border: 1px solid #4d7cbc;
  padding: 18px 15px;
  background-color: transparent;
  color: black;
  margin-top: 10px;
}
.light_textarea::placeholder {
  color: black;
}
</style>
