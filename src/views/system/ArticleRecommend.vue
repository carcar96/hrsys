<template>
  <div id="article-rec" class="article-rec">
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
                prop="pic"
                label="图片"
                width="150"
                sortable
                align="center"
              >
                <template #default="scope">
                  <el-image
                    style="width: 100px"
                    :preview-src-list="[scope.row.pic]"
                    :src="scope.row.pic"
                  >
                  </el-image>
                </template>
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                width="100"
                sortable
                align="center"
              >
                <template #default="scope">
                  {{ computeStatus(scope.row.status) }}
                </template>
              </el-table-column>
              <el-table-column
                prop="views"
                label="浏览量"
                width="100"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="weight"
                label="排序权重"
                width="120"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column label="操作" width="200" align="center">
                <template #default="scope">
                  <el-space spacer="/">
                    <el-button
                      @click="handleEdit(scope.$index, scope.row)"
                      type="text"
                      >编辑</el-button
                    >
                    <el-button
                      @click="handleCancel(scope.$index, scope.row)"
                      type="text"
                      >{{
                        scope.row.status == 1 ? "取消推荐" : "推荐"
                      }}</el-button
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
      </el-main>
    </el-container>
    <el-dialog
      title="文章编辑"
      v-model="dialogVisible"
      @closed="closedDialog('article-rec-form')"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="article-rec-form"
        label-width="auto"
        size="medium"
        class="article-rec-form"
      >
        <el-form-item label="标题" prop="title">
          <el-input
            maxlength="20"
            show-word-limit
            v-model="form.title"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <TinymceEditor
            id="myedit"
            ref="editor"
            :value="form.content"
            @input="inputArticleContent"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitArticle('article-rec-form')"
            >提交</el-button
          >
          <el-button type="warning" @click="saveArticle('article-rec-form')"
            >保存草稿</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import TinymceEditor from "@/components/common/TinymceEditor.vue";
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
          pic:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          views: 390,
          weight: 90,
        },
        {
          id: "2",
          date: "2016-05-03",
          name: "吴宣仪",
          status: "0",
          title: "2",
          content: "<p style='color:red'>22222</p>",
          pic:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          views: 590,
          weight: 80,
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
      dialogVisible: false,
      form: {},
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
    };
  },
  methods: {
    computeStatus(status) {
      let statusText = "";
      if (status == 1) {
        statusText = "已推荐";
      } else {
        statusText = "未推荐";
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
    handleEdit(index, row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
    },
    handleCancel(index, row) {
      let tipTitle = row.status == 1 ? "确认取消推荐？" : "确认推荐？";
      this.$confirm(tipTitle, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          row.status = row.status == 1 ? 0 : 1;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("确认删除该文章？", "提示", {
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
    submitArticle(formName) {
      this.$refs[formName].validate((valid, obj) => {
        if (valid) {
          console.log("submit", this.form);
          this.dialogVisible = false;
        } else {
          console.log("error submit!!", obj);
          return false;
        }
      });
    },
    saveArticle(formName) {
      this.$refs[formName].validate((valid, obj) => {
        if (valid) {
          console.log("save", this.form);
          this.dialogVisible = false;
        } else {
          console.log("error submit!!", obj);
          return false;
        }
      });
    },
    closedDialog(formName) {
      this.$refs[formName].resetFields();
      this.form = {};
      this.dialogVisible = false;
    },
    inputArticleContent(data) {
      this.form.content = data;
      console.log(this.form.content, data);
    },
  },
};
</script>


<style lang="scss" scoped>
.article-rec {
  height: 100%;

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

  .article-rec-form {
    padding: 0 20px;
  }
}
</style>
<style>
.article-rec .el-overlay {
  z-index: 1149 !important;
}
</style>