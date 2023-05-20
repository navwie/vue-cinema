<template>
  <div class="cont m-auto">
    <h1
      :class="this.getDarkTheme ? 'dark_h1' : 'light_h1'"
      style="
        text-align: center;
        position: relative;
        top: 20px;
        margin-bottom: 70px;
      "
    >
      {{ $t("profile.profile") }}
    </h1>
    <div class="d-flex justify-content-center">
      <div class="row">
        <div class="info-block">
          <div class="d-flex justify-content-around">
            <p :class="this.getDarkTheme ? 'dark_p' : 'light_p'">
              {{ $t("profile.name") }}
            </p>
            <p :class="this.getDarkTheme ? 'dark_p' : 'light_p'">
              {{ getUser.firstname }}
            </p>
          </div>
          <div class="d-flex justify-content-around">
            <p :class="this.getDarkTheme ? 'dark_p' : 'light_p'">
              {{ $t("profile.surname") }}
            </p>
            <p :class="this.getDarkTheme ? 'dark_p' : 'light_p'">
              {{ getUser.lastname }}
            </p>
          </div>
          <div class="d-flex justify-content-around">
            <p :class="this.getDarkTheme ? 'dark_p' : 'light_p'">
              {{ $t("profile.email") }}
            </p>
            <p :class="this.getDarkTheme ? 'dark_p' : 'light_p'">
              {{ getUser.email }}
            </p>
          </div>
          <div class="d-flex justify-content-around">
            <p :class="this.getDarkTheme ? 'dark_p' : 'light_p'">
              {{ $t("profile.phone") }}
            </p>
            <p :class="this.getDarkTheme ? 'dark_p' : 'light_p'">
              {{ getUser.phone }}
            </p>
          </div>
          <div class="d-flex justify-content-around">
            <p :class="this.getDarkTheme ? 'dark_p' : 'light_p'">
              {{ $t("profile.age") }}
            </p>
            <p :class="this.getDarkTheme ? 'dark_p' : 'light_p'">
              {{ momentDate(getUser.birthday) }}
            </p>
          </div>
        </div>
        <button
          :class="this.getDarkTheme ? 'dark_butn' : 'light_butn'"
          @click="$router.push(`/user/update/${getUser.id}`)"
        >
          {{ $t("profile.change") }}
        </button>
      </div>
    </div>
    <div class="d-flex" style="margin-top: 90px">
      <img :src="archive" alt="" />
      <p :class="this.getDarkTheme ? 'dark_text' : 'light_text'">
        {{ $t("profile.archive") }}
      </p>
    </div>
    <hr />
    <div v-for="order in orders" :key="order">
      <div>
        <div v-if="order.seats.length > 0">
          <h2 style="color: white">Movie</h2>
          <p>{{ order.session.movies[0].name }}</p>
          <img
            :src="getImagePath(order.session.movies[0].image_path)"
            class="img-fluid"
            alt=""
          />
          <p>Date: {{ momentDate(order.session.date_time) }}</p>
          <p v-for="seat in order.seats" :key="seat">
            {{ seat.row }} {{ seat.seat }} {{ seat.type }} {{ seat.price }}
          </p>
        </div>
        <div v-if="order.products.length > 0">
          <h2 style="color: white">Products</h2>
        </div>
        <div v-if="order.souvenirs.length > 0">
          <h2 style="color: white">Souvenirs</h2>
        </div>
        <h2>Total price : {{ order.price }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment/moment";
import tickets from "../../assets/images/tickets.png";
import archive from "../../assets/images/archive.png";
import { getMyOrders } from "@/api/api_request";

export default {
  name: "ProfilePage",
  computed: {
    ...mapGetters({
      getUser: "auth/getUser",
      getUserId: "auth/getUserId",
    }),
    ...mapGetters(["getDarkTheme"]),
  },
  data() {
    return {
      tickets,
      archive,
      orders: [],
    };
  },
  methods: {
    getImagePath: function (imagePath) {
      return `http://localhost/storage/${imagePath}`;
    },
    momentDate: function (date) {
      return moment(date, "YYYY-MM-DD").format("DD.MM.YYYY");
    },
  },
  beforeMount() {
    getMyOrders(this.getUserId).then((response) => {
      this.orders = response.data.order;
    });
  },
};
</script>

<style scoped>
.dark_h1 {
  color: white;
}

.light_h1 {
  color: black;
}
.dark_p {
  color: white;
  width: 288px;
  font-size: 20px;
  background-color: #20242c;
  padding: 5px 10px;
  font-weight: 500;
}

.light_p {
  color: black;
  width: 288px;
  font-size: 20px;
  background-color: #aaaaaa;
  padding: 5px 10px;
  font-weight: 500;
}

.info-block {
  border: 1px solid #4d7cbc;
  border-radius: 15px;
  padding: 22px 10px;
}
hr {
  border: none;
  height: 3px;
  color: #4d7cbc;
  background-color: #4d7cbc;
}
.dark_text {
  color: white;
  position: relative;
  font-weight: 500;
  padding: 0;
  top: 10px;
  left: 10px;
  background-color: transparent;
  font-size: 20px;
}
.light_text {
  color: black;
  position: relative;
  font-weight: 500;
  padding: 0;
  top: 10px;
  left: 10px;
  background-color: transparent;
  font-size: 20px;
}
.dark_butn {
  border: 1px solid #4d7cbc;
  width: 50%;
  color: white;
  margin-top: 20px;
  border-radius: 20px;
  padding: 10px;
  font-weight: 500;
  position: relative;
  left: 130px;
  background-color: transparent;
}
.dark_butn:hover {
  background-color: #fff;
  color: #4d7cbc;
}

.light_butn {
  border: 1px solid #4d7cbc;
  width: 50%;
  color: #4d7cbc;
  margin-top: 20px;
  border-radius: 20px;
  padding: 10px;
  font-weight: 500;
  position: relative;
  left: 130px;
  background-color: transparent;
}
.light_butn:hover {
  background-color: #4d7cbc;
  color: #fff;
}
.cont {
  width: 90%;
  position: relative;
  top: 30px;
}
</style>
