<template>
  <div id="header">
    <div class="h-left">
      <i
        @click="toggleCollapse"
        class="toggle-collapse"
        :class="isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'"
      ></i>
      <div class="breadcrumb-box">
        <i class="el-icon-location-outline"></i>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item, index) in bcList" :key="index">{{
            item
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="h-right">
      <el-badge class="item" type="danger" value="3" @click="onMessage()"
        ><i class="el-icon-message"></i
      ></el-badge>
      <el-avatar
        class="thumb"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
      <el-dropdown>
        <span class="username"
          >王小虎<i
            class="el-icon-more"
            style="margin-left: 10px; transform: rotate(90deg)"
          ></i
        ></span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="el-icon-info">关于</el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button"
              >注销</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
export default {
  name: "Header",
  props: ["isCollapse"],
  data() {
    return {};
  },
  computed: {
    bcList() {
      return this.$store.getters.getStateByKey("bcList");
    },
  },
  methods: {
    toggleCollapse() {
      this.$emit("toggleCollapse");
    },
    onMessage() {
      ElMessage.warning({
        message: "暂不支持",
        type: "warning",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.toggle-collapse:hover {
  cursor: pointer;
  color: #409eff;
}

.el-badge {
  line-height: 1;
  cursor: pointer;
}

.el-breadcrumb {
  display: inline-block;
  margin-left: 10px;
}

.el-icon-message {
  font-size: 28px;
  color: #919191;
}

.h-left {
  float: left;
  font-size: 20px;
  .breadcrumb-box {
    display: inline-block;
    margin-left: 16px;
  }
}
.h-right {
  font-size: 12px;
  text-align: right;
  float: right;

  .thumb {
    border: 1px solid #bbbbbb;
    vertical-align: middle;
    margin-left: 28px;
    margin-right: 12px;
  }

  .username {
    cursor: pointer;
  }
}
</style>