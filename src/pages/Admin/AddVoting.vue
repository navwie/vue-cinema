<template>
  <div class="container">
    <div class="d-flex" style="position: relative; top: 20px">
      <img
        src="../../assets/images/survey.png"
        alt=""
        class="icon mt-5 img-fluid"
      />
      <p :class="this.getDarkTheme ? 'dark_text' : 'light_text'" class="mt-5">
        {{ $t("addnewproduct.title_voting") }}
      </p>
    </div>
    <hr />
    <h2 v-if="isComplete === true" style="color: red">
      Ви не можете додати нове опитування доки триває опитування на : "{{
        this.actualQuiz[0].name
      }}"
    </h2>
    <div class="mt-5" v-if="isComplete === true">
      <div
        class="d-flex mb-4"
        v-for="question in actualQuiz[0].questions"
        :key="question"
      >
        <img
          style="width: 150px; object-fit: cover; height: 200px"
          :src="getImagePath(question.movie.image_path)"
          alt=""
        />
        <div>
          <h2 style="margin-left: 20px">
            {{ question.movie.name }}
          </h2>
          <h2 style="margin-left: 20px; font-size: 1.1vw; color: red">
            Отримано голосів: {{ question.votes }}
          </h2>
        </div>
      </div>
    </div>
    <form
      v-if="isComplete === false"
      class="form m-auto container"
      @submit.prevent
    >
      <div class="m-auto form-element">
        <div>
          <input
            v-model="form.title"
            style="
              width: 60%;
              background-color: #fff;
              color: #4d7cbc;
              border: 1px solid #4d7cbc;
              border-radius: 26px;
              padding: 18px 15px;
              margin-top: 10px;
            "
            type="text"
            :placeholder="$t(`addnewproduct.name`)"
          />
        </div>
        <div>
          <input
            v-model="form.date_finish"
            style="
              width: 60%;
              background-color: #fff;
              color: #4d7cbc;
              border: 1px solid #4d7cbc;
              border-radius: 26px;
              padding: 18px 15px;
              margin-top: 10px;
            "
            type="date"
            placeholder="Дата окончания"
          />
        </div>
        <div>
          <Multiselect
            v-model="form.selected"
            mode="tags"
            style="width: 60%; color: black"
            :close-on-select="false"
            :searchable="true"
            placeholder="Movies"
            :options="this.totalMovies"
            class="multiselect-beige mt-3"
          />
        </div>
        <div>
          <MyButton class="butn" type="submit" @click="submit">
            {{ $t("addnewproduct.add") }}
          </MyButton>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  createQuestion,
  createQuiz,
  getMovies,
  getQuizes,
} from "@/api/api_request";
import MyButton from "@/components/UI/MyButton.vue";
import Multiselect from "@vueform/multiselect";

export default {
  name: "AddVoting",
  components: { MyButton, Multiselect },
  computed: {
    ...mapGetters(["getDarkTheme"]),
  },
  data() {
    return {
      form: {
        title: "",
        selected: [],
        date_finish: "",
      },
      isComplete: false,
      totalMovies: [],
      actualQuiz: [],
      quizId: "",
    };
  },
  methods: {
    submit() {
      createQuiz({
        name: this.form.title,
        end: this.form.date_finish,
      })
        .then((response) => {
          this.quizId = response.data.quiz.id;
        })
        .then(() => {
          this.form.selected.forEach((movie) => {
            createQuestion({
              quiz_id: this.quizId,
              movie_id: movie,
            });
          });
        });
    },
    getImagePath: function (imagePath) {
      return `http://localhost/storage/${imagePath}`;
    },
  },
  beforeMount() {
    getQuizes()
      .then((response) => {
        let quizes = response.data.quizes;
        quizes = quizes.filter((e) => e.completed !== 1);
        this.actualQuiz = quizes;
      })
      .then(() => {
        let flag = false;
        if (this.actualQuiz.length > 0) {
          flag = true;
        }
        this.isComplete = flag;
      });
    getMovies().then((response) => {
      let allMovies = response.data.movies.data;
      this.totalMovies = allMovies.filter((e) => e.quizled === 1);
      this.totalMovies = this.totalMovies.map((movie) => ({
        value: movie.id,
        label: movie.name,
      }));
    });
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
hr {
  margin-top: 30px;
  border: none;
  height: 3px;
  color: #4d7cbc;
  background-color: #4d7cbc;
}
.multiselect-beige {
  --ms-bg: #fff;
  --ms-radius: 25px;
  --ms-tag-font-size: 0.8vw;
  --ms-line-height: 2;
  --ms-tag-line-height: 2.3rem;
  --ms-border-color: #4d7cbc;
  --ms-tag-bg: #4d7cbc;
  --ms-placeholder-color: #4d7cbc;
  --ms-option-bg-selected-pointed: #4d7cbc;
  --ms-option-bg-selected: #4d7cbc;
  --ms-dropdown-bg: #fff;
  --ms-group-label-bg: #4d7cbc;
  --ms-tag-color: #ffffff;
  --ms-border-color-active: #4d7cbc;
  --ms-ring-width: 1px;
  --ms-ring-color: #4d7cbc;
  --ms-option-bg-pointed: #4d7cbc;
  --ms-font-size: 1.1vw;
}
p {
  font-size: 20px;
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
.form {
  text-align: center;
  color: white;
  position: relative;
  top: 60px;
}
.form-element {
  border: 1px solid #4d7cbc;
  padding-top: 84px;
  padding-bottom: 80px;
  border-radius: 20px;
}
.input {
  background-color: #fff;
  color: #4d7cbc;
  margin-top: 15px;
  margin-bottom: 15px;
}
.butn {
  margin-top: 20px;
  background-color: #4d7cbc;
  color: white;
  width: 26%;
  border-radius: 20px;
  font-size: 19px;
  font-weight: 500;
}
.butn:hover {
  background-color: #fff;
  color: #4d7cbc;
}
.custom-select {
  margin-top: 15px;
  margin-bottom: 15px;
  width: 60%;
  border: 1px solid #4d7cbc;
  border-radius: 5px;
  padding: 6px 12px;
  font-size: 14px;
  color: #555555;
  background-color: #ffffff;
}
input::placeholder {
  color: #4d7cbc;
  font-size: 18px;
}
.custom-select:focus {
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(77, 124, 188, 0.25);
}
</style>
