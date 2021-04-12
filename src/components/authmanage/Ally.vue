<template>
  <div id="auth-channel" class="auth-channel">
    <el-container>
      <el-header>
        <el-button type="primary" size="medium" @click="handleAdd"
          >增加</el-button
        >
      </el-header>
      <el-main>
        <el-table
          :data="list"
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

          <el-table-column prop="name" label="盟友名称" sortable align="center">
          </el-table-column>
          <el-table-column
            prop="introduce"
            label="盟友说明"
            sortable
            align="center"
          >
          </el-table-column>
          <el-table-column prop="status" label="状态" sortable align="center">
            <template #default="scope">
              <el-switch
                :value="scope.row.status"
                :active-value="1"
                :inactive-value="0"
                active-color="#13ce66"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="添加时间" sortable align="center">
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
    <!-- 模态框 -->
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      width="600px"
      @closed="closed('form')"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="auto"
        size="small"
        class="form"
      >
        <el-form-item label="盟友名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入盟友名称"
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="盟友说明" prop="introduce">
          <el-input
            type="textarea"
            :rows="4"
            show-word-limit
            v-model="form.introduce"
            placeholder="请输入盟友说明"
            maxlength="100"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            :rows="3"
            maxlength="50"
            show-word-limit
            v-model="form.note"
            placeholder="请输入备注"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitForm('form')"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Channel",
  data() {
    return {
      list: [
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
      form: {},
      rules: {
        name: [
          { required: true, message: "盟友名称不能为空", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "最多10个字符",
            trigger: "blur",
          },
        ],
        introduce: [
          { required: true, message: "盟友说明不能为空", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "最多100个字符",
            trigger: "blur",
          },
        ],
      },
      dialogVisible: false,
      dialogTitle: "",
    };
  },
  methods: {
    computedLevel(level) {
      let item = this.levelOptions.find((item) => item.value == level);
      return item.label;
    },
    computedDepart(depart) {
      let item = this.organOptions.find((item) => item.value == depart);
      return item.label;
    },
    computedGroup(depart, group) {
      let department = this.organOptions.find((item) => item.value == depart);
      let item = department.groups.find((item) => item.value == group);
      return item.label;
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
      this.$confirm("确认删除该盟友？", "提示", {
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
      this.dialogTitle = "盟友修改";
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
    },
    handleAdd() {
      this.dialogTitle = "盟友添加";
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid, data) => {
        if (valid) {
          this.$emit("submit", this.form);
          this.dialogVisible = false;
        } else {
          console.log("error submit!!", data);
          return false;
        }
      });
    },
    closed(formName) {
      this.$emit("closed");
      this.$refs[formName].resetFields();
      this.form = {};
    },
  },
};
</script>

<style lang="scss" scoped>
.auth-channel {
  height: 100%;

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

  .form {
    padding: 0 20px;
    .el-input {
      width: 222px;
    }
    .el-textarea {
      width: 400px;
    }
  }
}
</style>