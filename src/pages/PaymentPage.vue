<template>
  <div class="w-50 m-auto cont">
    <form id="stripe-payment-element-form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <input
          id="price"
          type="number"
          v-model="getFullPriceForPay"
          placeholder="Price"
          required
          class="form-control"
        />
      </div>
      <div id="stripe-payment-element-mount-point" ref="mountPoint"></div>
      <div id="stripe-payment-element-errors" role="alert">
        <slot name="stripe-payment-element-errors"></slot>
      </div>
      <button type="submit" class="custom-button">
        {{ $t("payment.submit") }}
      </button>
    </form>
  </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
import { getIntent } from "@/api/api_request";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      stripe: null,
      options: {
        clientSecret:
          "seti_1N9we2K9qhyBufuVLXjQMddE_secret_NvoGX6dZjBe1mjkXLyrYLhXJDjPhJht",
      },
      price: null,
    };
  },
  async mounted() {
    const stripe = await loadStripe(
      "pk_test_51MBjXJK9qhyBufuVBj51RpkwctYEYFJf3aUnCzHwR8HoJAOwpvE9C80TWzKQOCvesWYxFc9BUXJfXmStTnYYiVSI00U5kN2V3E"
    );
    this.stripe = stripe;

    const userId = localStorage.getItem("userId");
    getIntent(userId).then((response) => {
      this.options.clientSecret = response.data.client_secret;

      const elements = stripe.elements(this.options);
      const priceInput = elements.create("payment", {
        style: {
          base: {
            border: "1px solid gray",
            padding: "5px",
          },
        },
      });
      priceInput.mount(this.$refs.mountPoint);

      // Store elements instance for later use
      this.elements = elements;
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
    handleSubmit() {
      this.stripe
        .confirmPaymentIntent(this.options.clientSecret, {
          payment_method: {
            card: this.elements.getElement("payment"),
          },
          amount: this.price * 100,
          currency: "usd",
        })
        .then((result) => {
          if (result.error) {
            // Handle error
            console.log(result.error.message);
          } else {
            // Payment succeeded, you can handle success here
            console.log(result.paymentIntent);
          }
        });
    },
  },
};
</script>
<style scoped>
.custom-button {
  height: 30px;
  outline: 1px solid grey;
  background-color: green;
  padding: 5px;
  color: white;
}

#card-error {
  color: red;
}

.cont {
  position: relative;
  top: 50px;
}

.form-group {
  margin-bottom: 15px;
}

.form-label {
  font-weight: bold;
}

.form-control {
  width: 100%;
  font-size: 1.2vw;
  letter-spacing: 2px;
  height: 30px;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  outline: none;
}

.form-control:focus {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
</style>
