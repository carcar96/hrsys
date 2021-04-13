<template>
  <div id="financial-manage" class="financial-manage">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="收入管理" name="organ">
        <Income />
      </el-tab-pane>
      <el-tab-pane label="支出管理" name="staff">
        <Expend />
      </el-tab-pane>
      <el-tab-pane label="项目营收" name="profit">
        <Profit />
      </el-tab-pane>
      <el-tab-pane label="渠道费用" name="channel">
        <Channel />
      </el-tab-pane>
      <el-tab-pane label="项目返费" name="refund">
        <Refund />
      </el-tab-pane>
      <el-tab-pane label="项目工资" name="wage">
        <Wage />
      </el-tab-pane>
      <el-tab-pane label="员工目标" name="target">
        <Target />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Income from "@/components/finanicalmanage/Income.vue";
import Expend from "@/components/finanicalmanage/Expend.vue";
import Profit from "@/components/finanicalmanage/Profit.vue";
import Channel from "@/components/finanicalmanage/Channel.vue";
import Refund from "@/components/finanicalmanage/Refund.vue";
import Wage from "@/components/finanicalmanage/Wage.vue";
import Target from "@/components/finanicalmanage/Target.vue";
export default {
  components: {
    Income,
    Expend,
    Profit,
    Channel,
    Refund,
    Wage,
    Target,
  },
  data() {
    return {
      activeName: "target",
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
.financial-manage {
  padding: 0 20px;
  height: 100%;
  box-sizing: border-box;
}
</style>
<style lang="scss">
.financial-manage {
  .el-tabs {
    height: 100%;

    .el-tabs__content {
      height: calc(100% - 66px);
      padding-top: 10px;

      .el-tab-pane {
        height: 100%;
      }
    }
  }
}
</style>