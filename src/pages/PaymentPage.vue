<template>
  <div>
    <label>Card Number</label>
    <div id="card-number"></div>
    <label>Card Expiry</label>
    <div id="card-expiry"></div>
    <label>Card CVC</label>
    <div id="card-cvc"></div>
    <div id="card-error"></div>
    <button id="custom-button" @click="createToken">Generate Token</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: null,
      cardNumber: null,
      cardExpiry: null,
      cardCvc: null,
    };
  },
  computed: {
    stripeElements() {
      return this.$stripe.elements();
    },
  },
  beforeMount() {
    console.log(this);
  },
  methods: {
    async createToken() {
      const { token, error } = await this.$stripe.createToken(this.cardNumber);
      if (error) {
        // handle error here
        document.getElementById("card-error").innerHTML = error.message;
        return;
      }
      console.log(token);
      // handle the token
      // send it to your server
    },
  },
};
</script>

<style scoped>
#custom-button {
  height: 30px;
  outline: 1px solid grey;
  background-color: green;
  padding: 5px;
  color: white;
}

#card-error {
  color: red;
}
</style>
