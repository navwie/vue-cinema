<template>
  <div class="list-of-movie" v-if="movies.length > 0">
    <div class="movie">
      <MovieItem
        :key="movie.id"
        v-for="movie in movies"
        :movie="movie"
        @remove="$emit('remove', movie)"
      />
    </div>
  </div>
  <h2 v-else style="color: red">Фільмів немає</h2>
</template>

<script>
import MovieItem from "@/components/MovieItem";
export default {
  name: "MovieList",
  components: { MovieItem },
  props: {
    movies: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
/*.list-of-movie h3 {*/
/*  text-align: center;*/
/*  margin-bottom: 50px;*/
/*}*/
.movie {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(1, 1fr);
  margin-bottom: 20px;
}
</style>
