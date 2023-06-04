<template>
  <section>
    <img
      src="../../assets/images/weekly_back_light.png"
      alt="Logo"
      class="full-width"
      v-if="getDarkTheme"
    />
    <img
      src="../../assets/images/weekly_back_light.png"
      alt="Logo"
      class="full-width"
      v-if="!getDarkTheme"
    />
    <div class="d-flex justify-content-center">
      <div class="voting-text">
        <h1>{{ $t("voting.weekly") }}</h1>
        <h2>{{ $t("voting.review") }}</h2>
        <h3>{{ $t("voting.old_movie") }}</h3>
      </div>
    </div>
  </section>
  <section class="m-auto" id="section2">
    <div class="d-flex">
      <img
        src="../../assets/images/voting.png"
        alt=""
        class="icon mt-5 img-fluid"
      />
      <p :class="this.getDarkTheme ? 'dark_text' : 'light_text'" class="mt-5">
        {{ quiz.name }}
      </p>
    </div>
    <hr />
    <div v-if="isVoided === true">
      <p style="font-size: 1.5vw; font-weight: bold">
        {{ $t("voting.voting_was_done") }} {{ movieChoisen[0].movie.name }}
      </p>
    </div>
    <div v-if="isVoided === false" class="radio-group">
      <div
        v-for="(option, index) in quiz[0].questions"
        :key="index"
        class="radio-item"
      >
        <input
          type="radio"
          :id="'option-' + index"
          :value="option"
          v-model="selectedOption"
          class="radio-input"
        />
        <label :for="'option-' + index" class="radio-label">{{
          option.movie.name
        }}</label>
      </div>
      <button v-if="isOpen" @click="updateVotes" class="mx-auto">
        {{ $t("voting.vote") }}
      </button>
    </div>
  </section>
  <section class="m-auto" id="section3">
    <div class="d-flex">
      <img
        src="../../assets/images/choosen.png"
        alt=""
        class="icon mt-5 img-fluid"
      />

      <div v-if="isOpen && resultMovie.length > 1">
        <p style="color: red">{{ $t("voting.two_film") }}</p>
        <span
          v-for="movie in resultMovie"
          :key="movie"
          :class="getDarkTheme ? 'dark_text' : 'light_text'"
          class="mt-5"
        >
          {{ movie.movie.name }}
        </span>
      </div>

      <div v-else-if="isOpen && resultMovie.length === 1">
        <p :class="getDarkTheme ? 'dark_text' : 'light_text'" class="mt-5">
          {{ $t("voting.voting_is_continue") }} {{ resultMovie[0].movie.name }}
        </p>
      </div>

      <div v-else>
        <p :class="getDarkTheme ? 'dark_text' : 'light_text'" class="mt-5">
          {{ $t("voting.voting_is_closed") }} Титаник
        </p>
      </div>
    </div>

    <hr />

    <div
      v-for="movie in resultMovie"
      :key="movie"
      class="choosen-film mb-5 m-auto d-flex justify-content-between"
    >
      <img :src="getMovieImagePath(movie.movie.image_path)" alt="" />

      <div class="choosen-film-info">
        <p>{{ movie.movie.description }}</p>

        <button v-if="!isOpen">{{ $t("voting.buy_ticket") }}</button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { getQuizes, updateQuizesQuestion } from "@/api/api_request";
import { getMovieImagePath } from "@/helpers/image_helper";

export default {
  name: "VotingPage",
  data() {
    return {
      quiz: [],
      selectedOption: "",
      isOpen: true,
      resultMovie: [],
      isVoided: false,
      movieChoisen: "",
    };
  },
  computed: {
    ...mapGetters(["getDarkTheme"]),
    ...mapGetters({
      isAuth: "auth/isAuth",
    }),
    ...mapGetters({
      userId: "auth/getUserId",
    }),
  },
  methods: {
    getMovieImagePath,
    updateVotes() {
      updateQuizesQuestion(this.selectedOption.id, {
        movie_id: this.selectedOption.movie.id,
        user_id: this.userId,
        votes: this.selectedOption.votes + 1,
      }).then(() => {
        this.$swal({
          icon: "success",
          color: "#000",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          timer: 4000,
          timerProgressBar: true,
        }).then(() => {
          location.reload();
        });
      });
    },
  },
  beforeMount() {
    getQuizes()
      .then((response) => {
        this.quiz = response.data.quizes.filter((el) => el.completed === 0);
        let maxVotes = -1;
        let maxVotesQuestions = [];
        for (const question of this.quiz[0].questions) {
          if (question.votes > maxVotes) {
            maxVotes = question.votes;
            maxVotesQuestions = [question];
          } else if (question.votes === maxVotes) {
            maxVotesQuestions.push(question);
          }
        }
        this.resultMovie = maxVotesQuestions;
      })
      .then(() => {
        let id = localStorage.getItem("userId");
        let flag = false;
        let user = this.quiz[0].users.filter((e) => e.id === Number(id));
        if (user.length > 0) {
          flag = true;
        }
        this.isVoided = flag;

        let choice = user[0].pivot.question_id;
        console.log(choice);
        console.log(choice);
        this.movieChoisen = this.quiz[0].questions.filter(
          (e) => e.id === choice
        );
      });
  },
};
</script>

<style scoped>
.full-width {
  display: block;
  width: 100%;
  max-height: 100vh;
  height: 100vh;
  min-height: 100vh;
  object-fit: cover;
}
.voting-text {
  margin-top: -600px;
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
p {
  font-size: 20px;
}
#section2,
#section3 {
  width: 80%;
  margin-top: 40px;
  margin-bottom: 20px;
}
h1,
h2,
h3 {
  font-size: 3vw;
  letter-spacing: 13px;
  color: black;
  text-shadow: 2px 2px 4px #4d7cbc;
}
h2 {
  margin-left: 60px;
}
.radio-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px;
}

.radio-item {
  display: flex;
  align-items: center;
  margin-bottom: 35px;
}

.radio-input {
  opacity: 0;
  position: absolute;
  margin-right: 10px;
}

.radio-label {
  position: relative;
  padding-left: 80px;
  cursor: pointer;
  font-size: 1.5vw;
  color: #ffffff;
}

.radio-label:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #4d7cbc;
  background-color: #ffffff;
}

.radio-input:checked + .radio-label:before {
  background-color: #4d7cbc;
}

.radio-label:hover:before {
  border-color: #fff;
}

.choosen-film {
  width: 80%;
}

.choosen-film img {
  width: 25%;
}
.choosen-film-info {
  margin-left: 30px;
}
.choosen-film-info p {
  text-align: justify;
  font-size: 1.3vw;
  letter-spacing: 2px;
}
.choosen-film-info button {
  font-size: 1vw;
  letter-spacing: 2px;
  border: 1px solid #4d7cbc;
  color: #4d7cbc;
  background-color: #fff;
  border-radius: 20px;
  padding: 10px;
  margin-left: 330px;
}

.radio-group button {
  font-size: 1vw;
  letter-spacing: 2px;
  border: 1px solid #4d7cbc;
  color: #4d7cbc;
  background-color: #fff;
  border-radius: 20px;
  padding: 10px;
}
</style>
