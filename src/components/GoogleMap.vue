<template>
  <GMapMap
    :center="center"
    :zoom="15"
    map-type-id="terrain"
    style="width: 600px; height: 500px; border-radius: 15px"
  >
    <GMapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center = m.position"
    />
  </GMapMap>
</template>

<script>
export default {
  name: "GoogleMap",
  props: {
    contacts: {
      type: Array,
      required: true,
    },
  },
  beforeMount() {
    this.markers = this.contacts.map((contact) => {
      return {
        position: {
          lat: contact.latitude,
          lng: contact.longitude,
        },
      };
    });
    this.center = {
      lat: this.markers[0]?.position.lat,
      lng: this.markers[0]?.position.lng,
    };
  },
  data() {
    return {
      center: Object,
      markers: Array,
    };
  },
};
</script>

<style scoped></style>
