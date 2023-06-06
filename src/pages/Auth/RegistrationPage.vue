<template>
  <form class="form container" @submit.prevent>
    <div class="form-element">
      <h1
        :class="this.getDarkTheme ? 'dark_h1' : 'light_h1'"
        class="title text-center"
      >
        {{ $t("auth.register") }}
      </h1>
      <div>
        <MyInput
          v-focus
          class="input"
          v-model="firstname"
          style="width: 60%"
          type="text"
          :placeholder="$t(`auth.name`)"
        />
        <p v-if="errors.firstname" class="error">{{ errors.firstname }}</p>
        <MyInput
          v-focus
          v-model="lastname"
          style="width: 60%"
          type="text"
          class="input"
          :placeholder="$t(`auth.surname`)"
        />
        <p v-if="errors.lastname" class="error">{{ errors.lastname }}</p>
        <MyInput
          v-focus
          v-model="birthday"
          style="width: 60%"
          type="date"
          class="input"
          :placeholder="$t(`auth.age`)"
        />
        <MyInput
          v-focus
          v-model="phone"
          style="width: 60%"
          type="phone"
          class="input"
          :placeholder="$t(`auth.phone`)"
        />
        <MyInput
          v-focus
          v-model="email"
          style="width: 60%"
          type="text"
          :placeholder="$t(`auth.email`)"
        />
        <p v-if="errors.email" class="error">{{ errors.email }}</p>
        <MyInput
          v-focus
          v-model="password"
          type="password"
          style="width: 60%"
          :placeholder="$t(`auth.password`)"
        />
        <p v-if="errors.password" class="error">{{ errors.password }}</p>
      </div>
      <MyButton class="btn" @click="submit">{{ $t("auth.register") }}</MyButton>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "RegistrationPage",

  data() {
    return {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      birthday: null,
      phone: "",
      errors: {},
    };
  },
  computed: {
    ...mapGetters(["getDarkTheme"]),
  },
  methods: {
    ...mapActions({
      register: "auth/register",
    }),
    validateForm() {
      this.errors = {};

      if (!this.firstname) {
        this.errors.firstname = "Please enter your first name.";
      } else if (!this.isValidFirstname(this.firstname)) {
        this.errors.firstname = "Використовуйте тільки букви.";
      }

      if (!this.lastname) {
        this.errors.lastname = "Please enter your last name.";
      } else if (!this.isValidLastname(this.lastname)) {
        this.errors.lastname = "Use only letters.";
      }

      if (!this.email) {
        this.errors.email = "Please enter your email address.";
      } else if (!this.isValidEmail(this.email)) {
        this.errors.email = "Please enter a valid email address.";
      }

      if (!this.birthday) {
        this.errors.birthday = "Please enter your birthday.";
      }

      if (!this.password) {
        this.errors.password = "Please enter your password.";
      } else if (!this.isValidPassword(this.password)) {
        this.errors.password = "Please enter at least 8 symbols.";
      }
      return Object.keys(this.errors).length === 0;
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    isValidFirstname(firstname) {
      const nameRegex = /^[A-Za-z]+$/;
      return nameRegex.test(firstname);
    },

    isValidLastname(lastname) {
      const nameRegex = /^[A-Za-z]+$/;
      return nameRegex.test(lastname);
    },

    isValidPassword(password) {
      return password.length >= 8;
    },
    submit() {
      if (this.validateForm()) {
        this.register({
          firstname: this.firstname,
          lastname: this.lastname,
          birthday: this.birthday,
          phone: this.phone,
          email: this.email,
          password: this.password,
        })
          .then((response) => {
            console.log(response);
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
            this.$router.push("/login");
          })
          .catch((er) => {
            console.log(er);
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
.dark_h1 {
  color: white;
}
.light_h1 {
  color: black;
}
.form {
  text-align: center;
  color: white;
  position: relative;
  top: 60px;
}
.btn {
  margin-top: 30px;
  background-color: #4d7cbc;
  color: white;
  width: 26%;
  border-radius: 20px;
  font-size: 19px;
  font-weight: 500;
}
.form-element {
  border: 1px solid #4d7cbc;
  padding-top: 84px;
  padding-bottom: 80px;
  border-radius: 20px;
}
.error {
  color: red;
}
.btn:hover {
  background-color: #fff;
  color: #4d7cbc;
}
.input {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
