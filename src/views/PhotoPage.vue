<template>
  <div>
    <div v-if="photo">
      <p class="photoTitle">{{photo.title}}</p>
      <img :src="photo.path" />

      <p class="photoDate">
        <span v-if="photo.user.name">{{photo.user.name}}, </span>
        {{formatDate(photo.created)}}
      </p>
      <p>{{photo.description}}</p>
      <h1>Comments:</h1>
      <div v-for="comment in comments" v-bind:key="comment._id">
        <h3 class="name">{{comment.user.name}}</h3>
        <h4 class="content">{{comment.content}}</h4>
        <p class="time"> - {{formatDate(comment.created)}}</p>
      </div>
      <div v-if="user">
        <form @submit.prevent="submitComment" class="pure-form pure-form-aligned">
          <fieldset>
            <div class="pure-control-group">
              <label for="comment">Comment</label>
              <textarea v-model="comment" type="box" placeholder="Type your comment here"></textarea>
            </div>
            <div class="pure-controls">
              <button type="submit" class="pure-button pure-button-primary">Submit</button>
            </div>
          </fieldset>
        </form>
      </div>
      <div v-else>
        <p>If you would like to comment on photos, please register for an account or login.</p>
        <router-link to="/register" class="pure-button">Register</router-link> or
        <router-link to="/login" class="pure-button">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    name: 'PhotoPage',
    props: {
      //comments: Array
    },
    data() {
      return {
        comment: "",
        comments: [],
      }
    },
    async created() {
      try {
        await this.$store.dispatch("getPhoto", this.$route.params.id);
        await this.$store.dispatch("getUser");
        await this.getComments();

      } catch (error) {
        console.log(error);
      }
    },
    methods: {
      formatDate(date) {
        if (moment(date).diff(Date.now(), 'days') < 15)
          return moment(date).fromNow();
        else
          return moment(date).format('d MMMM YYYY');
      },

      async submitComment() {
        try {
          this.error = await this.$store.dispatch("submitComment", {
            content: this.comment,
            user: this.user,
            photo: this.photo,
          });
          this.comment = "";
          this.getComments();
        } catch (error) {
          console.log(error);
        }
      },
      async getComments() {
        try {
          let comments = await this.$store.dispatch("getComments", {
            photo: this.photo
          });
          this.comments = comments.filter(this.checkComment);
        } catch (error) {
          console.log(error);
        }
      },
      checkComment(comment) {
        let result = comment.photo == this.photo._id;
        return result;
      },
    },
    computed: {
      user() {
        return this.$store.state.user;
      },
      photo() {
        return this.$store.state.photo;
      },
    },
  }
</script>

<style scoped>
  img {
    max-width: 1000px;
    max-height: 1000px;
  }

  .content {
    margin: 0px;
    margin-left: 20px;
    font-weight: lighter;
  }

  .name {
    margin-bottom: 10px;
  }

  .time {
    font-style: italic;
    margin: 3px;
    margin-left: 20px;
  }

  .photoTitle {
    margin: 0px;
    margin-bottom: 30px;

    font-size: 3em;
  }

  .photoDate {
    margin: 20px;
    float: center;
    font-size: 1em;
    font-weight: normal;
    font-style: italic;
  }
</style>