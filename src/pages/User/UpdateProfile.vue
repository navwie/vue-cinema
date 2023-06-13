<template>
  <div class="container form">
    <h3
      :class="this.getDarkTheme ? 'dark_h3' : 'light_h3'"
      style="text-align: center"
    >
      {{ $t("profile.change") }}
    </h3>
    <div>
      <MyInput
        v-model="getUser.firstname"
        style="width: 60%"
        type="text"
        :placeholder="$t(`profile.name`)"
      />
      <MyInput
        v-model="getUser.lastname"
        style="width: 60%"
        type="text"
        :placeholder="$t(`profile.surname`)"
      />
      <MyInput
        v-model="getUser.email"
        style="width: 60%"
        type="text"
        :placeholder="$t(`profile.email`)"
      />
      <MyInput
        v-model="getUser.phone"
        style="width: 60%"
        type="text"
        :placeholder="$t(`profile.phone`)"
      />
      <MyInput
        v-model="getAge"
        type="date"
        style="width: 60%"
        :placeholder="$t(`profile.age`)"
      />
    </div>
    <div class="submit d-flex justify-content-center mt-5">
      <button
        :class="this.getDarkTheme ? 'dark_btn' : 'light_btn'"
        @click="changeData"
      >
        {{ $t("profile.change") }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import { updateProfile } from "@/api/api_request";
import moment from "moment";
import MyInput from "@/components/UI/MyInput.vue";
export default {
  name: "UpdateProfile",
  components: {
    MyInput,
  },
  computed: {
    ...mapGetters({
      getUser: "auth/getUser",
      getAge: "auth/getAge",
    }),
    ...mapGetters(["getDarkTheme"]),
  },
  methods: {
    ...mapMutations({
      setUser: "auth/setUser",
      setAge: "auth/setAge",
    }),
    changeData: function () {
      updateProfile(this.getUser.id, {
        firstname: this.getUser.firstname,
        lastname: this.getUser.lastname,
        phone: this.getUser.phone,
        email: this.getUser.email,
        birthday: this.getAge,
      })
        .then((response) => {
          let user = response.data.user;
          localStorage.setItem("user", JSON.stringify(user));
          this.setUser(user);
          let date = moment(user.birthday).format("yyyy-MM-DD");
          this.setAge(date);
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
          this.$router.push(`/profile/${user.id}`);
        })
        .catch(() => {
          console.log("error");
        });
    },
  },
};
</script>

<style scoped>
.form {
  text-align: center;
  color: white;
  border: 1px solid #4d7cbc;
  padding: 29px;
  border-radius: 53px;
  position: relative;
  top: 50px;
}
.dark_btn {
  color: white;
  width: 20%;
  border-radius: 20px;
  border: 1px solid #4d7cbc;
  background-color: transparent;
  font-weight: 500;
  padding: 10px;
  font-size: 18px;
}
.dark_btn:hover {
  background-color: #fff;
  color: #4d7cbc;
}

.light_btn {
  color: #4d7cbc;
  width: 20%;
  border-radius: 20px;
  border: 1px solid #4d7cbc;
  background-color: transparent;
  font-weight: 500;
  padding: 10px;
  font-size: 18px;
}
.light_btn:hover {
  background-color: #4d7cbc;
  color: #fff;
}

.dark_h3 {
  color: white;
  text-align: center;
}
.light_h3 {
  color: black;
  text-align: center;
}
</style>
