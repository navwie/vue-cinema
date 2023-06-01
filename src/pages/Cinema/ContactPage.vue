<template>
  <div class="container">
    <h2
      class="m-auto mb-5"
      :class="this.getDarkTheme ? 'dark_title' : 'light_title'"
    >
      {{ $t("contacts.contacts") }}
    </h2>
    <div class="d-flex justify-content-between">
      <div class="row info-block">
        <div class="d-flex justify-content-between">
          <p
            :class="this.getDarkTheme ? 'dark_p' : 'light_p'"
            style="width: 120px"
          >
            {{ $t("contacts.name") }}:
          </p>
          <p
            :class="this.getDarkTheme ? 'dark_p' : 'light_p'"
            style="margin-left: 15px"
          >
            {{ contacts.name }}
          </p>
        </div>
        <div class="d-flex justify-content-between">
          <div>
            <p
              :class="this.getDarkTheme ? 'dark_p' : 'light_p'"
              style="width: 120px"
            >
              {{ $t("contacts.phone") }}:
            </p>
          </div>
          <div>
            <p
              :class="this.getDarkTheme ? 'dark_p' : 'light_p'"
              style="margin-left: 15px"
            >
              {{ contacts.phone }}
            </p>
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <p
            :class="this.getDarkTheme ? 'dark_p' : 'light_p'"
            style="width: 120px"
          >
            {{ $t("contacts.email") }}:
          </p>
          <p
            :class="this.getDarkTheme ? 'dark_p' : 'light_p'"
            style="margin-left: 15px"
          >
            {{ contacts.email }}
          </p>
        </div>
        <div class="d-flex justify-content-between">
          <p
            :class="this.getDarkTheme ? 'dark_p' : 'light_p'"
            style="width: 120px"
          >
            {{ $t("contacts.instagram") }}:
          </p>
          <p
            :class="this.getDarkTheme ? 'dark_p' : 'light_p'"
            style="margin-left: 15px"
          >
            {{ contacts.instagram }}
          </p>
        </div>
        <div class="d-flex justify-content-between">
          <p
            :class="this.getDarkTheme ? 'dark_p' : 'light_p'"
            style="width: 120px"
          >
            {{ $t("contacts.telegram") }}:
          </p>
          <p
            :class="this.getDarkTheme ? 'dark_p' : 'light_p'"
            style="margin-left: 15px"
          >
            {{ contacts.telegram }}
          </p>
        </div>
        <div class="d-flex justify-content-between">
          <p
            :class="this.getDarkTheme ? 'dark_p' : 'light_p'"
            style="width: 120px"
          >
            {{ $t("contacts.address") }}:
          </p>
          <div v-if="adminAddress">
            <p
              :class="this.getDarkTheme ? 'dark_p' : 'light_p'"
              style="margin-left: 15px"
            >
              {{ adminAddress.name }}
            </p>
          </div>
          <div v-else>
            <div v-for="address in contacts.addresses" :key="address">
              <p
                :class="this.getDarkTheme ? 'dark_p' : 'light_p'"
                style="margin-left: 15px"
              >
                {{ address.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h2 class="text-center mt-5 mb-5">Переглянути на карті адреса</h2>
      <MySelect
        v-if="adminAddress === false"
        class="mb-3"
        v-model="selectedCity"
        :options="cities"
        @change="updateMapCenter"
      />
      <div style="height: 700px">
        <l-map :zoom="zoom" :center="center" :key="center.toString()">
          <l-tile-layer :url="url"></l-tile-layer>
          <l-marker
            v-for="marker in markers"
            :key="marker.id"
            :lat-lng="marker.coordinates"
          ></l-marker>
        </l-map>
      </div>
    </div>
  </div>
</template>

<script>
import { getShops } from "@/api/api_request";
import { mapGetters } from "vuex";
import { LMap, LTileLayer, LMarker } from "vue3-leaflet";

import "leaflet/dist/leaflet.css";
export default {
  name: "ContactPage",
  components: { LMap, LTileLayer, LMarker },
  computed: {
    ...mapGetters(["getDarkTheme"]),
    ...mapGetters({
      userId: "auth/getUserId",
    }),
  },
  watch: {
    selectedCity(newCity) {
      this.updateMapCenter(newCity);
    },
  },
  data() {
    return {
      contacts: [],
      adminAddress: false,
      zoom: 10, // Уровень масштабирования карты
      center: [50.45580979616481, 30.52715970213501], // Координаты центра карты
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", // URL-адрес слоя тайлов
      markers: [],
      selectedCity: "Киев",
      cities: [
        { name: "Киев", coordinates: [50.4501, 30.5234] },
        { name: "Харьков", coordinates: [49.9935, 36.2304] },
        { name: "Одесса", coordinates: [46.4825, 30.7233] },
      ],
    };
  },
  methods: {
    updateMapCenter(city) {
      const selectedCity = this.cities.find((el) => el.name === city);
      if (selectedCity) {
        this.center = selectedCity.coordinates;
      }
    },
  },
  beforeMount() {
    getShops().then((response) => {
      this.contacts = response.data.cinemas.data[0];
      const adminAddress = this.contacts.addresses.find((item) => {
        return item.pivot.admin_id === Number(this.userId);
      });
      this.adminAddress = adminAddress || false;
      if (this.adminAddress === false) {
        this.contacts.addresses.forEach((address) => {
          this.markers.push({
            id: address.id,
            coordinates: [address.longitude, address.latitude],
          });
        });
      } else {
        this.markers.push({
          id: this.adminAddress.id,
          coordinates: [
            this.adminAddress.longitude,
            this.adminAddress.latitude,
          ],
        });
      }
    });
  },
};
</script>

<style scoped>
.dark_title {
  text-align: center;
  color: white;
  margin-top: 20px;
  margin-bottom: 40px;
}
.light_title {
  text-align: center;
  color: black;
  margin-top: 20px;
  margin-bottom: 40px;
}

.dark_p {
  color: white;
  font-size: 1.5vw;
  height: 41px;
  padding: 8px;
  background-color: #20242c;
  font-weight: 500;
}

.light_p {
  color: white;
  font-size: 1.5vw;
  height: 41px;
  padding: 8px;
  background-color: grey;
  font-weight: 500;
}

.info-block {
  max-width: 100%;
  border: 1px solid #4d7cbc;
  border-radius: 15px;
  padding: 22px 10px;
}

h2 {
  position: relative;
  top: 20px;
}
</style>
