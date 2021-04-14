<template>
  <div id="psecond" class="psecond">
    <el-container>
      <el-header height="auto;">
        <el-form
          :inline="true"
          :model="searchForm"
          :rules="searchRule"
          :hide-required-asterisk="true"
          ref="searchForm"
        >
          <el-form-item label="姓名" prop="username">
            <el-input
              size="medium"
              placeholder="请输入姓名"
              v-model="searchForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="phone">
            <el-input
              size="medium"
              placeholder="请输入手机号"
              v-model="searchForm.phone"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="idcard">
            <el-input
              size="medium"
              placeholder="请输入身份证号"
              v-model="searchForm.idcard"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select
              v-model="searchForm.sex"
              placeholder="请选择"
              style="width: 100px"
            >
              <el-option label="全部" value="0"> </el-option>
              <el-option
                v-for="item in sexOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="微信号" prop="wx">
            <el-select
              v-model="searchForm.wx"
              placeholder="请选择"
              style="width: 120px"
            >
              <el-option label="全部" value="0"> </el-option>
              <el-option
                v-for="item in wxOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系时间" prop="date">
            <el-date-picker
              v-model="searchForm.date"
              type="datetimerange"
              :shortcuts="shortcuts"
              :clearable="false"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
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
          <el-form-item>
            <el-button type="success" size="medium" @click="showAdd()"
              >新增</el-button
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
                label="联系时间"
                width="150"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="100"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="sex"
                label="性别"
                width="100"
                sortable
                align="center"
              >
                <template #default="scope">
                  {{ computeSex(scope.row.sex) }}
                </template>
              </el-table-column>
              <el-table-column
                prop="age"
                label="年龄"
                width="100"
                sortable
                align="center"
              >
                <template #default="scope">
                  <span>{{ scope.row.age }}岁</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="contact"
                label="联系方式"
                width="150"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="idcard"
                label="身份证号"
                width="200"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                label="跟进动态"
                width="120"
                sortable
                align="center"
              >
                <template #default="scope">
                  <el-button
                    @click="handleFollow(scope.$index, scope.row)"
                    type="text"
                    >查看</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column prop="note" label="备注" sortable align="center">
              </el-table-column>
              <el-table-column label="操作" width="240" align="center">
                <template #default="scope">
                  <el-space spacer="/">
                    <el-button
                      @click="handleDelete(scope.$index, scope.row)"
                      type="text"
                      >删除</el-button
                    >
                    <el-button
                      @click="handleEdit(scope.$index, scope.row)"
                      type="text"
                      >编辑</el-button
                    >
                    <el-button
                      @click="handleIntent(scope.$index, scope.row)"
                      type="text"
                      >意向开发</el-button
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
    <!-- 跟进动态 -->
    <Follow :isShow="showFollow" :info="followUser" @close="closeFollow" />
    <!-- 添加求职者 -->
    <Applicant
      :isShow="showAddDialog"
      fromType="1"
      submitType="1"
      @submit="addApplicant"
      @closed="closedAdd"
    />
    <!-- 编辑用户信息 -->
    <Applicant
      :isShow="showEditDialog"
      fromType="1"
      submitType="2"
      :formData="editForm"
      @submit="editApplicant"
      @closed="closedEdit"
    />
  </div>
</template>

<script>
import {
  sexOptions,
  wxOptions,
  workmodeOptions,
  educateOptions,
} from "@/assets/js/dropdown.js";
import Follow from "@/components/dialog/Follow.vue";
import Applicant from "@/components/dialog/Applicant.vue";
export default {
  components: {
    Follow,
    Applicant,
  },
  data() {
    const item = {
      date: "2016-05-03",
      name: "吴宣仪",
      sex: "2",
      age: "18",
      contact: "13554111308",
      lastest: "2020年6月20几号来武汉",
      wx: "augus003",
      note: "已有同事跟进",
      idcard: "429004199408203243",
      education: "本科",
      partner: "",
    };
    return {
      tableData: Array(20).fill(item),
      searchForm: {
        date: [
          new Date(new Date().getTime() - 3600 * 1000 * 24 * 7),
          new Date(),
        ],
        username: "",
        phone: "",
        sex: "0",
        wx: "0",
        idcard: "",
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
      shortcuts: [
        {
          text: "最近一周",
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          })(),
        },
        {
          text: "最近一个月",
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          })(),
        },
        {
          text: "最近三个月",
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
          })(),
        },
      ],
      sexOptions: sexOptions,
      wxOptions: wxOptions,
      workmodeOptions: workmodeOptions,
      educateOptions: educateOptions,
      currentPage: 4,
      hideOnSinglePage: false,
      //跟进动态
      showFollow: false,
      followUser: {},
      // 添加
      showAddDialog: false,
      //编辑
      showEditDialog: false,
      editForm: {},
    };
  },
  methods: {
    computeSex(sex) {
      let sexItem = this.sexOptions.find((item) => item.value == sex);
      return sexItem.label;
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
    showAdd() {
      this.showAddDialog = true;
    },
    addApplicant(data) {
      console.log("add", data);
    },
    closedAdd() {
      this.showAddDialog = false;
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
    handleFollow(index, row) {
      console.log(index, row);
      this.showFollow = true;
      this.followUser = row;
    },
    closeFollow() {
      this.showFollow = false;
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
        .catch(() => {
          console.log("已取消删除");
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.editForm = row;
      this.showEditDialog = true;
    },
    editApplicant(data) {
      console.log("edit", data);
    },
    closedEdit() {
      this.showEditDialog = false;
    },
    handleIntent(index, row) {
      console.log(index, row);
      this.$confirm("确认将该用户划分到工作台的意向开发中？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已划分",
          });
        })
        .catch(() => {
          console.log("已取消删除");
        });
    },
  },
};
</script>


<style lang="scss" scoped>
.psecond,
.el-container {
  height: 100%;
}

.table-box {
  padding-top: 0;
  padding-bottom: 0;

  .el-container,
  .el-main,
  .el-footer {
    padding: 0;
  }

  .table-title {
    padding-bottom: 15px;
    padding-left: 0;
    padding-right: 0;
    .item {
      width: 144px;
      height: 62px;
      text-align: center;
      border-radius: 5px;
      text-align: center;
      border: 1px solid rgba(187, 187, 187, 100);
      margin-right: 13px;
      margin-top: 15px;
      box-sizing: border-box;
      vertical-align: middle;
      position: relative;

      .cont {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        height: 34px;

        .num {
          font-weight: bold;
        }
        .type {
          font-size: 12px;
          color: #a2a2a2;
        }
      }
    }
  }

  .table-pagination {
    text-align: center;
    margin-top: 20px;
  }
}

.edit-form {
  .el-input {
    width: 222px;
  }
  .el-textarea {
    width: 444px;
  }
}
</style>