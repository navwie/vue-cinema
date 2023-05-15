<template>
  <div class="container">
    <h3
      :class="this.getDarkTheme ? 'dark_h3' : 'light_h3'"
      style="
        text-align: center;
        position: relative;
        top: 20px;
        margin-bottom: 50px;
      "
    >
      {{ $t("change_movie.title") }}
    </h3>
    <div class="d-flex justify-content-between">
      <div style="width: 40%">
        <div>
          <MyInput
            v-focus
            v-model="movie.name"
            type="text"
            placeholder="Назва"
          />
        </div>
        <div>
          <MyInput
            v-focus
            v-model="movie.release_year"
            type="number"
            placeholder="Рік виходу"
          />
        </div>
        <div>
          <MyInput
            v-model="movie.date_start"
            type="date"
            placeholder="Час початку виходу "
          />
        </div>
        <div>
          <MyInput
            v-focus
            v-model="movie.date_finish"
            type="date"
            placeholder="Час початку виходу "
          />
        </div>
        <div>
          <MyInput
            v-focus
            v-model="movie.director"
            type="text"
            placeholder="Режисер"
          />
        </div>
        <div>
          <MyInput
            v-focus
            v-model="movie.actors"
            type="text"
            placeholder="Актори"
          />
        </div>
        <div>
          <MyInput
            v-focus
            v-model="movie.country"
            type="text"
            placeholder="Країна"
          />
        </div>
        <div>
          <MyInput
            v-focus
            v-model="movie.screenwriter"
            type="text"
            placeholder="Сценарист"
          />
        </div>
        <div>
          <MyInput
            v-focus
            v-model="movie.trailer"
            type="text"
            :placeholder="$t(`table.trailer`)"
          />
        </div>
        <div>
          <MyInput
            v-focus
            v-model="movie.rating"
            type="text"
            :placeholder="$t(`table.rating`)"
          />
        </div>
        <div>
          <MyInput
            v-focus
            v-model="movie.duration"
            type="text"
            placeholder="Тривалість"
          />
        </div>
        <div>
          <MySelect v-model="movie.confines" :options="sortOption" />
        </div>
      </div>
      <hr />
      <div style="width: 50%">
        <div class="d-flex mt-5 mb-5">
          <div v-if="isNewPhoto == false">
            <img
              :src="getImagePath(movie.image_path)"
              class="img-fluid"
              alt=""
            />
          </div>
          <div v-else>
            <p>{{ $t("change_movie.choose_photo") }}</p>
          </div>
          <button
            :class="
              this.getDarkTheme ? 'dark_change-photo' : 'light_change-photo'
            "
            @click="showPhoto"
          >
            {{ $t("change_movie.change") }}
          </button>
          <div
            v-if="isHiddenPhoto === false"
            style="margin-top: 100px; margin-left: 50px"
          >
            <input type="file" @change="choosePhoto" />
          </div>
        </div>

        <div>
          <div class="d-flex justify-content-between">
            <div>
              <div class="mt-5 mb-4">
                <div v-if="movie.halls.length > 0">
                  <p>В залах</p>
                  <ul>
                    <li
                      :class="this.getDarkTheme ? 'dark_hall' : 'light_hall'"
                      v-for="hall in movie.halls"
                      :key="hall.id"
                    >
                      {{ hall.name }}
                    </li>
                  </ul>
                </div>
                <div v-else>
                  <p>1) {{ $t("change_movie.choose_halls") }}</p>
                </div>
                <button
                  v-if="isHiddenHall !== false"
                  @click="showHall"
                  :class="
                    this.getDarkTheme
                      ? 'dark_change-filters'
                      : 'light_change-filters'
                  "
                >
                  {{ $t("change_movie.change") }}
                </button>
              </div>
              <div v-if="isHiddenHall === false" class="mb-3">
                <div
                  v-for="hall in checkbox.halls"
                  :class="
                    this.getDarkTheme
                      ? 'dark_hall-checkbox'
                      : 'light_hall-checkbox'
                  "
                  class="d-flex justify-content-between"
                  :key="hall.id"
                >
                  <label for="">{{ hall.name }}</label>
                  <input
                    v-model="newMovieHall"
                    :value="hall.id"
                    type="checkbox"
                  />
                </div>
              </div>
            </div>
            <div>
              <div class="mt-5 mb-4">
                <div v-if="movie.genres.length > 0">
                  <p>Жанри</p>
                  <ul>
                    <li
                      :class="this.getDarkTheme ? 'dark_genre' : 'light_genre'"
                      v-for="genre in movie.genres"
                      :key="genre.id"
                    >
                      {{ genre.name }}
                    </li>
                  </ul>
                </div>
                <div v-else>
                  <p>2) {{ $t("change_movie.choose_genres") }}</p>
                </div>
                <button
                  v-if="isHiddenGenre !== false"
                  @click="showGenre"
                  :class="
                    this.getDarkTheme
                      ? 'dark_change-filters'
                      : 'light_change-filters'
                  "
                >
                  {{ $t("change_movie.change") }}
                </button>
              </div>
              <div v-if="isHiddenGenre === false" class="mb-3">
                <div
                  v-for="genre in checkbox.genres"
                  :class="
                    this.getDarkTheme
                      ? 'dark_genre-checkbox'
                      : 'light_genre-checkbox'
                  "
                  class="d-flex justify-content-between"
                  :key="genre.id"
                >
                  <label for="">{{ genre.name }}</label>
                  <input
                    v-model="newMovieGenres"
                    :value="genre.id"
                    type="checkbox"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <div>
              <div class="mt-5 mb-4">
                <div v-if="movie.languages.length > 0">
                  <p>Мова</p>
                  <ul>
                    <li
                      :class="
                        this.getDarkTheme ? 'dark_language' : 'light_language'
                      "
                      v-for="language in movie.languages"
                      :key="language.id"
                    >
                      {{ language.name }}
                    </li>
                  </ul>
                </div>
                <div v-else>
                  <p>3) {{ $t("change_movie.choose_languages") }}</p>
                </div>
                <button
                  v-if="isHiddenLanguage !== false"
                  @click="showLanguage"
                  :class="
                    this.getDarkTheme
                      ? 'dark_change-filters'
                      : 'light_change-filters'
                  "
                >
                  {{ $t("change_movie.change") }}
                </button>
              </div>
              <div v-if="isHiddenLanguage === false" class="mb-3">
                <div
                  v-for="language in checkbox.language"
                  :class="
                    this.getDarkTheme
                      ? 'dark_language-checkbox'
                      : 'light_language-checkbox'
                  "
                  class="d-flex justify-content-between"
                  :key="language.id"
                >
                  <label for="">{{ language.name }}</label>
                  <input
                    v-model="newMovieLanguages"
                    :value="language.id"
                    type="checkbox"
                  />
                </div>
              </div>
            </div>

            <div>
              <div class="mt-5 mb-4">
                <div v-if="movie.formats.length > 0">
                  <p>Формат</p>
                  <ul>
                    <li
                      :class="
                        this.getDarkTheme ? 'dark_format' : 'light_format'
                      "
                      v-for="format in movie.formats"
                      :key="format.id"
                    >
                      {{ format.name }}
                    </li>
                  </ul>
                </div>
                <div v-else>
                  <p>4){{ $t("change_movie.choose_formats") }}</p>
                </div>
                <button
                  v-if="isHiddenFormat !== false"
                  @click="showFormat"
                  :class="
                    this.getDarkTheme
                      ? 'dark_change-filters'
                      : 'light_change-filters'
                  "
                >
                  {{ $t("change_movie.change") }}
                </button>
              </div>
              <div v-if="isHiddenFormat === false" class="mb-3">
                <div
                  v-for="format in checkbox.formats"
                  :class="
                    this.getDarkTheme
                      ? 'dark_format-checkbox'
                      : 'light_format-checkbox '
                  "
                  class="d-flex justify-content-between"
                  :key="format.id"
                >
                  <label for="">{{ format.name }}</label>
                  <input
                    v-model="newMovieFormats"
                    :value="format.id"
                    type="checkbox"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MyTextArea
      v-model="movie.description"
      style="border-radius: 20px; margin-top: 40px"
      type="text"
      placeholder="Опис"
    />

    <div class="submit d-flex justify-content-center mt-5">
      <button @click="changeMovie" class="btn-access">
        {{ $t("change_movie.submit") }}
      </button>
    </div>
    <div class="submit d-flex justify-content-center mt-5">
      <button class="btn-cancel" @click="cancel">Скасувати</button>
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
  imageUpload,
  updateMovie,
} from "@/api/api_request";
import MyInput from "@/components/UI/MyInput";
import { mapGetters } from "vuex";

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
      newMovieGenres: [],
      newMovieFormats: [],
      newMovieLanguages: [],
      newMovieHall: [],
      isHiddenHall: true,
      isHiddenGenre: true,
      isHiddenLanguage: true,
      isHiddenFormat: true,
      isHiddenPhoto: true,
      isNewPhoto: false,
      button: {
        hall: false,
        genre: false,
        language: false,
        format: false,
        photo: false,
      },
    };
  },
  computed: {
    ...mapGetters(["getDarkTheme"]),
  },
  methods: {
    showHall() {
      this.movie.halls = [];
      this.isHiddenHall = !this.isHiddenHall;
      this.button.hall = this.button.hall === true;
    },
    showGenre() {
      this.movie.genres = [];
      this.isHiddenGenre = !this.isHiddenGenre;
      this.button.genre = this.button.genre === true;
    },
    showLanguage() {
      this.movie.languages = [];
      this.isHiddenLanguage = !this.isHiddenLanguage;
      this.button.language = this.button.language === true;
    },
    showFormat() {
      this.movie.formats = [];
      this.isHiddenFormat = !this.isHiddenFormat;
      this.button.format = this.button.format === true;
    },
    showPhoto() {
      this.isHiddenPhoto = !this.isHiddenPhoto;
    },
    getImagePath: function (imagePath) {
      return `http://localhost/storage/${imagePath}`;
    },
    choosePhoto(event) {
      this.movie.image_path = event.target.files[0];
      this.isNewPhoto = true;
    },
    cancel: function () {
      this.$router.push(`/movie/${this.movie.id}`);
    },
    changeMovie: function () {
      this.$emit("create", this.movie);
      updateMovie(this.movie.id, {
        name: this.movie.name,
        release_year: this.movie.release_year,
        description: this.movie.description,
        date_start: this.movie.date_start,
        date_finish: this.movie.date_finish,
        confines: this.movie.confines,
        director: this.movie.director,
        actors: this.movie.actors,
        country: this.movie.country,
        screenwriter: this.movie.screenwriter,
        trailer: this.movie.trailer,
        rating: this.movie.rating,
        duration: this.movie.duration,
        halls: this.newMovieHall.map((hall) => {
          if (typeof hall === "object") {
            return hall.id;
          }
          return hall;
        }),
        languages: this.newMovieLanguages.map((language) => {
          if (typeof language === "object") {
            return language.id;
          }
          return language;
        }),
        formats: this.newMovieFormats.map((format) => {
          if (typeof format === "object") {
            return format.id;
          }
          return format;
        }),
        genres: this.newMovieGenres.map((genre) => {
          if (typeof genre === "object") {
            return genre.id;
          }
          return genre;
        }),
      })
        .then(() => {
          if (this.isNewPhoto) {
            let formData = new FormData();
            formData.append("image", this.movie.image_path);
            imageUpload(this.movie.id, formData);
            this.$swal({
              icon: "success",
              color: "#000",
              timer: 4000,
              timerProgressBar: true,
              showClass: {
                popup: "animate__animated animate__fadeInDown",
              },
              hideClass: {
                popup: "animate__animated animate__fadeOutUp",
              },
            });
            this.$router.push("/adminMain");
          } else {
            this.$swal({
              icon: "success",
              color: "#000",
              timer: 4000,
              timerProgressBar: true,
              showClass: {
                popup: "animate__animated animate__fadeInDown",
              },
              hideClass: {
                popup: "animate__animated animate__fadeOutUp",
              },
            });
            this.$router.push("/adminMain");
          }
        })
        .catch(() => {
          this.$swal({
            icon: "error",
            color: "#000",
            title: this.$t("something_went_wrong.title"),
            text: this.$t("something_went_wrong.text"),
            timer: 4000,
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
            timerProgressBar: true,
          });
        });
    },
  },
  beforeMount() {
    this.loading = true;
    getOneMovie(this.$route.params.id).then((response) => {
      this.movie = response.data.movie;
      this.movie.date_start = moment(response.data.date_start).format(
        "yyyy-MM-DD"
      );
      this.movie.date_finish = moment(response.data.date_finish).format(
        "yyyy-MM-DD"
      );
      this.loading = false;
    });
    getHalls().then((response) => {
      this.checkbox.halls = response.data.halls.data;
      this.loading = false;
    });
    getGenres().then((response) => {
      this.checkbox.genres = response.data.genres.data;
      this.loading = false;
    });
    getLanguages().then((response) => {
      this.checkbox.language = response.data.languages.data;
      this.loading = false;
    });
    getFormats().then((response) => {
      this.checkbox.formats = response.data.formats.data;
      this.loading = false;
    });
  },
};
</script>

<style scoped>
.dark_h3 {
  color: white;
}
.light_h3 {
  color: black;
}
select {
  background-color: transparent;
  color: white;
  width: 50%;
}
.textarea {
  height: 150px;
  border-radius: 20px;
}

.dark_hall,
.dark_genre,
.dark_format,
.dark_language {
  color: white;
  font-size: 20px;
}
.light_hall,
.light_genre,
.light_format,
.light_language {
  color: black;
  font-size: 20px;
}

.dark_hall-checkbox,
.dark_genre-checkbox,
.dark_format-checkbox,
.dark_language-checkbox {
  color: white;
  font-size: 20px;
  text-align: start;
}

.light_hall-checkbox,
.light_genre-checkbox,
.light_format-checkbox,
.light_language-checkbox {
  color: black;
  font-size: 20px;
  text-align: start;
}

img {
  width: 60%;
  height: 80%;
  object-fit: cover;
  min-width: 60%;
  min-height: 100%;
}
p {
  color: white;
  font-size: 20px;
}
button {
  color: white;
  width: 20%;
  border-radius: 20px;
  border: 1px solid #4d7cbc;
  background-color: transparent;
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
input {
  color: white;
}
.select {
  border: 1px solid #4d7cbc;
  border-radius: 26px;
  padding: 15px 15px;
  margin-top: 10px;
  width: 100%;
  color: white;
}
hr {
  border: none;
  margin-top: 40px;
  height: 700px;
  width: 1px;
  color: #4d7cbc;
  background-color: #4d7cbc;
}
.dark_change-photo {
  height: 50px;
  margin-top: 100px;
  width: 25%;
  border: 1px solid #ffffff;
  color: #4d7cbc;
}
.light_change-photo {
  height: 50px;
  margin-top: 100px;
  width: 25%;
  border: 1px solid #4d7cbc;
  color: #4d7cbc;
}
.dark_change-filters {
  min-width: 100%;
  padding: 5px;
  width: 150px;
  color: white;
}
.light_change-filters {
  min-width: 100%;
  padding: 5px;
  color: #4d7cbc;
  width: 150px;
}
.btn-access {
  border-radius: 30px;
  background-color: #fff;
  margin-top: 30px;
  width: 20%;
  font-weight: 500;
  margin-bottom: 20px;
  border: 1px solid #4d7cbc;
  color: #4d7cbc;
  height: 100%;
}
.btn-cancel {
  border-radius: 20px;
  background-color: #000;
  border: 1px solid #ffffff;
  color: #4d7cbc;
  width: 20%;
  font-weight: 500;
  height: 100%;
}
.container {
  min-height: 100vh;
}
</style>
