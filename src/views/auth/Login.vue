<template>
  <div class="login">
    <div class="form">
      <img class="logo" alt="logo" src="@/assets/images/logo.png" />
      <h1 class="sysname">人力资源管理系统</h1>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        :disabled="isLoad"
        @keyup.enter="onSubmit('form')"
      >
        <el-form-item prop="user">
          <el-input
            class="input-inner"
            placeholder="请输入用户名"
            v-model="form.user"
            ref="user"
          >
            <template #prefix>
              <i class="el-input__icon el-icon-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input
            class="input-inner"
            placeholder="请输入密码"
            v-model="form.pwd"
            show-password
            ref="pwd"
          >
            <template #prefix>
              <i class="el-input__icon el-icon-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="btn"
            type="primary"
            @click="onSubmit('form')"
            :loading="isLoad"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        user: "",
        pwd: "",
      },
      rules: {
        user: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        pwd: [{ required: true, message: "密码不能为空", trigger: "blur" }],
      },
      isLoad: false,
    };
  },
  created() {
    let userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      this.form.user = JSON.parse(userInfo).user;
    }
  },
  mounted() {
    this.$refs.user.focus();
  },
  methods: {
    onSubmit(formName) {
      this.isLoad = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 登录验证
          localStorage.setItem(
            "userInfo",
            JSON.stringify({ user: this.form.user, token: "test" })
          );
          this.$router.replace({ name: "Background" });
        } else {
          this.isLoad = false;
          if (!this.form.user) {
            this.$refs.user.focus();
          } else if (!this.form.pwd) {
            this.$refs.pwd.focus();
          }
          return false;
        }
      });
    },
  },
};
</script>

<style lang="sass" scoped>
.login
  background-image: url('../../assets/images/bg.jpg')
  background-size: cover
  background-color: #f3f3f3
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0

  .form
    border: 1px solid #eee
    padding: 24px 56px
    background-color: rgba(255,255,255,0.9)
    text-align: center
    border-radius: 5px
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    margin: auto
    height: 420px
    width: 400px
    box-sizing: border-box

    .logo
      width: 100px
    .sysname
      margin-bottom: 30px
    .btn
      width: 100%
</style>
