<template>
  <div id="auth-organ" class="auth-organ">
    <el-container>
      <el-header>
        <el-button type="primary" size="medium" @click="handleAdd('depart')"
          >增加部门</el-button
        >
        <el-button type="success" size="medium" @click="handleAdd('group')"
          >增加小组</el-button
        >
      </el-header>
      <el-main>
        <el-table
          style="width: 100%"
          height="100%"
          size="medium"
          row-key="id"
          border
          default-expand-all
          :data="tableData"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          :header-cell-style="{ backgroundColor: '#F3F3F3' }"
          @sort-change="sortChange"
        >
          <el-table-column prop="department" label="部门" sortable>
          </el-table-column>
          <el-table-column prop="group" label="小组" sortable>
          </el-table-column>
          <el-table-column prop="number" label="员工数" sortable>
          </el-table-column>
          <el-table-column prop="date" label="添加时间" sortable>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-space spacer="/">
                <el-button
                  @click="handleEdit(scope.row, scope.$index)"
                  type="text"
                  >编辑</el-button
                >
                <el-button
                  @click="handleDelete(scope.row, scope.$index)"
                  type="text"
                  >删除</el-button
                >
              </el-space>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <!-- 部门模态框 -->
    <el-dialog
      :title="departDialogTitle"
      v-model="departDialogVisible"
      width="600px"
      @closed="closed('depart-form')"
    >
      <el-form
        :model="departForm"
        :rules="departRule"
        ref="depart-form"
        label-width="auto"
        size="small"
        class="form"
      >
        <el-form-item label="部门名称" prop="department">
          <el-input
            v-model="departForm.department"
            placeholder="请输入部门名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitForm('depart-form')"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 小组模态框 -->
    <el-dialog
      :title="groupDialogTitle"
      v-model="groupDialogVisible"
      width="600px"
      @closed="closed('group-form')"
    >
      <el-form
        :model="groupForm"
        :rules="groupRule"
        ref="group-form"
        label-width="auto"
        size="small"
        class="form"
      >
        <el-form-item label="小组名称" prop="group">
          <el-input
            v-model="groupForm.group"
            placeholder="请输入部门名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="pid">
          <el-select v-model="groupForm.pid" placeholder="请选择">
            <el-option
              v-for="item in departmentOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitForm('group-form')"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      departmentOptions: [
        { id: 1, label: "招聘部门1", value: 1 },
        { id: 2, label: "招聘部门2", value: 2 },
      ],
      tableData: [
        {
          id: 1,
          type: 1, //1-部门 2-小组
          department: "招聘1部",
          group: "",
          date: "2016-05-02",
          number: "10",
          children: [
            {
              id: 11,
              pid: 1,
              type: 2, //1-部门 2-小组
              department: "",
              group: "一组",
              number: "3",
              date: "2016-05-01",
            },
            {
              id: 12,
              pid: 1,
              type: 2, //1-部门 2-小组
              department: "",
              group: "二组",
              number: "7",
              date: "2016-05-01",
            },
          ],
        },
        {
          id: 2,
          type: 1, //1-部门 2-小组
          department: "招聘2部",
          group: "",
          date: "2016-05-02",
          number: "26",
          children: [
            {
              id: 21,
              pid: 2,
              type: 2, //1-部门 2-小组
              department: "",
              group: "一组",
              number: "13",
              date: "2016-05-01",
            },
            {
              id: 22,
              pid: 2,
              type: 2, //1-部门 2-小组
              department: "",
              group: "二组",
              number: "7",
              date: "2016-05-01",
            },
            {
              id: 22,
              pid: 2,
              type: 2, //1-部门 2-小组
              department: "",
              group: "三组",
              number: "6",
              date: "2016-05-01",
            },
          ],
        },
      ],
      currentPage: 4,
      hideOnSinglePage: false,
      // 部门
      departForm: {},
      departRule: {
        department: [
          { required: true, message: "部门名称不能为空", trigger: "blur" },
        ],
      },
      departDialogTitle: "",
      departDialogVisible: false,
      // 小组
      groupForm: {},
      groupRule: {
        group: [
          { required: true, message: "小组名称不能为空", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择所属部门", trigger: "blur" }],
      },
      groupDialogTitle: "",
      groupDialogVisible: false,
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    sortChange(data) {
      console.log(data);
    },
    handleAdd(type) {
      if (type == "depart") {
        this.departDialogVisible = true;
        this.departDialogTitle = "部门添加";
      } else if (type == "group") {
        this.groupDialogVisible = true;
        this.groupDialogTitle = "小组添加";
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid, data) => {
        if (valid) {
          this.$emit("submit", this.form);
          if (type == "depart") {
            this.departDialogVisible = false;
          } else if (type == "group") {
            this.groupDialogVisible = false;
          }
        } else {
          console.log("error submit!!", data);
          return false;
        }
      });
    },
    closed(formName) {
      console.log(formName);
      this.$refs[formName].resetFields();
    },
    handleDelete(row, index) {
      console.log(index, row);
      this.$confirm("确认删除？", "提示", {
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
    handleEdit(row, index) {
      console.log(row, index);
      if (row.type == 1) {
        this.departDialogTitle = "部门修改";
        this.departForm = JSON.parse(JSON.stringify(row));
        this.departDialogVisible = true;
      } else if (row.type == 2) {
        this.groupDialogTitle = "小组修改";
        this.groupForm = JSON.parse(JSON.stringify(row));
        this.groupDialogVisible = true;
      }
    },
  },
};
</script>

<style lang="scss">
.auth-organ {
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-header,
  .el-main {
    padding: 0;
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