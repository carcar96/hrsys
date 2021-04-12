<template>
  <div id="auth-role" class="auth-role">
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
              <span>{{ computedGroup(scope.row) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="number"
            label="角色数量"
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
        <el-form-item label="角色职级" prop="level">
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
        <el-form-item label="权限" prop="auths">
          <el-tree
            :data="authData"
            show-checkbox
            node-key="id"
            :default-expanded-keys="form.auths || defaultExpandedKeys"
            :default-checked-keys="form.auths"
            :props="defaultProps"
            @check="authChange"
            class="auth-tree"
            ref="tree"
          >
          </el-tree>
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
          number: 3,
          auths: ["0"],
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
          number: 3,
          auths: ["2"],
        },
        {
          nickname: "lisi",
          name: "李四",
          level: "3",
          department: "2",
          group: "",
          status: 1,
          date: "2020-09-17 18:13:46",
          note: "李总添加",
          password: "123456",
          number: 2,
          auths: ["3"],
        },
        {
          nickname: "wangwu",
          name: "王五",
          level: "4",
          department: "2",
          group: "2",
          status: 0,
          date: "2020-09-17 18:13:46",
          note: "李总添加",
          password: "123456",
          number: 3,
          auths: ["10"],
        },
      ],
      currentPage: 4,
      hideOnSinglePage: false,
      form: {},
      authData: [
        {
          id: "0",
          label: "全部",
          children: [
            {
              id: "1",
              label: "首页",
            },
            {
              id: "2",
              label: "工作台",
              children: [
                {
                  id: "2-1",
                  label: "意向开发",
                },
                {
                  id: "2-2",
                  label: "邀约面试",
                },
                {
                  id: "2-3",
                  label: "我的在职",
                },
              ],
            },
            {
              id: "3",
              label: "个人资源库",
              children: [
                {
                  id: "3-1",
                  label: "一级资源库",
                },
                {
                  id: "3-2",
                  label: "二级资源库",
                },
              ],
            },
            {
              id: "4",
              label: "企业资源库",
              children: [
                {
                  id: "4-1",
                  label: "一级资源库",
                },
                {
                  id: "4-2",
                  label: "二级资源库",
                },
              ],
            },
            {
              id: "5",
              label: "工作汇报",
              children: [
                {
                  id: "5-1",
                  label: "汇报列表",
                },
                {
                  id: "5-2",
                  label: "经验分享",
                },
              ],
            },
            {
              id: "6",
              label: "企业简章",
            },
            {
              id: "7",
              label: "企业文化",
            },
            {
              id: "8",
              label: "数据分析",
              children: [
                {
                  id: "8-1",
                  label: "公司数据分析",
                },
                {
                  id: "8-2",
                  label: "员工数据分析",
                },
                {
                  id: "8-3",
                  label: "离职求职者分析",
                },
                {
                  id: "8-4",
                  label: "企业留存分析",
                },
                {
                  id: "8-5",
                  label: "渠道留存分析",
                },
                {
                  id: "8-6",
                  label: "盟友留存分析",
                },
              ],
            },
            {
              id: "9",
              label: "报表中心",
            },
            {
              id: "10",
              label: "财务报表",
              children: [
                {
                  id: "10-1",
                  label: "公司营业收入",
                },
                {
                  id: "10-2",
                  label: "归属核对反馈表",
                },
                {
                  id: "10-3",
                  label: "渠道费用反馈表",
                },
                {
                  id: "10-4",
                  label: "项目返工表",
                },
                {
                  id: "10-5",
                  label: "项目工资表",
                },
              ],
            },
            {
              id: "11",
              label: "系统管理",
              children: [
                {
                  id: "11-1",
                  label: "权限管理",
                },
                {
                  id: "11-2",
                  label: "首页配置",
                },
                {
                  id: "11-3",
                  label: "文章推荐",
                },
                {
                  id: "11-4",
                  label: "财务管理",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
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
          { required: true, message: "角色姓名不能为空", trigger: "blur" },
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
        auths: [
          {
            type: "array",
            required: true,
            message: "请选择权限",
            trigger: "blur",
          },
        ],
      },
      dialogVisible: false,
      dialogTitle: "",
      defaultExpandedKeys: ["0"],
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
    computedGroup(row) {
      if (!row.level || row.level <= 3) {
        return "-";
      }
      let department = this.organOptions.find(
        (item) => item.value == row.department
      );
      let item = department.groups.find((item) => item.value == row.group);
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
      this.dialogTitle = "角色修改";
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
    },
    handleAdd() {
      this.dialogTitle = "角色添加";
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
      // 节点收起
      this.$nextTick(() => {
        let nodes = this.$refs.tree.store._getAllNodes();
        for (var i = 0; i < nodes.length; i++) {
          if (nodes[i].data.id != 0) {
            nodes[i].expanded = false;
          }
        }
      });
      this.$emit("closed");
      this.$refs[formName].resetFields();
      this.form = {};
      this.$refs.tree.setCheckedKeys([]);
    },
    authChange(curNode, treeChecked) {
      this.form.auths = treeChecked.checkedKeys;
    },
  },
};
</script>

<style lang="scss" scoped>
.auth-role {
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

    .auth-tree {
      padding: 5px;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      width: 222px;
      box-sizing: border-box;
      overflow: auto;
      height: 324px;
    }
  }
}
</style>