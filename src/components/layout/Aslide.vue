<template>
  <div class="aslide-cont">
    <el-menu
      id="aslideMenu"
      class="el-menu-vertical"
      background-color="#4e4e4e"
      text-color="#fff"
      active-text-color="#F24A4A"
      :default-active="defaultActive"
      @select="handleSelect"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      ref="menu"
    >
      <el-menu-item index="/" class="system-box" disabled>
        <img
          class="logo"
          src="../../assets/images/logo.png"
          alt="logo"
          width="24"
        />
        <template #title>
          <span>人力资源管理系统</span>
          <i
            class="el-icon-refresh"
            :class="isRefresh ? 'rotate360' : ''"
            @click="onRefresh()"
            v-show="!isCollapse"
          ></i>
        </template>
      </el-menu-item>
      <template v-for="(nItem, nIndex) in navList" :key="nIndex">
        <el-submenu
          v-if="nItem.children && nItem.children.length"
          :index="nIndex.toString()"
        >
          <template #title>
            <i :class="nItem.icon"></i>
            <span>{{ nItem.title }}</span>
          </template>
          <el-menu-item
            v-for="(item, index) in nItem.children"
            :key="index"
            :index="item.path"
          >
            {{ item.title }}
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="nItem.path">
          <i :class="nItem.icon"></i>
          <template #title>
            <span>{{ nItem.title }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aslide",
  props: ["isCollapse"],
  data() {
    return {
      openKeys: [],
      navList: [
        {
          title: "首页",
          icon: "el-icon-house",
          path: "home",
        },
        {
          title: "工作台",
          icon: "el-icon-notebook-1",
          children: [
            {
              title: "意向开发",
              path: "intention",
            },
            {
              title: "邀约面试",
              path: "invite",
            },
            {
              title: "我的在职",
              path: "onjob",
            },
          ],
        },
        {
          title: "个人资源库",
          icon: "el-icon-folder",
          children: [
            {
              title: "一级资料库",
              path: "pfirst",
            },
            {
              title: "二级资料库",
              path: "psecond",
            },
          ],
        },
        {
          title: "企业资源库",
          icon: "el-icon-suitcase",
          children: [
            {
              title: "一级资料库",
              path: "cofirst",
            },
            {
              title: "二级资料库",
              path: "cosecond",
            },
          ],
        },
        {
          title: "工作汇报",
          icon: "el-icon-edit-outline",
          children: [
            {
              title: "汇报列表",
              path: "reportlist",
            },
            {
              title: "经验分享",
              path: "rpshare",
            },
          ],
        },
        {
          title: "企业简章",
          icon: "el-icon-office-building",
          path: "colist",
        },
        {
          title: "企业文化",
          icon: "el-icon-medal-1",
          path: "coculture",
        },
        {
          title: "数据分析",
          icon: "el-icon-data-analysis",
          children: [
            {
              title: "公司数据分析",
              path: "coanls",
            },
            {
              title: "员工数据分析",
              path: "stfanls",
            },
            {
              title: "离职求职者分析",
              path: "appanls",
            },
            {
              title: "企业留存分析",
              path: "entanls",
            },
            {
              title: "渠道留存分析",
              path: "chananls",
            },
            {
              title: "盟友留存分析",
              path: "allyanls",
            },
          ],
        },
        {
          title: "报表中心",
          icon: "el-icon-pie-chart",
          path: "rpcenter",
        },
        {
          title: "财务报表",
          icon: "el-icon-money",
          children: [
            {
              title: "公司营业收入",
              path: "revenue",
            },
            {
              title: "归属核对反馈表",
              path: "attrcheck",
            },
            {
              title: "渠道费用反馈表",
              path: "channelfb",
            },
            {
              title: "项目返费表",
              path: "refund",
            },
            {
              title: "项目工资表",
              path: "wage",
            },
          ],
        },
        {
          title: "系统管理",
          icon: "el-icon-setting",
          children: [
            {
              title: "权限管理",
              path: "authmgt",
            },
            {
              title: "首页配置",
              path: "hpcfg",
            },
            {
              title: "文章推荐",
              path: "articlercmd",
            },
            {
              title: "财务管理",
              path: "financialmgt",
            },
          ],
        },
      ],
      selectKey: "",
      isRefresh: false,
    };
  },
  computed: {
    defaultActive() {
      return this.$route.path.split("/").reverse()[0];
    },
  },
  mounted() {
    this.updateBcList(this.defaultActive); // 设置面包屑
  },
  methods: {
    onRefresh() {
      if (!this.isRefresh) {
        this.isRefresh = true;
        // this.openKeys.forEach((val) => {
        //   if (this.selectKey != val) {
        //     // this.$refs.menu.close(val);
        //   }
        // });
        setTimeout(() => {
          this.isRefresh = false;
        }, 5000);
      }
    },
    handleSelect(key, keyPath) {
      this.$router.push({ path: key });
      this.updateBcList(key);
    },
    updateBcList(key) {
      let bcList = []; // 面包屑
      this.navList.forEach((fItem, fIndex) => {
        if (fItem.path === key) {
          bcList.push(fItem.title);
          this.selectKey = fIndex.toString();
          return;
        }
        if (fItem.children) {
          fItem.children.forEach((sItem) => {
            if (sItem.path === key) {
              bcList = [fItem.title, sItem.title];
              this.selectKey = fIndex.toString();
              return;
            }
          });
        }
      });

      this.$store.commit("updateStateByKey", { key: "bcList", value: bcList });
      this.updateSelectKey();
    },
    updateSelectKey() {
      if (this.openKeys.indexOf(this.selectKey) <= -1) {
        this.openKeys.push(this.selectKey);
      }
    },
    handleOpen(key, keyPath) {
      this.openKeys.push(key);
    },
    handleClose(key, keyPath) {
      this.openKeys = this.openKeys.filter((k) => k !== key);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.system-box {
  background-color: #53a4ff !important;
  color: #fff;
  opacity: 1;
  height: 59px;
  line-height: 59px;
  cursor: default;
  .logo {
    margin-right: 6px;
  }
  i {
    margin-left: 6px;
    color: #fff;
    cursor: pointer;
  }
}
.el-menu {
  border: none;
}
.el-submenu.is-active {
  .el-submenu__title {
    & > span {
      color: #409eff;
    }
    i {
      color: #409eff;
    }
  }
}
#aslideMenu > li.el-menu-item.is-active {
  color: #409eff !important;
}

.rotate360 {
  animation: rotate360 1s ease-in-out 0.1s infinite;
}

@keyframes rotate360 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
