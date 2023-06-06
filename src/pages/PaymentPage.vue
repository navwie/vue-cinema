<template>
  <div class="w-50 m-auto cont">
    <h2 class="mb-5 text-center" style="font-size: 2.3vw">Оплата замовлення</h2>
    <form id="stripe-payment-element-form">
      <div class="form-group">
        <input
          class="form-control"
          style="height: 50px"
          id="card-holder-name"
          type="text"
          v-model="fullName"
        />
      </div>
      <div id="stripe-payment-element-mount-point" />
      <slot name="stripe-payment-element-errors">
        <div id="stripe-payment-element-errors" role="alert" />
      </slot>
    </form>
    <div class="mt-5 d-flex justify-content-center">
      <button
        ref="submitButtonRef"
        @click="purchase($event)"
        type="submit"
        class="custom-button m-auto"
      >
        Оплатити
      </button>
    </div>
  </div>
</template>
<script>
import { loadStripe } from "@stripe/stripe-js";
import { getIntent, purchase } from "@/api/api_request";
import { mapGetters, mapMutations } from "vuex";
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
      getUser: "auth/getUser",
    }),
    fullName() {
      return this.getUser.firstname + " " + this.getUser.lastname;
    },
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
    ...mapMutations(["setMovieToBasket"]),
    ...mapMutations(["setSouvenirToBasket"]),
    ...mapMutations(["setProductToBasket"]),
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
        })
          .then(() => {
            this.setMovieToBasket({
              data: [],
              action: "push",
            });
            this.setMovieToBasket({
              data: [],
              action: "rewrite",
            });
            this.setSouvenirToBasket([]);
            this.setProductToBasket([]);
            this.$swal({
              icon: "success",
              color: "#000",
              timer: 4000,
              timerProgressBar: true,
              showClass: {
                popup: "animate__animated animate__fadeInDown",
              },
              hideClass: {
                popup: "animate__animated animate__fadeOutUp",
              },
            });
            this.$router.push(`/profile/${this.getUserId}`);
          })
          .catch(() => {
            this.$swal({
              icon: "error",
              color: "#000",
              title: this.$t("something_went_wrong.title"),
              text: this.$t("something_went_wrong.text"),
              timer: 4000,
              showClass: {
                popup: "animate__animated animate__fadeInDown",
              },
              hideClass: {
                popup: "animate__animated animate__fadeOutUp",
              },
              timerProgressBar: true,
            });
          });
      }
    },
  },
};
</script>
<style scoped>
.cont {
  position: relative;
  top: 150px;
}
form {
  border: 1px solid #4d7cbc;
  border-radius: 20px;
  padding: 20px;
}
.custom-button {
  border: 1px solid #4d7cbc;
  background-color: transparent;
  color: white;
  font-size: 1.4vw;
  width: 20%;
  border-radius: 20px;
  padding: 5px;
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
