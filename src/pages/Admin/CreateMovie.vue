<template>
  <form class="form cont m-auto" @submit.prevent>
    <h4
      :class="this.getDarkTheme ? 'dark_h4' : 'light_h4'"
      style="margin-bottom: 50px"
    >
      {{ $t("create_movie.create") }}
    </h4>
    <div class="container-fluid d-flex justify-content-between">
      <div style="width: 45%">
        <div>
          <MyInput
            v-focus
            class="input"
            v-model="movie.name"
            type="text"
            :placeholder="$t(`table.name`)"
          />
        </div>
        <div>
          <MyInput
            v-focus
            v-model="movie.release_year"
            type="number"
            :placeholder="$t(`table.release_year`)"
          />
        </div>
        <div>
          <MyInput
            v-focus
            v-model="movie.date_start"
            type="date"
            :placeholder="$t(`table.date_start`)"
          />
        </div>
        <div>
          <MyInput
            v-focus
            v-model="movie.date_finish"
            type="date"
            :placeholder="$t(`table.date_finish`)"
          />
        </div>
        <div>
          <MyInput
            v-focus
            v-model="movie.director"
            type="text"
            :placeholder="$t(`movie_info.director`)"
          />
        </div>
        <div>
          <MyInput
            v-focus
            v-model="movie.actors"
            type="text"
            :placeholder="$t(`movie_info.actors`)"
          />
        </div>
        <div>
          <MyInput
            v-focus
            v-model="movie.country"
            type="text"
            :placeholder="$t(`table.country`)"
          />
        </div>
        <div>
          <MyInput
            v-focus
            v-model="movie.screenwriter"
            type="text"
            :placeholder="$t(`movie_info.screenwriter`)"
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
            :placeholder="$t(`table.duration`)"
          />
        </div>
        <MySelect v-model="movie.confines" :options="sortOption" />
        <MySelect v-model="movie.quizled" :options="isForVoting" />
      </div>
      <hr class="vertical" />
      <div style="width: 40%">
        <input
          type="file"
          :class="this.getDarkTheme ? 'dark_file' : 'light_file'"
          style="margin-top: 50px; margin-right: 150px"
          @change="choosePhoto"
        />
        <div class="d-flex justify-content-between mt-5 mb-5">
          <div>
            <p :class="this.getDarkTheme ? 'dark_p' : 'light_p'" class="mb-5">
              {{ $t("change_movie.choose_languages") }}
            </p>
            <div
              v-for="language in checkbox.language"
              :class="this.getDarkTheme ? 'dark_language' : 'light_language'"
              class="d-flex justify-content-between"
              :key="language.id"
            >
              <label for="">{{ language.name }}</label>
              <input
                v-model="movie.languages"
                :value="language.id"
                type="checkbox"
              />
            </div>
          </div>
          <div>
            <p :class="this.getDarkTheme ? 'dark_p' : 'light_p'" class="mb-5">
              {{ $t("change_movie.choose_formats") }}
            </p>
            <div
              v-for="format in checkbox.formats"
              :class="this.getDarkTheme ? 'dark_format' : 'light_format'"
              class="d-flex justify-content-between"
              :key="format.id"
            >
              <label for="">{{ format.name }}</label>
              <input
                v-model="movie.formats"
                :value="format.id"
                type="checkbox"
              />
            </div>
          </div>
        </div>
        <hr class="gorisonal" />
        <div class="d-flex justify-content-between">
          <div>
            <p :class="this.getDarkTheme ? 'dark_p' : 'light_p'" class="mb-5">
              {{ $t("change_movie.choose_halls") }}
            </p>
            <div
              v-for="hall in checkbox.halls"
              :class="this.getDarkTheme ? 'dark_hall' : 'light_hall'"
              class="d-flex justify-content-between"
              :key="hall.id"
            >
              <label for="">{{ hall.name }}</label>
              <input v-model="movie.halls" :value="hall.id" type="checkbox" />
            </div>
          </div>
          <div>
            <p :class="this.getDarkTheme ? 'dark_p' : 'light_p'" class="mb-5">
              {{ $t("change_movie.choose_genres") }}
            </p>
            <div
              v-for="genre in checkbox.genres"
              :class="this.getDarkTheme ? 'dark_genre' : 'light_genre'"
              class="d-flex justify-content-between"
              :key="genre.id"
            >
              <label for="">{{ genre.name }}</label>
              <input v-model="movie.genres" :value="genre.id" type="checkbox" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <MyTextArea
      v-model="movie.description"
      type="text"
      style="border-radius: 20px; height: 120px; margin-top: 40px"
      :placeholder="$t(`movie_info.description`)"
    />
    <div>
      <MyButton
        style="align-self: flex-end"
        class="btn-access"
        @click="createMovie"
        >{{ $t("create_movie.submit") }}
      </MyButton>
    </div>
    <div>
      <MyButton style="align-self: flex-end" class="btn-cancel" @click="cancel"
        >{{ $t("create_movie.cancel") }}
      </MyButton>
    </div>
  </form>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
import MyTextArea from "@/components/UI/MyTextArea";
import {
  createMovie,
  getFormats,
  getGenres,
  getHalls,
  getLanguages,
  imageUpload,
} from "@/api/api_request";
import { mapGetters } from "vuex";

export default {
  name: "CreateMovie",
  components: { MyTextArea, MyButton },
  data() {
    return {
      movie: {
        name: "",
        description: "",
        release_year: "",
        date_start: "",
        date_finish: "",
        confines: "-",
        director: "",
        actors: "",
        country: "",
        screenwriter: "",
        duration: "",
        rating: "",
        image_path: "",
        trailer: "",
        halls: [],
        languages: [],
        genres: [],
        quizled: "",
        formats: [],
      },
      sortOption: [
        { value: "-", name: "нет ограничений" },
        { value: "6+", name: "6+" },
        { value: "12+", name: "12+" },
        { value: "18+", name: "18+" },
      ],
      isForVoting: [
        { value: "1", name: "Для опитування" },
        { value: "0", name: "Для прокату фільму" },
      ],
      checkbox: {
        language: "",
        formats: "",
        genres: "",
        halls: "",
      },
    };
  },
  computed: {
    ...mapGetters(["getDarkTheme"]),
  },
  methods: {
    choosePhoto(event) {
      this.movie.image_path = event.target.files[0];
    },
    createMovie() {
      this.$emit("create", this.movie);
      createMovie({
        name: this.movie.name,
        description: this.movie.description,
        release_year: this.movie.release_year,
        date_start: this.movie.date_start,
        date_finish: this.movie.date_finish,
        confines: this.movie.confines,
        director: this.movie.director,
        actors: this.movie.actors,
        country: this.movie.country,
        rating: this.movie.rating,
        screenwriter: this.movie.screenwriter,
        duration: this.movie.duration,
        trailer: this.movie.trailer,
        halls: this.movie.halls,
        languages: this.movie.languages,
        formats: this.movie.formats,
        genres: this.movie.genres,
        quizled: this.movie.quizled,
      })
        .then((response) => {
          console.log(response.data.movie.id);
          let formData = new FormData();
          formData.append("image", this.movie.image_path);
          imageUpload(response.data.movie.id, formData);
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
.form {
  text-align: center;
  min-height: 170vh;
}
.dark_h4 {
  color: white;
}
.light_h4 {
  color: black;
}
.dark_file {
  color: white;
}
.light_file {
  color: black;
}
.dark_hall,
.dark_genre,
.dark_format,
.dark_language {
  color: white;
  margin-bottom: 15px;
  font-size: 18px;
}
.light_hall,
.light_genre,
.light_format,
.light_language {
  color: black;
  margin-bottom: 15px;
  font-size: 18px;
}
.dark_p {
  color: white;
  font-size: 20px;
}
.light_p {
  color: black;
  font-size: 20px;
}

select {
  border: 1px solid #4d7cbc;
  border-radius: 26px;
  padding: 15px 15px;
  margin-top: 10px;
  color: white;
}

.vertical {
  border: none;
  margin-top: 40px;
  height: 600px;
  width: 1px;
  color: #4d7cbc;
  background-color: #4d7cbc;
}

.gorisonal {
  width: 100%;
  height: 3px;
  color: #4d7cbc;
  background-color: #4d7cbc;
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
}
.btn-cancel {
  border-radius: 20px;
  background-color: #000;
  border: 1px solid #ffffff;
  color: #4d7cbc;
  width: 20%;
  font-weight: 500;
}
.btn-access:hover {
  border-radius: 30px;
  background-color: #4d7cbc;
  margin-top: 30px;
  width: 20%;
  font-weight: 500;
  margin-bottom: 20px;
  border: 1px solid #4d7cbc;
  color: #fff;
}
.btn-cancel:hover {
  border-radius: 20px;
  background-color: #4d7cbc;
  border: 1px solid #ffffff;
  color: #fff;
  width: 20%;
  font-weight: 500;
}
input[type="checkbox"] {
  width: 20px;
}
h4 {
  font-size: 42px;
  letter-spacing: 5px;
  position: relative;
  top: 40px;
}
.cont {
  width: 90%;
}
</style>
