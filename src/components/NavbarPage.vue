<template>
  <nav
    class="navbar navbar-expand-lg navbar-light"
    style="background-color: #4d7cbc"
  >
    <div class="container-fluid">
      <a
        class="navbar-brand"
        style="
          font-size: 46px;
          color: white;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        "
        href="#"
      >
        <img style="width: 15%" :src="image" alt="" />
        <span
          style="
            margin-left: 20px;
            background: linear-gradient(to bottom, #ffffff 55%, #4d7cbc);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            color: transparent;
          "
          >MovieWorld</span
        >
      </a>
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
          <li class="nav-item">
            <a
              class="nav-link"
              aria-current="page"
              href="#"
              @click="$router.push(`/`)"
              :class="{ 'active-link': $route.path === '/' }"
              style="
                color: white;
                font-size: 25px;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
              "
              >{{ $t("navbar.main") }}</a
            >
          </li>
          <li v-if="getRoles == 'ROLE_ADMIN'" class="nav-item">
            <a
              class="nav-link"
              aria-current="page"
              href="#"
              @click="$router.push(`/adminMain`)"
              :class="{ 'active-link': $route.path === '/adminMain' }"
              style="
                color: white;
                font-size: 25px;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
              "
              >{{ $t("navbar.allMovies") }}</a
            >
          </li>
          <li v-else class="nav-item">
            <a
              aria-current="page"
              href="#"
              class="nav-link btn"
              :class="{ 'active-link': $route.path === '/page-main' }"
              style="
                color: white;
                font-size: 25px;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
              "
              @click="$router.push(`/page-main`)"
              >{{ $t("navbar.allMovies") }}</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link btn"
              :class="{ 'active-link': $route.path === '/contacts' }"
              @click="$router.push(`/contacts`)"
              style="
                color: white;
                font-size: 25px;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
              "
              href="#"
            >
              {{ $t("navbar.contacts") }}</a
            >
          </li>
          <li
            v-if="!isAuth || getRoles === 'ROLE_USER'"
            class="nav-item dropdown"
          >
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style="
                color: white;
                font-size: 25px;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
              "
            >
              {{ $t("navbar.view") }}
            </a>
            <ul class="dropdown-menu">
              <li>
                <a
                  class="dropdown-item"
                  href="/shop-souvenir"
                  style="
                    color: #080c14;
                    font-size: 20px;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                  "
                  >{{ $t("navbar.souvenir") }}</a
                >
              </li>
              <li>
                <a
                  class="dropdown-item"
                  style="
                    color: #080c14;
                    font-size: 20px;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                  "
                  @click="$router.push(`/profile/` + getUserId)"
                  href="#"
                >
                  {{ $t("navbar.profile") }}</a
                >
              </li>
              <li>
                <a
                  style="
                    color: #080c14;
                    font-size: 20px;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                  "
                  class="dropdown-item"
                  href="/menu"
                  >{{ $t("navbar.menu") }}</a
                >
              </li>
            </ul>
          </li>
          <li class="nav-item" v-if="!isAuth">
            <a
              @click="$router.push('/login')"
              class="nav-link btn"
              :class="{ 'active-link': $route.path === '/login' }"
              style="
                color: white;
                font-size: 25px;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
              "
              href="#"
            >
              {{ $t("navbar.login") }}
            </a>
          </li>
          <li
            v-if="isAuth && getRoles == 'ROLE_ADMIN'"
            class="nav-item dropdown"
          >
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style="
                color: white;
                font-size: 25px;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
              "
            >
              {{ $t("navbar.view") }}
            </a>
            <ul class="dropdown-menu">
              <li>
                <a
                  class="dropdown-item"
                  @click="$router.push(`/shop-souvenir/` + getShopId)"
                  style="
                    color: #080c14;
                    font-size: 20px;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                  "
                  >{{ $t("navbar.souvenir") }}</a
                >
              </li>
              <li>
                <a
                  style="
                    color: #080c14;
                    font-size: 20px;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                  "
                  class="dropdown-item"
                  href="/menu"
                  >{{ $t("navbar.menu") }}</a
                >
              </li>
            </ul>
          </li>
          <li
            v-if="isAuth && getRoles == 'ROLE_ADMIN'"
            class="nav-item dropdown"
          >
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style="
                color: white;
                font-size: 25px;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
              "
            >
              {{ $t("navbar.add") }}
            </a>
            <ul class="dropdown-menu">
              <li>
                <a
                  class="dropdown-item"
                  href="/create-souvenir"
                  style="
                    color: #080c14;
                    font-size: 20px;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                  "
                  >{{ $t("navbar.newsouvenir") }}</a
                >
              </li>
              <li>
                <a
                  class="dropdown-item"
                  href="/add-news"
                  style="
                    color: #080c14;
                    font-size: 20px;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                  "
                  >{{ $t("navbar.newnews") }}</a
                >
              </li>
              <li>
                <a
                  style="
                    color: #080c14;
                    font-size: 20px;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                  "
                  class="dropdown-item"
                  href="/create-product-cafe"
                  >{{ $t("navbar.newproduct") }}</a
                >
              </li>
              <li>
                <a
                  style="
                    color: #080c14;
                    font-size: 20px;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                  "
                  class="dropdown-item"
                  href="/create-voting"
                  >{{ $t("navbar.newquiz") }}</a
                >
              </li>
              <li>
                <a
                  style="
                    color: #080c14;
                    font-size: 20px;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                  "
                  class="dropdown-item"
                  href="/movie/create"
                >
                  {{ $t("navbar.addFilm") }}</a
                >
              </li>
            </ul>
          </li>
          <li v-if="getRoles == 'ROLE_USER'" class="nav-item">
            <a
              class="nav-link"
              aria-current="page"
              href="#"
              @click="$router.push(`/buyTicket`)"
              :class="{ 'active-link': $route.path === '/buyTicket' }"
              style="
                color: white;
                margin-left: 0;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
              "
              ><img
                style="width: 60%; position: relative; left: 20px"
                src="../assets/images/icons8-корзина.png"
                alt=""
            /></a>
          </li>
          <li class="nav-item" v-if="isAuth">
            <a
              @click="submit"
              class="nav-link btn"
              style="
                color: white;
                font-size: 25px;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
              "
              href="#"
            >
              {{ $t("navbar.exit") }}
            </a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style="
                color: white;
                font-size: 25px;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
              "
            >
              {{ currentLocale }}
            </a>
            <ul class="dropdown-menu">
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  style="
                    color: #080c14;
                    font-size: 20px;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                  "
                  @click="setLocale('uk')"
                  >uk</a
                >
              </li>
              <li>
                <a
                  style="
                    color: #080c14;
                    font-size: 20px;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                  "
                  class="dropdown-item"
                  href="#"
                  @click="setLocale('en-gb')"
                  >en</a
                >
              </li>
            </ul>
          </li>
        </ul>
        <div class="d-flex" style="margin-left: 10px">
          <theme-switcher @themeChanged="changeTheme"></theme-switcher>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import image from "../assets/images/popkorn.png";
import gearimage from "../assets/images/icons8-настройки-50.png";
import { mapActions, mapGetters } from "vuex";
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";

export default {
  components: { ThemeSwitcher },
  name: "NavbarPage",
  data() {
    return {
      image,
      gearimage,
    };
  },
  computed: {
    ...mapGetters({
      isAuth: "auth/isAuth",
      getRoles: "auth/getRoles",
      getUserId: "auth/getUserId",
      getShopId: "auth/getShopId",
    }),
    currentLocale() {
      return localStorage.getItem("locale");
    },
  },
  methods: {
    changeTheme(isDarkThemeFlag) {
      this.$emit("themeChanged", isDarkThemeFlag);
    },
    ...mapActions({
      logout: "auth/logout",
    }),
    setLocale: function (locale) {
      localStorage.setItem("locale", locale);
      window.location.reload();
    },
    submit() {
      this.logout();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      localStorage.removeItem("roles");
      localStorage.removeItem("age");
      localStorage.removeItem("selected_seats");
      this.$router.push("/login");
      location.reload();
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
.active-link {
  text-decoration: underline;
}
.search {
  height: 30%;
}
.dropdown-item:hover {
  background-color: #4d7cbc;
}
.dropdown-item {
  background-color: #fff;
}
</style>
