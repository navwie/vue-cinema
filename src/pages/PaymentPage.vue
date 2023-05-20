<template>
  <div>
    <form id="stripe-payment-element-form">
      <div id="stripe-payment-element-mount-point" />
      <slot name="stripe-payment-element-errors">
        <div id="stripe-payment-element-errors" role="alert" />
      </slot>
      <button ref="submitButtonRef" type="submit" class="" />
    </form>
  </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
import { getIntent } from "@/api/api_request";
const ELEMENT_TYPE = "payment";

export default {
  data() {
    return {
      stripe: null,
      options: {
        clientSecret:
          "seti_1N9we2K9qhyBufuVLXjQMddE_secret_NvoGX6dZjBe1mjkXLyrYLhXJDjPhJht",
      },
    };
  },
  async beforeMount() {
    const stripe = await loadStripe(
      "pk_test_51MBjXJK9qhyBufuVBj51RpkwctYEYFJf3aUnCzHwR8HoJAOwpvE9C80TWzKQOCvesWYxFc9BUXJfXmStTnYYiVSI00U5kN2V3E"
    );
    const userId = localStorage.getItem("userId");
    getIntent(userId).then((response) => {
      this.options.clientSecret = response.data.client_secret;

      let elements = stripe.elements(this.options);
      let element = elements.create(ELEMENT_TYPE);
      element.mount("#stripe-payment-element-mount-point");
    });
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
