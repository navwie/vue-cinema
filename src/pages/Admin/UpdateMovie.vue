<template>
  <div class="container">
    <h3 style="text-align: center; color: white">Змінити дані про фільм</h3>
    <div class="d-flex mt-5 mb-5">
      <div>
        <img :src="getImagePath(movie.imagePath)" class="img-fluid" alt="" />
      </div>
      <button
        style="height: 50px; margin-top: 100px; margin-left: 50px"
        @click="showPhoto"
      >
        Змінити
      </button>
      <div v-if="isHiddenPhoto" style="margin-top: 100px; margin-left: 50px">
        <input type="file" @change="choosePhoto" />
      </div>
    </div>
    <MyInput v-focus v-model="movie.title" type="text" placeholder="Назва" />
    <MyInput
      v-focus
      v-model="movie.releaseYear"
      type="number"
      placeholder="Рік виходу"
    />
    <MyInput
      v-model="movie.dateStart"
      type="date"
      placeholder="Час початку виходу "
    />
    <MyInput
      v-focus
      v-model="movie.dateFinish"
      type="date"
      placeholder="Час початку виходу "
    />
    <MyInput
      v-focus
      v-model="movie.director"
      type="text"
      placeholder="Режисер"
    />
    <MyInput v-focus v-model="movie.actors" type="text" placeholder="Актори" />
    <MyInput v-focus v-model="movie.country" type="text" placeholder="Країна" />
    <MyInput
      v-focus
      v-model="movie.screenwriter"
      type="text"
      placeholder="Сценарист"
    />
    <MyInput v-focus v-model="movie.price" type="number" placeholder="Ціна" />
    <MyInput
      v-focus
      v-model="movie.duration"
      type="text"
      placeholder="Тривалість"
    />
    <select
      class="form-select form-select-lg mb-3"
      aria-label=".form-select-lg example"
      v-model="movie.confines"
    >
      <option v-for="(confines, index) in sortOption" :key="index">
        {{ confines.name }}
      </option>
    </select>
    <div>
      <div class="d-flex mt-5 mb-4 justify-content-between">
        <ul class="d-flex">
          <li class="hall" v-for="hall in movie.halls" :key="hall.id">
            {{ hall.hall }}
          </li>
        </ul>
        <button @click="showHall">Змінити</button>
      </div>
      <div v-if="isHiddenHall" class="mb-3">
        <div
          v-for="hall in checkbox.halls"
          class="hall-checkbox d-flex justify-content-center"
          :key="hall.id"
        >
          <label for=""
            ><input v-model="movie.halls" :value="hall.id" type="checkbox" />{{
              hall.hall
            }}</label
          >
        </div>
      </div>

      <div class="d-flex mb-4 justify-content-between">
        <ul class="d-flex">
          <li class="genre" v-for="genre in movie.genres" :key="genre.id">
            {{ genre.genre }}
          </li>
        </ul>
        <button @click="showGenre">Змінити</button>
      </div>
      <div v-if="isHiddenGenre" class="mb-3">
        <div
          v-for="genre in checkbox.genres"
          class="genre-checkbox d-flex justify-content-center"
          :key="genre.id"
        >
          <label for=""
            ><input
              v-model="movie.genres"
              :value="genre.id"
              type="checkbox"
            />{{ genre.genre }}</label
          >
        </div>
      </div>

      <div class="d-flex mb-3 justify-content-between">
        <ul class="d-flex">
          <li
            class="language"
            v-for="language in movie.languages"
            :key="language.id"
          >
            {{ language.language }}
          </li>
        </ul>
        <button @click="showLanguage">Змінити</button>
      </div>
      <div v-if="isHiddenLanguage" class="mb-3">
        <div
          v-for="language in checkbox.language"
          class="language-checkbox d-flex justify-content-center"
          :key="language.id"
        >
          <label for=""
            ><input
              v-model="movie.languages"
              :value="language.id"
              type="checkbox"
            />{{ language.language }}</label
          >
        </div>
      </div>

      <div class="d-flex mb-3 justify-content-between">
        <ul class="d-flex">
          <li class="format" v-for="format in movie.formats" :key="format.id">
            {{ format.format }}
          </li>
        </ul>
        <button @click="showFormat">Змінити</button>
      </div>
      <div v-if="isHiddenFormat" class="mb-3">
        <div
          v-for="format in checkbox.formats"
          class="format-checkbox d-flex justify-content-center"
          :key="format.id"
        >
          <label for=""
            ><input
              v-model="movie.formats"
              :value="format.id"
              type="checkbox"
            />{{ format.format }}</label
          >
        </div>
      </div>
    </div>
    <MyTextArea
      v-model="movie.description"
      class="textarea"
      type="text"
      placeholder="Опис"
    />

    <div class="submit d-flex justify-content-center mt-5">
      <button>Внести змінення</button>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import {
  getFormats,
  getGenres,
  getHalls,
  getLanguages,
  getOneMovie,
} from "@/api/api_request";
import MyInput from "@/components/UI/MyInput";

export default {
  name: "UpdateMovie",
  components: { MyInput },
  data() {
    return {
      movie: [],
      sortOption: [
        { value: "-", name: "нет ограничений" },
        { value: "6+", name: "6+" },
        { value: "12+", name: "12+" },
        { value: "18+", name: "18+" },
      ],
      checkbox: {
        language: "",
        formats: "",
        genres: "",
        halls: "",
      },
      isHiddenHall: false,
      isHiddenGenre: false,
      isHiddenLanguage: false,
      isHiddenFormat: false,
      isHiddenPhoto: false,
    };
  },
  methods: {
    showHall() {
      this.isHiddenHall = !this.isHiddenHall;
    },
    showGenre() {
      this.isHiddenGenre = !this.isHiddenGenre;
    },
    showLanguage() {
      this.isHiddenLanguage = !this.isHiddenLanguage;
    },
    showFormat() {
      this.isHiddenFormat = !this.isHiddenFormat;
    },
    showPhoto() {
      this.isHiddenPhoto = !this.isHiddenPhoto;
    },
    getImagePath: function (imagePath) {
      return `http://localhost/uploads/movies/${imagePath}`;
    },
  },
  beforeMount() {
    this.loading = true;
    getOneMovie(this.$route.params.id).then((response) => {
      this.movie = response.data;
      this.movie.dateStart = moment(response.data.dateStart).format(
        "yyyy-MM-DD"
      );
      this.movie.dateFinish = moment(response.data.dateFinish).format(
        "yyyy-MM-DD"
      );
      this.loading = false;
    });
    getHalls().then((response) => {
      this.checkbox.halls = response.data;
      this.loading = false;
    });
    getGenres().then((response) => {
      this.checkbox.genres = response.data;
      this.loading = false;
    });
    getLanguages().then((response) => {
      this.checkbox.language = response.data;
      this.loading = false;
    });
    getFormats().then((response) => {
      this.checkbox.formats = response.data;
      this.loading = false;
    });
  },
};
</script>

<style scoped>
select {
  background-color: transparent;
  color: white;
  width: 50%;
}

.hall,
.genre,
.format,
.language {
  color: white;
  margin-left: 25px;
  /*font-weight: 500;*/
  font-size: 20px;
}
.hall-checkbox,
.genre-checkbox,
.format-checkbox,
.language-checkbox {
  color: white;
  font-size: 20px;
  text-align: start;
}

.hall:first-child,
.genre:first-child,
.format:first-child,
.language:first-child {
  color: white;
  margin-left: 0;
}
img {
  width: 200px;
  height: 100%;
  object-fit: cover;
  min-width: 90%;
  min-height: 100%;
  border-radius: 20px;
}
p {
  color: white;
}
button {
  color: white;
  width: 20%;
  border-radius: 20px;
  border: 1px solid #4d7cbc;
  font-weight: 500;
}
button:hover {
  background-color: #fff;
  color: #4d7cbc;
}
.textarea {
  width: 100%;
  color: white;
}
.submit {
  display: flex;
  height: 50px;
  justify-content: center;
}
</style>
