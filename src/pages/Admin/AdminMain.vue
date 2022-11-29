<template>
  <div class="container">
    <div class="btn-group mb-5 d-grid gap-2 d-flex">
      <button
        :class="{ active: $route.query.type === 'future' }"
        @click="redirectToFutureMovies"
      >
        Скоро у кіно
      </button>
      <button
        :class="{ active: $route.query.type === 'last' }"
        @click="redirectToLastMovies"
      >
        Минулі
      </button>
      <button
        :class="{ active: $route.query.type === 'current' }"
        @click="redirectToCurrentMovies"
      >
        Актуальні
      </button>
    </div>
    <MyInput
      class="input"
      v-focus
      v-model="search"
      type="text"
      placeholder="Пошук"
    />
    <!--    <p>{{ searchHandler }}</p>-->
    <div v-if="getMovieTypeParamFromUrl === undefined">
      <MovieTable :movies="searchActual" />
    </div>
    <div v-else-if="getMovieTypeParamFromUrl === `future`">
      <MovieTable :movies="searchFuture" />
    </div>
    <div v-else-if="getMovieTypeParamFromUrl === `last`">
      <MovieTable :movies="searchLater" />
    </div>
    <div v-else-if="getMovieTypeParamFromUrl === `current`">
      <MovieTable :movies="searchActual" />
    </div>
  </div>
</template>

<script>
import { getMovies } from "@/api/api_request";
import moment from "moment/moment";
import image from "@/assets/fire.png";
import imageLater from "@/assets/later.png";
import MovieTable from "@/components/MovieTable";
export default {
  name: "AdminMain",
  components: { MovieTable },
  data() {
    return {
      allMovies: [],
      laterMovie: [],
      actualMovies: [],
      futureMovies: [],
      image,
      imageLater,
      dialogVisible: false,
      modificator: "",
      loading: false,
      page: 1,
      limit: 10,
      totalPage: 0,
      confines: ["6+", "12+", "18+"],
      selectedSort: "",
      search: "",
    };
  },
  methods: {
    redirectToFutureMovies: function () {
      // console.log(this.$route.query.type);
      this.$router.push("/adminMain?type=future");
    },
    redirectToLastMovies: function () {
      this.$router.push("/adminMain?type=last");
    },
    redirectToCurrentMovies: function () {
      this.$router.push("/adminMain?type=current");
    },
  },
  computed: {
    getMovieTypeParamFromUrl: function () {
      return this.$route.query.type;
    },
    searchActual() {
      return this.actualMovies.filter((elem) => {
        return elem.title.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    searchLater() {
      return this.laterMovie.filter((elem) => {
        return elem.title.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    searchFuture() {
      return this.futureMovies.filter((elem) => {
        return elem.title.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  beforeMount() {
    this.loading = true;
    getMovies().then((response) => {
      let movies = response.data;

      let currentDate = moment().format("YYYY-MM-DD");

      this.actualMovies = movies.filter(
        (e) =>
          moment(e.date_start).format("YYYY-MM-DD") < currentDate &&
          currentDate < moment(e.date_finish).format("YYYY-MM-DD")
      );
      this.futureMovies = movies.filter(
        (e) => moment(e.date_start).format("YYYY-MM-DD") > currentDate
      );
      this.laterMovie = movies.filter(
        (e) => moment(e.date_finish).format("YYYY-MM-DD") < currentDate
      );

      this.loading = false;
    });
  },
};
</script>

<style scoped>
.btn-group {
}
button {
  color: #4d7cbc;
  width: 150px;
  padding: 10px;
  font-weight: 500;
  background-color: #fff;
  border-radius: 10px;
  /*min-width: 80%;*/
}
button:hover {
  background-color: red;
  color: white;
}
.active {
  background-color: #4d7cbc;
  color: white;
}
.input {
  margin-bottom: 50px;
}
</style>
