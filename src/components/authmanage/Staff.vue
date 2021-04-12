<template>
  <div id="auth-staff" class="auth-staff">
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
          <el-table-column
            prop="nickname"
            label="登录名"
            sortable
            align="center"
          >
          </el-table-column>
          <el-table-column prop="name" label="姓名" sortable align="center">
          </el-table-column>
          <el-table-column prop="level" label="职级" sortable align="center">
            <template #default="scope">
              {{ computedLevel(scope.row.level) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="department"
            label="所属部门"
            sortable
            align="center"
          >
            <template #default="scope">
              {{ computedDepart(scope.row.department) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="group"
            label="所属分组"
            sortable
            align="center"
          >
            <template #default="scope">
              <span>{{
                scope.row.level == 1
                  ? "-"
                  : computedGroup(scope.row.department, scope.row.group)
              }}</span>
            </template>
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
        <el-form-item label="登录名称" prop="nickname">
          <el-input
            v-model="form.nickname"
            placeholder="请输入登录名称"
            maxlength="16"
          ></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入登录密码"
            maxlength="18"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入员工姓名"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属级别" prop="level">
          <el-select v-model="form.level" placeholder="请选择">
            <el-option
              v-for="item in levelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门" prop="department">
          <el-select v-model="form.department" placeholder="请选择">
            <el-option
              v-for="item in levelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="所属小组"
          prop="group"
          v-show="form.level != 1 && form.level != 2"
        >
          <el-select v-model="form.group" placeholder="请选择">
            <el-option
              v-for="item in levelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责渠道" prop="channel">
          <el-select v-model="form.channel" placeholder="请选择">
            <el-option
              v-for="item in levelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责安置" prop="place">
          <el-select v-model="form.place" placeholder="请选择">
            <el-option
              v-for="item in levelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            :rows="2"
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
import { staffLevelOptions } from "@/assets/js/dropdown.js";
export default {
  name: "Staff",
  data() {
    const checkGroup = (rule, value, callback) => {
      if (!value && this.form.level != 1 && this.form.level != 2) {
        callback(new Error("请选择所属小组"));
      } else {
        callback();
      }
    };
    return {
      levelOptions: staffLevelOptions,
      organOptions: [
        {
          value: "1",
          label: "招聘1部",
          groups: [
            {
              value: "1",
              label: "一组",
            },
            {
              value: "2",
              label: "二组",
            },
          ],
        },
        {
          value: "2",
          label: "招聘2部",
          groups: [
            {
              value: "1",
              label: "一组组",
            },
            {
              value: "2",
              label: "二组组",
            },
          ],
        },
      ],
      list: [
        {
          nickname: "likai",
          name: "李凯",
          level: "1",
          department: "1",
          group: "",
          status: 1,
          date: "2020-09-17 18:13:46",
          note: "李总添加",
          password: "123456",
        },
        {
          nickname: "wangkai",
          name: "王凯",
          level: "2",
          department: "1",
          group: "2",
          status: 0,
          date: "2020-09-17 18:13:46",
          note: "李总添加",
          password: "123456",
        },
        {
          nickname: "lisi",
          name: "李四",
          level: "2",
          department: "2",
          group: "1",
          status: 1,
          date: "2020-09-17 18:13:46",
          note: "李总添加",
          password: "123456",
        },
        {
          nickname: "wangwu",
          name: "王五",
          level: "3",
          department: "2",
          group: "2",
          status: 0,
          date: "2020-09-17 18:13:46",
          note: "李总添加",
          password: "123456",
        },
      ],
      currentPage: 4,
      hideOnSinglePage: false,
      form: {},
      rules: {
        nickname: [
          { required: true, message: "登录名称不能为空", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9_-]{4,16}$/,
            message: "4 到 16 位（字母，数字，下划线，减号）",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "登录密码不能为空", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9!@#$%^&]{6,18}$/,
            message: "6 到 18 位（字母，数字，特殊字符：!@#$%^&*）",
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "员工姓名不能为空", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "2 到 10 个字符",
            trigger: "blur",
          },
        ],
        level: [
          { required: true, message: "请选择所属级别", trigger: "change" },
        ],
        department: [
          { required: true, message: "请选择所属部门", trigger: "change" },
        ],
        group: [{ validator: checkGroup, required: true, trigger: "change" }],
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
      this.dialogTitle = "员工修改";
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
    },
    handleAdd() {
      this.dialogTitle = "员工添加";
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
.auth-staff {
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