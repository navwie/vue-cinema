<template>
  <div class="cont m-auto">
    <div class="d-flex">
      <img src="../../assets/images/world-news.png" alt="" />
      <p :class="this.getDarkTheme ? 'dark_text' : 'light_text'">
        {{ $t("main.shopsouvenirs") }}
      </p>
    </div>
    <hr />
    <section class="section-grid">
      <div v-for="souvenir in souvenirs" :key="souvenir">
        <div class="card">
          <div class="card-image">
            <img
              :src="getImagePath(souvenir.picture)"
              class="img-fluid"
              alt=""
            />
          </div>
          <div class="card-name">{{ souvenir.name }}</div>
          <hr />
          <div class="d-flex justify-content-between">
            <div class="card-price">
              {{ $t("table.price") }}: <span>{{ souvenir.price }}</span>
            </div>
            <div v-if="!getCartQuantity(souvenir.id)">
              <button @click="addToBasketHandler(souvenir.id, 'add')">
                <img src="../../assets/images/корзина.png" alt="" />
              </button>
            </div>
            <div v-else>
              <div class="d-flex align-items-center">
                <button @click="addToBasketHandler(souvenir.id, 'remove')">
                  <img src="../../assets/images/icons8-минус.png" alt="" />
                </button>
                <div class="card-quantity" v-if="getCartQuantity(souvenir.id)">
                  {{ getCartQuantity(souvenir.id) }}
                </div>
                <button @click="addToBasketHandler(souvenir.id, 'add')">
                  <img src="../../assets/images/icons8-плюс.png" alt="" />
                </button>
              </div>
              <div
                class="card-quantity mt-4"
                v-if="getCartQuantity(souvenir.id)"
              >
                {{ $t("table.price") }}:
                <span>{{ getCartQuantity(souvenir.id) * souvenir.price }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getSouvenirs } from "@/api/api_request";
import { mapMutations } from "vuex";

export default {
  name: "SouvenirPage",
  data() {
    return {
      souvenirs: [],
      addToBasket: [],
    };
  },
  computed: {
    ...mapGetters(["getDarkTheme", "getSouvenirItems"]),
  },
  methods: {
    ...mapMutations(["setSouvenirToBasket"]),
    getImagePath: function (imagePath) {
      return `http://localhost/storage/${imagePath}`;
    },
    getCartQuantity(souvenirId) {
      const item = this.addToBasket.find((item) => item.id === souvenirId);
      return item ? item.quantity : 0;
    },
    addToBasketHandler(souvenirId, action) {
      const index = this.addToBasket.findIndex(
        (item) => item.id === souvenirId
      );
      const souvenir = this.souvenirs.find((p) => p.id === souvenirId);

      if (index === -1 && action === "add") {
        this.addToBasket.push({
          id: souvenirId,
          name: souvenir.name,
          picture: souvenir.picture,
          quantity: 1,
          price: souvenir.price,
        });
      } else if (action === "add") {
        this.addToBasket[index].quantity += 1;
        this.addToBasket[index].price =
          this.addToBasket[index].quantity * souvenir.price;
      } else {
        this.addToBasket[index].quantity -= 1;
        this.addToBasket[index].price =
          this.addToBasket[index].quantity * souvenir.price;
        if (this.addToBasket[index].quantity === 0) {
          this.addToBasket.splice(index, 1);
        }
      }
      this.setSouvenirToBasket(this.addToBasket);
    },
  },
  beforeMount() {
    getSouvenirs().then((response) => {
      this.souvenirs = response.data.souvenirs.data;
      console.log(this.souvenirs);
    });
  },
  created() {
    this.addToBasket = this.getSouvenirItems;
  },
};
</script>

<style scoped>
.cont {
  width: 90%;
  position: relative;
  top: 40px;
}
.dark_text {
  opacity: 1;
  color: white;
  position: relative;
  font-weight: 700;
  top: 22px;
  font-size: 27px;
  margin-left: 30px;
}

.light_text {
  opacity: 1;
  color: black;
  position: relative;
  font-weight: 700;
  top: 22px;
  font-size: 27px;
  margin-left: 30px;
}
.card {
  position: relative;
  width: 500px;
  margin: 26px;
  padding: 30px;
  background-color: transparent;
  border-radius: 20px;
  border: 3px solid #4d7cbc;
  box-shadow: 0 0 5px rgb(0 0 0 / 30%);
  box-sizing: border-box;
  height: fit-content;
}
hr {
  color: #4d7cbc;
  height: 6px;
}
.card-image {
  position: relative;
  width: 100%;
  height: 500px;
  padding-bottom: 75%;
  overflow: hidden;
  transition: height 0.3s ease-out;
}

.card-image img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-name {
  color: #fff;
  font-weight: 700;
  text-align: center;
  margin-top: 10px;
  font-size: 20px;
  font-family: "Arsenal", sans-serif;
}
.section-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.card-price {
  color: #fff;
  margin-top: 20px;
  font-size: 22px;
  font-family: "Arsenal", sans-serif;
}
.card-price span {
  margin-left: 10px;
  font-weight: 700;
}
.card button {
  background-color: transparent;
  border: none;
}
.card button img {
  width: 80%;
}
</style>
