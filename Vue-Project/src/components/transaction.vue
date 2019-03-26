<template>
  <div>
    <br>
    <div :is="currentComponent"></div>
    <div class="row" v-show="!currentComponent">
      <div class="col-lg-3 col-md-2 col-sm-1"></div>
      <div class="col-lg-6 col-md-8 com-sm-10">
        <br>
        <br>
        <h2>Send Money</h2>
        <br>
        <form v-on:submit.prevent="send">
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
          <div class="form-group">
            <label for="amount">Amount:</label>
            <input
              type="number"
              class="form-control"
              name="amount"
              placeholder="Amount to transfer"
              v-model="amount"
            >
          </div>
          <br>
          <button type="submit" class="btn btn-primary">Send</button>
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
import otp from "./otp.vue";

export default {
  name: "app",
  components: {
    otp
  },
  data() {
    return {
      account_no: "",
      msg: "",
      amount: "",
      currentComponent: null,
      flag: false
    };
  },
  methods: {
    swapComponent: function(component) {
      this.currentComponent = component;
    },
    send: function() {
      if (this.account_no.trim() === "") {
        this.msg = "Enter a valid input";
        this.$modal.show("notifyLog");
      } else {
        this.$http
          .post(
            this.$API_LOCATION + "/starttransfer",
            {
              account_no: this.account_no,
              amount: this.amount
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
        this.swapComponent("otp");
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

