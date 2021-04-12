<template>
  <div id="share" class="share">
    <el-container>
      <el-header height="auto;">
        <el-form
          :inline="true"
          :model="searchForm"
          :rules="searchRule"
          :hide-required-asterisk="true"
          ref="searchForm"
        >
          <el-form-item label="姓名" prop="name">
            <el-input
              size="medium"
              placeholder="请输入姓名"
              v-model="searchForm.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="时间" prop="date">
            <el-date-picker
              v-model="searchForm.date"
              type="daterange"
              size="medium"
              :clearable="false"
              style="width: 240px"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              size="medium"
              @click="submitForm('searchForm')"
              >搜索</el-button
            >
            <el-button
              type="warning"
              size="medium"
              @click="resetForm('searchForm')"
              >重置</el-button
            >
            <el-button type="success" size="medium" @click="handleAddShare"
              >写分享</el-button
            >
          </el-form-item>
        </el-form>
      </el-header>
      <el-main class="table-box">
        <el-container>
          <el-main>
            <el-table
              :data="tableData"
              style="width: 100%"
              height="100%"
              border
              size="medium"
              :header-cell-style="{ backgroundColor: '#F7F7F7' }"
              :cell-style="setCellColor"
              @sort-change="sortChange"
            >
              <el-table-column
                label="序号"
                type="index"
                width="54"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="date"
                label="提交时间"
                width="120"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="120"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="title"
                label="标题"
                width="150"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="content"
                label="内容"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                width="120"
                sortable
                align="center"
              >
                <template #default="scope">
                  {{ computeStatus(scope.row.status) }}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120" align="center">
                <template #default="scope">
                  <el-button @click="handleEdit(scope.row)" type="text"
                    >查看</el-button
                  >
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
      </el-main>
    </el-container>
    <el-dialog
      title="分享"
      v-model="shareDialogVisible"
      @closed="closedShareDialog('share-form')"
    >
      <el-form
        :model="shareFormData"
        :rules="shareRules"
        ref="share-form"
        label-width="auto"
        size="small"
        class="share-form"
      >
        <el-form-item label="标题" prop="title">
          <el-input
            maxlength="20"
            show-word-limit
            v-model="shareFormData.title"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <TinymceEditor
            id="myedit"
            ref="editor"
            :value="shareFormData.content"
            @input="inputShareContent"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="addShare('share-form')"
            >提交</el-button
          >
          <el-button type="warning" @click="saveShare('share-form')"
            >保存草稿</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import TinymceEditor from "@/components/TinymceEditor.vue";
export default {
  components: { TinymceEditor },
  data() {
    return {
      tableData: [
        {
          id: "1",
          date: "2016-05-03",
          name: "吴宣仪",
          status: "1",
          title: "1",
          content: "<h1>1111111</h1>",
        },
        {
          id: "2",
          date: "2016-05-03",
          name: "吴宣仪",
          status: "2",
          title: "2",
          content: "<p style='color:red'>22222</p>",
        },
      ],
      searchForm: {
        name: "",
        date: [
          new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000),
          new Date(),
        ],
      },
      searchRule: {
        date: [
          {
            type: "array",
            required: true,
            message: "请选择日期区间",
            trigger: "change",
            fields: {
              0: { type: "date", required: true, message: "请选择开始日期" },
              1: { type: "date", required: true, message: "请选择结束日期" },
            },
          },
        ],
      },
      currentPage: 4,
      hideOnSinglePage: false,
      shareDialogVisible: false,
      shareFormData: {},
      shareRules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
    };
  },
  methods: {
    computeStatus(status) {
      let statusText = "";
      if (status == 1) {
        statusText = "保存草稿";
      } else if (status == 2) {
        statusText = "已发送";
      }

      return statusText;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid, obj) => {
        if (valid) {
          console.log("submit!", this.searchForm);
          console.log(
            this.$moment(this.searchForm.date[0]).format("YYYY-MM-DD"),
            this.$moment(this.searchForm.date[1]).format("YYYY-MM-DD")
          );
        } else {
          console.log("error submit!!", obj);
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
    handleAddShare() {
      this.shareDialogVisible = true;
    },
    handleEdit(row) {
      this.shareFormData = JSON.parse(JSON.stringify(row));
      this.shareDialogVisible = true;
    },
    addShare(formName) {
      this.$refs[formName].validate((valid, obj) => {
        if (valid) {
          console.log("add", this.shareFormData);
          this.shareDialogVisible = false;
        } else {
          console.log("error submit!!", obj);
          return false;
        }
      });
    },
    saveShare(formName) {
      this.$refs[formName].validate((valid, obj) => {
        if (valid) {
          console.log("save", this.shareFormData);
          this.shareDialogVisible = false;
        } else {
          console.log("error submit!!", obj);
          return false;
        }
      });
    },
    closedShareDialog() {
      this.shareFormData = {};
      this.shareDialogVisible = false;
    },
    inputShareContent(data) {
      this.shareFormData.content = data;
      console.log(this.shareFormData.content, data);
    },
  },
};
</script>


<style lang="scss" scoped>
.share,
.el-container {
  height: 100%;
}

.table-box {
  padding-top: 0;
  padding-bottom: 0;

  .el-container,
  .el-header,
  .el-main,
  .el-footer {
    padding: 0;
  }

  .table-title {
    font-size: 20px;
    text-align: center;
    line-height: 46px;
    background-color: #f7f7f7;
  }

  .table-pagination {
    text-align: center;
    margin-top: 20px;
  }
}

.share-form {
  padding: 0 20px;
}
</style>
<style>
.share .el-overlay {
  z-index: 1149 !important;
}
</style>