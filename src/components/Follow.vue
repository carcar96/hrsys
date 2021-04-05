<template>
  <div id="follow">
    <el-dialog
      :title="'跟进动态 - ' + user"
      v-model="dialogVisible"
      @close="close"
    >
      <el-table
        :data="list"
        border
        size="medium"
        :header-cell-style="{ backgroundColor: '#F7F7F7' }"
        :cell-style="setCellColor"
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
          property="content"
          label="跟进内容"
          align="center"
        ></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Follow",
  props: ["isShow", "info"],
  data() {
    return {
      dialogVisible: false,
      user: "",
      list: [],
    };
  },
  watch: {
    isShow(newVal) {
      this.dialogVisible = newVal;
    },
    info(newData) {
      this.user = newData.name;
      //   this.list = newData.list;
      this.list = [
        {
          date: "2016-05-04",
          content: "上海市普陀区金沙江路 1518 弄",
        },

        {
          date: "2016-05-03",
          content: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          content: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          content: "上海市普陀区金沙江路 1518 弄",
        },
      ];
    },
  },
  methods: {
    setCellColor({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return "background-color: #F7F7F7;";
      }
    },
    sortChange(data) {
      console.log(data);
    },
    close() {
      this.$emit("closeFollow", false);
    },
  },
};
</script>