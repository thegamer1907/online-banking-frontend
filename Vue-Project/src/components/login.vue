<template>
  <div>
    <div :is="currentComponent"></div>
    <div class="row" v-show="!currentComponent">
      <div class="col-lg-4 col-md-2 col-sm-1"></div>
      <div class="col-lg-4 col-md-8 com-sm-10">
        <br>
        <br>
        <br>
        <br>
        <h1>Login</h1>
        <br>
        <form v-on:submit.prevent="login">
          <div class="form-group">
            <label for="email">Email address:</label>
            <input
              type="email"
              class="form-control"
              name="email"
              v-validate="{ required:true, email: true}"
              placeholder="Email ID"
              v-model="email"
            >
          </div>
          <div class="form-group">
            <label for="pwd">Password:</label>
            <input
              id="loginPassword"
              class="form-control"
              type="password"
              name="password"
              v-validate="{ required:true}"
              placeholder="Password"
              v-model="password"
            >
          </div>
          <br>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <br>
        <span @click="swapComponent('forgotPassword')">Forgot Password?</span>
      </div>
      <div class="col-lg-4 col-md-2 col-sm-1"></div>
      <modal name="notifyLog" :height="'auto'" @closed="clearMsg">
        <div class="modalColor">{{msg}}</div>
      </modal>
    </div>
  </div>
</template> 

<script>
import forgotPassword from "./forgotPassword.vue";

export default {
  name: "app",
  components: {
    forgotPassword
  },
  created() {
    document.documentElement.style.overflow = "hidden";
    if (this.$session.exists()) {
      this.$router.push("/dashboard");
    }
    // $("#loginPassword").keypress(function(e) {
    //   if (e.which == 13) {
    //     login();
    //   }
    // });
  },
  data() {
    return {
      email: "",
      password: "",
      msg: "",
      currentComponent: null
    };
  },
  methods: {
    login: function() {
      if (this.errors.has("email") || !this.fields.email.dirty) {
        this.msg = "Enter a valid email";
        this.$modal.show("notifyLog");
      } else if (this.errors.has("password") || !this.fields.password.dirty) {
        this.msg = "Password should be entered";
        this.$modal.show("notifyLog");
      } else {
        this.$http
          .post(
            this.$API_LOCATION + "/login",
            {
              email: this.email,
              password: this.password
            },
            {
              emulateJSON: true
            }
          )
          .then(
            response => {
              this.$session.start();
              this.$session.set("jwt", response.body.token);
              this.$session.set("role", response.body.role);
              this.$session.set("email", this.email);
              this.$session.set("name", response.body.name);
              //vm.$forceUpdate();
              //vm.$set("log", true);
              this.$router.push("/dashboard");
            },
            response => {
              if (response.body.error) {
                this.msg = response.body.error;
              } else {
                this.msg = "There has been some error. Please try again later";
              }
              this.$modal.show("notifyLog");
            }
          );
      }
    },
    clearMsg: function() {
      this.msg = "";
    },
    swapComponent: function(component) {
      this.currentComponent = component;
    }
  }
};
</script>

<style scoped>
.form-group,
h1 {
  color: aliceblue;
}
span {
  color: aliceblue;
}
.modalColor {
  padding: 5%;
  font-weight: bold;
  background-color: #2c3e50;
  color: #42b983;
  height: 100%;
  text-align: center;
  font-size: 20px;
  border: solid 1px #42b983;
}
</style>
