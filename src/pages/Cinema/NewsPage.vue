<template>
  <div class="cont m-auto">
    <div class="d-flex">
      <img src="../../assets/images/world-news.png" alt="" />
      <p :class="this.getDarkTheme ? 'dark_text' : 'light_text'">
        {{ $t("main.news_week") }}
      </p>
    </div>
    <hr />
    <div v-for="(news, index) in this.news" :key="index">
      <div class="d-flex news">
        <div>
          <img :src="getNewsImagePath(news.picture)" class="" alt="" />
        </div>
        <div style="margin-left: 30px">
          <p class="news-title">{{ news.title }}</p>
          <p class="news-description">{{ news.description }}</p>
          <p style="font-size: 1.4vw; font-weight: 700; color: red">
            {{ momentDate(news.created_at) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getNews } from "@/api/api_request";
import moment from "moment";
import { getNewsImagePath } from "@/helpers/image_helper";

export default {
  name: "NewsPage",
  computed: {
    ...mapGetters(["getDarkTheme"]),
  },
  methods: {
    getNewsImagePath,
    momentDate: function (date) {
      let locale = localStorage.getItem("locale");
      if (locale === "uk") {
        return moment(date, "YYYY-MM-DD, h:mm")
          .locale(locale)
          .format("MMMM Do YYYY, HH:mm");
      } else {
        return moment(date, "YYYY-MM-DD, h:mm").format("LLL");
      }
    },
  },
  data() {
    return {
      news: [],
    };
  },
  beforeMount() {
    getNews().then((response) => {
      this.news = response.data.news.data;
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

.news {
  border: 1px solid #4d7cbc;
  border-radius: 20px;
  padding: 20px;
  font-size: 1.2vw;
  width: 100%;
  margin-bottom: 40px;
}

.news img {
  width: 400px;
  height: 100%;
  border-radius: 20px;
  object-fit: contain;
}
.news-title {
  font-weight: 700;
  font-size: 1.5vw;
}
.news-description {
  display: none;
  letter-spacing: 2px;
  font-size: 1.3vw;
  text-align: justify;
}

.news-title:hover + .news-description {
  display: block;
}
hr {
  border: none;
  height: 3px;
  color: #4d7cbc;
  margin-bottom: 40px;
  background-color: #4d7cbc;
}
</style>
