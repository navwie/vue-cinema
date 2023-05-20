<template>
  <div class="cont m-auto">
    <h2>Корзина</h2>
    <div class="d-flex">
      <img style="width: 4%" :src="image" alt="" />
      <p class="text">Квитки</p>
    </div>
    <hr />
    <div
      style="
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      "
      class="mb-5"
    >
      <div
        style="
          border: 1px solid #4d7cbc;
          background-color: #080c14;
          padding: 20px;
          border-radius: 20px;
        "
        v-for="movie in getMovieTickets"
        :key="movie"
      >
        <div style="width: 100%">
          <div class="d-flex justify-content-between">
            <div class="d-flex ticket-info" style="width: 40%">
              <img :src="marker" style="width: 20%" alt="" />
              <p>{{ movie.session.hall.name }}</p>
            </div>
            <div class="d-flex ticket-info" style="width: 40%">
              <img :src="clock" alt="" />
              <p>{{ momentTime(movie.session.date_time) }}</p>
            </div>
            <div class="d-flex ticket-info" style="width: 40%">
              <img :src="calendar" alt="" />
              <p>{{ momentDate(movie.session.date_time) }}</p>
            </div>
          </div>
          <div>
            <div class="d-flex mt-5">
              <div>
                <img
                  :src="getImagePath(movie.session.movies[0].image_path)"
                  class="img-fluid ticket-info-image"
                  alt=""
                />
                <p style="font-weight: 700">
                  {{ movie.session.movies[0].name }}
                </p>
              </div>
              <div>
                <div>
                  <div
                    v-for="place in movie.places"
                    :key="place"
                    class="places"
                  >
                    <div>
                      <div v-if="place.type === 'vip'" class="d-flex vip-info">
                        <img :src="quen" class="img-vip" alt="" />
                        <h6>VIP</h6>
                      </div>
                      <div class="d-flex mb-3">
                        <p>
                          {{ place.seat }} <strong>місце </strong
                          >{{ place.row }} <strong>ряд</strong>
                          {{ place.price }}
                          <strong>грн.</strong>
                        </p>
                        <button
                          @click="deletePlace(place)"
                          style="
                            background-color: transparent;
                            color: white;
                            font-size: 1.4vw;
                            margin-top: -14px;
                            margin-left: 22px;
                            border: none;
                          "
                        >
                          X
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h2 class="mt-3 d-flex justify-content-end" style="font-size: 1.3vw">
            Загальна сума: {{ getFullPriceMovie(movie.places) }}
            <span style="color: #4d7cbc">грн</span>
          </h2>
        </div>
      </div>
    </div>
    <div class="d-flex">
      <img style="width: 4%" :src="imageProduct" alt="" />
      <p class="text">Кафе товари</p>
    </div>
    <hr />
    <div class="mt-5 mb-5" v-if="getProductItems.length > 0">
      <div class="d-flex" v-for="product in getProductItems" :key="product">
        <div
          class="d-flex justify-content-between w-75 mb-5"
          style="
            border: 1px solid #4d7cbc;
            background-color: #080c14;
            border-radius: 20px;
            padding: 20px;
          "
        >
          <h2 style="font-size: 1.2vw">{{ product.name }}</h2>
          <div style="width: 30%" class="d-flex justify-content-between">
            <div class="d-flex align-items-center">
              <button
                style="background-color: transparent; border: none"
                @click="addToBasketHandler(product.id, 'remove')"
              >
                <img src="../../assets/images/icons8-минус.png" alt="" />
              </button>
              <div
                class="card-quantity"
                style="
                  font-size: 1.3vw;
                  padding-left: 10px;
                  padding-right: 10px;
                "
                v-if="getCartQuantity(product.id)"
              >
                {{ getCartQuantity(product.id) }}
              </div>
              <button
                style="background-color: transparent; border: none"
                @click="addToBasketHandler(product.id, 'add')"
              >
                <img src="../../assets/images/icons8-плюс.png" alt="" />
              </button>
            </div>
            <h2 style="font-size: 1.2vw">
              {{ getPriceProducts(product.id) }}
              <span style="color: #4d7cbc">грн</span>
            </h2>
          </div>
        </div>
        <button
          @click="deleteProduct(product)"
          style="
            background-color: transparent;
            color: white;
            font-size: 1.4vw;
            margin-top: -50px;
            margin-left: 22px;
            border: none;
          "
        >
          X
        </button>
      </div>
    </div>
    <div v-else>
      <h2>Ви не обрали жодного товару</h2>
    </div>
    <div class="d-flex">
      <img style="width: 4%" :src="imageSouvenir" alt="" />
      <p class="text">Сувеніри</p>
    </div>
    <hr />
    <div v-if="getSouvenirItems.length > 0">
      <div class="d-flex" v-for="souvenir in getSouvenirItems" :key="souvenir">
        <div
          class="d-flex justify-content-between w-75 mb-5"
          style="
            border: 1px solid #4d7cbc;
            background-color: #080c14;
            border-radius: 20px;
            padding: 20px;
          "
        >
          <div class="d-flex">
            <img
              style="width: 200px"
              :src="getImagePath(souvenir.picture)"
              alt=""
            />
            <h2
              style="
                margin-bottom: 40px;
                position: relative;
                top: 78px;
                font-size: 1.1vw;
                left: 30px;
              "
            >
              {{ souvenir.name }}
            </h2>
          </div>
          <div class="d-flex" style="width: 18%">
            <div class="d-flex justify-content-between">
              <div class="d-flex align-items-center">
                <button
                  style="background-color: transparent; border: none"
                  @click="changeAmountSouvenir(souvenir.id, 'remove')"
                >
                  <img src="../../assets/images/icons8-минус.png" alt="" />
                </button>
                <div
                  class="card-quantity"
                  style="
                    font-size: 1.3vw;
                    padding-left: 10px;
                    padding-right: 10px;
                  "
                  v-if="getCartQuantitySouvenir(souvenir.id)"
                >
                  {{ getCartQuantitySouvenir(souvenir.id) }}
                </div>
                <button
                  style="background-color: transparent; border: none"
                  @click="changeAmountSouvenir(souvenir.id, 'add')"
                >
                  <img src="../../assets/images/icons8-плюс.png" alt="" />
                </button>
              </div>
              <div style="position: relative; right: 20px; top: 180px">
                <h2 style="font-size: 1.1vw">
                  {{ getPriceSouvenirs(souvenir.id) }}
                  <span style="color: #4d7cbc">грн</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
        <button
          @click="deleteSouvenir(souvenir)"
          style="
            background-color: transparent;
            color: white;
            font-size: 1.4vw;
            margin-top: -50px;
            margin-left: 22px;
            border: none;
          "
        >
          X
        </button>
      </div>
    </div>
    <div v-else>
      <h2>Ви не обрали жодного товару</h2>
    </div>
    <div class="d-flex mt-5">
      <img style="width: 4%" src="../../assets/images/order.png" alt="" />
      <p class="text">Сума до сплати</p>
    </div>
    <hr />
    <div class="mb-5 d-flex justify-content-between">
      <div
        class="d-flex justify-content-between"
        style="
          border: 1px solid #4d7cbc;
          width: 75%;
          border-radius: 20px;
          padding: 20px;
        "
      >
        <p>Повна сума до сплати становить:</p>
        <p>{{ getFullPriceForPay() }}грн</p>
      </div>
      <button
        @click="$router.push(`/payment-page`)"
        style="
          background-color: #ffffff;
          color: #4d7cbc;
          border-radius: 20px;
          border: 1px solid #4d7cbc;
          height: 70px;
          font-size: 1.1vw;
          width: 15%;
        "
      >
        Перейти до сплати
      </button>
    </div>
  </div>
</template>

<script>
import image from "@/assets/images/tickets.png";
import imageSouvenir from "@/assets/images/souvenir.png";
import imageProduct from "@/assets/images/eda.png";
import marker from "@/assets/images/marker.png";
import calendar from "@/assets/images/calendar.png";
import clock from "@/assets/images/clock.png";
import quen from "@/assets/images/quen.png";
import moment from "moment";
import { createOrder } from "@/api/api_request";
import { mapGetters } from "vuex";

export default {
  name: "BuyTicket",
  data() {
    return {
      session: null,
      places: [],
      totalPriceForPay: "",
      image,
      imageSouvenir,
      imageProduct,
      calendar,
      clock,
      quen,
      marker,
    };
  },
  computed: {
    ...mapGetters({
      getUserId: "auth/getUserId",
    }),
    ...mapGetters(["getMovieTickets"]),
    ...mapGetters(["getProductItems"]),
    ...mapGetters(["getSouvenirItems"]),
  },
  methods: {
    getFullPriceMovie(seats) {
      let totalPrice = 0;
      for (const seat of seats) {
        totalPrice += seat.price;
      }
      return totalPrice;
    },
    getCartQuantity(productId) {
      const cartItem = this.getProductItems.find(
        (item) => item.id === productId
      );
      if (cartItem) {
        return cartItem.quantity;
      }
      return 0;
    },
    getFullPriceForPay() {
      let totalPrice = 0;
      this.getMovieTickets.forEach((movie) => {
        movie.places.forEach((place) => {
          totalPrice += place.price;
        });
      });
      this.getSouvenirItems.forEach((souvenir) => {
        totalPrice += souvenir.price;
      });
      this.getProductItems.forEach((product) => {
        totalPrice += product.price;
      });
      this.totalPriceForPay = totalPrice;
      return totalPrice;
    },
    getPriceProducts(productId) {
      const cartItem = this.getProductItems.find(
        (item) => item.id === productId
      );
      if (cartItem) {
        return cartItem.price;
      }
      return 0;
    },
    getPriceSouvenirs(souvenirId) {
      const cartItem = this.getSouvenirItems.find(
        (item) => item.id === souvenirId
      );
      if (cartItem) {
        return cartItem.price;
      }
      return 0;
    },
    addToBasketHandler(productId, action) {
      if (action === "add") {
        const cartItem = this.getProductItems.find(
          (item) => item.id === productId
        );
        let productOnePrice = cartItem.price / cartItem.quantity;
        cartItem.quantity++;
        cartItem.price = cartItem.price + productOnePrice;
      } else if (action === "remove") {
        const cartItemIndex = this.getProductItems.findIndex(
          (item) => item.id === productId
        );
        if (cartItemIndex !== -1) {
          const cartItem = this.getProductItems[cartItemIndex];
          let productOnePrice = cartItem.price / cartItem.quantity;
          cartItem.quantity--; // Уменьшаем количество товара на 1
          cartItem.price = cartItem.price - productOnePrice;
          if (cartItem.quantity === 0) {
            this.getProductItems.splice(cartItemIndex, 1); // Если количество стало 0, удаляем товар из корзины
          }
        }
      }
    },
    getCartQuantitySouvenir(id) {
      const cartItem = this.getSouvenirItems.find((item) => item.id === id);
      if (cartItem) {
        return cartItem.quantity;
      }
      return 0;
    },
    changeAmountSouvenir(id, action) {
      if (action === "add") {
        const cartItem = this.getSouvenirItems.find((item) => item.id === id);
        let productOnePrice = cartItem.price / cartItem.quantity;
        cartItem.quantity++;
        cartItem.price = cartItem.price + productOnePrice;
      } else if (action === "remove") {
        const cartItemIndex = this.getSouvenirItems.findIndex(
          (item) => item.id === id
        );
        if (cartItemIndex !== -1) {
          const cartItem = this.getSouvenirItems[cartItemIndex];
          let productOnePrice = cartItem.price / cartItem.quantity;
          cartItem.quantity--; // Уменьшаем количество товара на 1
          cartItem.price = cartItem.price - productOnePrice;
          if (cartItem.quantity === 0) {
            this.getSouvenirItems.splice(cartItemIndex, 1);
          }
        }
      }
    },
    momentDate: function (date) {
      return moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
    },
    getImagePath: function (imagePath) {
      return `http://localhost/storage/${imagePath}`;
    },
    momentTime: function (date) {
      return moment(date, "YYYY-MM-DD, h:mm").locale("uk").format("HH:mm");
    },
    deletePlace(place) {
      this.getMovieTickets.forEach((movie_place) => {
        const index = movie_place.places.findIndex((item) => {
          return item.id === place.id;
        });
        movie_place.places.splice(index, 1);
      });
    },
    deleteSouvenir(souvenir) {
      const indexObj = this.getSouvenirItems.forEach((item) => {
        return item.id === souvenir.id;
      });
      this.getSouvenirItems.splice(indexObj, 1);
    },
    deleteProduct(product) {
      const indexObj = this.getProductItems.forEach((item) => {
        return item.id === product.id;
      });
      this.getProductItems.splice(indexObj, 1);
    },
    createOrder() {
      let price = 0;
      this.places.forEach((place) => {
        price += place.price;
      });
      let seats = this.places.map((place) => place.id);
      createOrder({
        user_id: this.getUserId,
        session_id: this.session.id,
        price: price,
        seats: seats,
      }).then(() => {
        localStorage.setItem("selected_seats", "");
      });
    },
  },
};
</script>

<style scoped>
.cont {
  position: relative;
  top: 40px;
  width: 90%;
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
  height: 300px;
  min-width: 100%;
  border-radius: 20px;
}
.places p {
  border: 1px solid #4d7cbc;
  border-radius: 20px;
  background-color: #080c14;
  position: relative;
  top: 0;
  width: 400px;
  font-size: 20px;
  padding: 10px 0 10px 30px;
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
