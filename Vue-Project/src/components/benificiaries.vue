<template>
  <div>
    <div :is="currentComponent"></div>
    <div class="hello" v-show="!currentComponent">
      <br>
      <br>
      <br>
      <center>
        <h1>Manage Benificiaries</h1>
        <br>
        <br>
        <button @click="swapComponent('addBenificiary')" class="btn btn-primary">Add Benificiary</button>
        <br>
        <br>
        <button @click="swapComponent('viewBenificiary')" class="btn btn-primary">View Benificiaries</button>
        <br>
        <br>
        <button
          @click="swapComponent('deleteBenificiary')"
          class="btn btn-primary"
        >Delete Benificiary</button>
      </center>
    </div>
  </div>
</template>

<script>
import addBenificiary from "./addBenificiary.vue";
import viewBenificiary from "./viewBenificiary.vue";
import deleteBenificiary from "./deleteBenificiary.vue";

export default {
  name: "app",
  props: {
    msg: String
  },
  data() {
    return {
      currentComponent: null
    };
  },
  components: {
    deleteBenificiary,
    addBenificiary,
    viewBenificiary
  },
  methods: {
    swapComponent: function(component) {
      this.currentComponent = component;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
