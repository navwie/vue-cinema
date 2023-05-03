<template>
  <div class="cont m-auto">
    <h1
      :class="this.getDarkTheme ? 'dark_h1' : 'light_h1'"
      style="
        text-align: center;
        position: relative;
        top: 20px;
        margin-bottom: 70px;
      "
    >
      {{ $t("profile.profile") }}
    </h1>
    <div class="d-flex justify-content-between">
      <div class="row">
        <div class="info-block">
          <div class="d-flex justify-content-around">
            <p :class="this.getDarkTheme ? 'dark_p' : 'light_p'">
              {{ $t("profile.name") }}
            </p>
            <p :class="this.getDarkTheme ? 'dark_p' : 'light_p'">
              {{ getUser.name }}
            </p>
          </div>
          <div class="d-flex justify-content-around">
            <p :class="this.getDarkTheme ? 'dark_p' : 'light_p'">
              {{ $t("profile.surname") }}
            </p>
            <p :class="this.getDarkTheme ? 'dark_p' : 'light_p'">
              {{ getUser.surname }}
            </p>
          </div>
          <div class="d-flex justify-content-around">
            <p :class="this.getDarkTheme ? 'dark_p' : 'light_p'">
              {{ $t("profile.email") }}
            </p>
            <p :class="this.getDarkTheme ? 'dark_p' : 'light_p'">
              {{ getUser.email }}
            </p>
          </div>
          <div class="d-flex justify-content-around">
            <p :class="this.getDarkTheme ? 'dark_p' : 'light_p'">
              {{ $t("profile.phone") }}
            </p>
            <p :class="this.getDarkTheme ? 'dark_p' : 'light_p'">
              {{ getUser.phone }}
            </p>
          </div>
          <div class="d-flex justify-content-around">
            <p :class="this.getDarkTheme ? 'dark_p' : 'light_p'">
              {{ $t("profile.age") }}
            </p>
            <p :class="this.getDarkTheme ? 'dark_p' : 'light_p'">
              {{ momentDate(getUser.age) }}
            </p>
          </div>
        </div>
        <button
          :class="this.getDarkTheme ? 'dark_butn' : 'light_butn'"
          @click="$router.push(`/user/update/${getUser.id}`)"
        >
          {{ $t("profile.change") }}
        </button>
      </div>
      <div style="width: 50%">
        <div class="d-flex">
          <img :src="tickets" alt="" />
          <p :class="this.getDarkTheme ? 'dark_text' : 'light_text'">
            {{ $t("profile.actual_ticket") }}
          </p>
        </div>
        <hr />
        <div class="container-fluid"></div>
      </div>
    </div>
    <div class="d-flex" style="margin-top: 90px">
      <img :src="archive" alt="" />
      <p :class="this.getDarkTheme ? 'dark_text' : 'light_text'">
        {{ $t("profile.archive") }}
      </p>
    </div>
    <hr />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment/moment";
import tickets from "../../assets/images/tickets.png";
import archive from "../../assets/images/archive.png";

export default {
  name: "ProfilePage",
  computed: {
    ...mapGetters({
      getUser: "auth/getUser",
    }),
    ...mapGetters(["getDarkTheme"]),
  },
  data() {
    return {
      tickets,
      archive,
    };
  },

  methods: {
    momentDate: function (date) {
      return moment(date, "YYYY-MM-DD").format("DD.MM.YYYY");
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
.dark_p {
  color: white;
  width: 288px;
  font-size: 20px;
  background-color: #20242c;
  padding: 5px 10px;
  font-weight: 500;
}

.light_p {
  color: black;
  width: 288px;
  font-size: 20px;
  background-color: #aaaaaa;
  padding: 5px 10px;
  font-weight: 500;
}

.info-block {
  border: 1px solid #4d7cbc;
  border-radius: 15px;
  padding: 22px 10px;
}
hr {
  border: none;
  height: 3px;
  color: #4d7cbc;
  background-color: #4d7cbc;
}
.dark_text {
  color: white;
  position: relative;
  font-weight: 500;
  padding: 0;
  top: 10px;
  left: 10px;
  background-color: transparent;
  font-size: 20px;
}
.light_text {
  color: black;
  position: relative;
  font-weight: 500;
  padding: 0;
  top: 10px;
  left: 10px;
  background-color: transparent;
  font-size: 20px;
}
.dark_butn {
  border: 1px solid #4d7cbc;
  width: 50%;
  color: white;
  margin-top: 20px;
  border-radius: 20px;
  padding: 10px;
  font-weight: 500;
  position: relative;
  left: 130px;
  background-color: transparent;
}
.dark_butn:hover {
  background-color: #fff;
  color: #4d7cbc;
}

.light_butn {
  border: 1px solid #4d7cbc;
  width: 50%;
  color: #4d7cbc;
  margin-top: 20px;
  border-radius: 20px;
  padding: 10px;
  font-weight: 500;
  position: relative;
  left: 130px;
  background-color: transparent;
}
.light_butn:hover {
  background-color: #4d7cbc;
  color: #fff;
}
.cont {
  width: 90%;
}
</style>
