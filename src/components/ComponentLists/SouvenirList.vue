<template>
  <div class="card-grid" v-if="souvenirs.length > 0">
    <SouvenirItem
      v-for="souvenir in souvenirs"
      :key="souvenir.id"
      :souvenir="souvenir"
      @remove="$emit('remove', souvenir)"
    />
  </div>
  <h2 v-else style="color: red">Постов нет</h2>
</template>

<script>
import SouvenirItem from "@/components/ComponentItem/SouvenirItem.vue";

export default {
  name: "SouvenirList",
  components: {
    SouvenirItem,
  },
  props: {
    souvenirs: {
      type: Array,
      required: true,
    },
  },
  computed: {
    // filteredSouvenirs: function () {
    //   console.log(this.souvenirs);
    //   return this.souvenirs.filter((souvenir) => souvenir.amount > 0);
    // },
  },
};
</script>

<style scoped>
.card-grid {
  display: flex;
  flex-wrap: wrap;
}
</style>
