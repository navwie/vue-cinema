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
        <div class="d-flex">
          <p
            :class="this.getDarkTheme ? 'dark_p' : 'light_p'"
            style="width: 120px"
          >
            {{ $t("contacts.address") }}:
          </p>
          <p
            :class="this.getDarkTheme ? 'dark_p' : 'light_p'"
            style="margin-left: 15px"
          >
            {{ contacts[0].address }}
          </p>
        </div>
        <div class="d-flex">
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
              {{ contacts[0].firstPhone }}
            </p>
            <p
              :class="this.getDarkTheme ? 'dark_p' : 'light_p'"
              style="margin-left: 15px"
              v-if="contacts[0].secondPhone !== null"
            >
              {{ contacts[0].secondPhone }}
            </p>
            <p
              :class="this.getDarkTheme ? 'dark_p' : 'light_p'"
              style="margin-left: 15px"
              v-if="contacts[0].thirdPhone !== null"
            >
              {{ contacts[0].thirdPhone }}
            </p>
          </div>
        </div>
        <div class="d-flex">
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
            {{ contacts[0].email }}
          </p>
        </div>
        <div class="d-flex">
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
            {{ contacts[0].instagram }}
          </p>
        </div>
      </div>
      <div><google-map :contacts="contacts" /></div>
    </div>
  </div>
</template>

<script>
import { getInfoContacts } from "@/api/api_request";
import googleMap from "@/components/GoogleMap.vue";
import { mapGetters } from "vuex";
export default {
  name: "ContactPage",
  components: { googleMap },
  computed: {
    ...mapGetters(["getDarkTheme"]),
  },
  data() {
    return {
      contacts: [],
    };
  },
  beforeMount() {
    getInfoContacts().then((response) => {
      this.contacts = response.data;
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
  font-size: 17px;
  height: 41px;
  padding: 8px;
  background-color: #20242c;
  font-weight: 500;
}

.light_p {
  color: white;
  font-size: 17px;
  height: 41px;
  padding: 8px;
  background-color: grey;
  font-weight: 500;
}

.info-block {
  max-width: 50%;
  border: 1px solid #4d7cbc;
  border-radius: 15px;
  padding: 22px 10px;
}
.container {
  height: 100vh;
}
h2 {
  position: relative;
  top: 20px;
}
</style>
