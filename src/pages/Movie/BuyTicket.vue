<template>
  <div class="container">
    <h2>Оплата квитків</h2>
    <div class="d-flex">
      <img :src="image" alt="" />
      <p class="text">Квитки</p>
    </div>
    <hr />
    <div class="d-flex">
      <div class="d-flex ticket-info">
        <img :src="marker" class="img" alt="" />
        <p>{{ session.hall.hall }}</p>
      </div>
      <div class="d-flex ticket-info">
        <img :src="clock" class="img" alt="" />
        <p>{{ momentTime(session?.date) }}</p>
      </div>
      <div class="d-flex ticket-info">
        <img :src="calendar" class="img" alt="" />
        <p>{{ momentDate(session?.date) }}</p>
      </div>
    </div>
    <div>
      <div class="d-flex mt-5">
        <div>
          <img
            :src="getImagePath(session?.movie.imagePath)"
            class="img-fluid ticket-info-image"
            alt=""
          />
          <p>{{ session?.movie.title }}</p>
        </div>
        <div>
          <div v-for="place in places" :key="place" class="places">
            <div v-if="place.vip === undefined">
              <p>
                {{ place.seat }} <strong>місце</strong>{{ place.row }}
                <strong>ряд</strong> {{ session?.movie.price }}
                <strong>грн.</strong>
              </p>
            </div>
            <div v-else>
              <div class="d-flex vip-info">
                <img :src="quen" class="img-vip" alt="" />
                <h6>VIP</h6>
              </div>
              <p>
                {{ place.seat }} <strong>місце </strong>{{ place.row }}
                <strong>ряд</strong> {{ session?.movie.price }}
                <strong>грн.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import image from "@/assets/images/tickets.png";
import marker from "@/assets/images/marker.png";
import calendar from "@/assets/images/calendar.png";
import clock from "@/assets/images/clock.png";
import quen from "@/assets/images/quen.png";
import moment from "moment";

export default {
  name: "BuyTicket",
  data() {
    return {
      session: null,
      places: [],
      image,
      calendar,
      clock,
      quen,
      marker,
    };
  },
  beforeMount() {
    let localStorageData = JSON.parse(localStorage.getItem("selected_seats"));

    this.places = localStorageData.places;
    this.session = localStorageData.session;
  },
  methods: {
    momentDate: function (date) {
      return moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
    },
    getImagePath: function (imagePath) {
      return `http://localhost/uploads/movies/${imagePath}`;
    },
    momentTime: function (date) {
      return moment(date, "YYYY-MM-DD, h:mm").locale("uk").format("HH:mm");
    },
  },
};
</script>

<style scoped>
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
.ticket-info {
  width: 15%;
  margin-bottom: 30px;
}
.img {
  width: 25%;
  height: 100%;
  min-width: 20%;
}
.img-vip {
  width: 5%;
  object-fit: cover;
  height: 100%;
}

.ticket-info-image {
  object-fit: contain;
  width: 300px;
  min-width: 100%;
  border-radius: 20px;
}
.places p {
  border: 1px solid #4d7cbc;
  border-radius: 20px;
  background-color: #080c14;
  position: relative;
  top: 0;
  font-size: 20px;
  padding: 10px 0 10px 30px;
  margin-bottom: 50px;
  margin-left: 30px;
}
.vip-info {
  margin-left: 50px;
}
.vip-info h6 {
  font-size: 16px;
  margin-left: 10px;
  color: white;
}
.places p strong {
  font-size: 18px;
  color: #4d7cbc;
  margin-right: 30px;
  font-weight: 400;
}
</style>
