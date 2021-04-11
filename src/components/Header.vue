<template>
  <div id="header" class="c-header">
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
      <el-dropdown @command="handleCommand">
        <div class="display:inline-block">
          <el-avatar
            class="thumb"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
          <span class="username"
            >王小虎<i
              class="el-icon-more"
              style="margin-left: 10px; transform: rotate(90deg)"
            ></i
          ></span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="about" icon="el-icon-info"
              >关于</el-dropdown-item
            >
            <el-dropdown-item command="logout" icon="el-icon-switch-button"
              >注销</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <!-- 消息 -->
    <MessageListDialog :isShow="showMessage" @closed="showMessage = false" />
    <!-- 关于 -->
    <About :isShow="showAbout" @closed="showAbout = false" />
  </div>
</template>

<script>
import MessageListDialog from "@/components/MessageListDialog.vue";
import About from "@/components/About.vue";
export default {
  name: "Header",
  props: ["isCollapse"],
  components: {
    MessageListDialog,
    About,
  },
  data() {
    return {
      showMessage: false,
      showAbout: false,
    };
  },
  computed: {
    bcList() {
      return this.$store.state.bcList;
    },
  },
  methods: {
    toggleCollapse() {
      this.$emit("toggleCollapse");
    },
    onMessage() {
      this.showMessage = true;
    },
    handleCommand(command) {
      switch (command) {
        case "about":
          this.showAbout = true;
          break;
        case "logout":
          this.$message({
            message: command,
            type: "warning",
          });
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.c-header {
  padding: 0 20px !important;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
}

.toggle-collapse:hover {
  cursor: pointer;
  color: #409eff;
}

.el-badge {
  line-height: 1;
  cursor: pointer;
  margin-right: 30px;
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
    margin-right: 10px;
    cursor: pointer;
  }

  .username {
    cursor: pointer;
  }
}

.el-dropdown-menu__item {
  width: 80px;
}
</style>