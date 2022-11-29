<template>
  <form class="form container" @submit.prevent>
    <h3>Вхід</h3>
    <MyInput
      v-focus
      v-model="form.email"
      style="width: 80%"
      type="text"
      placeholder="Введіть e-mail"
    />
    <MyInput
      v-focus
      v-model="form.password"
      type="password"
      style="width: 80%"
      placeholder="Введіть пароль"
    />
    <MyButton class="btn" style="width: 50%" type="submit" @click="submit"
      >Війти</MyButton
    >
    <a @click="$router.push('/register')" class="nav-link btn" href="#">
      Зареєструватись
    </a>
  </form>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getUserRoles, login } from "@/api/api_request";
import store from "@/store/main";

export default {
  name: "LoginPage",
  components: {},

  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      getToken: "auth/getToken",
      getRole: "auth/getRoles",
    }),
  },
  methods: {
    ...mapMutations({
      setToken: "auth/setToken",
      setRoles: "auth/setRoles",
      setUser: "auth/setUser",
    }),
    async submit() {
      await login({
        email: this.form.email,
        password: this.form.password,
      })
        .then((response) => {
          this.setToken(response.data?.token);
        })
        .catch(() => {
          alert("Невалідні дані");
        });

      await getUserRoles(this.getToken).then((response) => {
        let user = JSON.parse(response.data.user);
        this.setRoles(response.data.roles);
        this.setUser(user);
      });
      if (store.getters["auth/getRoles"] == "ROLE_ADMIN") {
        this.$router.push("/movie/create");
      } else {
        this.$router.push("/");
      }
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
