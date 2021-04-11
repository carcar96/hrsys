<template>
  <div id="layout" class="c-layout">
    <el-container class="c-container">
      <el-aside
        id="aside"
        :width="asideMaxWidth + 'px'"
        style="overflow-x: hidden"
      >
        <Aslide :isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header class="c-header">
          <Header :isCollapse="isCollapse" @toggleCollapse="toggleCollapse" />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
import Aslide from "@/components/Aslide.vue";
import Header from "@/components/Header.vue";
var elementResizeDetectorMaker = require("element-resize-detector");

export default {
  data() {
    return {
      isCollapse: false,
      asideMaxWidth: 240,
      asideMinWidth: 64,
    };
  },
  components: {
    Aslide,
    Header,
  },
  watch: {
    isCollapse() {
      this.listenAslide();
    },
    $route() {
      this.$utils.clearStoreEchart();
    },
  },
  methods: {
    listenAslide() {
      //监听元素变化
      let erd = elementResizeDetectorMaker();
      erd.listenTo(document.getElementById("aslideMenu"), (element) => {
        this.$nextTick(() => {
          // //使echarts尺寸重置
          this.$store.state.echartList.forEach((item) => {
            item.resize();
          });
          var width = element.offsetWidth;
          width = width > this.asideMaxWidth ? this.asideMaxWidth : width;
          width = width < this.asideMinWidth ? this.asideMinWidth : width;
          document.getElementById("aside").style.width = width + "px";
        });
      });
      erd.listenTo(document.getElementById("aside"), (element) => {
        this.$nextTick(() => {
          var width = element.offsetWidth;
          var aslideMenuWidth = document.getElementById("aslideMenu")
            .offsetWidth;
          // 防抖动，假设滚动条宽度20
          // 若是因aside出现竖向滚动条而导致aslideMenu的宽度变化，不应改变aside的宽度，否则会循环减少aslideMenu的宽度直至0
          if (width - 20 > aslideMenuWidth) {
            document.getElementById("aside").style.width =
              aslideMenuWidth + "px";
          }
        });
      });
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>


<style lang="scss" scoped>
.c-layout {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  .c-container {
    height: 100%;
    border: 1px solid #eee;

    .c-header {
      padding: 0;
    }

    .el-aside {
      color: #333;
      height: 100%;
      background-color: #666;
    }
  }
}
</style>