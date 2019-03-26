<template>
  <div>
    <br>
    <div class="row">
      <div class="col-lg-3 col-md-2 col-sm-1"></div>
      <div class="col-lg-6 col-md-8 com-sm-10">
        <br>
        <br>
        <h2>Grievance Redressal</h2>
        <br>
        <form v-on:submit.prevent="add">
          <div class="form-group">
            <label for="name">Type:</label>
            <select v-model="type" class="form-control">
              <option>Feedback</option>
              <option>Complaint</option>
            </select>
            <!-- <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button @click="select('Feedback')" class="dropdown-item">Feedback</button>
              <button @click="select('Complaint')" class="dropdown-item">Complaint</button> 
            </div>-->
          </div>
          <div class="form-group">
            <label for="name">Details:</label>
            <input
              type="text"
              class="form-control"
              name="body"
              placeholder="Type it here"
              v-model="body"
            >
          </div>
          <br>
          <button type="submit" class="btn btn-primary">Submit</button>
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
      type: "Feedback",
      msg: "",
      body: ""
    };
  },
  methods: {
    // select: function(type) {
    //   this.type = type;
    // },
    add: function() {
      if (this.body.trim() === "") {
        this.msg = "Enter valid inputs";
        this.$modal.show("notifyLog");
      } else {
        this.$http
          .post(
            this.$API_LOCATION + "/filecomplaint",
            {
              type: this.type,
              message: this.body
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
              this.body = "";
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

