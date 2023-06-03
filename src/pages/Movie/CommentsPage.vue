<template>
  <div class="cont m-auto">
    <div class="d-flex" style="position: relative; top: 20px">
      <img
        src="../../assets/images/comments.png"
        alt=""
        class="icon mt-5 img-fluid"
      />
      <p :class="this.getDarkTheme ? 'dark_text' : 'light_text'" class="mt-5">
        {{ $t("comment.film_comments") }} "{{ movie.name }}"
      </p>
    </div>
    <hr />
    <div class="d-flex justify-content-between">
      <img
        :src="getImagePath(movie.image_path)"
        class="img-fluid image"
        alt=""
      />
      <div class="comments-info">
        <h2>{{ $t("comment.comments") }} {{ commentsCount }}</h2>
        <hr />
        <div
          class="person-comment d-flex"
          v-for="(comment, index) in this.movie.comments"
          :key="index"
        >
          <p>{{ comment.user.firstname }} {{ comment.user.lastname }}</p>
          <hr class="vertical-line" />
          <p style="font-weight: 700">{{ comment.text }}</p>
        </div>
        <h2 style="margin-top: 100px">{{ $t("comment.add_your_comment") }}</h2>
        <MyTextArea
          type="text"
          v-model="newComment"
          style="
            border-radius: 20px;
            height: 120px;
            width: 100%;
            font-size: 1.1vw;
            border: 1px solid gray;
          "
          :placeholder="$t(`comment.your_comment`)"
        />
        <div class="d-flex justify-content-center">
          <button @click="addComment" class="btn">
            {{ $t("comment.add") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  addCommentToMovie,
  createComment,
  getOneMovie,
} from "@/api/api_request";
import MyTextArea from "@/components/UI/MyTextArea.vue";

export default {
  name: "CommentsPag",
  components: { MyTextArea },
  computed: {
    ...mapGetters(["getDarkTheme"]),
    ...mapGetters({
      getUserId: "auth/getUserId",
    }),
  },
  data() {
    return {
      movie: [],
      commentsCount: 0,
      newComment: "",
    };
  },
  beforeMount() {
    getOneMovie(this.$route.params.id).then((response) => {
      this.movie = response.data.movie;
      this.commentsCount = this.movie.comments.length;
    });
  },
  methods: {
    getImagePath: function (imagePath) {
      return `http://localhost/storage/${imagePath}`;
    },
    addComment() {
      createComment({
        text: this.newComment,
        user_id: this.getUserId,
      }).then((response) => {
        addCommentToMovie({
          movie_id: this.movie.id,
          comment_id: response.data.comment.id,
        })
          .then(() => {
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
            location.reload();
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
      });
    },
  },
};
</script>

<style scoped>
.cont {
  width: 90%;
  position: relative;
  top: 30px;
  bottom: 50px;
}
.icon {
  width: 60px;
  position: relative;
  top: -10px;
  height: 30%;
}
hr {
  border: none;
  height: 3px;
  color: #4d7cbc;
  background-color: #4d7cbc;
}
.vertical-line {
  height: 50px;
  border: 1px solid #4d7cbc;
  width: 3px;
  margin-left: 20px;
  margin-right: 20px;
}

p {
  font-size: 20px;
}
.dark_text {
  opacity: 1;
  color: white;
  font-weight: 700;
  font-size: 27px;
  margin-left: 30px;
}
.light_text {
  opacity: 1;
  color: black;
  font-weight: 700;
  font-size: 27px;
  margin-left: 30px;
}
.image {
  width: 600px;
  height: 800px;
  margin-top: 100px;
  border-radius: 20px;
}
.comments-info {
  margin-top: 100px;
  width: 60%;
}
.comments-info h2 {
  text-align: center;
}
.person-comment {
  margin-top: 20px;
  border: 1px solid #4d7cbc;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 30px;
}
.person-comment p {
  margin-top: 20px;
}
.btn {
  background-color: #fff;
  border: 1px solid #4d7cbc;
  color: #4d7cbc;
  font-size: 1.1vw;
  margin-top: 20px;
  font-weight: 500;
}
</style>
