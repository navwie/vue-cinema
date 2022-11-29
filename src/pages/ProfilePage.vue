<template>
  <div>
    <h2>Ім'я - {{ getUser.name }}</h2>
    <h2>Призвище - {{ getUser.surname }}</h2>
    <h2>Пошта - {{ getUser.email }}</h2>
    <h2>Номер телефону - {{ getUser.phone }}</h2>
    <h2>Вік - {{ momentDate(getUser.age) }}</h2>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment/moment";

export default {
  name: "ProfilePage",
  computed: {
    ...mapGetters({
      getUser: "auth/getUser",
    }),
  },
  methods: {
    momentDate: function (date) {
      return moment(date, "YYYY-MM-DD").format("DD.MM.YYYY");
    },
  },
};
</script>

<style scoped>
h2 {
  color: white;
}
</style>
