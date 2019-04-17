<template>
  <div class="account-content">
    <div v-if="user">
      <div class="header">
        <div>
          <h1>{{user.name}}</h1>

        </div>
        <div>
          <p>
            <a href="#" @click="logout"><i class="fas fa-sign-out-alt"></i></a>
          </p>
        </div>
      </div>
      <div class="accountInfo">
        <h3>Account info</h3>
        <div class="pure-control-group">
          <label for="username">Username: </label>
          <p title="username">{{user.name}}</p>
        </div>

        <div class="pure-control-group">
          <label for="password">Phone Number</label>
          <p title="username">{{user.phone}}</p>
        </div>
        <div class="pure-control-group">
          <label for="tires">Number of Tires</label>
          <p title="tires">{{user.tireNum}}</p>
        </div>
      </div>
      <div class="requests row">
        <div class="col-md-6">
          <h2>Pick Up Requests</h2>
          <div v-for="request in pickups" v-bind:key="request._id" class="pure-control-group request">
            <a class="btn btn-secondary" role="button" @click="deleteRequest(request._id)">X</a>
            <label for="Location">Location: </label>
            <p title="Location"> {{ request.location }}</p>
            <br>
            <label for="Time">Time: </label>
            <p title="Time"> {{ request.time }} </p>
            <br>
            <label for="Details">Details: </label>
            <p title="Details"> {{ request.details }} </p>
            <br>
            <p class="timestamp"> Submitted: {{ formatDate(request.created)}}</p>
            <br>
          </div>
          <router-link to="/PickUp" class="btn btn-secondary btn-request" role="button">Make a Pick Up Request »</router-link>
        </div>
        <div class=" col-md-6">
          <h2>Drop Off Requests</h2>
          <div v-for="request in dropoffs" v-bind:key="request._id" class="pure-control-group request">
            <a class="btn btn-secondary" role="button" @click="deleteRequest(request._id)">X</a>
            <label for="Location">Location: </label>
            <p title="Location"> {{ request.location }}</p>
            <br>
            <label for="Time">Time: </label>
            <p title="Time"> {{ request.time }} </p>
            <br>
            <label for="Details">Details: </label>
            <p title="Details"> {{ request.details }} </p>
            <br>
            <p class="timestamp"> Submitted: {{ formatDate(request.created)}}</p>
            <br>
          </div>
          <router-link to="/DropOff" class="btn btn-secondary btn-request" role="button">Make a Drop Off Request »</router-link>
        </div>
      </div>
    </div>
    <div v-else>
      <p>If you would to see requests, please register for an account or login.</p>
      <router-link to="/register" class="pure-button">Register</router-link> or
      <router-link to="/login" class="pure-button">Login</router-link>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import axios from 'axios';

  export default {
    name: 'account',
    data() {
      return {
        pickups: [],
        dropoffs: [],
        key: "",
      }
    },
    computed: {
      user() {
        return this.$store.state.user;
      },
    },
    async created() {
      try {
        await this.$store.dispatch("getUser");
        this.pickups = await this.$store.dispatch("getPickUps");
        this.dropoffs = await this.$store.dispatch("getDropOffs");
      } catch (error) {
        console.log(error);
      }
    },
    methods: {
      async logout() {
        try {
          this.error = await this.$store.dispatch("logout");
        } catch (error) {
          console.log(error);
        }
      },
      async deleteRequest(id) {
        try {
          await axios.delete("/api/request/" + id);
          this.pickups = await this.$store.dispatch("getPickUps");
          this.dropoffs = await this.$store.dispatch("getDropOffs");
        } catch (error) {
          console.log(error);
        }
      },
      formatDate(date) {
        if (moment(date).diff(Date.now(), 'days') < 15)
          return moment(date).fromNow();
        else
          return moment(date).format('d MMMM YYYY');
      },
    },

  }
</script>

<style scoped>
  .account-content {
    margin: 60px !important;
  }

  .accountInfo {
    margin: 20px;
    margin-bottom: 50px;
  }

  .btn-request {
    float: none !important;
    text-align: center;
    align-self: center;
  }

  .btn {

    display: inline;
    top: 0;
    float: right;
  }

  .timestamp {
    align-text: center;
    bottom: 10px;
  }

  .request {
    border: solid 3px black;
    padding: 10px;
  }

  label {
    font-size: 25px;
    font-weight: 400;
  }

  p {
    display: inline;
    margin-left: 10px;
  }

  .account-content {
    margin: 40px;
  }

  .header {
    display: flex;
    position: relative;
  }

  .header a {
    padding-left: 50px;
    color: #222;
    font-size: 2em;
  }

  .header svg {
    margin-top: 12px;
  }

  .col-md-6 {
    text-align: center;
  }
</style>