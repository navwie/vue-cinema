<template>
  <button
    :class="this.getDarkTheme ? 'dark_btn' : 'light_btn'"
    @click="$router.push(`/schedule/${schedule.id}`)"
  >
    {{ momentDate(schedule.date_time) }}
  </button>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment/moment";

export default {
  name: "ScheduleItem",
  props: {
    schedule: {
      type: Object,
      required: true,
    },
  },
  methods: {
    momentDate: function (date) {
      let locale = localStorage.getItem("locale");
      if (locale === "uk") {
        return moment(date, "YYYY-MM-DD, h:mm")
          .locale(locale)
          .format("MMMM Do YYYY, HH:mm");
      } else {
        return moment(date, "YYYY-MM-DD, h:mm").format("LLL");
      }
    },
  },
  computed: {
    ...mapGetters({
      isAuth: "auth/isAuth",
      getRoles: "auth/getRoles",
    }),
    ...mapGetters(["getDarkTheme"]),
  },
};
</script>

<style scoped>
.dark_btn {
  background-color: #fff;
  color: #4d7cbc;
  padding: 10px;

  border-radius: 20px;
  margin-left: 60px;
  font-weight: 500;
  margin-bottom: 30px;
}

.light_btn {
  background-color: #fff;
  color: #4d7cbc;
  padding: 10px;
  border: 1px solid #4d7cbc;
  border-radius: 20px;
  margin-left: 60px;
  font-weight: 500;
  margin-bottom: 30px;
}
.btn:hover {
  background-color: #4d7cbc;
  color: white;
}
</style>
