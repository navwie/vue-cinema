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
        {{ $t("voting.voting") }} 29.04.2023
      </p>
    </div>
    <hr />
    <div class="radio-group">
      <div v-for="(option, index) in options" :key="index" class="radio-item">
        <input
          type="radio"
          :id="'option-' + index"
          :value="option"
          v-model="selectedOption"
          class="radio-input"
        />
        <label :for="'option-' + index" class="radio-label">{{ option }}</label>
      </div>
      <button v-if="isOpen" class="mx-auto">Голосувати</button>
    </div>
  </section>
  <section class="m-auto" id="section3">
    <div class="d-flex">
      <img
        src="../../assets/images/choosen.png"
        alt=""
        class="icon mt-5 img-fluid"
      />
      <p
        v-if="isOpen"
        :class="this.getDarkTheme ? 'dark_text' : 'light_text'"
        class="mt-5"
      >
        {{ $t("voting.voting_is_continue") }} Титаник
      </p>
      <p
        v-else
        :class="this.getDarkTheme ? 'dark_text' : 'light_text'"
        class="mt-5"
      >
        {{ $t("voting.voting_is_closed") }} Титаник
      </p>
    </div>
    <hr />
    <div class="choosen-film m-auto d-flex justify-content-between">
      <img
        src="https://upload.wikimedia.org/wikipedia/ru/1/19/Titanic_%28Official_Film_Poster%29.png"
        alt=""
      />
      <div class="choosen-film-info">
        <p>
          Фільм-катастрофа режисера Джеймса Камерона «Титанік», розповідає
          прекрасну і водночас сумну історію кохання дівчини з вищого
          суспільства та бідного юнака, яких доля звела разом на злощасному
          кораблі та подарувала найкращі моменти життя.
        </p>
        <button v-if="!isOpen">Купити квиток</button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "VotingPage",
  data() {
    return {
      options: [
        "Титанік",
        "Джуманджи 1",
        "Пропозиція",
        "Форсаж 2",
        "Паранормальне явище 1",
      ],
      selectedOption: "",
      isOpen: true,
    };
  },
  computed: {
    ...mapGetters(["getDarkTheme"]),
    ...mapGetters({
      isAuth: "auth/isAuth",
    }),
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
