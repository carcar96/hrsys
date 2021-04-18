<template>
  <div id="not-found" class="not-found" ref="err"></div>
</template>

<script>
export default {
  mounted() {
    let script = document.getElementById("not-found");
    script = document.createElement("script");
    script.src =
      "http://qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js";
    script.setAttribute("homePageUrl", process.env.BASE_URL);
    script.setAttribute("homePageName", "回到我的主页");
    document.body.append(script);
  },
};
</script>
<style lang="scss" scoped>
</style>