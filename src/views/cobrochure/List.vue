<template>
  <div id="colist" class="colist">
    <el-container>
      <el-header height="auto;">
        <el-form
          :inline="true"
          :model="searchForm"
          :rules="searchRule"
          :hide-required-asterisk="true"
          ref="searchForm"
        >
          <el-form-item label="姓名" prop="company">
            <el-input
              size="medium"
              placeholder="请输入姓名"
              v-model="searchForm.company"
            ></el-input>
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
            <el-button type="success" size="medium" @click="handleAddCo"
              >添加企业</el-button
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
                prop="company"
                label="企业名称"
                width="250"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="nickname"
                label="企业简称"
                width="120"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="co_pic"
                label="企业图片"
                width="300"
                sortable
                align="center"
              >
                <template #default="scope">
                  <div v-if="scope.row.co_pic.length">
                    <el-image
                      class="table-img"
                      v-for="(item, index) in scope.row.co_pic"
                      :preview-src-list="[item.url]"
                      :src="item.url"
                      :key="index"
                    >
                    </el-image>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="introduce"
                label="企业介绍"
                sortable
                align="center"
              ></el-table-column>
              <el-table-column
                prop="msg_templete"
                width="200"
                label="短信模板"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="maintain_time"
                width="160"
                label="维护时间"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column label="操作" width="120" align="center">
                <template #default="scope">
                  <el-button @click="handleDetail(scope.row)" type="text"
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
    <!-- 添加 -->
    <el-dialog title="企业简章" v-model="dialogVisible" width="60%">
      <el-form
        :model="addForm"
        :rules="addRule"
        ref="add-form"
        label-width="auto"
        size="small"
        class="add-form"
      >
        <el-form-item label="企业名称" prop="company">
          <el-input
            maxlength="20"
            show-word-limit
            v-model="addForm.company"
          ></el-input>
        </el-form-item>
        <el-form-item label="企业简称" prop="nickname">
          <el-input
            maxlength="20"
            show-word-limit
            v-model="addForm.nickname"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="introduce">
          <TinymceEditor
            id="myedit"
            ref="editor"
            :value="addForm.introduce"
            @input="inputIntroduce"
          />
        </el-form-item>
        <el-form-item label="企业短信模板" prop="msg_templete">
          <el-input
            type="textarea"
            :rows="3"
            maxlength="200"
            show-word-limit
            v-model="addForm.msg_templete"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="co_pic">
          <UploadImage :files="addForm.co_pic" @update="updatePic" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="addCo('add-form')">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import TinymceEditor from "@/components/common/TinymceEditor.vue";
import UploadImage from "@/components/common/UploadImage.vue";
export default {
  components: {
    TinymceEditor,
    UploadImage,
  },
  data() {
    return {
      tableData: [
        {
          id: "1",
          company: "武汉凡谷电子技术股份有限公司",
          nickname: "凡谷",
          co_pic: [
            {
              name: "food.jpg",
              url:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            },
            {
              name: "food.jpg",
              url:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            },
          ],
          introduce:
            "武汉凡谷电子技术股份有限公司对外投资14家公司，具有1处分支机构。",
          maintain_time: "2016-05-03 12:15:22",

          msg_templete:
            "这里显示短信模版这里显示短信模版这里显示短信模版这里显示短信模版这里显示短信模版这里显示短信模版这里显示短信模版",
        },
        {
          id: "2",
          company: "武汉虹信通信技术有限责任公司",
          nickname: "虹信",
          co_pic: [
            {
              name: "food.jpg",
              url:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            },
          ],
          introduce:
            "武汉虹信通信技术有限责任公司（以下简称虹信公司），隶属于烽火科技集团。武汉邮电科学研究院（WRI）所属的全资子公司，是集科、工、贸于一体的高新技术企业。",
          maintain_time: "2016-05-03 12:15:22",

          msg_templete: "",
        },
      ],
      searchForm: {
        company: "",
      },
      searchRule: {},
      currentPage: 4,
      hideOnSinglePage: false,
      // 添加
      dialogVisible: false,
      addForm: {},
      addRule: {
        company: [
          { required: true, message: "请输入企业名称", trigger: "blur" },
        ],
        introduce: [
          { required: true, message: "请输入内容", trigger: "change" },
        ],
        co_pic: [{ required: true, message: "请上传图片", trigger: "change" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid, obj) => {
        if (valid) {
          console.log("submit!", this.searchForm);
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
    handleAddCo() {
      this.dialogVisible = true;
    },
    handleDetail(row) {
      // let bcList = this.$store.state.bcList;
      // bcList[1] = row.company;
      // this.$store.commit("updateStateByKey", { key: "bcList", value: bcList });
      // this.$router.push({ name: "EntDetail" }); // 跳转
      this.$router.push({ name: "EntDetail", params: row });
    },
    addCo(formName) {
      this.$refs[formName].validate((valid, obj) => {
        if (valid) {
          console.log("submit!", this.addForm);
          this.dialogVisible = false;
        } else {
          console.log("error submit!!", obj);
          return false;
        }
      });
    },
    inputIntroduce(data) {
      this.addForm.introduce = data;
    },
    updatePic(files) {
      console.log(files);
      this.addForm.co_pic = files;
    },
  },
};
</script>


<style lang="scss" scoped>
.colist,
.el-container {
  height: 100%;
}

.add-form {
  padding: 0 24px;
  .el-input,
  .el-textarea {
    width: 400px;
  }
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

  .table-img {
    width: 100px;

    & + .table-img {
      margin-left: 4px;
    }
  }

  .table-pagination {
    text-align: center;
    margin-top: 20px;
  }
}
</style>

<style>
.colist .el-overlay {
  z-index: 1149 !important;
}
</style>