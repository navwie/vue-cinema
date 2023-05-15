<template>
  <div class="cont m-auto">
    <div v-if="loading === true" class="loading center">
      <p class="fs-1">Loading...</p>
    </div>
    <div v-else>
      <div class="d-flex">
        <img :src="imageLater" alt="" />
        <p :class="this.getDarkTheme ? 'dark_text' : 'light_text'">
          {{ $t("main.future") }}
        </p>
      </div>
      <hr />
      <Carousel :items-to-show="4" :wrap-around="true">
        <Slide v-for="(movie, index) in futureMovies" :key="index">
          <div
            :class="
              this.getDarkTheme
                ? 'dark_carousel__item futurefilm'
                : 'light_carousel__item futurefilm'
            "
            class=" "
          >
            <img :src="getImagePath(movie.image_path)" class="" alt="" />
            <h5 :class="this.getDarkTheme ? 'dark_h5' : 'light_h5'">
              <a
                :class="this.getDarkTheme ? 'dark_a' : 'light_a'"
                :href="'/movie/' + movie.id"
                >{{ movie.name }}</a
              >
            </h5>
            <p :class="this.getDarkTheme ? 'dark_p' : 'light_p'">
              У кіно з {{ momentDate(movie.date_start) }}
            </p>
          </div>
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel>
      <div class="d-flex mt-5">
        <img :src="image" alt="" />
        <p :class="this.getDarkTheme ? 'dark_text' : 'light_text'">
          {{ $t("main.now") }}
        </p>
      </div>
      <hr />
      <div class="filter-container">
        <div class="filter container-fluid">
          <div class="btn-group">
            <select
              :class="this.getDarkTheme ? 'dark_select' : 'light_select'"
              class="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
              v-model="filters.confines"
            >
              <option :value="null" class="disabled" disabled selected>
                {{ $t("main.confines") }}
              </option>
              <option v-for="(confines, index) in confines" :key="index">
                {{ confines }}
              </option>
            </select>
          </div>
          <div class="btn-group">
            <select
              :class="this.getDarkTheme ? 'dark_select' : 'light_select'"
              class="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
              v-model="filters.genres"
            >
              <option :value="null" class="disabled" disabled selected>
                {{ $t("main.genre") }}
              </option>
              <option v-for="(genre, index) in genres" :key="index">
                {{ genre.genre }}
              </option>
            </select>
          </div>
          <div class="btn-group">
            <select
              :class="this.getDarkTheme ? 'dark_select' : 'light_select'"
              class="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
              v-model="filters.languages"
            >
              <option :value="null" class="disabled" disabled selected>
                {{ $t("main.language") }}
              </option>
              <option v-for="(language, index) in languages" :key="index">
                {{ language.language }}
              </option>
            </select>
          </div>
          <div class="btn-group">
            <select
              :class="this.getDarkTheme ? 'dark_select' : 'light_select'"
              class="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
              v-model="filters.formats"
            >
              <option :value="null" class="disabled" disabled selected>
                {{ $t("main.format") }}
              </option>
              <option v-for="(format, index) in formats" :key="index">
                {{ format.format }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="mb-5 d-grid gap-2 d-flex justify-content-end">
        <MyButton
          :class="this.getDarkTheme ? 'dark_butn accept' : 'light_butn accept'"
          @click="applyFilters"
          >{{ $t("main.accept") }}</MyButton
        >
        <MyButton
          :class="this.getDarkTheme ? 'dark_butn' : 'light_butn '"
          @click="resetFilters"
          >{{ $t("main.reset") }}</MyButton
        >
      </div>
      <MovieList :movies="actualMovies" />
    </div>
  </div>
</template>
<script>
import MovieList from "@/components/ComponentLists/MovieList.vue";
import {
  getFormats,
  getGenres,
  getLanguages,
  getMovies,
} from "@/api/api_request";
import image from "../../assets/images/fire.png";
import imageLater from "../../assets/images/later.png";
import moment from "moment";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { mapGetters } from "vuex";

export default {
  name: "PageMain",
  components: { MovieList, Carousel, Slide, Navigation },
  data() {
    return {
      actualMovies: [],
      futureMovies: [],
      totalMovies: [],
      image,
      imageLater,
      dialogVisible: false,
      modificator: "",
      loading: false,
      page: 1,
      limit: 10,
      totalPage: 0,
      genres: [],
      formats: [],
      languages: [],
      confines: ["6+", "12+", "18+"],
      filters: {
        languages: null,
        confines: null,
        formats: null,
        genres: null,
      },
      search: "",
      settings: {
        itemsToShow: 1,
        snapAlign: "center",
      },
      breakpoints: {
        700: {
          itemsToShow: 3.5,
          snapAlign: "center",
        },
        1024: {
          itemsToShow: 5,
          snapAlign: "start",
        },
      },
    };
  },
  methods: {
    getImagePath: function (imagePath) {
      return `http://localhost/storage/${imagePath}`;
    },
    momentDate: function (date) {
      return moment(date, "YYYY-MM-DD").format("DD.MM.YYYY");
    },
    resetFilters() {
      this.filters.formats = null;
      this.filters.genres = null;
      this.filters.confines = null;
      this.filters.languages = null;
      let currentDate = moment().format("YYYY-MM-DD");
      let allMovies = this.totalMovies;
      this.actualMovies = allMovies.filter(
        (e) =>
          moment(e.date_start).format("YYYY-MM-DD") <= currentDate &&
          currentDate <= moment(e.date_finish).format("YYYY-MM-DD")
      );
    },
    applyFilters() {
      Object.keys(this.filters).forEach((key) => {
        if (this.filters[key] !== null) {
          if (key === "confines") {
            this.actualMovies = this.actualMovies.filter(
              (element) => element[key] === this.filters[key]
            );
          } else {
            this.actualMovies = this.actualMovies.filter((movie) => {
              let singleKey = key.slice(0, -1);
              let flag = false;
              movie[key].forEach((value) => {
                if (value[singleKey] === this.filters[key]) {
                  flag = true;
                }
              });
              return flag;
            });
          }
        }
      });
    },
  },
  computed: {
    ...mapGetters(["getDarkTheme"]),
  },
  beforeMount() {
    this.loading = true;
    getMovies().then((response) => {
      let allMovies = response.data.movies.data;
      let currentDate = moment().format("YYYY-MM-DD");

      this.totalMovies = allMovies.filter((e) => e.quizled === 0);

      this.actualMovies = allMovies.filter(
        (e) =>
          moment(e.date_start).format("YYYY-MM-DD") <= currentDate &&
          currentDate <= moment(e.date_finish).format("YYYY-MM-DD") &&
          e.quizled === 0
      );

      this.futureMovies = allMovies.filter(
        (e) =>
          moment(e.date_start).format("YYYY-MM-DD") > currentDate &&
          e.quizled === 0
      );

      this.loading = false;
    });
    getGenres().then((response) => {
      this.genres = response.data;
    });
    getLanguages().then((response) => {
      this.languages = response.data;
    });
    getFormats().then((response) => {
      this.formats = response.data;
    });
  },
};
</script>

<style scoped>
hr {
  border: none;
  height: 3px;
  color: #4d7cbc;
  background-color: #4d7cbc;
}
.dark_text {
  opacity: 1;
  color: white;
  position: relative;
  font-weight: 700;
  top: 22px;
  font-size: 27px;
  margin-left: 30px;
}
.light_text {
  opacity: 1;
  color: black;
  position: relative;
  font-weight: 700;
  top: 22px;
  font-size: 27px;
  margin-left: 30px;
}

.dark_butn {
  border: 1px solid #ffffff;
  color: #4d7cbc;
  font-size: 18px;
  font-weight: 500;
}
.light_butn {
  border: 1px solid #ffffff;
  color: white;
  background-color: grey;
  font-size: 18px;
  font-weight: 500;
}
.dark_butn.accept {
  background-color: #fff;
  margin-right: 20px;
}
.light_butn.accept {
  background-color: #4d7cbc;
  color: white;
  margin-right: 20px;
}
.dark_butn:hover {
  background-color: #4d7cbc;
  color: white;
}
.light_butn:hover {
  background-color: grey;
  color: white;
}
.light_butn.accept:hover {
  background-color: #4d7cbc;
  color: white;
}

.filter {
  width: 100%;
  margin-top: 30px;
  margin-left: 200px;
}
.btn-group {
  margin-left: 55px;
  margin-bottom: 30px;
}
.loading {
  color: red;
}
ul li {
  background-color: #fff;
}

.dark_select {
  background-color: transparent;
  border: 1px solid #4d7cbc;
  color: white;
  border-radius: 30px;
  max-width: 100%;
  width: 240px;
}
.light_select {
  background-color: transparent;
  border: 2px solid #4d7cbc;
  color: black;
  border-radius: 30px;
  max-width: 100%;
  width: 240px;
}
.dark_option {
  background-color: #fff;
  color: #080c14;
}
.light_option {
  background-color: #000;
  color: #fff;
}
.disabled {
  background-color: grey;
  color: black;
}

.futurefilm img {
  width: 300px;
  height: 400px;
  object-fit: cover;
  border-radius: 5px;
}

/* Style for the movie titles */
.dark_h5 {
  margin-top: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  color: wheat;
  text-transform: uppercase;
}

.light_h5 {
  margin-top: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  color: black;
  text-transform: uppercase;
}

/* Style for the movie links */
.dark_a {
  color: wheat;
  font-weight: bold;
  text-decoration: none;
}
.light_a {
  color: black;
  font-weight: bold;
  text-decoration: none;
}
/* Style for the movie descriptions */
.dark_p {
  margin-top: 10px;
  font-size: 1.2rem;
  color: red;
}

.light_p {
  margin-top: 10px;
  font-size: 1.2rem;
  color: red;
}

/* Style for the carousel */
.dark_carousel__item {
  padding: 20px;
}
.light_carousel__item {
  padding: 20px;
}

/* Style for the navigation buttons */
.carousel__navigation {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
}

.filter-container {
  display: flex;
  justify-content: center;
}

.carousel__navigation__item {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  color: #333;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
}

.carousel__navigation__item--prev {
  left: 0;
}

.carousel__navigation__item--next {
  right: 0;
}

/* Style for the active navigation button */
.carousel__navigation__item--active {
  background-color: #5cb85c;
  color: #fff;
  transform: rotateY(0) scale(1);
}
.cont {
  width: 90%;
  position: relative;
  top: 40px;
}
</style>
