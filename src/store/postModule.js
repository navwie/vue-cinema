import axios from "axios";

export const postModule = {
  state: () => ({
    posts: [],
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
  }),
  getters: {
    sortedPosts(state) {
      return [state.posts].sort((post1, post2) =>
        post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
      );
    },
    sortedAndSearched(state, getters) {
      return getters.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(state.search.toLocaleLowerCase())
      );
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, bool) {
      state.isPostLoaging = bool;
    },
    setPage(state, page) {
      state.page = page;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setTotalPage(state, totalPage) {
      state.totalPage = totalPage;
    },
    setSearch(state, search) {
      state.search = search;
    },
  },
  actions: {
    async fetchPosts(state, commit) {
      try {
        commit("setLoading", true);
        setTimeout(async () => {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
              params: {
                _page: state.page,
                _limit: state.limit,
              },
            }
          );
          commit(
            "setTotalPage",
            Math.ceil(response.headers["x-total-count"] / state.limit)
          );
          commit("setPosts", response.data);
          commit("setLoading", false);
        }, 1000);
      } catch (e) {
        alert("error");
      }
    },

    async loadMorePosts(state, commit) {
      try {
        commit("setPage", (state.page += 1));
        setTimeout(async () => {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
              params: {
                _page: state.page,
                _limit: state.limit,
              },
            }
          );
          commit(
            "setTotalPage",
            Math.ceil(response.headers["x-total-count"] / state.limit)
          );
          commit("setPosts", [...this.posts, ...response.data]);
        }, 1000);
      } catch (e) {
        alert("error");
      }
    },
  },
};
