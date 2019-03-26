<template>
  <div>
    <br>
    <div class="row">
      <div class="col-lg-3 col-md-2 col-sm-1"></div>
      <div class="col-lg-6 col-md-8 com-sm-10">
        <br>
        <br>
        <h2>Block User Account</h2>
        <br>
        <form v-on:submit.prevent="block">
          <div class="form-group">
            <label for="account_no">Account Number:</label>
            <input
              type="text"
              class="form-control"
              name="account_no"
              placeholder="A/C Number"
              v-model="account_no"
            >
          </div>
          <br>
          <button type="submit" class="btn btn-primary">Block</button>
        </form>
      </div>
      <div class="col-lg-3 col-md-2 col-sm-1"></div>
      <modal name="notifyLog" :height="'auto'" @closed="clearMsg">
        <div class="modalColor">{{msg}}</div>
      </modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      account_no: "",
      msg: ""
    };
  },
  methods: {
    block: function() {
      if (this.account_no.trim() === "") {
        this.msg = "Enter a valid input";
        this.$modal.show("notifyLog");
      } else {
        this.$http
          .post(
            this.$API_LOCATION + "/blockaccount",
            {
              account_no: this.account_no
            },
            {
              emulateJSON: true,
              headers: {
                Authorization: "Bearer " + this.$session.get("jwt")
              }
            }
          )
          .then(
            response => {
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

