<template>
  <div class="mb-5 p-4">
    <div class="card center img-fluid">
      <div class="front">
        <button @click="$router.push(`/movie/${movie.id}`)">
          <img
            :src="getMovieImagePath(movie.image_path)"
            class="img-fluid"
            alt=""
          />
        </button>
      </div>

      <div class="back">
        <div class="back-content center img-fluid">
          <div class="name">
            <strong>{{ $t("table.name") }}: </strong>{{ movie.name }}
          </div>
          <div class="actors">
            <strong>{{ $t("movie_info.actors") }}: </strong> {{ movie.actors }}
          </div>
          <div class="confines" v-if="movie.confines !== null">
            <strong>{{ $t("table.confines") }}: </strong> {{ movie.confines }}
          </div>
          <div class="confines" v-else>
            <strong>{{ $t("table.confines") }}: </strong> -
          </div>
          <div class="datestart">
            <strong>{{ $t("table.date_start") }}:</strong>
            {{ momentDate(movie.date_start) }}
          </div>
          <div class="datefinish">
            <strong>{{ $t("table.date_finish") }}:</strong>
            {{ momentDate(movie.date_finish) }}
          </div>
          <button class="btn" @click="$router.push(`/movie/${movie.id}`)">
            {{ $t("table.details") }}
          </button>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <p :class="this.getDarkTheme ? 'dark_movie_title' : 'light_movie_title'">
        {{ movie.name }}
      </p>
    </div>
  </div>
</template>

<script>
import moment from "moment/moment";
import { mapGetters } from "vuex";
import { getMovieImagePath } from "@/helpers/image_helper";

export default {
  name: "MovieItem",
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["getDarkTheme"]),
  },
  methods: {
    getMovieImagePath,
    momentDate: function (date) {
      return moment(date, "YYYY-MM-DD").format("DD.MM.YYYY");
    },
  },
};
</script>

<style scoped>
body {
  background-color: #333;
}

@media screen and (min-width: 900px) {
  article {
    padding: 1rem 3rem;
  }
}

.card {
  position: relative;
  padding: 0 0 130% 0;
  border-radius: 10px;
  margin: 0 0 30px 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  height: 420px;
}

.dark_movie_title {
  color: white;
  font-size: 23px;
  font-weight: 500;
}

.light_movie_title {
  color: black;
  font-size: 23px;
  font-weight: 500;
}

.front,
.back {
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  padding-left: 40px;
  padding-right: 40px;
  overflow: hidden;
  backface-visibility: hidden;
  position: absolute;
  transition: transform 0.6s linear;
}

.front img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  position: absolute;
  width: 100%;
  height: 500px;
  left: 0;
  top: 0;
}

strong {
  background-color: transparent;
}

.front {
  transform: perspective(600px) rotateY(0deg);
}

.back {
  transform: perspective(600px) rotateY(180deg);
  background-color: #f1f1f1;
  height: 100%;
  border-radius: 10px;
}

.genre-el {
  top: -15px;
  position: relative;
}

.back-content {
  background-color: transparent;
  color: black;
  width: 90%;
}

h2 {
  margin-bottom: 20px;
}

span {
  display: block;
  font-size: 20px;
  background-color: #fff;
}

.name,
.actors,
.datestart,
.datefinish,
.confines {
  position: relative;
  left: 10px;
  background-color: transparent;
  top: 50px;
  font-size: 19px;
}

.actors {
  top: 60px;
}

.confines {
  top: 80px;
}

.datestart {
  top: 100px;
}
.datefinish {
  top: 120px;
}
.fas {
  display: block;
  margin: 20px 0;
  color: red;
  font-size: 30px;
}

.front .format p {
  color: black;
  top: 10px;
  border: 1px solid black;
  padding: 3px 0 3px 13px;
  border-radius: 10px;
  background-color: rgba(232, 232, 232, 0.85);
  z-index: 4;
  font-size: 20px;
  width: 25%;
  position: relative;
  left: 10px;
}

.card:hover > .front {
  transform: perspective(600px) rotateY(-180deg);
}

.card:hover > .back {
  transform: perspective(600px) rotateY(0deg);
}

.btn {
  text-align: center;
  left: 80px;
  position: absolute;
  bottom: 20px;
  color: #ffffff;
  background-color: #4d7cbc;
  border: 1px solid #4d7cbc;
}

.btn:hover {
  border: 1px solid red;
  color: red;
}
</style>
