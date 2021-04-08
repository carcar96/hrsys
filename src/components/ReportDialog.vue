<template>
  <div id="report-dialog">
    <el-dialog
      title="工作汇报"
      v-model="dialogVisible"
      width="686px"
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
        <el-form-item label="今日完成工作" prop="finish">
          <el-input
            type="textarea"
            :rows="4"
            maxlength="200"
            show-word-limit
            v-model="form.finish"
          ></el-input>
        </el-form-item>
        <el-form-item label="未完成工作" prop="unfinish">
          <el-input
            type="textarea"
            :rows="4"
            maxlength="200"
            show-word-limit
            v-model="form.unfinish"
          ></el-input>
        </el-form-item>
        <el-form-item label="添加微信数量" prop="wx_count">
          <el-input v-model="form.wx_count"></el-input>
        </el-form-item>
        <el-form-item label="上传截图" prop="wx_pic">
          <UploadImage :files="form.wx_pic" @update="updatePic" />
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input
            type="textarea"
            :rows="3"
            maxlength="50"
            show-word-limit
            v-model="form.note"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
          <el-button type="warning" @click="saveForm('form')"
            >保存草稿</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import UploadImage from "@/components/UploadImage.vue";
export default {
  props: ["isShow", "formData"],
  components: {
    UploadImage,
  },
  data() {
    return {
      dialogVisible: false,
      form: {},
      rules: {
        finish: [
          { required: true, message: "请输入今日完成工作", trigger: "blur" },
        ],
        unfinish: [
          { required: true, message: "请输入未完成工作", trigger: "blur" },
        ],
        wx_count: [
          { required: true, message: "请输入添加微信数量", trigger: "blur" },
        ],
        wx_pic: [
          { required: true, message: "请上传微信截图", trigger: "change" },
        ],
      },
    };
  },
  watch: {
    isShow(newVal) {
      this.dialogVisible = newVal;
    },
    formData(newData) {
      console.log(newData);
      this.form = newData;
    },
  },
  methods: {
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
    saveForm(formName) {
      this.$refs[formName].validate((valid, data) => {
        if (valid) {
          this.$emit("save", this.form);
          this.dialogVisible = false;
        } else {
          console.log("error save!!", data);
          return false;
        }
      });
    },
    closed(formName) {
      this.$emit("closed");
      this.$refs[formName].resetFields();
    },
    updatePic(files) {
      console.log(files);
      this.form.wx_pic = files;
    },
  },
};
</script>
<style lang="scss" scoped>
.form {
  padding: 0 20px;
  .el-input,
  .el-textarea {
    width: 400px;
  }
}
</style>