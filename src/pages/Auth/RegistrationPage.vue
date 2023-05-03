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
          v-model="name"
          style="width: 60%"
          type="text"
          :placeholder="$t(`auth.name`)"
        />
        <MyInput
          v-focus
          v-model="surname"
          style="width: 60%"
          type="text"
          class="input"
          :placeholder="$t(`auth.surname`)"
        />
        <MyInput
          v-focus
          v-model="age"
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
        <MyInput
          v-focus
          v-model="password"
          type="password"
          style="width: 60%"
          :placeholder="$t(`auth.password`)"
        />
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
      name: "",
      surname: "",
      age: null,
      phone: "",
    };
  },
  computed: {
    ...mapGetters(["getDarkTheme"]),
  },
  methods: {
    ...mapActions({
      register: "auth/register",
    }),
    submit() {
      this.register({
        name: this.name,
        surname: this.surname,
        age: this.age,
        phone: this.phone,
        email: this.email,
        password: this.password,
      })
        .then(() => {
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
.btn:hover {
  background-color: #fff;
  color: #4d7cbc;
}
.input {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
