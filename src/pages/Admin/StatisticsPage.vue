<template>
  <div class="cont m-auto">
    <h2
      class="text-center"
      style="
        color: white;
        font-size: 2.2vw;
        letter-spacing: 2px;
        margin-bottom: 30px;
      "
    >
      {{ $t("statistics.statistics") }}
    </h2>
    <div v-if="getUserRole === 'ROLE_ADMIN'">
      <h2 class="text-center">Покупок</h2>
      <div class="d-flex justify-content-evenly">
        <button
          class="mb-5"
          style="
            width: 20%;
            height: 50px;
            font-size: 1.3vw;
            margin-top: 0;
            border-radius: 20px;
          "
          :style="{
            backgroundColor: isMonth === true ? '#4d7cbc' : 'rgba(0, 0, 0, 0)',
            borderColor: isMonth === true ? '#4d7cbc' : '#4d7cbc',
            color: isMonth === true ? '#fff' : '#fff',
          }"
          @click="show('month')"
        >
          {{ $t("statistics.month") }}
        </button>
        <button
          class="mb-5"
          style="
            width: 20%;
            height: 50px;
            color: #ffffff;
            font-size: 1.3vw;
            margin-top: 0;
            border-radius: 20px;
          "
          :style="{
            backgroundColor: isMonth === false ? '#4d7cbc' : 'rgba(0, 0, 0, 0)',
            borderColor: isMonth === false ? '#4d7cbc' : '#4d7cbc',
            color: isMonth === false ? '#fff' : '#fff',
          }"
          @click="show('year')"
        >
          {{ $t("statistics.year") }}
        </button>
      </div>
      <div
        v-if="isMonth === true"
        style="
          padding: 20px;
          position: relative;
          bottom: 20px;
          height: 700px;
          background-color: #ffffff;
        "
      >
        <Line :data="monthChartData" :options="options" />
      </div>
      <div
        v-else
        style="
          padding: 20px;
          height: 700px;
          position: relative;
          bottom: 20px;
          background-color: #ffffff;
        "
      >
        <Line :data="yearChartData" :options="options" />
      </div>
    </div>
    <div>
      <hr />
      <div>
        <label for="genre-select" style="font-size: 1.6vw; font-weight: 700"
          >Выберите жанр:</label
        >
        <div style="margin-left: 20px" class="btn-group">
          <select
            class="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
            v-model="filters"
          >
            <option :value="null" class="disabled" disabled selected>
              {{ $t("main.genre") }}
            </option>
            <option
              style="background-color: black; color: white"
              v-for="(genre, index) in genres"
              :key="index"
            >
              {{ genre.name }}
            </option>
          </select>
        </div>
      </div>
      <h2>Найпопулярніші за жанром " {{ filters }} "</h2>
      <Carousel
        :items-to-show="4"
        :items-to-scroll="4"
        :wrap-around="true"
        :snap-align="'start'"
      >
        <Slide v-for="(movie, index) in recommendedMoviesByGenre" :key="index">
          <div class="carousel-info">
            <div class="carousel-image">
              <a
                style="cursor: auto"
                @click="$router.push(`/movie/${movie.id}`)"
              >
                <img
                  :src="getMovieImagePath(movie.image_path)"
                  class=""
                  alt=""
                />
              </a>
            </div>
            <div class="carousel-title">
              <a
                style="cursor: auto"
                @click="$router.push(`/movie/${movie.id}`)"
                >{{ movie.name }}</a
              >
            </div>
          </div>
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import {
  getGenres,
  getPopularMovies,
  getSaleStatistic,
} from "@/api/api_request";
import { mapGetters } from "vuex";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import { getMovieImagePath } from "@/helpers/image_helper";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default {
  name: "StatisticPage",
  components: {
    Slide,
    Navigation,
    Carousel,
    Line,
  },
  data() {
    return {
      salesByMonth: [],
      salesByYear: [],
      recommendedMovie: [],
      genres: [],
      selectedGenre: "",
      filters: "",
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
      isMonth: true,
    };
  },
  methods: {
    getMovieImagePath,
    show(type) {
      console.log(type);
      if (type === "month") {
        this.isMonth = true;
      } else {
        this.isMonth = false;
      }
    },
  },
  beforeMount() {
    getSaleStatistic(localStorage.getItem("addressId"), {
      period: "month",
    }).then((response) => {
      this.salesByMonth = response.data;
    });
    getGenres().then((response) => {
      this.genres = response.data.genres.data;
    });
    getPopularMovies({
      amount: 10,
      period: "twoWeeks",
    }).then((response) => {
      this.recommendedMovie = response.data;
    });
    getSaleStatistic(localStorage.getItem("addressId"), {
      period: "year",
    }).then((response) => {
      this.salesByYear = response.data;
    });
  },
  computed: {
    ...mapGetters({
      getUserRole: "auth/getRoles",
    }),
    recommendedMoviesByGenre() {
      if (this.filters) {
        return this.recommendedMovie.filter(
          (movie) => movie.genres[0].name === this.filters
        );
      } else {
        return this.recommendedMovie;
      }
    },
    monthChartData() {
      return {
        // eslint-disable-next-line no-unused-vars
        labels: Object.keys(this.salesByMonth),
        datasets: [
          {
            label: "Sales",
            data: this.salesByMonth,
            borderColor: ["#000000"],
            fill: true,
            backgroundColor: "#4d7cbc",
          },
        ],
      };
    },
    yearChartData() {
      return {
        // eslint-disable-next-line no-unused-vars
        labels: Object.keys(this.salesByYear),
        datasets: [
          {
            label: "Sales",
            data: this.salesByYear,
            borderColor: ["#000000"],
            fill: true,
            backgroundColor: "#4d7cbc",
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
.cont {
  width: 80%;
  position: relative;
  top: 50px;
}
.chart {
  height: 500px;
}
.carousel-info {
  position: relative;
  padding: 30px;
}
.carousel-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}
.carousel-title a {
  margin-top: 5px;
  font-size: 1vw;
  color: white;
  text-decoration: none;
}

.carousel-title a:hover {
  margin-top: 5px;
  color: white;
  text-decoration: underline;
}
</style>
