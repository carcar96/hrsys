<template>
  <div id="auth-manage" class="auth-manage">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="部门小组" name="organ">
        <Organ />
      </el-tab-pane>
      <el-tab-pane label="员工列表" name="staff">
        <Staff />
      </el-tab-pane>
      <el-tab-pane label="角色权限设置" name="role">
        <Role />
      </el-tab-pane>
      <el-tab-pane label="渠道列表" name="channel">
        <Channel />
      </el-tab-pane>
      <el-tab-pane label="盟友列表" name="ally">
        <Ally />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Organ from "@/components/authmanage/Organ.vue";
import Staff from "@/components/authmanage/Staff.vue";
import Role from "@/components/authmanage/Role.vue";
import Channel from "@/components/authmanage/Channel.vue";
import Ally from "@/components/authmanage/Ally.vue";
export default {
  components: {
    Organ,
    Staff,
    Role,
    Channel,
    Ally,
  },
  data() {
    return {
      activeName: "organ",
    };
  },
  methods: {
    handleClick(tab) {
      console.log(tab);
    },
  },
};
</script>

<style lang="scss" scoped>
.auth-manage {
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
}
</style>
<style lang="scss">
.auth-manage {
  .el-tabs {
    height: 100%;

    .el-tabs__content {
      height: calc(100% - 41px);

      .el-tab-pane {
        height: 100%;
      }
    }
  }
}
</style>