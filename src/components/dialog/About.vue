<template>
  <div id="about" class="about">
    <el-dialog title="关于" v-model="dialogVisible" @closed="closed">
      <div class="content">
        <p align="center" class="ver">
          <span>版本号：</span>
          <span class="num">{{ version }}</span>
        </p>
        <p align="center">
          版权所有：© 2021 TEC Solutions Limited. All rights reserved
          粤ICP备07025309号-3
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "About",
  props: ["isShow"],
  data() {
    return {
      dialogVisible: false,
      version: "1.0",
    };
  },
  watch: {
    isShow(newVal) {
      this.dialogVisible = newVal;
    },
  },
  methods: {
    closed() {
      this.$emit("closed", false);
    },
  },
};
</script>
<style lang="scss" scoped>
.about {
  height: inherit;
  line-height: initial;

  .content {
    line-height: 28px;
    padding-top: 10px;
    padding-bottom: 40px;

    .ver {
      font-size: 16px;

      .num {
        font-weight: bold;
      }
    }
  }
}
</style>