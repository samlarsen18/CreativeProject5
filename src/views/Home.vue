<template>
  <main role="main">
    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">
      <div class="container" id="banner">
        <h1 class="display-3">Simple Seasonal Storage</h1>
        <p><a class="btn btn-primary btn-lg" href="#" role="button" id="learnMore">Learn more »</a></p>
      </div>
    </div>

    <div class="container">
      <!-- Example row of columns -->
      <div class="info">
        <h3>
          Tire Caddy is a tire storage service. Just let us know where you get your seasonal tires changed and we'll pick them up and store them.
          When it's time to change back, we'll deliver them to your choice of tire service center
        </h3>

      </div>
      <div class="row">
        <div class="col-md-6">
          <h2>Request Tire Pick-Up</h2>
          <p>Let us know the local tire service center and we'll pick up the tires after the appointment.</p>
          <router-link to="/PickUp" class="btn btn-secondary" role="button">View details »</router-link>
        </div>
        <div class="col-md-6">
          <h2>Request Tire Delivery</h2>
          <p>Give us the date and time of your appointment and your tires will be there waiting for you.</p>
          <router-link to="/DropOff" class="btn btn-secondary" role="button">View details »</router-link>
        </div>
      </div>
      <hr>
    </div>
  </main>
</template>


<script>
  export default {
    name: 'home',
  }
</script>










<style>
  .info {
    text-align: center;
    margin: 80px;
    margin-top: 40px;
  }

  .jumbotron {
    background-image: url("../../public/images/tires_lined_up.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-repeat: round;
    height: 270px;
    width: auto;
    padding-top: 50px;
    padding-bottom: 20px;
  }

  #banner {
    height: inherit;
    position: relative;
  }

  .display-3 {
    padding-top: 80px;
    color: #d4d4dc;
    text-align: center;
    font-style: oblique;
    font-size: 30px;
    font-weight: 400;
  }


  .row {
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
  }

  #learnMore {
    position: absolute;
    right: 5px;
    bottom: 53px;
  }

  @media only screen and (min-device-width: 400px) {
    .jumbotron {
      height: 400px;
    }

    #learnMore {
      right: 75px;
      bottom: 75px;
    }

    .display-3 {
      padding-top: 150px;
      font-size: 50px;
    }

    .display-3:after {
      border-bottom: 3px solid white;
      padding-bottom: 5px;
      content: '';
      display: block;
      margin-left: 43%;
      width: 10%;
    }
  }
</style>