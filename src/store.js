import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async register(context, data) {
      try {
        let response = await axios.post("/api/users", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async login(context, data) {
      try {
        let response = await axios.post("/api/users/login", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async logout(context) {
      try {
        await axios.delete("/api/users");
        context.commit('setUser', null);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getUser(context) {
      try {
        let response = await axios.get("/api/users");
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async created() {
      await this.$store.dispatch("getUser");
      await this.$store.dispatch("getMyPhotos");
    },


    async submitPickUp(context, data) {
      try {
        await axios.post("/api/request/pickup", data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async submitDropOff(context, data) {
      try {
        await axios.post("/api/request/dropoff", data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getPickUps() {
      try {
        let response = await axios.get("/api/request/pickup");
        return response.data;
      } catch (error) {
        return "";
      }
    },
    async getDropOffs() {
      try {
        let response = await axios.get("/api/request/dropoff");
        return response.data;
      } catch (error) {
        return "";
      }
    },
    async deleteRequest(id) {
      try {
        await axios.delete("/api/request/" + id);
        return "";
      } catch (error) {
        return "";
      }
    }
  }
})