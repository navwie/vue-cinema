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
    <div class="d-flex flex-wrap justify-content-between">
      <div v-for="order in orders" :key="order" class="order">
        <h2 style="text-align: center">
          {{ momentDate(order.created_at) }}
        </h2>
        <p>
          <strong>Адреса:</strong> {{ order.sessions[0].addresses[0]?.name }}
        </p>
        <div>
          <div v-if="orders.length > 0" class="section">
            <hr />
            <h2 class="section-title">{{ $t("profile.movie") }}</h2>
            <div class="d-flex" style="margin: 25px 0 25px 15px">
              <img
                :src="getMovieImagePath(order.sessions[0].movies[0].image_path)"
                class="movie-image"
                alt=""
              />
              <div class="movie-info">
                <p class="movie-name">
                  {{ order.sessions[0].movies[0].name }}
                </p>
                <p style="">
                  {{ $t("profile.date") }}
                  {{ momentDate(order.sessions[0].date_time) }}
                </p>
                <p
                  v-for="seat in order.sessions"
                  :key="seat"
                  class="seat-info"
                  style="margin-bottom: 10px"
                >
                  <strong>{{ $t("profile.row") }} </strong>
                  {{ seat.seat.row }}
                  <strong>{{ $t("profile.seat") }} </strong>
                  {{ seat.seat.seat }}
                  <strong>{{ $t("profile.price") }} </strong>
                  {{ seat.seat.price }}
                </p>
              </div>
            </div>
          </div>
          <div v-if="order.products.length > 0" class="section">
            <hr />
            <h2 class="section-title">{{ $t("profile.products") }}</h2>
            <div
              v-for="product in order.products"
              :key="product"
              class="product"
            >
              <strong>{{ $t("profile.type") }} </strong> {{ product.name }}
              <strong>{{ $t("profile.price") }} </strong>
              {{ product.price }}
            </div>
          </div>
          <div v-if="order.souvenirs.length > 0" class="section">
            <hr />
            <h2 class="section-title">{{ $t("profile.souvenirs") }}</h2>
            <div
              v-for="souvenir in order.souvenirs"
              :key="souvenir"
              class="souvenir"
            >
              <strong>{{ $t("profile.type") }} </strong> {{ souvenir.name }}
              <strong>{{ $t("profile.price") }} </strong> {{ souvenir.price }}
            </div>
          </div>
          <hr />
          <div class="price" style="margin-top: 30px">
            <h2 class="total-price">
              {{ $t("profile.totalprice") }} {{ order.price }}
              {{ $t("basket.uah") }}
            </h2>
          </div>
        </div>
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
import { getMovieImagePath } from "@/helpers/image_helper";

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
    getMovieImagePath,
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
.order {
  width: 40%;
  margin: 30px 20px 40px;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 50px;
}

.section-title {
  color: white;
  padding: 5px;
  font-size: 1.1vw;
  text-align: center;
}

.movie-name {
  font-size: 18px;
  font-weight: bold;
}

.movie-image {
  height: auto;
  width: 20%;
  margin-bottom: 10px;
}

.seat-info {
  margin: 5px 0;
  font-size: 1vw;
}

.product,
.souvenir {
  margin: 25px 0 25px 15px;
  font-size: 1vw;
}

.total-price {
  font-weight: bold;
  font-size: 1.2vw;
  background-color: #080c14;
  padding: 20px;
  border-radius: 15px;
  border: 1px solid #4d7cbc;
}
.movie-info {
  margin-left: 20px;
}
</style>
