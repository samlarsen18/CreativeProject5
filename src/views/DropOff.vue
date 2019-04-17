<template>
  <div>
    <div class="modal-header">
      <h1 class="modal-title">Tire Drop Off</h1>
    </div>
    <div class="request row">
      <div class="col-md-6">
        <h2>Let us know when and where you'd like us to drop off your tires.</h2>
        <h3>
          Please enter the time of your appointment and the tire service centers and we will pick them up afterwards. If you have any special instructions or
          other details please include them in the "details" section.</h3>
      </div>
      <div class="modal-body col-md-6">
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
  .col-md-6 h2 {
    text-align: center;
    margin: 40px;
    margin-top: 0;
  }

  .col-md-6 h3 {
    text-align: center;
    margin: 40px;
    font-size: 20px;
    margin-top: 0;
  }

  .block {}

  .request {
    margin: 50px;
  }
</style>