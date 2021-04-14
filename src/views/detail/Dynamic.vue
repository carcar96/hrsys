<template>
  <el-page-header @back="goBack" content="企业动态详情"> </el-page-header>
  <div id="detail-dynamic" class="detail-dynamic">
    <h1 class="title">{{ title }}</h1>
    <div v-html="content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      content: "",
    };
  },
  created() {
    console.log(this.$route.params);
    this.title = this.$route.params.title || "标题";
    this.content = this.$route.params.content || "内容";
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-page-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  box-shadow: 0 0 3px #ddd;
}
.detail-dynamic {
  padding: 20px;

  .title {
    text-align: center;
  }
}
</style>