<template>
  <div class="login">
    <el-form
      class="login-form"
      label-position="top"
      ref="form"
      :model="formData"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="formData.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          :loading="isLoginLoading"
          @click="handleSubmit"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus';
import { Options, Vue } from 'vue-class-component';
import { forbidUser, login } from '@/services/user';

@Options({
  components: {
  },
})
export default class Login extends Vue {
  isLoginLoading = false

  formData = {
    phone: '',
    password: '',
  }

  $refs!: {
    form: typeof ElForm;
  }

  rules = {
    phone: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      {
        min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur',
      },
    ],
  }

  async handleSubmit(): Promise<void> {
    try {
      await this.$refs.form.validate();
      this.isLoginLoading = true;
      const { data } = await login(this.formData);
    } catch (err) {
      //
    } finally {
      this.isLoginLoading = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    width: 300px;
    background: #fff;
    padding: 20px;
    border-radius: 5px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
