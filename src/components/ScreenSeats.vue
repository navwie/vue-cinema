<template>
  <div class="screen">
    <div class="screen-element"></div>
    <div
      class="d-flex justify-content-between"
      v-for="row in seats?.hall.amount_rows"
      :key="row"
    >
      <p :class="this.getDarkTheme ? 'dark_p' : 'light_p'">
        {{ row }} {{ $t("screen_seats.row") }}
      </p>
      <div
        :class="this.getDarkTheme ? 'dark_seat' : 'light_seat'"
        v-for="seat_row in seats?.hall.seats_in_row"
        :key="seat_row"
      >
        <button
          :id="seat_row"
          :disabled="isDisabled(row, seat_row, 'common') === true"
          @click="
            isDisabled(row, seat_row, 'common')
              ? null
              : chooseSeat(row, seat_row, 'common')
          "
          style="width: 50px"
          :class="[
            this.getDarkTheme ? 'dark_btn' : 'light_btn',
            isDisabled(row, seat_row, 'common')
              ? null
              : isPlaceSelected(row, seat_row, 'common')
              ? 'active'
              : '',
          ]"
        >
          {{ seat_row }}
        </button>
      </div>
    </div>
    <div class="d-flex mt-3">
      <p :class="this.getDarkTheme ? 'dark_p' : 'light_p'">
        {{ $t("screen_seats.vip") }}
      </p>
      <div
        :class="this.getDarkTheme ? 'dark_seat' : 'light_seat'"
        class="d-flex justify-content-between"
        v-for="seat_row in seats?.hall.vip_seats"
        :key="seat_row"
      >
        <button
          :id="seat_row"
          style="width: 100px; margin-left: 90px"
          :disabled="isDisabled(vipRow, seat_row, 'vip') === true"
          @click="
            isDisabled(vipRow, seat_row, 'vip')
              ? null
              : chooseSeat(vipRow, seat_row, 'vip')
          "
          :class="[
            this.getDarkTheme ? 'dark_btn' : 'light_btn',
            isDisabled(vipRow, seat_row, 'vip')
              ? null
              : isPlaceSelected(vipRow, seat_row, 'vip')
              ? 'active_vip'
              : 'vip_seats',
          ]"
        >
          {{ seat_row }} {{ $t("screen_seats.vip") }}
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
  data() {
    return {
      vipRow: 1,
    };
  },
  computed: {
    ...mapGetters(["getDarkTheme"]),
  },
  methods: {
    chooseSeat(row, seat, type) {
      console.log(row, seat, type);
      if (this.isPlaceSelected(row, seat, type)) {
        this.$emit("remove_seat", {
          row: row,
          seat: seat,
          type: type,
        });
      } else {
        this.$emit("choose_seat", {
          row: row,
          seat: seat,
          type: type,
        });
      }
    },
    isPlaceSelected(row, seat, type) {
      let flag = false;
      this.$parent.$data.places.forEach((place) => {
        if (place.row === row && place.seat === seat && place.type === type) {
          flag = true;
        }
      });
      return flag;
    },
    isDisabled(row, seat, type) {
      let flag = false;
      this.seats.seats.forEach((item) => {
        if (item.row === row && item.seat === seat && item.type === type) {
          if (item.pivot.bought === 1) {
            flag = true;
            return flag;
          }
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
  color: white;
}
.light_btn {
  border: 1px solid #4d7cbc;
  background-color: transparent;
  border-radius: 15px;
  color: #4d7cbc;
}
.dark_btn:disabled,
.light_btn:disabled {
  background-color: grey;
  cursor: not-allowed;
  border: 1px solid grey;
}
.dark_seat,
.light_seat {
  margin-bottom: 10px;
}
.dark_btn:hover,
.light_btn:hover {
  background-color: #fff;
  color: #4d7cbc;
}
.dark_btn:disabled:hover,
.light_btn:disabled:hover {
  background-color: grey;
  cursor: not-allowed;
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
  color: white;
}
.dark_btn.vip_seats:disabled,
.light_btn.vip_seats:disabled {
  background-color: grey;
  cursor: not-allowed;
  color: white;
}
.dark_btn.vip_seats:disabled:hover,
.light_btn.vip_seats:disabled:hover {
  background-color: grey;
  cursor: not-allowed;
  color: white;
  border-radius: 15px;
  width: 100px;
  margin-left: 90px;
}

.light_btn.vip_seats {
  border: 1px solid #4d7cbc;
  background-color: transparent;
  border-radius: 15px;
}
.screen-element {
  width: 70%;
  height: 130px;
  border-radius: 65px;
  margin: 20px auto;
  border: 1px solid #4d7cbc;
}
</style>
