<template>
  <div class="cont m-auto">
    <div class="d-flex">
      <img src="../../assets/images/world-news.png" alt="" />
      <p :class="this.getDarkTheme ? 'dark_text' : 'light_text'">
        {{ $t("main.news_week") }}
      </p>
    </div>
    <hr />
    <div>
      <div class="news">
        <p class="news-title">
          Остання поїздка: вийшов новий вибуховий трейлер "Форсажу 10"
        </p>
        <span class="news-description"
          >Студія Universal Pictures випустила новий трейлер бойовика "Форсаж
          10" (Fast X), в якому "родина" Торетто зустрінеться з новим мстивим
          ворогом. В новій частині культової франшизи героям кине виклик Данте
          (Джейсон Момоа з "Аквамена" та "Гри престолів") – син бразильського
          наркобарона Ернана Рейєса, вбитого Доменіком Торетто та його командою
          у фільмі "Форсаж 5" 2011 року. Данте був свідком смерті свого батька і
          знищення його злочинної імперії. Втративши усе, Данте витратив 12
          років на розробку плану помсти Доменіку, що забрати у нього найцінніше
          – родину</span
        >
      </div>
      <div class="news">
        <p class="news-title">
          Остання поїздка: вийшов новий вибуховий трейлер "Форсажу 10"
        </p>
        <span class="news-description"
          >Студія Universal Pictures випустила новий трейлер бойовика "Форсаж
          10" (Fast X), в якому "родина" Торетто зустрінеться з новим мстивим
          ворогом. В новій частині культової франшизи героям кине виклик Данте
          (Джейсон Момоа з "Аквамена" та "Гри престолів") – син бразильського
          наркобарона Ернана Рейєса, вбитого Доменіком Торетто та його командою
          у фільмі "Форсаж 5" 2011 року. Данте був свідком смерті свого батька і
          знищення його злочинної імперії. Втративши усе, Данте витратив 12
          років на розробку плану помсти Доменіку, що забрати у нього найцінніше
          – родину</span
        >
      </div>
      <div class="news">
        <p class="news-title">
          Остання поїздка: вийшов новий вибуховий трейлер "Форсажу 10"
        </p>
        <span class="news-description"
          >Студія Universal Pictures випустила новий трейлер бойовика "Форсаж
          10" (Fast X), в якому "родина" Торетто зустрінеться з новим мстивим
          ворогом. В новій частині культової франшизи героям кине виклик Данте
          (Джейсон Момоа з "Аквамена" та "Гри престолів") – син бразильського
          наркобарона Ернана Рейєса, вбитого Доменіком Торетто та його командою
          у фільмі "Форсаж 5" 2011 року. Данте був свідком смерті свого батька і
          знищення його злочинної імперії. Втративши усе, Данте витратив 12
          років на розробку плану помсти Доменіку, що забрати у нього найцінніше
          – родину</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NewsPage",
  computed: {
    ...mapGetters(["getDarkTheme"]),
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
  padding: 10px;
  font-size: 1.2vw;
  width: 100%;
  margin-bottom: 40px;
}

.news p {
  font-weight: 700;
}
.news-description {
  display: none;
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
