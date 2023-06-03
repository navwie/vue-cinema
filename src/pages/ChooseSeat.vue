<template>
  <div class="cont m-auto">
    <h2 class="m-auto" :class="this.getDarkTheme ? 'dark_h2' : 'light_h2'">
      {{ $t("choose_seat.seat") }}
    </h2>
    <div class="d-flex">
      <img :src="image" alt="" />
      <p :class="this.getDarkTheme ? 'dark_btn_text' : 'light_btn_text'">
        "{{ session.movies[0].name }}" -
      </p>
      <p :class="this.getDarkTheme ? 'dark_btn_date' : 'light_btn_date'">
        {{ momentDate(session.date_time) }}
      </p>
      <p :class="this.getDarkTheme ? 'dark_btn_text' : 'light_btn_text'">-</p>
      <p :class="this.getDarkTheme ? 'dark_btn_date' : 'light_btn_date'">
        {{ momentTime(session.date_time) }}
      </p>
    </div>
    <hr />
    <ScreenSeats
      :seats="session"
      @choose_seat="setChooseSeat"
      @remove_seat="removeChooseSeat"
    />
    <div v-if="getRoles === 'ROLE_USER'" class="d-flex justify-content-center">
      <button class="btn accept" @click="accept">
        {{ $t("choose_seat.add_to_basket") }}
      </button>
    </div>
    <div v-if="getRoles === 'ROLE_USER'" class="d-flex justify-content-center">
      <button
        :class="this.getDarkTheme ? 'dark_btn_cancel' : 'light_btn_cancel'"
      >
        {{ $t("choose_seat.cancel") }}
      </button>
    </div>
    <div
      v-if="getRoles === 'ROLE_ADMIN'"
      class="d-flex justify-content-center mt-5"
    >
      <button
        @click="$router.push(`/movie/${session.movies[0].id}`)"
        :class="this.getDarkTheme ? 'dark_btn_cancel' : 'light_btn_cancel'"
      >
        {{ $t("choose_seat.back") }}
      </button>
    </div>
  </div>
</template>

<script>
import ScreenSeats from "@/components/ScreenSeats";
import moment from "moment/moment";
import image from "@/assets/images/cinema.png";
import { mapGetters, mapMutations } from "vuex";
import { getOneSession } from "@/api/api_request";

export default {
  name: "ChooseSeat",
  components: { ScreenSeats },

  data() {
    return {
      session: [],
      places: [],
      image,
    };
  },
  beforeMount() {
    this.loading = true;
    getOneSession(this.$route.params.id).then((response) => {
      this.session = response.data.session;
    });
  },
  computed: {
    ...mapGetters({
      getRoles: "auth/getRoles",
    }),
    ...mapGetters(["getDarkTheme"]),
    ...mapGetters(["getMovieTickets"]),
  },
  methods: {
    ...mapMutations(["setMovieToBasket"]),
    setChooseSeat(value) {
      const seatIndex = this.session.seats.findIndex((item) => {
        return (
          item.row === value.row &&
          item.seat === value.seat &&
          item.type === value.type
        );
      });

      this.places.push({
        id: this.session.seats[seatIndex].id,
        row: value.row,
        seat: value.seat,
        price: this.session.seats[seatIndex].price,
        type: value.type,
      });
    },
    removeChooseSeat(value) {
      this.places = this.places.filter((place) => {
        return place.row !== value.row || place.seat !== value.seat;
      });
    },
    momentDate: function (date) {
      return moment(date, "YYYY-MM-DD").format("DD/MM");
    },
    momentTime: function (date) {
      return moment(date, "YYYY-MM-DD, h:mm").locale("uk").format("HH:mm");
    },
    accept() {
      if (this.places.length > 0) {
        let selectedSeatsData = {
          places: this.places,
          session: this.session,
        };
        console.log(selectedSeatsData);
        this.setMovieToBasket({
          data: selectedSeatsData,
          action: "push",
        });
      } else {
        this.$swal({
          icon: "error",
          color: "#000",
          timer: 4000,
          text: "Оберіть місце(я)",
          timerProgressBar: true,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
    },
  },
};
</script>

<style scoped>
hr {
  border: none;
  height: 3px;
  color: #4d7cbc;
  background-color: #4d7cbc;
}

p {
  color: white;
}

.dark_h2 {
  color: white;
  text-align: center;
}

.light_h2 {
  color: black;
  text-align: center;
}
.cont {
  position: relative;
  top: 40px;
  width: 90%;
}
.dark_btn_text,
.dark_btn_date {
  color: white;
  position: relative;
  font-weight: 500;
  top: 22px;
  font-size: 20px;
}
.dark_btn_text,
.light_btn_text {
  margin-left: 10px;
  margin-right: 10px;
}

.light_btn_text,
.light_btn_date {
  color: black;
  position: relative;
  font-weight: 500;
  top: 22px;
  font-size: 20px;
}

.btn.accept {
  width: 30%;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 18px;
  border-radius: 30px;
  background-color: #fff;
  color: #4d7cbc;
  border: 1px solid #4d7cbc;
}
.dark_btn_cancel {
  width: 20%;
  background-color: transparent;
  color: white;
  border: 1px solid #4d7cbc;
  border-radius: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 18px;
}

.light_btn_cancel {
  width: 20%;
  background-color: grey;
  color: white;
  border: 1px solid #4d7cbc;
  border-radius: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 18px;
}
</style>
