<template>
  <div>
    <h2>
      {{ $store.state.post.limit }}
    </h2>

    <!--    <h1>-->
    <!--      {{-->
    <!--        $store.isAuth ? "user authorized" : "Please, you need to be authorized"-->
    <!--      }}-->
    <!--    </h1>-->
    <!--    <h2>{{ $store.getters.doubleLikes }}</h2>-->
    <!--    <div>-->
    <!--      <MyButton @click="$store.commit('incrementLikes')"-->
    <!--        >Поставить лайк</MyButton-->
    <!--      >-->
    <!--      <MyButton @click="$store.commit('decrementLikes')">Убрать лайк</MyButton>-->
    <!--    </div>-->
    <!--    <h2>Page with posts</h2>-->
    <!--    <MyInput v-focus v-model="search" placeholder="enter title" />-->
    <!--    <div class="app_btns">-->
    <!--      <MyButton @click="showDialog">Create post</MyButton>-->
    <!--    </div>-->
    <!--    <MySelect v-model="selectedSort" :options="sortOption" />-->
    <!--    <my-dialog v-model:show="dialogVisible">-->
    <!--      <PostForm @create="createPost" />-->
    <!--    </my-dialog>-->
    <!--    <PostList-->
    <!--      v-if="loading !== true"-->
    <!--      :posts="sortedAndSearched"-->
    <!--      @remove="removePost"-->
    <!--    />-->
    <!--    <div v-else>Loading</div>-->
    <!--    <div v-intersection="loadMorePosts" class="observer"></div>-->
    <!--    &lt;!&ndash;    <div class="page_wrapper">&ndash;&gt;-->
    <!--      <div-->
    <!--        v-for="pageKey in totalPage"-->
    <!--        :class="{-->
    <!--          'current-page': page === pageKey,-->
    <!--        }"-->
    <!--        :key="pageKey"-->
    <!--        class="page"-->
    <!--        @click="changePage(pageKey)"-->
    <!--      >-->
    <!--        {{ pageKey }}-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
// import PostForm from "@/components/PostForm";
// import PostList from "@/components/PostList";
export default {
  components: {
    // PostForm,
    // PostList,
  },
  data() {
    return {};
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    //***********пагинация********
    // changePage(pageKey) {
    //   this.page = pageKey;
    // },
  },
  mounted() {
    // this.fetchPosts();
  },
  watch: {
    // page() {
    //   this.fetchPosts();
    // },
    // selectedSort(newValue) {
    //   this.posts.sort((post1, post2) => {
    //     return post1[newValue]?.localeCompare(post2[newValue]);
    //   });
    // },
  },
  computed: {},
};
</script>
<style>
.app_btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

form {
  display: flex;
  flex-direction: column;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}
.observer {
  height: 40px;
  background: green;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}
.page_wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 10px;
}
.current-page {
  border: 5px solid red;
}
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
