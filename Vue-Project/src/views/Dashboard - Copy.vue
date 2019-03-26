<template>
  <div class="dashboard">
    <div class="row">
      <div class="column left" style="background-color:SlateBlue;">
        <h2>Column 1</h2>
        <p>Some text..</p>
      </div>
      <div class="column right" style="background-color:#3c3c3c;">
        <h2>Column 2</h2>
        <p>Some text..</p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "dashboard",
  components: {}
};
</script>

<style>
* {
  box-sizing: border-box;
}

/* Create two equal columns that floats next to each other */

.column {
  float: left;
  padding: 10px;
}

/* Clear floats after the columns */

.row:after {
  content: "";
  display: table;
  clear: both;
}

.left {
  width: 25%;
}

.right {
  width: 75%;
}

/* Responsive layout - makes the two columns stack on top of each other instead of next to each other */

@media screen and (max-width: 700px) {
  .column {
    width: 100%;
  }
}
</style>