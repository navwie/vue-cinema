<template>
  <div class="m-auto">
    <table class="table table-bordered border-primary">
      <thead>
        <tr>
          <th :class="this.getDarkTheme ? 'dark_th' : 'light_th'" scope="col">
            #
          </th>
          <th :class="this.getDarkTheme ? 'dark_th' : 'light_th'" scope="col">
            {{ $t("table.name") }}
          </th>
          <th :class="this.getDarkTheme ? 'dark_th' : 'light_th'" scope="col">
            {{ $t("table.rating") }}
          </th>
          <th :class="this.getDarkTheme ? 'dark_th' : 'light_th'" scope="col">
            {{ $t("table.release_year") }}
          </th>
          <th :class="this.getDarkTheme ? 'dark_th' : 'light_th'" scope="col">
            {{ $t("table.date_start") }}
          </th>
          <th :class="this.getDarkTheme ? 'dark_th' : 'light_th'" scope="col">
            {{ $t("table.date_finish") }}
          </th>
          <th :class="this.getDarkTheme ? 'dark_th' : 'light_th'" scope="col">
            {{ $t("table.duration") }}
          </th>
          <th :class="this.getDarkTheme ? 'dark_th' : 'light_th'" scope="col">
            {{ $t("table.confines") }}
          </th>
          <th :class="this.getDarkTheme ? 'dark_th' : 'light_th'" scope="col">
            {{ $t("table.country") }}
          </th>
          <th :class="this.getDarkTheme ? 'dark_th' : 'light_th'" scope="col">
            {{ $t("table.photo") }}
          </th>
          <th :class="this.getDarkTheme ? 'dark_th' : 'light_th'" scope="col">
            {{ $t("table.details") }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(movie, index) in this.movies" :key="index">
          <td :class="this.getDarkTheme ? 'dark_th' : 'light_th'">
            {{ index + 1 }}
          </td>
          <td :class="this.getDarkTheme ? 'dark_th' : 'light_th'">
            {{ movie.name }}
          </td>
          <td :class="this.getDarkTheme ? 'dark_th' : 'light_th'">
            {{ movie.rating }}
          </td>
          <td :class="this.getDarkTheme ? 'dark_th' : 'light_th'">
            {{ movie.release_year }}
          </td>
          <td :class="this.getDarkTheme ? 'dark_th' : 'light_th'">
            {{ momentDate(movie.date_start) }}
          </td>
          <td :class="this.getDarkTheme ? 'dark_th' : 'light_th'">
            {{ momentDate(movie.date_finish) }}
          </td>
          <td :class="this.getDarkTheme ? 'dark_th' : 'light_th'">
            {{ movie.duration }}м
          </td>
          <td
            :class="this.getDarkTheme ? 'dark_th' : 'light_th'"
            v-if="movie.confines !== null"
          >
            {{ movie.confines }}
          </td>
          <td :class="this.getDarkTheme ? 'dark_th' : 'light_th'" v-else>-</td>
          <td :class="this.getDarkTheme ? 'dark_th' : 'light_th'">
            {{ movie.country }}
          </td>
          <td class="movie-img">
            <img
              :src="getImagePath(movie.image_path)"
              class="img-fluid"
              alt=""
            />
          </td>
          <td>
            <button
              :class="this.getDarkTheme ? 'dark_btn' : 'light_btn'"
              @click="$router.push(`/movie/${movie.id}`)"
            >
              {{ $t("table.details") }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  name: "MovieTable",
  props: {
    movies: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["getDarkTheme"]),
  },
  methods: {
    getImagePath: function (imagePath) {
      return `http://localhost/storage/${imagePath}`;
    },
    momentDate: function (date) {
      return moment(date, "YYYY-MM-DD").format("DD.MM.YYYY");
    },
  },
};
</script>

<style scoped>
.cont {
  width: 100%;
}
.dark_th,
.dark_td {
  color: white;
  text-align: center;
  vertical-align: top;
}

.light_th,
.light_td {
  color: black;
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
.dark_btn {
  color: white;
  text-decoration: underline;
  background: transparent;
  border: none;
  position: relative;
  top: 36px;
}

.light_btn {
  color: black;
  text-decoration: underline;
  background: transparent;
  border: none;
  position: relative;
  top: 36px;
}
</style>
