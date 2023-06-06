<template>
  <form class="form container" @submit.prevent>
    <div class="form-element">
      <!--      <h3 :class="this.getDarkTheme ? 'dark_h3' : 'light_h3'">-->
      <!--        {{ $t("auth.login") }}-->
      <!--      </h3>-->
      Login
      <div>
        <MyInput
          v-focus
          v-model="form.email"
          style="width: 60%"
          type="text"
          :placeholder="$t(`auth.email`)"
        />
        <MyInput
          v-focus
          v-model="form.password"
          type="password"
          style="width: 60%"
          :placeholder="$t(`auth.password`)"
        />
      </div>
      <div>
        <MyButton class="butn" type="submit" @click="submit">
          {{ $t("auth.login") }}
        </MyButton>
      </div>
      <div :class="this.getDarkTheme ? 'dark_link' : 'light_link'">
        <a @click="$router.push('/register')" href="#">
          {{ $t("auth.register") }}
        </a>
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getUsers, login } from "@/api/api_request";
import MyButton from "@/components/UI/MyButton";
import moment from "moment/moment";
import store from "@/store/main";

export default {
  name: "LoginPage",
  components: { MyButton },

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
      getUserId: "auth/getUserId",
    }),
    ...mapGetters(["getDarkTheme"]),
  },
  methods: {
    ...mapMutations({
      setToken: "auth/setToken",
      setRoles: "auth/setRoles",
      setUser: "auth/setUser",
      setAge: "auth/setAge",
      setUserId: "auth/setUserId",
      setAddressId: "auth/setAddressId",
      setShopId: "auth/setShopId",
      setCafeId: "auth/setCafeId",
    }),
    async submit() {
      await login({
        email: this.form.email,
        password: this.form.password,
      })
        .then((response) => {
          // debugger;
          this.setToken(response.data?.token);
          this.setUserId(response.data?.userId);
          this.setRoles(response.data.role);
          if (response.data.role === "ROLE_ADMIN") {
            this.setAddressId(
              response.data.address.cinemas[0].pivot.address_id
            );
            this.setShopId(response.data.address.cinemas[0].pivot.shop_id);
            this.setCafeId(response.data.address.cinemas[0].pivot.cafe_id);
          } else {
            this.setAddressId(JSON.stringify([]));
            this.setShopId(JSON.stringify([]));
            this.setCafeId(JSON.stringify([]));
          }
          getUsers(response.data?.userId).then((response) => {
            let user = response.data.user;
            if (user !== undefined) {
              this.setUser(user);
            }
            let date = moment(user.birthday).format("yyyy-MM-DD");
            this.setAge(date);
          });
          if (store.getters["auth/getRoles"] == "ROLE_ADMIN") {
            this.$swal({
              icon: "success",
              color: "#000",
              showClass: {
                popup: "animate__animated animate__fadeInDown",
              },
              hideClass: {
                popup: "animate__animated animate__fadeOutUp",
              },
              timer: 4000,
              timerProgressBar: true,
            });
            this.$router.push("/adminMain");
          } else {
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
            this.$router.push("/");
          }
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
.dark_h3 {
  color: white;
}
.light_h3 {
  color: black;
}
.form {
  text-align: center;
  color: white;
  position: relative;
  top: 60px;
}
.form-element {
  border: 1px solid #4d7cbc;
  padding-top: 84px;
  padding-bottom: 80px;
  border-radius: 20px;
}
.input {
  margin-top: 15px;
  margin-bottom: 15px;
}
.butn {
  margin-top: 20px;
  background-color: #4d7cbc;
  color: white;
  width: 26%;
  border-radius: 20px;
  font-size: 19px;
  font-weight: 500;
}
.butn:hover {
  background-color: #fff;
  color: #4d7cbc;
}
.dark_link a {
  margin-top: 20px;
  color: white;
  text-decoration: underline;
  position: relative;
  top: 20px;
  font-size: 20px;
}
.light_link a {
  margin-top: 20px;
  color: black;
  text-decoration: underline;
  position: relative;
  top: 20px;
  font-size: 20px;
}
</style>
