<template>
  <textarea
    class="textarea"
    :value="modelValue"
    @input="updateTextArea"
    type="text"
  />
</template>

<script>
export default {
  name: "MyTextArea",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateTextArea(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style scoped>
.textarea {
  width: 70%;
  border: 1px solid teal;
  padding: 18px 15px;
  margin-top: 10px;
}
</style>
