<template>
  <div class="container">
    <div v-if="loading === true" class="loading center">
      <p class="fs-1">Loading...</p>
    </div>
    <div v-else>
      <div class="center">
        <h1 style="color: white">
          {{ movie.title }}
        </h1>
        <div v-if="!isAuth">
          <p class="text-danger">Для покупки квитка, треба увійти</p>
        </div>
      </div>
      <div class="movie-block d-flex mt-xxl-5">
        <div>
          <img :src="getImagePath(movie.imagePath)" class="img-fluid" alt="" />
        </div>
        <div class="movie-info">
          <p><strong>Країна: </strong>{{ movie.country }}</p>
          <p><strong>Тривалість:</strong> {{ movie.duration }}</p>
          <p v-if="movie.confines">
            <strong>Обмеження у віці:</strong>{{ movie.confines }}
          </p>
          <p v-else><strong>Обмеження у віці:</strong>-</p>
          <p><strong>Актори:</strong> {{ movie.actors }}</p>
          <p><strong>Режисер:</strong> {{ movie.director }}</p>
          <p><strong>Сценарист:</strong> {{ movie.screenwriter }}</p>
          <p>
            <strong>Прокат :</strong> с {{ momentDate(movie.date_start) }} по
            {{ momentDate(movie.date_finish) }}
          </p>
          <div class="d-flex">
            <p><strong>Мова: </strong></p>
            <p
              class="language"
              v-for="language in movie.languages"
              :key="language.id"
            >
              {{ language.language }}
            </p>
          </div>
          <div class="d-flex">
            <p><strong> Жанри: </strong></p>
            <p class="genre" v-for="genre in movie.genres" :key="genre.id">
              {{ genre.genre }}
            </p>
          </div>
          <div class="d-flex">
            <p><strong> Формати: </strong></p>
            <p class="format" v-for="format in movie.formats" :key="format.id">
              {{ format.format }}
            </p>
          </div>
          <div class="d-flex">
            <p><strong> В залах: </strong></p>
            <p class="hall" v-for="hall in movie.halls" :key="hall.id">
              {{ hall.hall }}
            </p>
          </div>
        </div>
      </div>
      <div class="movie-info-block">
        <h6 class="description">
          <strong>Опис:</strong> {{ movie.description }}
        </h6>
      </div>
      <div v-if="isAuth && getRoles == 'ROLE_USER'">
        <button @click="show" class="btn">Обрати сеанс</button>
        <div v-if="isHidden">
          <ScheduleList :schedules="schedule" />
        </div>
      </div>
      <div
        class="d-flex justify-content-evenly"
        v-if="isAuth && getRoles == 'ROLE_ADMIN'"
      >
        <button
          @click="$router.push(`/movie/update/${movie.id}`)"
          class="btn update"
        >
          Редагувати
        </button>
        <button @click="archive(movie.title, movie.id)" class="btn archive">
          Архівувати
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { getOneMovie } from "@/api/api_request";
import { mapGetters } from "vuex";
import ScheduleList from "@/components/ScheduleList";
export default {
  name: "MovieId",
  components: { ScheduleList },
  data() {
    return {
      movie: [],
      schedule: [
        { id: "1", date: "12.11.2022 10:20" },
        { id: "2", date: "13.11.2022 10:20" },
        { id: "3", date: "14.11.2022 10:20" },
        { id: "4", date: "15.11.2022 10:20" },
        { id: "5", date: "16.11.2022 10:20" },
        { id: "6", date: "17.11.2022 10:20" },
        { id: "7", date: "18.11.2022 10:20" },
        { id: "8", date: "19.11.2022 10:20" },
        { id: "9", date: "20.11.2022 10:20" },
      ],
      loading: false,
      isHidden: false,
    };
  },
  computed: {
    ...mapGetters({
      isAuth: "auth/isAuth",
      getRoles: "auth/getRoles",
    }),
  },
  methods: {
    getImagePath: function (imagePath) {
      return `http://localhost/uploads/movies/${imagePath}`;
    },
    momentDate: function (date) {
      return moment(date, "YYYY-MM-DD").format("DD.MM.YYYY");
    },
    show() {
      this.isHidden = !this.isHidden;
    },
    archive(title, id) {
      return alert(`Ви впевнені, що хочете архівувати фільм ${title} ${id}`);
    },
  },
  beforeMount() {
    this.loading = true;
    getOneMovie(this.$route.params.id).then((response) => {
      this.movie = response.data;
      this.loading = false;
    });
  },
};
</script>

<style scoped>
.center {
  text-align: center;
}
.movie-info {
  margin-left: 20px;
  font-size: 18px;
  color: white;
  letter-spacing: 0.1em;
}
.movie-info-block {
  color: white;
  font-size: 18px;
  letter-spacing: 0.1em;
}
.movie-block {
  margin-bottom: 30px;
  color: white;
}

img {
  width: 350px;
  height: 100%;
  object-fit: cover;
  min-width: 90%;
  min-height: 100%;
  border-radius: 20px;
}
.description {
  letter-spacing: 0.1em;
  text-align: justify;
  line-height: 160%;
  font-size: 20px;
}
.hall,
.language,
.format,
.genre {
  margin-left: 20px;
}
.loading {
  color: red;
}
.btn {
  margin-left: 570px;
  background-color: #fff;
  color: #4d7cbc;
  font-weight: 500;
}
.btn:hover {
  background-color: #4d7cbc;
  color: white;
}
.btn.update,
.btn.archive {
  margin-left: 0px;
  width: 200px;
}
.btn.archive {
  background-color: red;
  color: white;
}
</style>
