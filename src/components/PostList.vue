<template>
  <div v-if="posts.length > 0">
    <h3>List of posts</h3>
    <!--    <transition-group name="post-list">-->
    <PostItem
      :key="post.id"
      v-for="post in posts"
      :post="post"
      @remove="$emit('remove', post)"
    />
    <!--    </transition-group>-->
  </div>
  <h2 v-else style="color: red">Постов нет</h2>
</template>

<script>
import PostItem from "@/components/PostItem";

export default {
  name: "PostList",
  components: {
    PostItem,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.post-list {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 1s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
