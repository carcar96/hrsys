<template>
  <router-view />
</template>
<script>
export default {
  created() {
    let loading = document.getElementById("loading");
    if (loading !== null) {
      document.body.removeChild(loading);
    }
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

textarea {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

a {
  color: #54a4fc;
  text-decoration: none;
}
a:hover {
  color: #2380e6;
}
a:active {
  color: #2380e6;
}
</style>
