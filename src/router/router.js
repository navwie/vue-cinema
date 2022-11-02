import { createRouter, createWebHistory } from "vue-router";
import PageMain from "@/pages/PageMain";
import PostPage from "@/pages/PostPageWithStore";
import PostIdPage from "@/pages/PostIdPage";
import PostPageWithStore from "@/pages/PostPageWithStore";

const routes = [
  {
    path: "/",
    component: PageMain,
  },
  {
    path: "/posts",
    component: PostPage,
  },

  {
    path: "/posts/:id",
    component: PostIdPage,
  },
  {
    path: "/store",
    component: PostPageWithStore,
  },
];

export default createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});
