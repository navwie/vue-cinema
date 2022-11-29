<template>
  <div class="container table-responsive-xxl">
    <table class="table table-bordered border-primary">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Назва</th>
          <th scope="col">Ціна</th>
          <th scope="col">Дата початку</th>
          <th scope="col">Дата кінця</th>
          <th scope="col">Тривалість</th>
          <th scope="col">Обмеження у віці</th>
          <th scope="col">Країна</th>
          <th scope="col">Фото</th>
          <th scope="col">Більше інформації</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(movie, index) in this.movies" :key="index">
          <td>{{ index }}</td>
          <td>{{ movie.title }}</td>
          <td>{{ movie.price }}</td>
          <td>{{ momentDate(movie.date_start) }}</td>
          <td>{{ momentDate(movie.date_finish) }}</td>
          <td>{{ movie.duration }}м</td>
          <td v-if="movie.confines !== null">
            {{ movie.confines }}
          </td>
          <td v-else>-</td>
          <td>{{ movie.country }}</td>
          <td class="movie-img">
            <img
              :src="getImagePath(movie.imagePath)"
              class="img-fluid"
              alt=""
            />
          </td>
          <td>
            <button class="btn" @click="$router.push(`/movie/${movie.id}`)">
              Детальніше
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "MovieTable",
  props: {
    movies: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getImagePath: function (imagePath) {
      return `http://localhost/uploads/movies/${imagePath}`;
    },
    momentDate: function (date) {
      return moment(date, "YYYY-MM-DD").format("DD.MM.YYYY");
    },
  },
};
</script>

<style scoped>
th,
td {
  color: white;
  text-align: center;
  vertical-align: top;
}
img {
  width: 80px;
  height: 100%;
  object-fit: cover;
  min-width: 90%;
  min-height: 100%;
  border-radius: 20px;
}
.btn {
  color: white;
  text-decoration: underline;
}
</style>
