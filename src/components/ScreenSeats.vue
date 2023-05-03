<template>
  <div class="screen">
    <div class="screen-element"></div>
    <div
      class="d-flex justify-content-between"
      v-for="row in seats?.amount_rows"
      :key="row"
    >
      <p :class="this.getDarkTheme ? 'dark_p' : 'light_p'">{{ row }} ряд</p>
      <div
        :class="this.getDarkTheme ? 'dark_seat' : 'light_seat'"
        v-for="seat_row in seats?.seat_row"
        :key="seat_row"
      >
        <button
          :id="seat_row"
          @click="chooseSeat(row, seat_row)"
          :class="[
            this.getDarkTheme ? 'dark_btn' : 'light_btn',
            isPlaceSelected(row, seat_row) ? 'active' : '',
          ]"
        >
          {{ seat_row }}
        </button>
      </div>
    </div>
    <div class="d-flex mt-3">
      <p :class="this.getDarkTheme ? 'dark_p' : 'light_p'">
        {{ seats.vip_row }} ряд - VIP
      </p>
      <div
        :class="this.getDarkTheme ? 'dark_seat' : 'light_seat'"
        class="justify-content-between"
        v-for="seat_row in seats?.vip_seats"
        :key="seat_row"
      >
        <button
          :id="seat_row"
          @click="chooseSeat(seats?.vip_row, seat_row, true)"
          :class="[
            this.getDarkTheme ? 'dark_btn' : 'light_btn',
            isPlaceSelected(seats?.vip_row, seat_row)
              ? 'active_vip'
              : 'vip_seats',
          ]"
        >
          {{ seat_row }} vip
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ScreenSeats",
  props: {
    seats: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["getDarkTheme"]),
  },
  methods: {
    chooseSeat(row, seat, isTrue) {
      if (this.isPlaceSelected(row, seat)) {
        this.$emit("remove_seat", {
          row: row,
          seat: seat,
        });
      } else {
        this.$emit("choose_seat", {
          row: row,
          seat: seat,
          isVip: isTrue,
        });
      }
    },
    isPlaceSelected(row, seat) {
      let flag = false;
      this.$parent.$data.places.forEach((place) => {
        if (place.row === row && place.seat === seat) {
          flag = true;
        }
      });
      return flag;
    },
  },
};
</script>

<style scoped>
.screen {
  color: white;
  border-radius: 20px;
  padding: 20px;
  margin-top: 80px;
  border: 1px solid #4d7cbc;
}

.dark_p {
  margin-top: 8px;
  color: white;
}

.light_p {
  margin-top: 8px;
  color: #4d7cbc;
}

.dark_btn {
  border: 1px solid #4d7cbc;
  background-color: transparent;
  border-radius: 15px;
  width: 50px;
  color: white;
}

.light_btn {
  border: 1px solid #4d7cbc;
  background-color: transparent;
  border-radius: 15px;
  width: 50px;
  color: #4d7cbc;
}
.dark_seat,
.light_seat {
  margin-bottom: 10px;
}

.dark_btn:hover {
  background-color: #fff;
  color: #4d7cbc;
}

.light_btn:hover {
  background-color: #4d7cbc;
  color: white;
}
.dark_btn.active {
  background-color: #4d7cbc;
  color: white;
}

.light_btn.active {
  background-color: #4d7cbc;
  color: white;
}

.dark_btn.active_vip {
  background-color: #4d7cbc;
  color: white;
  margin-left: 60px;
  width: 100px;
}

.light_btn.active_vip {
  background-color: #4d7cbc;
  color: white;
  margin-left: 60px;
  width: 100px;
}

.dark_btn.vip_seats {
  border: 1px solid #4d7cbc;
  background-color: transparent;
  border-radius: 15px;
  width: 100px;
  margin-left: 53px;
  color: white;
}

.light_btn.vip_seats {
  border: 1px solid #4d7cbc;
  background-color: transparent;
  border-radius: 15px;
  width: 100px;
  margin-left: 53px;
}
.screen-element {
  width: 70%;
  height: 130px;
  border-radius: 65px;
  margin: 20px auto;
  border: 1px solid #4d7cbc;
}
</style>
