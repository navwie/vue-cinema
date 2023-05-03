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
      <SouvenirList :souvenirs="souvenirs" />
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SouvenirList from "@/components/SouvenirList.vue";

export default {
  name: "SouvenirPage",
  components: { SouvenirList },
  data() {
    return {
      souvenirs: [],
    };
  },
  computed: {
    ...mapGetters(["getDarkTheme"]),
  },
  beforeMount() {
    for (let i = 0; i < 10; i++) {
      const souvenir = {
        name: `Кружка "Форсаж 10"`,
        price: `223`,
        image:
          "https://images.prom.ua/2936367658_w640_h640_kruzhka-geekland-forsazh.jpg",
        amount: `41`,
      };
      this.souvenirs.push(souvenir);
    }
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
</style>
