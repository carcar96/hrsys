<template>
  <div id="applicant">
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
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="contact">
          <el-input v-model="form.contact"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option
              v-for="item in sexOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="微信" prop="wx">
          <el-input v-model="form.wx"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idcard">
          <el-input v-model="form.idcard"></el-input>
        </el-form-item>
        <el-form-item label="学历" prop="education">
          <el-select v-model="form.education" placeholder="请选择学历">
            <el-option
              v-for="item in educateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="对接盟友" prop="dock_ally">
          <el-select v-model="form.dock_ally" placeholder="请选择对接盟友">
            <el-option label="大众行1" value="1"></el-option>
            <el-option label="大众行2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            :rows="2"
            maxlength="200"
            show-word-limit
            v-model="form.note"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属分类" prop="cate">
          <el-select v-model="form.cate" placeholder="请选择分类">
            <el-option
              v-for="item in cateOptions"
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
          <el-button type="primary" @click="submitForm('form')"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import {
  sexOptions,
  educateOptions,
  personCateOptions,
  entCateOptions,
} from "@/assets/js/dropdown.js";
export default {
  props: ["isShow", "fromType", "submitType", "formData"],
  data() {
    return {
      sexOptions: sexOptions,
      educateOptions: educateOptions,
      cateOptions: [],
      dialogVisible: false,
      dialogTitle: "",
      form: {},
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        contact: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
          {
            pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
            message: "手机号格式不对",
            trigger: "blur",
          },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        age: [
          { required: true, message: "请输入年龄", trigger: "blur" },
          {
            pattern: /^\+?[1-9][0-9]*$/,
            message: "年龄必须为数字值",
            trigger: "blur",
          },
        ],
        wx: [
          {
            pattern: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/,
            message: "6-20个字母、数字、下划线和减号，必须以字母开头",
            trigger: "blur",
          },
        ],
        idcard: [
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: "证件号码格式不对",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    if (this.fromType == 1) {
      this.cateOptions = personCateOptions;
    } else if (this.fromType == 2) {
      this.cateOptions = entCateOptions;
    }

    if (this.submitType == 1) {
      this.dialogTitle = "新增劳务工";
    } else if (this.submitType == 2) {
      this.dialogTitle = "编辑用户信息";
    }
  },
  watch: {
    isShow(newVal) {
      this.dialogVisible = newVal;
    },
    formData(newData) {
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
    closed(formName) {
      this.$emit("closed");
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
.form {
  padding: 0 20px;
  .el-input {
    width: 222px;
  }
  .el-textarea {
    width: 444px;
  }
}
</style>