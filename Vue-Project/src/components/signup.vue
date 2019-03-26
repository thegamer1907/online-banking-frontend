<template>
  <div>
    <div :is="currentComponent"></div>

    <div class="row" v-show="!currentComponent">
      <div class="col-lg-4 col-md-2 col-sm-1"></div>
      <div class="col-lg-4 col-md-8 com-sm-10">
        <br>
        <br>
        <br>
        <h1>Signup</h1>
        <br>
        <form v-on:submit.prevent="signup" style="overflow:auto">
          <div class="form-group">
            <label for="name">Name:</label>
            <input
              type="text"
              class="form-control"
              name="name"
              v-validate="{ required:true}"
              placeholder="Name"
              v-model="name"
            >
          </div>
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
              class="form-control"
              type="password"
              name="password"
              v-validate="{ required:true,min:4}"
              placeholder="Password"
              v-model="password"
            >
          </div>
          <div class="form-group">
            <label for="govid">Govt ID Type:</label>
            <select v-model="govt_id_type" class="form-control">
              <option>Aadhar</option>
              <option>Driving License</option>
              <option>Pan Card</option>
            </select>
          </div>
          <div class="form-group">
            <label for="govid">Govt ID:</label>
            <input
              type="text"
              class="form-control"
              name="govid"
              v-validate="{ required:true}"
              placeholder="ID Number"
              v-model="govid"
            >
          </div>
          <div class="form-group">
            <label for="address">Address:</label>
            <input
              type="address"
              class="form-control"
              name="address"
              v-validate="{ required:true}"
              placeholder="Address"
              v-model="address"
            >
          </div>
          <br>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <br>
        <br>
        <br>
        <br>
        <br>
      </div>
      <div class="col-lg-4 col-md-2 col-sm-1"></div>
      <modal name="notifyLog" :height="'auto'" @closed="clearMsg">
        <div class="modalColor">{{msg}}</div>
      </modal>
    </div>
  </div>
</template> 

<script>
import login from "./login.vue";

export default {
  name: "app",
  beforeCreate() {
    if (this.$session.exists()) {
      this.$router.push("/DashBoard");
    }
  },
  components: {
    login
  },
  data() {
    return {
      email: "",
      password: "",
      msg: "",
      name: "",
      address: "",
      govid: "",
      govt_id_type: "",
      currentComponent: null,
      flag: false
    };
  },
  methods: {
    swapComponent: function(component) {
      this.currentComponent = component;
    },
    signup: function() {
      if (this.errors.has("email") || !this.fields.email.dirty) {
        this.msg = "Enter a valid email";
        this.$modal.show("notifyLog");
      } else if (this.errors.has("password") || !this.fields.password.dirty) {
        this.msg = "Valid Password should be entered";
        this.$modal.show("notifyLog");
      } else {
        this.$http
          .post(
            this.$API_LOCATION + "/signup",
            {
              email: this.email,
              password: this.password,
              name: this.name,
              address: this.address,
              govt_id: this.govid,
              govt_id_type: this.govt_id_type
            },
            {
              emulateJSON: true
            }
          )
          .then(
            response => {
              this.email = "";
              this.password = "";
              this.name = "";
              this.address = "";
              this.govt_id = "";
              if (response.body.message) {
                this.msg = response.body.message;
                this.flag = true;
              } else {
                this.msg = "There has been some error. Please try again later";
              }
              this.$modal.show("notifyLog");
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
      if (this.flag) {
        this.swapComponent("login");
      }
    }
  }
};
</script>

<style scoped>
.form-group,
h1 {
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
