<template>
  <button class="btn" @click="$router.push(`/schedule/${schedule.id}`)">
    {{ schedule.date }}
  </button>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ScheduleItem",
  props: {
    schedule: {
      type: Object,
      required: true,
    },
  },
  methods: {},
  computed: {
    ...mapGetters({
      isAuth: "auth/isAuth",
      getRoles: "auth/getRoles",
    }),
  },
};
</script>

<style scoped>
.btn {
  background-color: #fff;
  color: #4d7cbc;
  margin-left: 60px;
  font-weight: 500;
  margin-bottom: 30px;
}
.btn:hover {
  background-color: #4d7cbc;
  color: white;
}
</style>
