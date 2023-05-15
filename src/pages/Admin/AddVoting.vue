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
    <form class="form m-auto container" @submit.prevent>
      <div class="m-auto form-element">
        <div>
          <MyInput
            v-focus
            v-model="form.title"
            style="width: 60%"
            type="text"
            :placeholder="$t(`addnewproduct.name`)"
          />
        </div>
        <select v-model="form.selected" multiple>
          <option :key="movie.id" v-for="movie in totalMovies">
            {{ movie.name }}
          </option>
        </select>
        <br />
        <span>Выбрано: {{ form.selected }}</span>
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
import { getMovies } from "@/api/api_request";
import MyButton from "@/components/UI/MyButton.vue";

export default {
  name: "AddVoting",
  components: { MyButton },
  computed: {
    ...mapGetters(["getDarkTheme"]),
  },
  data() {
    return {
      form: {
        title: "",
        selected: [],
      },
      totalMovies: [],
    };
  },
  beforeMount() {
    getMovies().then((response) => {
      let allMovies = response.data.movies.data;
      this.totalMovies = allMovies.filter((e) => e.quizled === 1);
    });
  },
};
</script>

<style scoped>
hr {
  margin-top: 30px;
  border: none;
  height: 3px;
  color: #4d7cbc;
  background-color: #4d7cbc;
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
</style>
