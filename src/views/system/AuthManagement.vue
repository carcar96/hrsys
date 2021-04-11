<template>
  <div id="auth" class="auth">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="员工列表" name="staff">
        <el-container>
          <el-header>
            <el-button type="primary" size="medium" @click="handleAdd"
              >增加</el-button
            >
          </el-header>
          <el-main>
            <el-table
              :data="staffList"
              style="width: 100%"
              height="100%"
              border
              size="medium"
              :header-cell-style="{ backgroundColor: '#F3F3F3' }"
              :cell-style="setCellColor"
              @sort-change="sortChange"
            >
              <el-table-column
                label="序号"
                width="54px"
                type="index"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="nickname"
                label="登录名"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column prop="name" label="姓名" sortable align="center">
              </el-table-column>
              <el-table-column
                prop="level"
                label="职级"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="department"
                label="所属部门"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="group"
                label="所属分组"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                sortable
                align="center"
              >
                <template #default="scope">
                  <el-switch
                    :value="scope.row.status"
                    :active-value="1"
                    :inactive-value="0"
                    active-color="#13ce66"
                  ></el-switch>
                </template>
              </el-table-column>
              <el-table-column
                prop="date"
                label="添加时间"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column prop="note" label="备注" sortable align="center">
              </el-table-column>
              <el-table-column label="操作" width="150" align="center">
                <template #default="scope">
                  <el-space spacer="/">
                    <el-button
                      @click="handleEdit(scope.$index, scope.row)"
                      type="text"
                      >修改</el-button
                    >
                    <el-button
                      @click="handleDelete(scope.$index, scope.row)"
                      type="text"
                      >删除</el-button
                    >
                  </el-space>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
          <el-footer height="auto;">
            <el-pagination
              class="table-pagination"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
              :hide-on-single-page="hideOnSinglePage"
            >
            </el-pagination>
          </el-footer>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="角色权限设置" name="role">
        <el-container>
          <el-header>
            <el-button type="primary" size="medium" @click="handleAdd"
              >增加</el-button
            >
          </el-header>
          <el-main>
            <el-table
              :data="roleList"
              style="width: 100%"
              height="100%"
              border
              size="medium"
              :header-cell-style="{ backgroundColor: '#F3F3F3' }"
              :cell-style="setCellColor"
              @sort-change="sortChange"
            >
              <el-table-column
                label="序号"
                width="54px"
                type="index"
                align="center"
              >
              </el-table-column>

              <el-table-column
                prop="department"
                label="所属部门"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="level"
                label="职级"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="group"
                label="所属分组"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="number"
                label="员工数量"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                sortable
                align="center"
              >
                <template #default="scope">
                  <el-switch
                    :value="scope.row.status"
                    :active-value="1"
                    :inactive-value="0"
                    active-color="#13ce66"
                  ></el-switch>
                </template>
              </el-table-column>
              <el-table-column
                prop="date"
                label="添加时间"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column prop="note" label="备注" sortable align="center">
              </el-table-column>
              <el-table-column label="操作" width="150" align="center">
                <template #default="scope">
                  <el-space spacer="/">
                    <el-button
                      @click="handleEdit(scope.$index, scope.row)"
                      type="text"
                      >修改</el-button
                    >
                    <el-button
                      @click="handleDelete(scope.$index, scope.row)"
                      type="text"
                      >删除</el-button
                    >
                  </el-space>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
          <el-footer height="auto;">
            <el-pagination
              class="table-pagination"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
              :hide-on-single-page="hideOnSinglePage"
            >
            </el-pagination>
          </el-footer>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="渠道列表" name="channel">
        <el-container>
          <el-header>
            <el-button type="primary" size="medium" @click="handleAdd"
              >增加</el-button
            >
          </el-header>
          <el-main>
            <el-table
              :data="channelList"
              style="width: 100%"
              height="100%"
              border
              size="medium"
              :header-cell-style="{ backgroundColor: '#F3F3F3' }"
              :cell-style="setCellColor"
              @sort-change="sortChange"
            >
              <el-table-column
                label="序号"
                width="54px"
                type="index"
                align="center"
              >
              </el-table-column>

              <el-table-column
                prop="name"
                label="渠道名称"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="introduce"
                label="渠道说明"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                sortable
                align="center"
              >
                <template #default="scope">
                  <el-switch
                    :value="scope.row.status"
                    :active-value="1"
                    :inactive-value="0"
                    active-color="#13ce66"
                  ></el-switch>
                </template>
              </el-table-column>
              <el-table-column
                prop="date"
                label="添加时间"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column prop="note" label="备注" sortable align="center">
              </el-table-column>
              <el-table-column label="操作" width="150" align="center">
                <template #default="scope">
                  <el-space spacer="/">
                    <el-button
                      @click="handleEdit(scope.$index, scope.row)"
                      type="text"
                      >修改</el-button
                    >
                    <el-button
                      @click="handleDelete(scope.$index, scope.row)"
                      type="text"
                      >删除</el-button
                    >
                  </el-space>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
          <el-footer height="auto;">
            <el-pagination
              class="table-pagination"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
              :hide-on-single-page="hideOnSinglePage"
            >
            </el-pagination>
          </el-footer>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="盟友列表" name="ally">
        <el-container>
          <el-header>
            <el-button type="primary" size="medium" @click="handleAdd"
              >增加</el-button
            >
          </el-header>
          <el-main>
            <el-table
              :data="allyList"
              style="width: 100%"
              height="100%"
              border
              size="medium"
              :header-cell-style="{ backgroundColor: '#F3F3F3' }"
              :cell-style="setCellColor"
              @sort-change="sortChange"
            >
              <el-table-column
                label="序号"
                width="54px"
                type="index"
                align="center"
              >
              </el-table-column>

              <el-table-column
                prop="name"
                label="盟友名称"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="introduce"
                label="盟友说明"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                sortable
                align="center"
              >
                <template #default="scope">
                  <el-switch
                    :value="scope.row.status"
                    :active-value="1"
                    :inactive-value="0"
                    active-color="#13ce66"
                  ></el-switch>
                </template>
              </el-table-column>
              <el-table-column
                prop="date"
                label="添加时间"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column prop="note" label="备注" sortable align="center">
              </el-table-column>
              <el-table-column label="操作" width="150" align="center">
                <template #default="scope">
                  <el-space spacer="/">
                    <el-button
                      @click="handleEdit(scope.$index, scope.row)"
                      type="text"
                      >修改</el-button
                    >
                    <el-button
                      @click="handleDelete(scope.$index, scope.row)"
                      type="text"
                      >删除</el-button
                    >
                  </el-space>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
          <el-footer height="auto;">
            <el-pagination
              class="table-pagination"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
              :hide-on-single-page="hideOnSinglePage"
            >
            </el-pagination>
          </el-footer>
        </el-container>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "staff",
      staffList: [
        {
          nickname: "li kai",
          name: "李凯",
          level: "经理",
          department: "招聘1部",
          group: "1组",
          status: 1,
          date: "2020-09-17 18:13:46",
          note: "李总添加",
        },
        {
          nickname: "wang kai",
          name: "王凯",
          level: "经理",
          department: "招聘1部",
          group: "1组",
          status: 0,
          date: "2020-09-17 18:13:46",
          note: "李总添加",
        },
      ],
      roleList: [
        {
          level: "经理",
          department: "招聘1部",
          group: "1组",
          number: 3,
          status: 1,
          date: "2020-09-17 18:13:46",
          note: "李总添加",
        },
        {
          level: "主管",
          department: "招聘1部",
          group: "1组",
          number: 2,
          status: 0,
          date: "2020-09-17 18:13:46",
          note: "李总添加",
        },
      ],
      channelList: [
        {
          name: "大众行",
          introduce: "大众型是一家10年人力公司，和我司合作密切，去年交易额",
          status: 1,
          date: "2020-09-17 18:13:46",
          note: "李总添加",
        },
        {
          name: "西澳",
          introduce: "大众型是一家10年人力公司，和我司合作密切，去年交易额",
          status: 0,
          date: "2020-09-17 18:13:46",
          note: "李总添加",
        },
      ],
      allyList: [
        {
          name: "大众行",
          introduce: "大众型是一家10年人力公司，和我司合作密切，去年交易额",
          status: 1,
          date: "2020-09-17 18:13:46",
          note: "李总添加",
        },
        {
          name: "西澳",
          introduce: "大众型是一家10年人力公司，和我司合作密切，去年交易额",
          status: 0,
          date: "2020-09-17 18:13:46",
          note: "李总添加",
        },
      ],
      currentPage: 4,
      hideOnSinglePage: false,
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    setCellColor({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return "background-color: #F7F7F7;";
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    sortChange(data) {
      console.log(data);
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("确认删除该用户？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已删除",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.editForm = row;
      this.editDialogVisible = true;
    },
    handleAdd() {},
  },
};
</script>

<style lang="scss" scoped>
.auth {
  padding: 20px;
  height: 100%;
  box-sizing: border-box;

  .el-container {
    height: 100%;
  }
  .el-container,
  .el-header,
  .el-main,
  .el-footer {
    padding: 0;
  }

  .table-pagination {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
<style lang="scss">
.auth {
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