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
      <img class="thumb" src="@/assets/images/logo.png" alt="thumb" />
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
    width: 40px;
    height: 40px;
    border: 1px solid rgb(187, 187, 187);
    border-radius: 50%;
    vertical-align: middle;
    margin-left: 28px;
    margin-right: 12px;
    box-sizing: border-box;
  }

  .username {
    cursor: pointer;
  }
}
</style>