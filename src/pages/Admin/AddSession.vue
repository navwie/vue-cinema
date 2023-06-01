<template>
  <div class="cont m-auto">
    <div class="d-flex">
      <img style="width: 4%" src="../../assets/images/calendar.png" alt="" />
      <p class="text">Додати новий сеанс</p>
    </div>
    <hr />
    <div class="d-flex justify-content-between">
      <div>
        <img
          style="width: 300px; height: 400px; object-fit: cover"
          :src="getImgPath(movie.image_path)"
          alt=""
        />
        <p>{{ movie.name }}</p>
      </div>
      <div class="w-50">
        <div class="d-flex justify-content-between">
          <p>Дата початку прокату фільма:</p>
          <p>
            <strong>{{ momentDate(movie.date_start) }}</strong>
          </p>
        </div>
        <div class="d-flex justify-content-between">
          <p>Дата кінця прокату фільма:</p>
          <p>
            <strong>{{ momentDate(movie.date_finish) }}</strong>
          </p>
        </div>
        <select
          :class="this.getDarkTheme ? 'dark_select' : 'light_select'"
          class="form-select form-select-lg mb-3 mt-5"
          aria-label=".form-select-lg example"
          v-model="selectHall"
        >
          <option
            :class="this.getDarkTheme ? 'dark_option' : 'light_option'"
            disabled
            value=""
          >
            Оберіть зал
          </option>
          <option
            :class="this.getDarkTheme ? 'dark_option' : 'light_option'"
            style="background-color: black; color: white"
            v-for="(hall, index) in movie.halls"
            :key="index"
            :value="hall.id"
          >
            {{ hall.name }}
          </option>
        </select>
        <MyInput
          v-focus
          class="date"
          v-model="date"
          style="width: 100%"
          type="datetime-local"
        />
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <button class="btn accept" @click="createSession">Додати</button>
    </div>
  </div>
</template>
<script>
import { createSession, getOneMovie, movieSession } from "@/api/api_request";
import MyInput from "@/components/UI/MyInput.vue";
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "AddSession",
  components: { MyInput },
  data() {
    return {
      movie: [],
      selectHall: "",
      date: "",
    };
  },
  computed: {
    ...mapGetters(["getDarkTheme"]),
  },
  methods: {
    getImgPath: function (imagePath) {
      return `http://localhost/storage/${imagePath}`;
    },
    momentDate: function (date) {
      return moment(date, "YYYY-MM-DD").format("DD.MM.YYYY");
    },
    createSession() {
      createSession({
        hall_id: this.selectHall,
        date_time: moment(this.date, "YYYY-MM-DDTHH:mm").format(
          "YYYY-MM-DD HH:mm:ss"
        ),
      })
        .then((response) => {
          movieSession({
            movie_id: this.movie.id,
            session_id: response.data.session.id,
          });
        })
        .then(() => {
          this.$swal({
            icon: "success",
            color: "#000",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
            timer: 4000,
            timerProgressBar: true,
          });
          this.$router.push(`/movie/${this.movie.id}`);
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
    getOneMovie(this.$route.params.id).then((response) => {
      this.movie = response.data.movie;
    });
  },
};
</script>

<style scoped>
.cont {
  width: 70%;
  position: relative;
  top: 50px;
}
.dark_select {
  width: 100%;
  border: 1px solid #4d7cbc;
  padding: 15px 15px;
  color: white;
  border-radius: 30px;
  background-color: transparent;
}
.light_select {
  width: 100%;
  border: 1px solid #4d7cbc;
  padding: 18px 15px;
  color: black;
  border-radius: 20px;
  background-color: transparent;
  margin-bottom: 30px;
}
.dark_option {
  background-color: #333333;
  color: white;
}
.light_option {
  background-color: #fff;
  color: black;
}

h2 {
  color: white;
  text-align: center;
}
hr {
  border: none;
  height: 3px;
  color: #4d7cbc;
  background-color: #4d7cbc;
}
.text {
  color: white;
  position: relative;
  font-weight: 500;
  top: 22px;
  font-size: 20px;
}
p {
  color: white;
  margin-left: 10px;
  font-size: 22px;
  position: relative;
  top: 15px;
}
button {
  border: 1px solid #4d7cbc;
  color: white;
  font-size: 1.4vw;
  padding: 10px;
  border-radius: 20px;
  width: 200px;
}
button:hover {
  border: 1px solid #4d7cbc;
  color: white;
  font-size: 1.4vw;
  padding: 10px;
  border-radius: 20px;
  width: 200px;
}
</style>
