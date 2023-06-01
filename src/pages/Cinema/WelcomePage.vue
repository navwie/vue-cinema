<template>
  <section id="section1" ref="section1">
    <img
      src="../../assets/images/section1-backimage.png"
      alt="Logo"
      class="full-width"
      v-if="getDarkTheme"
    />
    <img
      src="../../assets/images/welcome_light.png"
      alt="Logo"
      class="full-width"
      v-if="!getDarkTheme"
    />
    <div class="d-flex justify-content-between">
      <div class="section-info w-100">
        <h1
          :class="
            this.getDarkTheme
              ? 'section-title_dark_text'
              : 'section-title_light_text'
          "
        >
          {{ $t("welcome.cinema") }}
        </h1>
        <h2 class="section-title">MovieWorld</h2>
        <p
          :class="
            this.getDarkTheme
              ? 'section-title_dark_text'
              : 'section-title_light_text'
          "
        >
          {{ $t("welcome.welcome_text") }}
        </p>
        <button class="section-button">{{ $t("table.details") }}</button>
      </div>
      <img
        src="../../assets/images/popcorn-image.png"
        class="popcorn-image"
        alt="Logo"
      />
    </div>
  </section>
  <section id="section2" class="m-auto">
    <div class="d-flex">
      <img
        src="../../assets/images/world-news.png"
        alt=""
        class="icon mt-5 img-fluid"
      />
      <p :class="this.getDarkTheme ? 'dark_text' : 'light_text'" class="mt-5">
        {{ $t("welcome.weekly_news") }}
      </p>
    </div>
    <hr />
    <div>
      <div
        v-for="(news, index) in this.news.slice(0, 3)"
        :key="index"
        class="news d-flex justify-content-between"
      >
        <div class="p">
          <p style="font-size: 1.5vw; font-weight: 700">{{ news.title }} ...</p>
          <p style="font-size: 1.3vw; text-decoration: underline">
            {{ momentDate(news.created_at) }}
          </p>
        </div>
        <button @click="$router.push(`/news`)">
          {{ $t("welcome.read_more") }}
        </button>
      </div>
    </div>
    <div class="text-center">
      <button @click="$router.push(`/news`)">
        {{ $t("welcome.read_more_about_news") }}
      </button>
    </div>
  </section>
  <section id="section3" class="m-auto">
    <div class="d-flex">
      <img
        src="../../assets/images/recommended.png"
        alt=""
        class="icon mt-5 img-fluid"
      />
      <p :class="this.getDarkTheme ? 'dark_text' : 'light_text'" class="mt-5">
        {{ $t("welcome.recommendation") }}
      </p>
    </div>
    <hr />
    <Carousel
      :items-to-show="4"
      :items-to-scroll="4"
      :wrap-around="true"
      :snap-align="'start'"
    >
      <Slide v-for="(movie, index) in recommendedMovie" :key="index">
        <div
          :class="
            this.getDarkTheme
              ? 'dark_carousel__item futurefilm'
              : 'light_carousel__item futurefilm'
          "
          class="carousel-info"
        >
          <div class="carousel-image">
            <a style="cursor: auto" @click="$router.push(`/movie/${movie.id}`)">
              <img :src="getImagePath(movie.image_path)" class="" alt="" />
            </a>
          </div>
          <div class="carousel-title">
            <a
              style="cursor: auto"
              @click="$router.push(`/movie/${movie.id}`)"
              >{{ movie.name }}</a
            >
          </div>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </section>
  <section id="section4" class="m-auto">
    <div class="d-flex">
      <img
        src="../../assets/images/feature.png"
        alt=""
        class="icon mt-5 img-fluid"
      />
      <p :class="this.getDarkTheme ? 'dark_text' : 'light_text'" class="mt-5">
        {{ $t("welcome.advantages") }}
      </p>
    </div>
    <hr />
    <div id="carouselExample" class="carousel slide">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="../../assets/images/proposition1.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
        <div class="carousel-item">
          <img
            src="../../assets/images/proposition2.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
        <div class="carousel-item">
          <img
            src="../../assets/images/proposition3.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
        <div class="carousel-item">
          <img
            src="../../assets/images/proposition4.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </section>
  <section id="section5" class="m-auto">
    <div class="d-flex">
      <img
        src="../../assets/images/survey.png"
        alt=""
        class="icon mt-5 img-fluid"
      />
      <p :class="this.getDarkTheme ? 'dark_text' : 'light_text'" class="mt-5">
        {{ $t("welcome.social") }}
      </p>
    </div>
    <hr />
    <div class="d-flex justify-content-between">
      <img src="../../assets/images/question.png" alt="" />
      <div class="section5-info" style="width: 50%">
        <p>
          {{ $t("welcome.poll_text") }}
        </p>
        <button @click="redirection">{{ $t("welcome.poll") }}</button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { getNews, getPopularMovies } from "@/api/api_request";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import moment from "moment/moment";

export default {
  name: "WelcomePage",
  components: { Slide, Navigation, Carousel },
  data() {
    return {
      recommendedMovie: [],
      news: [],
      propositions: [
        {
          imagePath: "../../assets/images/proposition1.jpg",
        },
        {
          imagePath: "../../assets/images/proposition2.jpg",
        },
        {
          imagePath: "../../assets/images/proposition3.jpg",
        },
        {
          imagePath: "../../assets/images/proposition4.jpg",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["getDarkTheme"]),
    ...mapGetters({
      isAuth: "auth/isAuth",
    }),
  },
  methods: {
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
    getImagePath: function (imagePath) {
      return `http://localhost/storage/${imagePath}`;
    },
    redirection: function () {
      console.log(this.isAuth);
      if (this.isAuth) {
        this.$router.push("/voting");
      } else {
        this.$swal({
          icon: "error",
          color: "#000",
          title: this.$t("something_went_wrong.not_authorized"),
          text: this.$t("something_went_wrong.text_not_authorized"),
          timer: 4000,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          timerProgressBar: true,
        });
      }
    },
  },
  beforeMount() {
    this.loading = true;
    getPopularMovies({
      amount: 10,
      period: "twoWeeks",
    }).then((response) => {
      this.recommendedMovie = response.data;
    });
    getNews().then((response) => {
      this.news = response.data.news.data;
    });
  },
};
</script>

<style scoped>
.section-title_dark_text {
  color: white;
}
.section-title_light_text {
  color: black;
}
.icon {
  width: 60px;
  height: 30%;
}
hr {
  border: none;
  height: 3px;
  color: #4d7cbc;
  margin-bottom: 30px;
  background-color: #4d7cbc;
}
p {
  font-size: 20px;
}
.news .p {
  border: 1px solid #4d7cbc;
  border-radius: 20px;
  padding: 10px;
  font-size: 1.2vw;
  width: 80%;
}
.news {
  margin-bottom: 10px;
}
.news button {
  border: 1px solid #4d7cbc;
  border-radius: 30px;
  background-color: #000;
  width: 10%;
  color: white;
  height: 50px;
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
.full-width {
  display: block;
  width: 100%;
  max-height: 100vh;
  height: 100vh;
  min-height: 100vh;
  object-fit: cover;
}

.section-info {
  margin-top: -650px;
  margin-left: 200px;
}

.section-info h1 {
  font-size: 3.5vw;
}
.section-info h2 {
  font-size: 3.5vw;
  margin-bottom: 29px;
}

.section-info p {
  text-align: justify;
  font-size: 1.2vw;
  margin-bottom: 29px;
}
.carousel-info {
  position: relative;
  padding: 30px;
}
.carousel-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}
.carousel-title a {
  margin-top: 5px;
  font-size: 1vw;
  color: white;
  text-decoration: none;
}

.carousel-title a:hover {
  margin-top: 5px;
  color: white;
  text-decoration: underline;
}

.popcorn-image {
  margin-top: -750px;
  margin-left: 100px;
  width: 50%;
}
.section-button {
  background-color: #fff;
  color: #4d7cbc;
  font-size: 1.2vw;
  padding: 10px;
  margin-left: 80px;
  width: 250px;
  border: 1px solid #4d7cbc;
  border-radius: 20px;
}

#section2,
#section3,
#section4,
#section5 {
  width: 90%;
}

#section2 button {
  border: 1px solid #4d7cbc;
  border-radius: 30px;
  background-color: #fff;
  font-size: 1.2vw;
  padding: 10px;
  color: #4d7cbc;
  height: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.section5-info p {
  text-align: justify;
  border: 1px solid #4d7cbc;
  padding: 30px;
  border-radius: 20px;
}
.section5-info button {
  background-color: #fff;
  color: #4d7cbc;
  border-radius: 20px;
  width: 20%;
  padding: 10px 20px;
  margin-left: 350px;
  font-size: 1vw;
}
</style>
