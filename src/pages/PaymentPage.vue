<template>
  <div>
    <form id="stripe-payment-element-form">
      <input id="card-holder-name" type="text" />
      <div id="stripe-payment-element-mount-point" />
      <slot name="stripe-payment-element-errors">
        <div id="stripe-payment-element-errors" role="alert" />
      </slot>
      <button
        ref="submitButtonRef"
        @click="purchase($event)"
        type="submit"
        class="button"
      >
        Заплатити
      </button>
    </form>
  </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
import { getIntent, purchase } from "@/api/api_request";
import { mapGetters } from "vuex";
const ELEMENT_TYPE = "payment";

export default {
  data() {
    return {
      stripe: null,
      card: null,
      options: {
        clientSecret: "",
      },
    };
  },
  async beforeMount() {
    const stripe = await loadStripe(process.env.VUE_APP_STRIPE_PUBLIC_KEY);
    this.stripe = stripe;
    const userId = localStorage.getItem("userId");
    await getIntent(userId).then((response) => {
      this.options.clientSecret = response.data.client_secret;

      let elements = stripe.elements(this.options);
      this.card = elements.create(ELEMENT_TYPE);
      this.card.mount("#stripe-payment-element-mount-point");
    });
  },
  computed: {
    ...mapGetters({
      getUserId: "auth/getUserId",
    }),
    getMovieTickets() {
      return this.$store.getters.getMovieTickets;
    },
    getProductItems() {
      return this.$store.getters.getProductItems;
    },
    getSouvenirItems() {
      return this.$store.getters.getSouvenirItems;
    },
    getFullPriceForPay() {
      let sum = 0;
      this.getMovieTickets.forEach((movie) => {
        movie.places.forEach((place) => {
          sum += place.price;
        });
      });
      this.getSouvenirItems.forEach((souvenir) => {
        sum += souvenir.price;
      });
      this.getProductItems.forEach((product) => {
        sum += product.price;
      });
      return sum;
    },
  },
  methods: {
    async purchase(e) {
      e.preventDefault();
      const cardHolderName = document.getElementById("card-holder-name");

      const { paymentMethod, error } = await this.stripe.createPaymentMethod(
        "card",
        this.card,
        {
          billing_details: { name: cardHolderName.value },
        }
      );

      if (error) {
        console.log(error);
      } else {
        purchase({
          user_id: this.getUserId,
          payment_method: paymentMethod.id,
          tickets: this.getMovieTickets,
          products: this.getProductItems,
          souvenirs: this.getSouvenirItems,
          total_money: this.getFullPriceForPay,
        }).then((r) => console.log(r.data));
      }
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

.button {
  width: 100px;
  height: 100px;
}

#card-error {
  color: red;
}
</style>
