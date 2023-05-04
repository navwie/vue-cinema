<template>
  <div class="container">
    <h2 class="m-auto" :class="this.getDarkTheme ? 'dark_h2' : 'light_h2'">
      Оберіть бажані місця
    </h2>
    <div class="d-flex">
      <img :src="image" alt="" />
      <p :class="this.getDarkTheme ? 'dark_btn_text' : 'light_btn_text'">
        "{{ session?.movie.title }}" -
      </p>
      <p :class="this.getDarkTheme ? 'dark_btn_date' : 'light_btn_date'">
        {{ momentDate(session?.date) }}
      </p>
      <p :class="this.getDarkTheme ? 'dark_btn_text' : 'light_btn_text'">-</p>
      <p :class="this.getDarkTheme ? 'dark_btn_date' : 'light_btn_date'">
        {{ momentTime(session?.date) }}
      </p>
    </div>
    <hr />
    <ScreenSeats
      :seats="session?.hall"
      @choose_seat="setChooseSeat"
      @remove_seat="removeChooseSeat"
    />
    <div class="d-flex justify-content-center">
      <button class="btn accept" @click="accept">Перейти до оплати</button>
    </div>
    <div class="d-flex justify-content-center">
      <button
        :class="this.getDarkTheme ? 'dark_btn_cancel' : 'light_btn_cancel'"
      >
        Скасувати
      </button>
    </div>
  </div>
</template>

<script>
import { getOneSession } from "@/api/api_request";
import ScreenSeats from "@/components/ScreenSeats";
import moment from "moment/moment";
import image from "@/assets/images/cinema.png";
import { mapGetters } from "vuex";

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
      this.session = response.data;
    });
  },
  computed: {
    ...mapGetters(["getDarkTheme"]),
  },
  methods: {
    setChooseSeat(value) {
      this.places.push({
        row: value.row,
        seat: value.seat,
        vip: value.isVip,
      });
    },
    removeChooseSeat(value) {
      console.log(value);
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
        localStorage.setItem(
          "selected_seats",
          JSON.stringify(selectedSeatsData)
        );
        this.$router.push({ name: "BuyTicket" });
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
