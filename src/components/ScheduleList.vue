<template>
  <div class="list-of-schedule container" v-if="schedules.length > 0">
    <div class="movie">
      <ScheduleItem
        :key="schedule.id"
        v-for="schedule in schedules"
        :schedule="schedule"
        @remove="$emit('remove', schedule)"
      />
    </div>
  </div>
  <h2 v-else style="color: red">Сеансів немає</h2>
</template>

<script>
import ScheduleItem from "@/components/ScheduleItem";
export default {
  name: "ScheduleList",
  components: { ScheduleItem },
  props: {
    schedules: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.list-of-schedule {
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(1, 1fr);
}
</style>
