<template>
  <form @submit.prevent>
    <h4>Create post</h4>
    <MyInput v-focus v-model="post.title" type="text" placeholder="Name" />
    <MyInput v-model="post.body" type="text" placeholder="Description" />
    <myButton style="align-self: flex-end" class="btn" @click="createPost"
      >Create</myButton
    >
  </form>
</template>

<script>
export default {
  name: "PostForm",
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit("create", this.post);
      this.post = {
        title: "",
        body: "",
      };
    },
  },
  // watch: {
  //   post: {
  //     handler(newVal) {
  //       console.log(newVal);
  //     },
  //     deep: true,
  //   },
  // },
};
</script>

<style scoped></style>
