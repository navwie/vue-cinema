<template>
  <div class="cont m-auto">
    <div class="d-flex">
      <img src="../../assets/images/popcorn_drink.png" alt="" />
      <p :class="this.getDarkTheme ? 'dark_text' : 'light_text'">
        {{ $t("main.cafe") }}
      </p>
    </div>
    <hr />
    <section>
      <img
        style="width: 100%; margin-top: 30px"
        src="../../assets/images/Cafe_popconr_type.png"
        alt=""
      />
      <p>
        <a @click="$router.push(`/menu/type/popcorn`)">{{
          $t("types_product.popcorn")
        }}</a>
      </p>
    </section>
    <section>
      <img
        style="width: 100%"
        src="../../assets/images/Cafe_desert_type.png"
        alt=""
      />
      <p>
        <a @click="$router.push(`/menu/type/dessert`)">{{
          $t("types_product.desserts")
        }}</a>
      </p>
    </section>
    <section>
      <img
        style="width: 100%"
        src="../../assets/images/Cafe_crips_type.png"
        alt=""
      />
      <p>
        <a @click="$router.push(`/menu/type/chips`)">{{
          $t("types_product.chips")
        }}</a>
      </p>
    </section>
    <section>
      <img
        style="width: 100%"
        src="../../assets/images/Cafe_drink_type.png"
        alt=""
      />
      <p>
        <a @click="$router.push(`/menu/type/drink`)">{{
          $t("types_product.drinks")
        }}</a>
      </p>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CafePage",
  computed: {
    ...mapGetters(["getDarkTheme"]),
    ...mapGetters({
      getCafeId: "auth/getCafeId",
    }),
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
</style>
