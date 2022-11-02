<template>
  <div>
    <h2>Page with posts</h2>
    <MyInput v-focus v-model="search" placeholder="enter title" />
    <div class="app_btns">
      <MyButton @click="showDialog">Create post</MyButton>
    </div>
    <MySelect v-model="selectedSort" :options="sortOption" />
    <my-dialog v-model:show="dialogVisible">
      <PostForm @create="createPost" />
    </my-dialog>
    <PostList
      v-if="loading !== true"
      :posts="sortedAndSearched"
      @remove="removePost"
    />
    <div v-else>Loading</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!--    <div class="page_wrapper">-->
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
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from "axios";
export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      modificator: "",
      loading: false,
      page: 1,
      limit: 10,
      totalPage: 0,
      selectedSort: "",
      sortOption: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По описанию" },
      ],
      search: "",
    };
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
    async fetchPosts() {
      try {
        this.loading = true;
        setTimeout(async () => {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
              params: {
                _page: this.page,
                _limit: this.limit,
              },
            }
          );
          this.totalPage = Math.ceil(
            response.headers["x-total-count"] / this.limit
          );
          this.posts = response.data;
          this.loading = false;
        }, 1000);
      } catch (e) {
        alert("error");
      }
    },

    async loadMorePosts() {
      try {
        this.page += 1;
        setTimeout(async () => {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
              params: {
                _page: this.page,
                _limit: this.limit,
              },
            }
          );
          this.totalPage = Math.ceil(
            response.headers["x-total-count"] / this.limit
          );
          this.posts = [...this.posts, ...response.data];
        }, 1000);
      } catch (e) {
        alert("error");
      }
    },
  },
  mounted() {
    this.fetchPosts();
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
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      );
    },
    sortedAndSearched() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.search.toLocaleLowerCase())
      );
    },
  },
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
