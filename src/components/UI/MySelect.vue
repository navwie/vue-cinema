<template>
  <select class="select" @change="changeOption">
    <option disabled value="">Choose the option</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
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
  methods: {
    changeOption(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style scoped>
.select {
  width: 50%;
  border: 1px solid teal;
  padding: 18px 15px;
  margin-top: 10px;
  color: white;
  margin-bottom: 30px;
}
</style>
