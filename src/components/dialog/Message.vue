<template>
  <div id="message-list" class="message-list">
    <el-dialog title="消息列表" v-model="dialogVisible" @closed="closed">
      <el-table
        border
        size="medium"
        :data="list"
        :header-cell-style="{ backgroundColor: '#F7F7F7' }"
        :cell-style="setCellColor"
        style="width: 100%"
        @sort-change="sortChange"
      >
        <el-table-column label="序号" type="index" width="54" align="center">
        </el-table-column>
        <el-table-column
          property="date"
          label="时间"
          width="120"
          sortable
          align="center"
        ></el-table-column>
        <el-table-column
          property="type"
          label="消息类型"
          width="120"
          align="center"
        >
          <template #default="scope">
            <span>{{ getTypeName(scope.row.type) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          property="title"
          label="消息标题"
          align="center"
        ></el-table-column>
        <el-table-column
          property="status"
          label="是否查看"
          width="120"
          align="center"
        >
          <template #default="scope">
            <span>{{ scope.row.status == 1 ? "已看" : "未看" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template #default="scope">
            <el-button @click="handleClick(scope.row, scope.$index)" type="text"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { msgTypeOptions } from "@/assets/js/dropdown.js";
export default {
  name: "MessageListDialog",
  props: ["isShow"],
  data() {
    return {
      dialogVisible: false,
      mtypeOptions: msgTypeOptions,
      list: [
        {
          date: "2020-12-30",
          type: "1",
          title: "招聘1部-招聘1组-章宇入职",
          status: "0", //0-未看 1-已看
        },
        {
          date: "2020-12-30",
          type: "2",
          id: "1",
          title: "元旦放假通知",
          status: "1", //0-未看 1-已看
        },
        {
          date: "2020-12-30",
          type: "3",
          title: "给企业推荐工人的三大方法",
          status: "0", //0-未看 1-已看
          id: "1",
        },
      ],
    };
  },
  watch: {
    isShow(newVal) {
      this.dialogVisible = newVal;
    },
  },
  methods: {
    getTypeName(type) {
      let item = this.mtypeOptions.find((item) => item.value == type);
      return item.label;
    },
    setCellColor({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return "background-color: #F7F7F7;";
      }
    },
    sortChange(data) {
      console.log(data);
    },
    closed() {
      this.$emit("closed", false);
    },
    handleClick(row, index) {
      console.log(row);
      switch (row.type) {
        case "1": // 入职消息
          this.list[index].status = "1";
          break;
        case "2": // 企业动态
          this.$router.push({ name: "DynamicDetail", params: row });
          break;
        case "3": // 分享
          this.$router.push({ name: "ShareDetail", params: row });
          break;
        default:
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.message-list {
  height: inherit;
  line-height: initial;
}
</style>