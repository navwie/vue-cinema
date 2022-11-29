<template>
  <input
    class="checkbox"
    :value="modelValue"
    @input="updateInput"
    type="checkbox"
  />
</template>

<script>
export default {
  name: "MyCheckbox",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style scoped></style>
