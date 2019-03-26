<template>
  <section>
    <footer>
      <p>
        <a href="#" style="text-decoration : none; color: aliceblue;">
          Crafted with&nbsp;
          <svg class="heart" viewBox="0 0 32 29.6">
            <path
              d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
                          c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
            ></path>
          </svg>
          &nbsp;@ ASE, Coimbatore
        </a>
      </p>
    </footer>
  </section>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  }
};
</script>

<style scoped>
footer {
  position: fixed;
  text-align: center;
  bottom: 0;
  width: 100%;
  height: 40px;
  padding-top: 10px;
  background-color: #343a40;
  color: aliceblue;
  -webkit-box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1),
    0 2px 20px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1), 0 2px 20px 0 rgba(0, 0, 0, 0.1);
}
.heart {
  fill: red;
  color: red;
  position: relative;
  width: 15px;
  z-index: 5;
}
</style>
