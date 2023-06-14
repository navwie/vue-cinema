<template>
  <div class="cont m-auto">
    <div class="d-flex">
      <img style="width: 4%" src="../../assets/images/calendar.png" alt="" />
      <p class="text">Орендувати зал для заходу</p>
    </div>
    <hr />
    <div class="d-flex justify-content-between">
      <div
        style="
          border: 1px solid #4d7cbc;
          padding: 20px;
          text-align: justify;
          font-size: 1.2vw;
          width: 40%;
          border-radius: 20px;
        "
      >
        Ви можете орендувати у нас простору залу, яка ідеально підходить для
        проведення різноманітних заходів. Незалежно від того, чи організуєте ви
        весільну урочистість, корпоративну подію, конференцію або навіть просто
        приватну вечірку, наша зала надасть вам все необхідне для створення
        атмосфери, що запам'ятовується.
      </div>
      <div class="w-50">
        <p>Оберіть бажану дату:</p>
        <MyInput
          style="margin-top: 20px"
          v-model="date"
          type="date"
          :placeholder="$t(`table.date_start`)"
        />
        <div class="mt-3">
          <button
            style="
              background-color: transparent;
              border: 1px solid #4d7cbc;
              border-radius: 20px;
              font-size: 1.2vw;
              padding: 10px;
              width: 30%;
              color: white;
            "
            @click="searchFreeHalls"
          >
            Застосувати
          </button>
        </div>
        <div class="mt-5" v-if="findHalls.length > 0">
          <div v-for="session in findHalls" :key="session">
            <div class="d-flex">
              <button
                @click="chooseSession(session.id)"
                :style="{
                  backgroundColor:
                    selected && selected.id === session.id
                      ? '#fffff'
                      : 'transparent',
                  color: 'white',
                  marginTop: '20px',
                  borderRadius: '20px',
                  padding: '10px',
                  fontSize: '1.1vw',
                  border: '1px solid #4d7cbc',
                }"
              >
                {{ momentDate(session.date_time) }}
              </button>
              <p v-if="selected && selected.id === session.id">
                {{ totalSum }}
              </p>
            </div>
          </div>
          <button @click="$router.push(`/payment-hall-page/` + totalSum)">
            Оплатить
          </button>
        </div>
        <div class="mt-5" v-else>
          <h2 style="font-size: 1.3vw; color: red">
            На цей день , нажаль, не має вільних залів
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { getFreeHalls } from "@/api/api_request";
import moment from "moment";

export default {
  name: "RentHall",
  data() {
    return {
      date: "",
      findHalls: [],
      totalSum: 0,
      selected: "",
    };
  },
  computed: {
    ...mapGetters({
      getAddressId: "auth/getAddressId",
    }),
  },
  methods: {
    ...mapMutations(["setSession"]),
    chooseSession(id) {
      const selectedSession = this.findHalls.find(
        (session) => session.id === id
      );
      this.totalSum = 0;
      this.selected = selectedSession;
      this.setSession(selectedSession);
      selectedSession.seats.forEach((seat) => {
        this.totalSum += Number(seat.price);
      });
    },
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
    searchFreeHalls() {
      getFreeHalls({
        addressId: this.getAddressId,
        day: this.date,
      }).then((response) => {
        this.findHalls = response.data;
      });
    },
  },
};
</script>

<style scoped>
.cont {
  width: 70%;
  position: relative;
  top: 50px;
}
hr {
  border: none;
  height: 3px;
  color: #4d7cbc;
  background-color: #4d7cbc;
}
.text {
  color: white;
  position: relative;
  font-weight: 500;
  top: 22px;
  font-size: 20px;
}
p {
  color: white;
  margin-left: 10px;
  font-size: 22px;
  position: relative;
  top: 15px;
}
</style>
