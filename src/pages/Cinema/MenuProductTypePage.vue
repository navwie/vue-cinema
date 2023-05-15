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
      <ProductList :products="products" />
    </section>
  </div>
</template>

<script>
import { getProducts } from "@/api/api_request";
import ProductList from "@/components/ComponentLists/ProductList.vue";
import { mapGetters } from "vuex";

export default {
  name: "MenuProductTypePage",
  components: { ProductList },
  data() {
    return {
      products: [],
    };
  },
  computed: {
    ...mapGetters(["getDarkTheme"]),
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
</style>
