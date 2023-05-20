<template>
  <div class="cont m-auto">
    <div class="d-flex">
      <img
        v-if="this.$route.params.param === 'popcorn'"
        src="../../assets/images/product-popcorn.png"
        alt=""
      />
      <img
        v-else-if="this.$route.params.param === 'chips'"
        src="../../assets/images/product-chip.png"
        alt=""
      />
      <img
        v-else-if="this.$route.params.param === 'drink'"
        src="../../assets/images/product-drink.png"
        alt=""
      />
      <img v-else src="../../assets/images/product-dessert.png" alt="" />
      <p :class="this.getDarkTheme ? 'dark_text' : 'light_text'">
        {{
          this.$route.params.param === "popcorn"
            ? $t("types_product.popcorn")
            : this.$route.params.param === "chips"
            ? $t("types_product.chips")
            : this.$route.params.param === "drink"
            ? $t("types_product.drinks")
            : $t("types_product.desserts")
        }}
      </p>
    </div>
    <hr />
    <section class="section-grid">
      <div v-for="product in products" :key="product">
        <div class="card">
          <div class="card-image">
            <img
              v-if="this.$route.params.param === 'popcorn'"
              src="../../assets/images/product-item-popcorn.png"
              alt=""
            />
            <img
              v-else-if="this.$route.params.param === 'chips'"
              src="../../assets/images/product-item-chips.jpg"
              alt=""
            />
            <img
              v-else-if="this.$route.params.param === 'drink'"
              src="../../assets/images/product-item-drink.avif"
              alt=""
            />
            <img
              v-else
              src="../../assets/images/product-item-dessert.jpg"
              alt=""
            />
          </div>
          <div class="card-name">{{ product.name }}</div>
          <hr />
          <div class="d-flex justify-content-between">
            <div class="card-price">
              {{ $t("table.price") }}: <span>{{ product.price }}</span>
            </div>
            <div v-if="!getCartQuantity(product.id)">
              <button @click="addToBasketHandler(product.id, 'add')">
                <img src="../../assets/images/корзина.png" alt="" />
              </button>
            </div>
            <div v-else>
              <div class="d-flex align-items-center">
                <button @click="addToBasketHandler(product.id, 'remove')">
                  <img src="../../assets/images/icons8-минус.png" alt="" />
                </button>
                <div class="card-quantity" v-if="getCartQuantity(product.id)">
                  {{ getCartQuantity(product.id) }}
                </div>
                <button @click="addToBasketHandler(product.id, 'add')">
                  <img src="../../assets/images/icons8-плюс.png" alt="" />
                </button>
              </div>
              <div
                class="card-quantity mt-4"
                v-if="getCartQuantity(product.id)"
              >
                {{ $t("table.price") }}:
                <span>{{ getCartQuantity(product.id) * product.price }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getProducts } from "@/api/api_request";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "MenuProductTypePage",
  data() {
    return {
      products: [],
      addToBasket: [],
    };
  },
  computed: {
    ...mapGetters(["getDarkTheme", "getProductItems"]),
  },
  methods: {
    ...mapMutations(["setProductToBasket"]),
    getCartQuantity(productId) {
      const item = this.addToBasket.find((item) => item.id === productId);
      return item ? item.quantity : 0;
    },
    addToBasketHandler(productId, action) {
      const index = this.addToBasket.findIndex((item) => item.id === productId);
      const product = this.products.find((p) => p.id === productId);

      if (index === -1 && action === "add") {
        this.addToBasket.push({
          id: productId,
          type: product.type,
          name: product.name,
          quantity: 1,
          price: product.price,
        });
      } else if (action === "add") {
        console.log(index);
        this.addToBasket[index].quantity += 1;
        this.addToBasket[index].price =
          this.addToBasket[index].quantity * product.price;
      } else {
        this.addToBasket[index].quantity -= 1;
        if (this.addToBasket[index].quantity === 0) {
          this.addToBasket.splice(index, 1);
        } else {
          this.addToBasket[index].price =
            this.addToBasket[index].quantity * product.price;
        }
      }
      this.setProductToBasket(this.addToBasket);
    },
  },
  beforeMount() {
    getProducts().then((response) => {
      for (const product of response.data.products) {
        if (product.type === this.$route.params.param) {
          this.products.push(product);
        }
      }
    });
  },
  created() {
    this.addToBasket = this.getProductItems;
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
section p a {
  position: relative;
  bottom: 150px;
  left: 70px;
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 15px;
  font-size: 2.6vw;
  color: white;
}
a:hover {
  text-decoration: underline;
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
.card-quantity {
  font-size: 20px;
}
</style>
