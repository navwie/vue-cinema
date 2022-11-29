<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "MyButton",
};
</script>

<style scoped>
.btn {
  padding: 10px 15px;
  color: white;
  background: none;
  border: 1px solid teal;
}
</style>
