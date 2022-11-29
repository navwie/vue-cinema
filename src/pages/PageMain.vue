<template>
  <div class="container">
    <div v-if="loading === true" class="loading center">
      <p class="fs-1">Loading...</p>
    </div>
    <div v-else>
      <div class="d-flex">
        <img :src="image" alt="" />
        <p class="text">Зараз у прокаті</p>
      </div>
      <hr />
      <div class="filter container-fluid">
        <div class="btn-group">
          <select
            class="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
            v-model="filters.confines"
          >
            <option :value="null" class="disabled" disabled selected>
              Обмеження у віці
            </option>
            <option v-for="(confines, index) in confines" :key="index">
              {{ confines }}
            </option>
          </select>
        </div>
        <div class="btn-group">
          <select
            class="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
            v-model="filters.genres"
          >
            <option :value="null" class="disabled" disabled selected>
              Жанр
            </option>
            <option v-for="(genre, index) in genres" :key="index">
              {{ genre.genre }}
            </option>
          </select>
        </div>
        <div class="btn-group">
          <select
            class="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
            v-model="filters.languages"
          >
            <option :value="null" class="disabled" disabled selected>
              Мова
            </option>
            <option v-for="(language, index) in languages" :key="index">
              {{ language.language }}
            </option>
          </select>
        </div>
        <div class="btn-group">
          <select
            class="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
            v-model="filters.formats"
          >
            <option :value="null" class="disabled" disabled selected>
              Формат
            </option>
            <option v-for="(format, index) in formats" :key="index">
              {{ format.format }}
            </option>
          </select>
        </div>
      </div>
      <div class="mb-5 d-grid gap-2 d-flex justify-content-end">
        <MyButton class="butn accept" @click="applyFilters"
          >Застосувати</MyButton
        >
        <MyButton class="butn" @click="resetFilters">Скасувати</MyButton>
      </div>
      <MovieList :movies="actualMovies" />
      <div class="d-flex">
        <img :src="imageLater" alt="" />
        <p class="text">Скоро у прокаті</p>
      </div>
      <hr />
      <MovieList :movies="futureMovies" />
    </div>
  </div>
</template>
<script>
import MovieList from "@/components/MovieList";
import {
  getFormats,
  getGenres,
  getLanguages,
  getMovies,
} from "@/api/api_request";
import image from "../assets/fire.png";
import imageLater from "../assets/later.png";
import moment from "moment";

export default {
  name: "PageMain",
  components: { MovieList },
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
    };
  },
  methods: {
    resetFilters() {
      this.filters.formats = null;
      this.filters.genres = null;
      this.filters.confines = null;
      this.filters.languages = null;
      let currentDate = moment().format("YYYY-MM-DD");

      this.actualMovies = this.totalMovies.filter(
        (e) =>
          moment(e.date_start).format("YYYY-MM-DD") < currentDate &&
          currentDate < moment(e.date_finish).format("YYYY-MM-DD")
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
  beforeMount() {
    this.loading = true;
    getMovies().then((response) => {
      let allMovies = response.data;
      let currentDate = moment().format("YYYY-MM-DD");

      this.totalMovies = allMovies;
      this.actualMovies = allMovies.filter(
        (e) =>
          moment(e.date_start).format("YYYY-MM-DD") < currentDate &&
          currentDate < moment(e.date_finish).format("YYYY-MM-DD")
      );
      this.futureMovies = allMovies.filter(
        (e) => moment(e.date_start).format("YYYY-MM-DD") > currentDate
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
.text {
  color: white;
  position: relative;
  font-weight: 500;
  top: 22px;
  font-size: 20px;
}
.butn {
  border: 1px solid #ffffff;
  color: #4d7cbc;
  font-size: 18px;
  font-weight: 500;
}
.butn.accept {
  background-color: #fff;
  margin-right: 20px;
}
.butn:hover {
  background-color: #4d7cbc;
  color: white;
}
.filter {
  width: 100%;
  margin-top: 30px;
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

select {
  background-color: transparent;
  border: 1px solid #4d7cbc;
  color: white;
  border-radius: 30px;
  max-width: 100%;
  width: 240px;
}
option {
  background-color: #fff;
  color: #080c14;
}
.disabled {
  background-color: grey;
  color: black;
}
</style>
