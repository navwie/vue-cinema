<template>
  <div class="container">
    <div class="d-flex" style="position: relative; top: 20px">
      <img
        src="../../assets/images/souvenir_icon.png"
        alt=""
        class="icon mt-5 img-fluid"
      />
      <p :class="this.getDarkTheme ? 'dark_text' : 'light_text'" class="mt-5">
        {{ $t("addnewproduct.title_souvenir") }}
      </p>
    </div>
    <hr />
    <form class="form container" @submit.prevent>
      <div class="form-element">
        <div>
          <MyInput
            v-focus
            v-model="form.name"
            style="width: 60%"
            type="text"
            :placeholder="$t(`addnewproduct.name`)"
          />
          <MyInput
            v-focus
            v-model="form.price"
            type="text"
            style="width: 60%"
            :placeholder="$t(`addnewproduct.price`)"
          />
          <MyInput
            v-focus
            v-model="form.file"
            type="file"
            @change="choosePhoto"
            style="width: 60%"
          />
          <MyInput
            v-focus
            v-model="form.amount"
            type="text"
            style="width: 60%"
            :placeholder="$t(`addnewproduct.amount`)"
          />
        </div>
        <div>
          <MyButton class="butn" type="submit" @click="submit">
            {{ $t("addnewproduct.add") }}
          </MyButton>
        </div>
        <div :class="this.getDarkTheme ? 'dark_link' : 'light_link'">
          <a @click="$router.push('/adminMain')" href="#">
            {{ $t("addnewproduct.cancel") }}
          </a>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import { mapGetters } from "vuex";
import {
  createSouvenir,
  createSouvenirShop,
  imageSouvenirUpload,
} from "@/api/api_request";

export default {
  name: "AddNewSouvenir",
  components: { MyButton },
  data() {
    return {
      form: {
        name: "",
        price: "",
        file: "",
        amount: "",
      },
    };
  },
  computed: {
    ...mapGetters(["getDarkTheme"]),
    ...mapGetters({
      getShopId: "auth/getShopId",
    }),
  },
  methods: {
    choosePhoto(event) {
      this.form.file = event.target.files[0];
    },
    submit() {
      createSouvenir({
        name: this.form.name,
        price: this.form.price,
      })
        .then((response) => {
          let formData = new FormData();
          formData.append("image", this.form.file);
          imageSouvenirUpload(response.data.souvenir.id, formData);
          createSouvenirShop({
            shop_id: this.getShopId,
            souvenir_id: response.data.souvenir.id,
            amount: this.form.amount,
          }).then(() => {
            this.$swal({
              icon: "success",
              color: "#000",
              timer: 4000,
              timerProgressBar: true,
              showClass: {
                popup: "animate__animated animate__fadeInDown",
              },
              hideClass: {
                popup: "animate__animated animate__fadeOutUp",
              },
            });
            this.$router.push("/adminMain");
          });
        })
        .catch(() => {
          this.$swal({
            icon: "error",
            color: "#000",
            title: this.$t("something_went_wrong.title"),
            text: this.$t("something_went_wrong.text"),
            timer: 4000,
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
            timerProgressBar: true,
          });
        });
    },
  },
};
</script>

<style scoped>
hr {
  margin-top: 30px;
  border: none;
  height: 3px;
  color: #4d7cbc;
  background-color: #4d7cbc;
}
p {
  font-size: 20px;
}
.dark_text {
  opacity: 1;
  color: white;
  position: relative;
  font-weight: 700;
  top: 22px;
  font-size: 27px;
  margin-left: 30px;
}

.light_text {
  opacity: 1;
  color: black;
  position: relative;
  font-weight: 700;
  top: 22px;
  font-size: 27px;
  margin-left: 30px;
}
.form {
  text-align: center;
  color: white;
  position: relative;
  top: 60px;
}
.form-element {
  border: 1px solid #4d7cbc;
  padding-top: 84px;
  padding-bottom: 80px;
  border-radius: 20px;
}
.input {
  margin-top: 15px;
  margin-bottom: 15px;
}
.butn {
  margin-top: 20px;
  background-color: #4d7cbc;
  color: white;
  width: 26%;
  border-radius: 20px;
  font-size: 19px;
  font-weight: 500;
}
.butn:hover {
  background-color: #fff;
  color: #4d7cbc;
}
.dark_link a {
  margin-top: 20px;
  color: white;
  position: relative;
  top: 20px;
  padding: 10px 20px;
  text-decoration: none;
  border: 1px solid #4d7cbc;
  font-size: 20px;
  border-radius: 15px;
}
.light_link a {
  margin-top: 20px;
  color: black;
  border: 1px solid #4d7cbc;
  padding: 10px;
  text-decoration: none;
  position: relative;
  top: 20px;
  border-radius: 15px;
  font-size: 20px;
}
</style>
