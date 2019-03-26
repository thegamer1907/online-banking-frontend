<template>
  <div>
    <br>
    <div class="row">
      <div class="col-lg-3 col-md-2 col-sm-1"></div>
      <div class="col-lg-6 col-md-8 com-sm-10">
        <br>
        <br>
        <h2>Add Benificiary</h2>
        <br>
        <form v-on:submit.prevent="add">
          <div class="form-group">
            <label for="name">Benificiary Name:</label>
            <input type="text" class="form-control" name="name" placeholder="Name" v-model="name">
          </div>
          <div class="form-group">
            <label for="name">Benificiary Email ID:</label>
            <input
              type="text"
              class="form-control"
              name="ben_email"
              placeholder="Email ID"
              v-model="ben_email"
            >
          </div>
          <div class="form-group">
            <label for="name">Benificiary Account Number:</label>
            <input
              type="text"
              class="form-control"
              name="ben_account_no"
              placeholder="Acc No"
              v-model="ben_account_no"
            >
          </div>
          <br>
          <button type="submit" class="btn btn-primary">Add</button>
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
      name: "",
      msg: "",
      ben_email: "",
      ben_account_no: ""
    };
  },
  methods: {
    add: function() {
      if (
        this.name.trim() === "" ||
        this.ben_email.trim() === "" ||
        this.ben_account_no.trim() === ""
      ) {
        this.msg = "Enter valid inputs";
        this.$modal.show("notifyLog");
      } else {
        this.$http
          .post(
            this.$API_LOCATION + "/addbenificiary",
            {
              name: this.name,
              ben_email: this.ben_email,
              ben_account_no: this.ben_account_no
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
              this.name = "";
              this.ben_email = "";
              this.ben_account_no = "";
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

