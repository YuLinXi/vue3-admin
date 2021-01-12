<template>
  <div class="login">
    <el-form
      class="login-form"
      label-position="top"
      :ref="(form) => login.formRef = form"
      :model="login.formData"
      :rules="login.rules"
      label-width="80px"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="login.formData.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="login.formData.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          :loading="login.isLoginLoading"
          @click="login.handleSubmit"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import {
  reactive,
  toRefs,
  ref,
} from 'vue';
import { useStore } from 'vuex';
import { Vue, setup, Options } from 'vue-class-component';
import { login } from '@/services/user';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';

function useLogin() {
  const rules = {
    phone: [
      { required: true, message: '请输入手机号' },
      { pattern: /^1\d{10}$/, message: '请输入正确的手机号' },
    ],
    password: [
      { required: true, message: '请输入密码' },
      { min: 6, max: 18, message: '长度在 6 到 18 个字符' },
    ],
  };
  const formRef = ref();
  const store = useStore();
  const router = useRouter();
  const route = useRoute();
  const state = reactive({
    isLoginLoading: false,
    formData: {
      phone: '',
      password: '',
    },
  });
  const handleSubmit = async (): Promise<void> => {
    try {
      await formRef.value.validate();
      state.isLoginLoading = true;
      const { data } = await login(state.formData);
      store.commit('setUser', data);
      ElMessage.success('登录成功');
      router.push(route.query.redirect as string || '/');
    } catch (err) {
      //
    } finally {
      state.isLoginLoading = false;
    }
  };

  return {
    ...toRefs(state),
    handleSubmit,
    rules,
    formRef,
  };
}

@Options({
  name: 'Login',
})
export default class Login extends Vue {
  login = setup(useLogin)
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
