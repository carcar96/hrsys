<template>
  <div id="coculture" class="coculture">
    <!-- <el-form
      :inline="true"
      :model="searchForm"
      :rules="searchRule"
      :hide-required-asterisk="true"
      ref="searchForm"
    >
      <el-form-item label="公司名称" prop="company">
        <el-input
          size="medium"
          placeholder="请输入公司名称"
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
        <el-button type="warning" size="medium" @click="resetForm('searchForm')"
          >重置</el-button
        >
        <el-button type="success" size="medium" @click="handleAddNews"
          >发布动态</el-button
        >
      </el-form-item>
    </el-form> -->
    <div class="co-info">
      <p style="text-align: right">
        <el-button type="primary" size="small" @click="handleEditCulture"
          >编辑</el-button
        >
      </p>
      <h3 class="title">企业定位</h3>
      <div class="content">
        {{ coInfo.location }}
      </div>
      <h3 class="title">发展使命</h3>
      <div class="content">
        {{ coInfo.mission }}
      </div>
      <h3 class="title">核心价值观</h3>
      <div class="content" v-html="coInfo.corevalues"></div>
    </div>
    <div class="pages">
      <el-row :gutter="50">
        <el-col :md="24" :lg="12" class="inner">
          <div class="dynamic">
            <div class="title">
              <span>企业动态</span>
              <el-button type="primary" size="small" @click="handleAddNews"
                >发布</el-button
              >
            </div>
            <div class="infinite-list-wrapper">
              <ul
                class="list"
                v-infinite-scroll="loadDynamic"
                infinite-scroll-disabled="dynamicDisabled"
              >
                <li v-for="(item, i) in dynamicList" :key="i" class="list-item">
                  <el-row>
                    <el-col :span="5">
                      <div class="list-item-cell">
                        <span class="date">{{ item.date }}</span>
                      </div>
                    </el-col>
                    <el-col :span="15">
                      <div class="list-item-cell">
                        <router-link
                          :to="{
                            name: 'DynamicDetail',
                            params: item,
                          }"
                          >{{ item.title }}</router-link
                        >
                      </div>
                    </el-col>
                    <el-col :span="4" align="right">
                      <div class="list-item-cell">
                        <span>{{ item.views }}次浏览</span>
                      </div>
                    </el-col>
                  </el-row>
                </li>
              </ul>
              <div class="tip">
                <span v-if="dynamicLoading">加载中...</span>
                <span v-if="noMoreDynamic">没有更多了</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :md="24" :lg="12" class="inner">
          <div class="share">
            <div class="title">员工分享</div>
            <div class="infinite-list-wrapper">
              <ul
                class="list"
                v-infinite-scroll="loadShare"
                infinite-scroll-disabled="shareDisabled"
              >
                <li v-for="(item, i) in shareList" :key="i" class="list-item">
                  <el-row>
                    <el-col :span="5">
                      <div class="list-item-cell">
                        <span class="date">{{ item.date }}</span>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="list-item-cell">
                        <router-link
                          :to="{
                            name: 'ShareDetail',
                            params: item,
                          }"
                          >{{ item.title }}</router-link
                        >
                      </div>
                    </el-col>
                    <el-col :span="3">
                      <div class="list-item-cell">
                        <span>{{ item.author }}</span>
                      </div>
                    </el-col>
                    <el-col :span="4" align="right">
                      <div class="list-item-cell">
                        <span>{{ item.views }}次浏览</span>
                      </div>
                    </el-col>
                  </el-row>
                </li>
              </ul>
              <div class="tip">
                <span v-if="shareLoading">加载中...</span>
                <span v-if="noMoreShare">没有更多了</span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 发布动态 -->
    <el-dialog title="发布企业动态" v-model="addDialogVisible">
      <el-form
        :model="addForm"
        :rules="addRule"
        ref="add-form"
        label-width="auto"
        size="small"
        class="add-form"
      >
        <el-form-item label="标题" prop="title">
          <el-input
            maxlength="20"
            show-word-limit
            v-model="addForm.title"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <TinymceEditor
            id="myedit"
            ref="editor"
            :value="addForm.content"
            @input="inputNewsContent"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="addNews('add-form')"
            >提交</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 修改企业文化 -->
    <el-dialog title="修改企业文化" v-model="editDialogVisible" width="600px">
      <el-form
        :model="editForm"
        :rules="editRule"
        ref="edit-form"
        label-width="auto"
        size="medium"
        class="edit-form"
      >
        <el-form-item label="企业定位" prop="location">
          <el-input
            type="textarea"
            :rows="3"
            maxlength="100"
            show-word-limit
            v-model="editForm.location"
          ></el-input>
        </el-form-item>
        <el-form-item label="发展使命" prop="mission">
          <el-input
            type="textarea"
            :rows="3"
            maxlength="100"
            show-word-limit
            v-model="editForm.mission"
          ></el-input>
        </el-form-item>
        <el-form-item label="核心价值观" prop="corevalues">
          <el-input
            type="textarea"
            :rows="5"
            maxlength="200"
            show-word-limit
            v-model="editForm.corevalues"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitCulture('edit-form')"
            >提交</el-button
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
      coInfo: {
        location:
          "为企业提供更快、更优的人力资源服务，我们的成功源自于不懈地帮助客户提高生产力，提升生活品质。",
        mission:
          "为企业提供更快、更优的人力资源服务，我们的成功源自于不懈地帮助客户提高生产力，提升生活品质。",
        corevalues: `成就客户—致力于客户的满意与成功<br/>
        创业创新—追求速度和效率，专注于对客户和公司有影响的创新<br/>
        精准求实—基于事实的决策与业务管理<br/>
        诚信正直—建立信任与负责任的人际关系`,
      },
      searchForm: {
        company: "",
      },
      searchRule: {},
      // 发布动态
      addDialogVisible: false,
      addForm: {},
      addRule: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "change" }],
      },
      // 编辑企业文化
      editForm: {},
      editDialogVisible: false,
      editRule: {
        location: [
          { required: true, message: "请输入企业定位", trigger: "blur" },
        ],
        mission: [
          { required: true, message: "请输入发展使命", trigger: "blur" },
        ],
        corevalues: [
          { required: true, message: "请输入核心价值观", trigger: "blur" },
        ],
      },
      dynamicList: [
        {
          id: 1,
          date: "2020-12-14",
          title: "元旦放假通知",
          content: "元旦放假通知",
          views: 20,
        },
        {
          id: 2,
          date: "2020-12-14",
          title: "元旦放假通知",
          content: "元旦放假通知",
          views: 30,
        },
        {
          id: 2,
          date: "2020-12-14",
          title: "元旦放假通知",
          content: "元旦放假通知",
          views: 30,
        },
        {
          id: 2,
          date: "2020-12-14",
          title: "元旦放假通知",
          content: "元旦放假通知",
          views: 30,
        },
        {
          id: 2,
          date: "2020-12-14",
          title: "元旦放假通知",
          content: "元旦放假通知",
          views: 30,
        },
      ],
      shareList: [
        {
          id: 1,
          date: "2020-12-14",
          title: "给企业推荐工人的三大方法",
          content: "给企业推荐工人的三大方法",
          views: 120,
          author: "刘倩",
        },
        {
          id: 2,
          date: "2020-12-14",
          title: "如何将入职率提到最高",
          content: "如何将入职率提到最高",
          views: 130,
          author: "刘小倩",
        },
        {
          id: 2,
          date: "2020-12-14",
          title: "如何将入职率提到最高",
          content: "如何将入职率提到最高",
          views: 130,
          author: "刘小倩",
        },
        {
          id: 2,
          date: "2020-12-14",
          title: "如何将入职率提到最高",
          content: "如何将入职率提到最高",
          views: 130,
          author: "刘小倩",
        },
        {
          id: 2,
          date: "2020-12-14",
          title: "如何将入职率提到最高",
          content: "如何将入职率提到最高",
          views: 130,
          author: "刘小倩",
        },
        {
          id: 2,
          date: "2020-12-14",
          title: "如何将入职率提到最高",
          content: "如何将入职率提到最高",
          views: 130,
          author: "刘小倩",
        },
        {
          id: 2,
          date: "2020-12-14",
          title: "如何将入职率提到最高",
          content: "如何将入职率提到最高",
          views: 130,
          author: "刘小倩",
        },
        {
          id: 2,
          date: "2020-12-14",
          title: "如何将入职率提到最高",
          content: "如何将入职率提到最高",
          views: 130,
          author: "刘小倩",
        },
        {
          id: 2,
          date: "2020-12-14",
          title: "如何将入职率提到最高",
          content: "如何将入职率提到最高",
          views: 130,
          author: "刘小倩",
        },
        {
          id: 2,
          date: "2020-12-14",
          title: "如何将入职率提到最高",
          content: "如何将入职率提到最高",
          views: 130,
          author: "刘小倩",
        },
      ],
      dynamicCount: 5,
      dynamicLoading: false,
      shareCount: 10,
      shareLoading: false,
    };
  },
  computed: {
    noMoreDynamic() {
      return this.dynamicCount >= 5;
    },
    dynamicDisabled() {
      return this.dynamicLoading || this.noMoreDynamic;
    },
    noMoreShare() {
      return this.shareCount >= 10;
    },
    shareDisabled() {
      return this.shareLoading || this.noMoreShare;
    },
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
    handleAddNews() {
      this.addDialogVisible = true;
    },
    addNews(formName) {
      this.$refs[formName].validate((valid, obj) => {
        if (valid) {
          console.log("submit!", this.addForm);
          this.addDialogVisible = false;
        } else {
          console.log("error submit!!", obj);
          return false;
        }
      });
    },
    inputNewsContent(data) {
      this.addForm.content = data;
    },
    handleEditCulture() {
      this.editForm = JSON.parse(JSON.stringify(this.coInfo));
      this.editDialogVisible = true;
    },
    submitCulture(formName) {
      this.$refs[formName].validate((valid, obj) => {
        if (valid) {
          console.log("submit!");
          this.coInfo = this.editForm;
          this.editDialogVisible = false;
        } else {
          console.log("error submit!!", obj);
          return false;
        }
      });
    },
    loadDynamic() {
      this.dynamicLoading = true;
      setTimeout(() => {
        this.dynamicCount += 2;
        this.dynamicLoading = false;
      }, 2000);
    },
    loadShare() {
      this.shareLoading = true;
      setTimeout(() => {
        this.shareCount += 2;
        this.shareLoading = false;
      }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
.coculture {
  font-size: 14px;
  padding: 0 20px;

  .co-info {
    border-radius: 2px;
    padding: 16px 20px;
    box-shadow: 0 0 6px #ddd;
    .content {
      margin-top: 6px;
      margin-bottom: 16px;
    }
  }

  .pages {
    .inner {
      .dynamic,
      .share {
        margin-top: 30px;
        box-shadow: 0 0 6px #ccc;
        .title {
          background-color: #f7f7f7;
          padding: 16px 20px;
          border-bottom: 1px solid #ddd;
          font-weight: 600;
          font-size: 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .infinite-list-wrapper {
          overflow: auto;
          height: 340px;
          padding: 6px 20px;

          .list-item {
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;
            padding-top: 10px;

            a {
              text-decoration: none;
              color: #54a4fc;
            }

            .date {
              vertical-align: middle;
            }

            &:last-child {
              border: none;
            }
          }

          .tip {
            color: #999;
            text-align: center;
            font-size: 12px;
            line-height: 44px;
          }
        }
      }
    }
  }

  .add-form,
  .edit-form {
    padding: 0 20px;

    .el-textarea {
      width: 400px;
    }
  }
}
</style>
<style>
.coculture .el-overlay {
  z-index: 1149 !important;
}
</style>