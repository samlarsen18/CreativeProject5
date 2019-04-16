<template>
  <div>
    <div class="modal-header">
      <h1 class="modal-title">Tire Pick Up</h1>
    </div>
    <div class="request">
      <div class="modal-body">
        <form @submit.prevent="SubmitPickUp">
          <input v-model="time" placeholder="Time">
          <p></p>
          <input v-model="location" placeholder="Location">
          <p></p>
          <textarea v-model="details" placeholder="Details (Optional)"></textarea>
          <p></p>
          <button type="submit" class="pure-button pure-button-secondary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PickUp',
    data() {
      return {
        time: '',
        details: '',
        location: '',
      }
    },
    methods: {
      async SubmitPickUp() {
        try {
          this.error = await this.$store.dispatch("submitPickUp", {
            user: this.user,
            time: this.time,
            details: this.details,
            location: this.location,
          });
        } catch (error) {
          console.log(error);
        }
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
      } catch (error) {
        console.log(error);
      }
    },
  }
</script>
<style>
  .request {
    margin: 50px;
  }
</style>