<template>
  <div>
    <div class="card center img-fluid">
      <div class="front">
        <button @click="$router.push(`/movie/${movie.id}`)">
          <img :src="getImagePath(movie.imagePath)" class="img-fluid" alt="" />
        </button>
      </div>

      <div class="back">
        <div class="back-content center img-fluid">
          <div class="name"><strong>Название: </strong>{{ movie.title }}</div>
          <div class="actors">
            <strong>Головні актори: </strong> {{ movie.actors }}
          </div>

          <div class="date">
            <strong>Дата начала проката:</strong>
            {{ momentDate(movie.date_start) }}
          </div>
          <div class="date">
            <strong>Дата конца проката:</strong>
            {{ momentDate(movie.date_finish) }}
          </div>
          <button class="btn" @click="$router.push(`/movie/${movie.id}`)">
            Детальніше
          </button>
          <!--            <MyButton @click="$emit('remove', post)">Удалить</MyButton>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment/moment";

export default {
  name: "MovieItem",
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getImagePath: function (imagePath) {
      return `http://localhost/uploads/movies/${imagePath}`;
    },
    momentDate: function (date) {
      return moment(date, "YYYY-MM-DD").format("DD.MM.YYYY");
    },
  },
};
</script>

<style scoped>
body {
  background-color: #333;
}

@media screen and (min-width: 900px) {
  article {
    padding: 1rem 3rem;
  }
}
.card {
  position: relative;
  padding: 0 0 130% 0;
  border-radius: 10px;
  margin: 0 0px 30px 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  /*width: 100%;*/
  /*height: 100%;*/
}

.front,
.back {
  width: 100%;
  height: 100%;
  min-width: 50%;
  min-height: 50%;
  overflow: hidden;
  backface-visibility: hidden;
  position: absolute;
  transition: transform 0.6s linear;
}

.front img {
  border-radius: 10px;
  min-width: 50%;
  min-height: 50%;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  position: absolute;
  left: 0;
  top: 0;
}
strong {
  background-color: transparent;
}
.front {
  transform: perspective(600px) rotateY(0deg);
}

.back {
  transform: perspective(600px) rotateY(180deg);
  background-color: #f1f1f1;
  height: 100%;
  border-radius: 10px;
}

.genre-el {
  top: -15px;
  position: relative;
}

.back-content {
  background-color: transparent;
  color: black;
  width: 90%;
}

h2 {
  margin-bottom: 20px;
}

span {
  display: block;
  font-size: 20px;
  background-color: #fff;
}

.name,
.actors,
.date,
.btn {
  position: relative;
  left: 10px;
  background-color: transparent;
  top: 10px;
}

.actors {
  top: 40px;
}

.date {
  top: 60px;
}

.fas {
  display: block;
  margin: 20px 0;
  color: red;
  font-size: 30px;
}

.front .format p {
  color: black;
  top: 10px;
  border: 1px solid black;
  padding: 3px 0 3px 13px;
  border-radius: 10px;
  background-color: rgba(232, 232, 232, 0.85);
  z-index: 4;
  font-size: 20px;
  width: 25%;
  position: relative;
  left: 10px;
}

.card:hover > .front {
  transform: perspective(600px) rotateY(-180deg);
}

.card:hover > .back {
  transform: perspective(600px) rotateY(0deg);
}

.btn {
  top: 100px;
  text-align: center;
  left: 80px;
  color: #ffffff;
  background-color: #4d7cbc;
  border: 1px solid #4d7cbc;
}

.btn:hover {
  border: 1px solid red;
  color: red;
}
</style>
