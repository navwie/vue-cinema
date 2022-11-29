<template>
  <form class="form container" @submit.prevent>
    <h4 style="color: white">Create post</h4>
    <MyInput v-focus v-model="movie.title" type="text" placeholder="Назва" />
    <MyInput
      v-focus
      v-model="movie.release_year"
      type="number"
      placeholder="Рік виходу"
    />
    <MyInput
      v-focus
      v-model="movie.date_start"
      type="date"
      placeholder="Час початку виходу "
    />
    <MyInput
      v-focus
      v-model="movie.date_finish"
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
    <MySelect v-model="movie.confines" :options="sortOption" />

    <div class="d-flex justify-content-between">
      <div>
        <p>Оберіть зали</p>
        <div
          v-for="hall in checkbox.halls"
          class="hall d-flex justify-content-between"
          :key="hall.id"
        >
          <label for=""
            ><input v-model="movie.halls" :value="hall.id" type="checkbox" />{{
              hall.hall
            }}</label
          >
        </div>
      </div>
      <div>
        <p>Оберіть жанр</p>
        <div
          v-for="genre in checkbox.genres"
          class="genre d-flex justify-content-between"
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
      <div>
        <p>Оберіть мову</p>
        <div
          v-for="language in checkbox.language"
          class="language d-flex justify-content-between"
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
      <div>
        <p>Оберіть формат</p>
        <div
          v-for="format in checkbox.formats"
          class="format d-flex justify-content-between"
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

    <input type="file" @change="choosePhoto" />

    <MyTextArea v-model="movie.description" type="text" placeholder="Опис" />
    <div>
      <MyButton style="align-self: flex-end" class="btn" @click="createMovie"
        >Створити</MyButton
      >
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
export default {
  name: "CreateMovie",
  components: { MyTextArea, MyButton },
  data() {
    return {
      movie: {
        title: "",
        release_year: "",
        description: "",
        date_start: "",
        date_finish: "",
        confines: "-",
        director: "",
        actors: "",
        country: "",
        screenwriter: "",
        price: "",
        duration: "",
        photo: "",
        halls: [],
        languages: [],
        genres: [],
        formats: [],
      },
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
    };
  },
  methods: {
    choosePhoto(event) {
      this.movie.photo = event.target.files[0];
    },
    createMovie() {
      this.$emit("create", this.movie);
      createMovie({
        title: this.movie.title,
        release_year: this.movie.release_year,
        description: this.movie.description,
        imagePath: this.movie.photo,
        date_start: this.movie.date_start,
        date_finish: this.movie.date_finish,
        confines: this.movie.confines,
        director: this.movie.director,
        actors: this.movie.actors,
        country: this.movie.country,
        screenwriter: this.movie.screenwriter,
        price: this.movie.price,
        duration: this.movie.duration,
        halls: this.movie.halls,
        languages: this.movie.languages,
        formats: this.movie.formats,
        genres: this.movie.genres,
      })
        .then((response) => {
          let formData = new FormData();
          formData.append("file", this.movie.photo);
          imageUpload(response.data.movie_id, formData);
          // this.$router.push("/adminMain");
        })
        .catch(() => {
          alert("Некоректні дані");
        });
    },
  },
  beforeMount() {
    this.loading = true;
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
.form {
  text-align: center;
}
.hall,
.genre,
.format,
.language {
  color: white;
}
p {
  color: white;
}
</style>
