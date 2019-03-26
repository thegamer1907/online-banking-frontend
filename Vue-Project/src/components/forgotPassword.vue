<template>
  <div class="row">
    <div class="col-lg-4 col-md-2 col-sm-1"></div>
    <div class="col-lg-4 col-md-8 com-sm-10">
      <br>
      <br>
      <br>
      <br>
      <h1>Reset Password</h1>
      <br>
      <form v-on:submit.prevent="reset">
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
        <br>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    <div class="col-lg-4 col-md-2 col-sm-1"></div>
    <modal name="notifyLog" :height="'auto'" @closed="clearMsg">
      <div class="modalColor">{{msg}}</div>
    </modal>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      email: "",
      msg: ""
    };
  },
  methods: {
    reset: function() {
      if (this.errors.has("email") || !this.fields.email.dirty) {
        this.msg = "Enter a valid email";
        this.$modal.show("notifyLog");
      } else {
        this.$http
          .post(
            this.$API_LOCATION + "/forgotpassword",
            {
              email: this.email
            },
            {
              emulateJSON: true
            }
          )
          .then(
            response => {
              this.email = "";
              if (response.body.message) {
                this.msg = response.body.message;
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
