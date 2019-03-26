<template>
  <div>
    <center>
      <br>
      <h2 class="head">User List</h2>
    </center>
    <table id="allEvents" class="table table-hover main">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email ID</th>
          <th>Address</th>
          <th>Govt ID</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in userList" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.email}}</td>
          <td>{{item.address}}</td>
          <td>{{item.govt_id}}</td>
        </tr>
      </tbody>
    </table>

    <modal name="slotsModal" :width="'80%'" :height="'auto'">
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
      msg: ""
    };
  },

  methods: {
    fetchSlots: function() {
      this.$http
        .get(this.$API_LOCATION + "/users", {
          headers: {
            Authorization: "Bearer " + this.$session.get("jwt")
          }
        })
        .then(
          data => {
            if (data.body.auth) {
              //this.userList = data.body.data;
              let list = data.body.users;
              //console.log(list);
              this.userList = list;
              //console.log(this.userList);
            } else {
              this.msg = "There has been some error. Please try again later.";
              this.$modal.show("slotsModal");
            }
          },
          data => {
            if (data.body.error) {
              this.msg = data.body.error;
              this.$modal.show("slotsModal");
            } else {
              this.msg = "There has been some error. Please try again later.";
              this.$modal.show("slotsModal");
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
