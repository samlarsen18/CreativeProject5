<template>
  <div id="app">

    <body>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a class="navbar-brand" href="/">TireCaddy</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul class="nav navbar-nav ml-auto">
            <li class="nav-item active">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/About" class="nav-link">About</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/Account" class="nav-link">Account</router-link>
            </li>
          </ul>
        </div>
      </nav>

      <main role="main">
        <router-view />
      </main>
      <footer class="container">
        <p>©TireCaddy 2019</p>
        <a href="https://github.com/samlarsen18/CreativeProject5">Github</a>
      </footer>
    </body>
  </div>
</template>

<style>
  .navbar {
    position: relative;
  }

  .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  @media (min-width: 768px) {
    .bd-placeholder-img-lg {
      font-size: 3.5rem;
    }
  }
</style>