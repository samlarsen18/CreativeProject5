import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    photos: [],
    photo: null,
    comments: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setPhotos(state, photos) {
      state.photos = photos;
    },
    setPhoto(state, photo) {
      state.photo = photo;
    },
    setComments(state, comments) {
      state.comments = comments;
    }
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
    async upload(context, data) {
      try {
        await axios.post('/api/photos', data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async created() {
      await this.$store.dispatch("getUser");
      await this.$store.dispatch("getMyPhotos");
    },
    async uploadFinished() {
      this.show = false;
      try {
        this.error = await this.$store.dispatch("getMyPhotos");
      } catch (error) {
        console.log(error);
      }
    },
    async getMyPhotos(context) {
      try {
        let response = await axios.get("/api/photos");
        context.commit('setPhotos', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getAllPhotos(context) {
      try {
        let response = await axios.get("/api/photos/all");
        context.commit('setPhotos', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getPhoto(context, id) {
      try {
        let response = await axios.get("/api/photos/" + id);
        context.commit('setPhoto', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },


    //COMMENTS*********************************
    async submitComment(context, data) {
      try {
        let response = await axios.post("/api/comments/", data);
        context.commit('setComments', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },

    async getComments(context, data) {
      try {
        let response = await axios.get("/api/comments/", data);
        //context.commit('setComments', response.data);
        return response.data;
      } catch (error) {
        return "";
      }
      //console.log(this.state.comments);
    }




  }
})