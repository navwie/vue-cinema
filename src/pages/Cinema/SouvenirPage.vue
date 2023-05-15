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
import SouvenirList from "@/components/ComponentLists/SouvenirList.vue";
import { getSouvenirs } from "@/api/api_request";

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
    getSouvenirs().then((response) => {
      this.souvenirs = response.data.souvenirs.data;
      console.log(this.souvenirs);
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
</style>
