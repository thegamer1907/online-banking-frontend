<template>
  <section class="header">
    <nav class="navbar fixed-top navbar-static-top navbar-expand-md navbar-dark bg-dark">
      <img src="/logo.png" width="4%">
      <a href="#" class="navbar-brand" style="padding-left:15px;">Patronus</a>
      <button
        class="navbar-toggler"
        type="button"
        style="background:transparent;"
        data-toggle="collapse"
        data-target="#navbar7"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="navbar-collapse collapse justify-content-stretch"
        id="navbar7"
        style="background:transparent;"
      >
        <ul class="navbar-nav ml-auto" style="background:transparent;">
          <li class="nav-item" v-if="loggedIn">
            <a class="nav-link" href="#">Hi {{username}}</a>
          </li>
          <li class="nav-item" v-if="loggedIn">
            <a class="nav-link" href="#">
              <router-link to="/dashboard" style="color:">Dashboard</router-link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/FAQ.html">FAQ</a>
          </li>
          <li class="nav-item" v-if="loggedIn">
            <a class="nav-link" v-on:click="logout" href="#">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </section>
</template>

<script>
export default {
  beforeMount() {
    this.sessionCheck();
  },
  name: "app",
  data() {
    return {
      username: "",
      loggedIn: false
    };
  },
  created() {
    this.username = this.$session.get("name");
  },
  methods: {
    logout: function() {
      this.$session.destroy();
      this.$router.push("/");
      this.sessionCheck();
    },
    dash: function() {
      this.$router.push("/dashboard");
    },
    sessionCheck: function() {
      if (this.$session.exists()) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    }
  }
};
</script>

<style scoped>
.navbar-brand {
  color: #42b983;
  font-weight: bold;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a {
  color: inherit;
  text-decoration: none;
}
</style>
