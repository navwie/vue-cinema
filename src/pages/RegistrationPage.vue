<template>
  <form class="form container" @submit.prevent>
    <h3>Реєстрація</h3>
    <MyInput
      v-focus
      v-model="name"
      style="width: 80%"
      type="text"
      placeholder="Введіть ім'я"
    />
    <MyInput
      v-focus
      v-model="surname"
      style="width: 80%"
      type="text"
      placeholder="Введіть призвище"
    />
    <MyInput
      v-focus
      v-model="age"
      style="width: 80%"
      type="date"
      placeholder="Введіть дату народження"
    />
    <MyInput
      v-focus
      v-model="phone"
      style="width: 80%"
      type="phone"
      placeholder="Введіть номер телефону"
    />
    <MyInput
      v-focus
      v-model="email"
      style="width: 80%"
      type="text"
      placeholder="Введіть e-mail"
    />
    <MyInput
      v-focus
      v-model="password"
      type="password"
      style="width: 80%"
      placeholder="Введіть пароль"
    />
    <MyButton class="btn" style="width: 50%" @click="submit"
      >Зареєструватися</MyButton
    >
  </form>
</template>

<script>
import { mapActions } from "vuex";

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
          this.$router.push("/login");
        })
        .catch(() => {
          alert("Некоректні дані");
        });
    },
  },
};
</script>

<style scoped>
.form {
  text-align: center;
  color: white;
}
</style>
