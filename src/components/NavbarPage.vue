<template>
  <nav class="navbar navbar-expand-lg" style="background-color: #080c14">
    <div class="container-fluid">
      <a class="navbar-brand" style="font-size: 30px" href="#"
        ><img style="width: 15%" :src="image" alt="" />Планета кіно</a
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li v-if="getRoles == 'ROLE_ADMIN'" class="nav-item">
            <a
              class="nav-link"
              aria-current="page"
              href="#"
              @click="$router.push(`/adminMain`)"
              >Головна</a
            >
          </li>
          <li v-else class="nav-item">
            <a
              class="nav-link"
              aria-current="page"
              href="#"
              @click="$router.push(`/`)"
              >Головна</a
            >
          </li>
          <li v-if="isAuth && getRoles == 'ROLE_USER'" class="nav-item">
            <a class="nav-link" @click="$router.push(`/profile`)" href="#"
              >Профиль</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Контакти</a>
          </li>
          <li class="nav-item" v-if="!isAuth">
            <a @click="$router.push('/login')" class="nav-link btn" href="#">
              Увійти
            </a>
          </li>
          <li class="nav-item" v-if="isAuth && getRoles == 'ROLE_ADMIN'">
            <a
              @click="$router.push('/movie/create')"
              class="nav-link btn"
              href="#"
            >
              Додати фільм
            </a>
          </li>
          <li class="nav-item" v-if="isAuth">
            <a @click="submit" class="nav-link btn" href="#"> Вийти </a>
          </li>
        </ul>
        <!--        <form class="d-flex" role="search">-->
        <!--          <input-->
        <!--            class="search form-control me-0"-->
        <!--            type="search"-->
        <!--            placeholder="Search"-->
        <!--            aria-label="Search"-->
        <!--          />-->
        <!--        </form>-->
      </div>
    </div>
  </nav>
</template>

<script>
import image from "../assets/popkorn.png";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "NavbarPage",
  data() {
    return {
      image,
    };
  },
  computed: {
    ...mapGetters({
      isAuth: "auth/isAuth",
      getRoles: "auth/getRoles",
    }),
  },
  methods: {
    ...mapActions({
      logout: "auth/logout",
    }),
    submit() {
      this.logout();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("roles");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.navbar a {
  color: white;
  font-size: 20px;
}
.btn {
  background-color: transparent;
  color: #fff;
}
.search {
  height: 30%;
}
</style>
