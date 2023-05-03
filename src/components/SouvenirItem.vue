<template>
  <div class="card">
    <div class="card-image">
      <img :src="souvenir.image" alt="" />
    </div>
    <div class="card-name">{{ souvenir.name }}</div>
    <hr />
    <div class="d-flex justify-content-between">
      <div class="card-price">
        {{ $t("table.price") }}
        : <span>{{ souvenir.price }}</span>
      </div>
      <button><img src="../assets/images/корзина.png" alt="" /></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SouvenirItem",
  props: {
    souvenir: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showDetails: false,
    };
  },
};
</script>

<style scoped>
.card {
  position: relative;
  width: calc(33.33% - 52px);
  margin: 26px;
  padding: 30px;
  background-color: transparent;
  border-radius: 20px;
  border: 3px solid #4d7cbc;
  box-shadow: 0 0 5px rgb(0 0 0 / 30%);
  box-sizing: border-box;
  height: fit-content;
}
hr {
  color: #4d7cbc;
  height: 6px;
}
.card-image {
  position: relative;
  width: 100%;
  height: 320px;
  padding-bottom: 75%;
  overflow: hidden;
  transition: height 0.3s ease-out;
}

.card-image img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-name {
  color: #fff;
  font-weight: 700;
  text-align: center;
  margin-top: 10px;
  font-size: 22px;
  font-family: "Arsenal", sans-serif;
}
.card-price {
  color: #fff;
  margin-top: 20px;
  font-size: 22px;
  font-family: "Arsenal", sans-serif;
}
.card-price span {
  margin-left: 10px;
  font-weight: 700;
}
.card button {
  background-color: transparent;
  border: none;
}
.card button img {
  width: 80%;
}
</style>
