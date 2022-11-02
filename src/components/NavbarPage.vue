<template>
  <div class="navbar">
    <div>Vue3</div>
    <div class="navbar_btns">
      <MyButton @click="$router.push('/posts')">Посты</MyButton>
      <MyButton @click="$router.push('/store')">store</MyButton>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavbarPage",
  components: {},
};
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: grey;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar_btns {
  margin-left: auto;
}
</style>
