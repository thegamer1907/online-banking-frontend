<template>
  <div>
    <center>
      <br>
      <h2 class="head">Complaints List</h2>
    </center>
    <table id="allEvents" class="table table-hover main">
      <thead>
        <tr>
          <th>ID</th>
          <th>Email ID</th>
          <th>Type</th>
          <th>Details</th>
          <th>Resolved?</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,i) in userList" :key="item.created_at" v-on:click="set(item)">
          <td>{{i+1}}</td>
          <td>{{item.email}}</td>
          <td>{{item.type}}</td>
          <td>{{item.message}}</td>
          <td>{{item.resolved}}</td>
        </tr>
      </tbody>
    </table>
    <modal name="resolveModal" :width="'80%'" :height="'auto'">
      <div class="modalColor">
        <button class="btn btn-primary" v-on:click="resolve">Resolve</button>
      </div>
    </modal>
    <modal name="notifyLog" :width="'80%'" :height="'auto'">
      <div class="modalColor">{{msg}}</div>
    </modal>
  </div>
</template>

<script>
export default {
  updated() {
    $(document).ready(function() {
      $("#allEvents").DataTable();
    });
  },
  components: {},
  data() {
    return {
      userList: "",
      msg: "",
      type: "",
      body: "",
      email: ""
    };
  },

  methods: {
    set: function(item) {
      this.type = item.type;
      this.body = item.message;
      this.email = item.email;
      this.$modal.show("resolveModal");
    },
    resolve: function() {
      this.$http
        .post(
          this.$API_LOCATION + "/resolvecomplaint",
          {
            type: this.type,
            message: this.body,
            email: this.email
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
    },
    fetchSlots: function() {
      this.$http
        .get(this.$API_LOCATION + "/viewcomplaint", {
          headers: {
            Authorization: "Bearer " + this.$session.get("jwt")
          }
        })
        .then(
          data => {
            if (data.body.success) {
              //this.userList = data.body.data;
              let list = data.body.complaints;
              //console.log(list);
              this.userList = list;
              //console.log(this.userList);
            } else {
              this.msg = "There has been some error. Please try again later.";
              this.$modal.show("notifyLog");
            }
          },
          data => {
            if (data.body.error) {
              this.msg = data.body.error;
              this.$modal.show("notifyLog");
            } else {
              this.msg = "There has been some error. Please try again later.";
              this.$modal.show("notifyLog");
            }
          }
        );
    }
  },

  beforeMount() {
    this.fetchSlots();
  }
};
</script>

<style scoped>
* {
  color: aliceblue;
}
.main {
  background: #343a40;
  color: rgb(163, 161, 157) !important;
  padding: 2%;
  margin-top: 3%;
  margin-bottom: 5%;
  border-radius: 10px;
}

.head {
  color: white;
}

hr {
  width: 70%;
  background: #42b983;
  height: 4px;
  margin-bottom: 3%;
}

td {
  background: #343a40;
  color: rgb(201, 193, 193);
}

th {
  background: #343a40;
  color: #42b983;
}

.modalColor {
  padding: 5%;
  font-weight: bold;
  background-color: #343a40;
  color: #42b983;
  height: 100%;
  text-align: center;
  font-size: 20px;
  border: solid 1px #42b983;
}
</style>
