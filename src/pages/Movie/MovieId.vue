<template>
  <div class="cont m-auto">
    <div v-if="loading === true" class="loading center">
      <p class="fs-1">Loading...</p>
    </div>
    <div v-else>
      <div class="d-flex" style="position: relative; top: 20px">
        <img :src="image" alt="" class="icon mt-5 img-fluid" />
        <p :class="this.getDarkTheme ? 'dark_text' : 'light_text'" class="mt-5">
          {{ $t("movie_info.infomovie") }} "{{ movie.name }}"
        </p>
      </div>
      <hr />
      <div class="center mb-5">
        <div v-if="!isAuth">
          <p style="font-size: 1.7vw" class="h3 text-danger">
            {{ $t("movie_info.info_buy") }}
          </p>
        </div>
      </div>
      <div
        :class="this.getDarkTheme ? 'dark_movie-block' : 'light_movie-block'"
        class="d-flex justify-content-between mt-xxl-5"
      >
        <div>
          <img
            :src="getMovieImagePath(movie.image_path)"
            class="img-fluid image"
            alt=""
          />
        </div>
        <div
          style="width: 60%"
          :class="this.getDarkTheme ? 'dark_movie-info' : 'light_movie-info'"
        >
          <div class="d-flex justify-content-evenly">
            <div class="d-flex">
              <img
                style="width: 100%; margin-left: 10px; color: white"
                src="../../assets/images/рейтинг.png"
                alt=""
              />
              <p
                style="
                  font-size: 24px;
                  position: relative;
                  top: 10px;
                  left: 10px;
                "
              >
                {{ movie.rating }}
              </p>
            </div>
            <div class="d-flex">
              <img
                style="width: 100%; margin-left: 10px; color: white"
                src="../../assets/images/comments.png"
                alt=""
              />
              <p
                style="
                  font-size: 24px;
                  position: relative;
                  top: 10px;
                  left: 10px;
                "
              >
                <a :href="'/comments/' + movie.id" style="color: white">{{
                  commentsCount
                }}</a>
              </p>
            </div>
          </div>
          <hr />
          <div class="mt-4">
            <div class="d-flex mt-4 justify-content-between">
              <p>
                <strong>{{ $t("table.country") }} :</strong>
              </p>
              <p>{{ movie.country }}</p>
            </div>
            <div class="d-flex justify-content-between">
              <p>
                <strong> {{ $t("table.duration") }}:</strong>
              </p>
              <p>{{ movie.duration }}</p>
            </div>
            <div class="d-flex justify-content-between" v-if="movie.confines">
              <p>
                <strong>{{ $t("table.confines") }}:</strong>
              </p>
              <p>{{ movie.confines }}</p>
            </div>
            <div class="d-flex justify-content-between" v-else>
              <p>
                <strong>{{ $t("table.confines") }}:</strong>
              </p>
              <p>-</p>
            </div>
            <div class="d-flex justify-content-between">
              <p>
                <strong>{{ $t("movie_info.actors") }}:</strong>
              </p>
              <p>{{ movie.actors }}</p>
            </div>
            <div class="d-flex justify-content-between">
              <p>
                <strong>{{ $t("movie_info.director") }}:</strong>
              </p>
              <p>{{ movie.director }}</p>
            </div>
            <div class="d-flex justify-content-between">
              <p>
                <strong>{{ $t("movie_info.screenwriter") }}:</strong>
              </p>
              <p>{{ movie.screenwriter }}</p>
            </div>
            <div class="d-flex justify-content-between">
              <p>
                <strong>{{ $t("movie_info.hire") }} :</strong>
              </p>
              <p>
                {{ $t("movie_info.from") }} {{ momentDate(movie.date_start) }}
                {{ $t("movie_info.to") }}
                {{ momentDate(movie.date_finish) }}
              </p>
            </div>

            <div class="d-flex justify-content-between">
              <p>
                <strong>{{ $t("movie_info.languages") }}: </strong>
              </p>
              <div class="d-flex">
                <p
                  class="language"
                  v-for="language in movie.languages"
                  :key="language.id"
                >
                  {{ language.name }}
                </p>
              </div>
            </div>
            <div class="d-flex justify-content-between">
              <p>
                <strong> {{ $t("movie_info.genres") }}: </strong>
              </p>
              <div class="d-flex">
                <p class="genre" v-for="genre in movie.genres" :key="genre.id">
                  {{ genre.name }}
                </p>
              </div>
            </div>
            <div class="d-flex justify-content-between">
              <p>
                <strong> {{ $t("movie_info.formats") }}: </strong>
              </p>
              <div class="d-flex">
                <p
                  class="format"
                  v-for="format in movie.formats"
                  :key="format.id"
                >
                  {{ format.name }}
                </p>
              </div>
            </div>
            <div class="d-flex justify-content-between">
              <p>
                <strong> {{ $t("movie_info.halls") }}: </strong>
              </p>
              <div class="d-flex">
                <p class="hall" v-for="hall in movie.halls" :key="hall.id">
                  {{ hall.name }}
                </p>
              </div>
            </div>
          </div>
          <div class="movie-info-block">
            <h6
              :class="
                this.getDarkTheme ? 'dark_description' : 'light_description'
              "
            >
              <strong>{{ $t("movie_info.description") }}:</strong>
            </h6>
            <p style="text-align: justify">
              {{ movie.description }}
            </p>
          </div>
          <hr />
        </div>
      </div>
      <div class="d-flex mb-5 justify-content-center">
        <iframe
          width="1200"
          height="600"
          style="margin-top: 40px"
          :src="`https://www.youtube.com/embed/${videoId}`"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
      <div v-if="isAuth" class="d-flex">
        <img :src="image" alt="" class="icon mt-5 img-fluid" />
        <p :class="this.getDarkTheme ? 'dark_text' : 'light_text'" class="mt-5">
          {{ $t("movie_info.session") }}
        </p>
      </div>
      <hr v-if="isAuth" />
      <div v-if="isAuth">
        <div class="mt-5">
          <label
            :class="this.getDarkTheme ? 'dark_btn_label' : 'light_btn_label'"
            >{{ $t("movie_info.choose_date") }}</label
          >
          <MySelect v-focus v-model="selectedFilter" :options="sortOption" />
          <button
            :class="this.getDarkTheme ? 'dark_btn_accept' : 'light_btn_accept'"
            @click="applyFilters"
          >
            {{ $t("main.accept") }}
          </button>
        </div>
        <div>
          <div v-if="sessions.length > 0">
            <ScheduleList :schedules="sessions" />
          </div>
        </div>
      </div>
      <div
        class="d-flex justify-content-evenly"
        v-if="isAuth && getRoles == 'ROLE_ADMIN'"
      >
        <button
          @click="$router.push(`/movie/update/${movie.id}`)"
          :class="this.getDarkTheme ? 'dark_btn_update' : 'light_btn_update'"
        >
          {{ $t("movie_info.change") }}
        </button>
        <button
          @click="$router.push(`/movie/add-session/${movie.id}`)"
          :class="this.getDarkTheme ? 'dark_btn_update' : 'light_btn_update'"
        >
          {{ $t("movie_info.add_session") }}
        </button>
        <button
          @click="archive(movie.title, movie.id)"
          :class="this.getDarkTheme ? 'dark_btn_archive' : 'light_btn_archive'"
        >
          {{ $t("movie_info.archive") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { getOneMovie } from "@/api/api_request";
import { mapGetters } from "vuex";
import ScheduleList from "@/components/ComponentLists/ScheduleList.vue";
import MySelect from "@/components/UI/MySelect";
import image from "@/assets/images/cinema.png";
import { getMovieImagePath } from "@/helpers/image_helper";

export default {
  name: "MovieId",
  components: { MySelect, ScheduleList },
  data() {
    return {
      movie: [],
      sessions: [],
      commentsCount: 0,
      image,
      loading: false,
      selectedFilter: "week",
      chooseDate: "",
      sortOption: [
        { value: "week", name: "Вся неділя" },
        { value: "today", name: "Сьогодні" },
        { value: "tomorrow", name: "Завтра" },
      ],
      isHidden: false,
    };
  },
  computed: {
    videoId() {
      return this.movie.trailer.split("v=")[1];
    },
    ...mapGetters({
      isAuth: "auth/isAuth",
      getRoles: "auth/getRoles",
    }),
    ...mapGetters(["getDarkTheme"]),
  },
  methods: {
    getMovieImagePath,
    momentDate: function (date) {
      return moment(date, "YYYY-MM-DD").format("DD.MM.YYYY");
    },
    show() {
      this.isHidden = !this.isHidden;
    },
    archive(title, id) {
      return alert(`Ви впевнені, що хочете архівувати фільм ${title} ${id}`);
    },
    applyFilters() {
      if (this.selectedFilter === "today") {
        let day = new Date();
        let localeDate = moment(day).locale("uk").format("LL");
        console.log(localeDate);
        this.sessions = this.movie.sessions.filter(
          (session) =>
            moment(session.date_time).locale("uk").format("LL") === localeDate
        );
      }
      if (this.selectedFilter === "tomorrow") {
        let day = new Date();
        day.setDate(day.getDate() + 1);
        let localeDate = moment(day).locale("uk").format("LL");

        this.sessions = this.movie.sessions.filter(
          (session) =>
            moment(session.date_time).locale("uk").format("LL") === localeDate
        );
      }
      if (this.selectedFilter === "week") {
        let day = new Date();
        let week = new Date();
        week.setDate(day.getDate() + 7);
        let localeDay = moment(day).locale("uk").format("YYYY-MM-DD");
        let localeWeek = moment(week).locale("uk").format("YYYY-MM-DD");
        this.sessions = this.movie.sessions.filter(
          (session) =>
            moment(session.date_time).locale("uk").format("YYYY-MM-DD") >=
              localeDay &&
            moment(session.date_time).locale("uk").format("YYYY-MM-DD") <=
              localeWeek
        );
      }
    },
  },
  beforeMount() {
    this.loading = true;
    getOneMovie(this.$route.params.id).then((response) => {
      this.movie = response.data.movie;
      this.commentsCount = this.movie.comments.length;
      this.loading = false;
      let day = new Date();
      let week = new Date();
      week.setDate(day.getDate() + 7);
      let localeDay = moment(day).locale("uk").format("YYYY-MM-DD");
      let localeWeek = moment(week).locale("uk").format("YYYY-MM-DD");
      console.log(this.movie.sessions);
      console.log(localeDay);
      this.movie.sessions = this.movie.sessions.filter((session) => {
        const sessionDate = moment(session.date_time)
          .locale("uk")
          .format("YYYY-MM-DD");
        return sessionDate >= localeDay && sessionDate <= localeWeek;
      });
    });
  },
};
</script>

<style scoped>
.center {
  text-align: center;
}
.dark_movie-info {
  font-size: 18px;
  color: white;
  letter-spacing: 0.1em;
}
.light_movie-info {
  font-size: 18px;
  color: black;
  letter-spacing: 0.1em;
}
.dark_movie-info p {
  font-size: 22px;
}
.light_movie-info p {
  font-size: 22px;
}
.dark_btn_label {
  font-size: 22px;
}
.light_btn_label {
  font-size: 22px;
}
.movie-info-block {
  margin-right: 40px;
  font-size: 18px;
  letter-spacing: 0.1em;
}
.icon {
  width: 60px;
  position: relative;
  top: -10px;
  height: 30%;
}
hr {
  border: none;
  height: 3px;
  color: #4d7cbc;
  background-color: #4d7cbc;
}
p {
  font-size: 20px;
}
.dark_text {
  opacity: 1;
  color: white;
  font-weight: 700;
  font-size: 27px;
  margin-left: 30px;
}
.light_text {
  opacity: 1;
  color: black;
  font-weight: 700;
  font-size: 27px;
  margin-left: 30px;
}
.dark_movie-block {
  margin-bottom: 30px;
  color: white;
}
.light_movie-block {
  margin-bottom: 30px;
  color: black;
}
.date {
  margin-top: 40px;
  display: flex;
  justify-content: space-evenly;
}
.date label {
  color: white;
  font-weight: 500;
  font-size: 20px;
  margin-top: 30px;
}

.cont {
  width: 80%;
}

.image {
  width: 500px;
  object-fit: cover;
  margin-top: 100px;
  border-radius: 20px;
}
.dark_description {
  letter-spacing: 0.1em;
  text-align: justify;
  line-height: 160%;
  font-size: 22px;
}

.light_description {
  letter-spacing: 0.1em;
  text-align: justify;
  line-height: 160%;
  font-size: 22px;
}

.hall,
.language,
.format,
.genre {
  margin-left: 40px;
  font-size: 24px;
}
strong {
  font-size: 24px;
}
.loading {
  color: red;
}
.dark_btn {
  margin-left: 746px;
  margin-top: 43px;
  width: 200px;
  background-color: #fff;
  color: #4d7cbc;
  font-weight: 500;
  padding: 14px;
  border-radius: 20px;
  font-size: 20px;
}

.light_btn {
  margin-left: 746px;
  margin-top: 43px;
  width: 200px;
  background-color: #fff;
  color: #4d7cbc;
  font-weight: 500;
  padding: 14px;
  border-radius: 20px;
  font-size: 20px;
}

.light_btn:hover,
.dark_btn:hover {
  background-color: #4d7cbc;
  color: white;
}

.dark_btn_update,
.dark_btn_archive,
.light_btn_update,
.light_btn_archive {
  margin-left: 0;
  width: 200px;
}
.dark_btn_update {
  padding: 10px;
  background-color: #4d7cbc;
  color: white;
  border-radius: 20px;
  border: 1px solid;
}

.light_btn_update {
  padding: 10px;
  color: white;
  border-radius: 20px;
  border: 1px solid;
}

.dark_btn_accept,
.light_btn_accept {
  margin-left: 1500px;
  width: 200px;
  background-color: #fff;
  color: #4d7cbc;
  font-weight: 500;
  padding: 14px;
  border-radius: 20px;
  font-size: 20px;
  margin-top: 15px;
}

.dark_btn_archive,
.light_btn_archive {
  padding: 10px;
  background-color: red;
  color: white;
  border-radius: 20px;
  border: 1px solid;
}
.cont {
  width: 90%;
  position: relative;
  top: 30px;
  bottom: 50px;
}
</style>
