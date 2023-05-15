<template>
  <div class="card-grid" v-if="products.length > 0">
    <ProductItem
      v-for="product in products"
      :key="product.id"
      :product="product"
      @remove="$emit('remove', product)"
    />
  </div>
  <h2 v-else style="color: red">Постов нет</h2>
</template>

<script>
import ProductItem from "@/components/ComponentItem/ProductItem.vue";

export default {
  name: "ProductList",
  components: { ProductItem },
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.card-grid {
  display: flex;
  flex-wrap: wrap;
}
</style>
