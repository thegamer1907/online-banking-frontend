<template>
  <div>
    <br>
    <div class="row">
      <div class="col-lg-3 col-md-2 col-sm-1"></div>
      <div class="col-lg-6 col-md-8 com-sm-10">
        <br>
        <h2>Account Summary</h2>
        <br>
        <table class="table bg-dark">
          <tr>
            <th>Account Holder:</th>
            <td>{{name}}</td>
          </tr>
          <tr>
            <th>Email ID:</th>
            <td>{{email}}</td>
          </tr>
          <tr>
            <th>Account Number:</th>
            <td>{{accNo}}</td>
          </tr>
          <tr>
            <th>Credit Balance:</th>
            <td>&#8377; {{balance}}</td>
          </tr>
          <tr>
            <th>Debit Balance:</th>
            <td>&#8377; 0</td>
          </tr>
        </table>
        <br>
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
      name: "",
      balance: "",
      msg: "",
      accNo: "",
      email: ""
    };
  },
  created() {
    this.getSummary();
  },
  methods: {
    clearMsg: function() {
      this.msg = "";
    },
    getSummary: function() {
      this.$http
        .get(this.$API_LOCATION + "/overview", {
          emulateJSON: true,
          headers: {
            Authorization: "Bearer " + this.$session.get("jwt")
          }
        })
        .then(
          response => {
            if (response.body.details) {
              let json = response.body.details;
              this.name = this.$session.get("name");
              this.accNo = json.account_no;
              this.balance = json.balance;
              this.email = json.email;
            }
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
table {
  color: aliceblue;
}
</style>

