import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import store from '@/store';
import { ElMessage } from 'element-plus';
import router from '@/router';
import qs from 'qs';

const request = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://edufront.lagou.com/' : '',
});

function redirectLogin() {
  router.push({
    name: 'login',
    query: {
      redirect: '',
    },
  });
}

function refreshToken() {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token,
    }),
  });
}

// 请求拦截器
request.interceptors.request.use((config) => {
  // 我们就在这里通过改写 config 配置信息来实现业务功能的统一处理
  const { user } = store.state;
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token;
  }

  // 注意：这里一定要返回 config，否则请求就发不出去了
  return config;
}, (error) => Promise.reject(error));

// 响应拦截器
let isRefreshing = false;
let requests: any[] = [];
request.interceptors.response.use((response) => {
  const { state, message, content } = response.data;
  if (state === 401) {
    // 刷新 token
    if (!store.state.user) {
      redirectLogin();
      return Promise.reject(response.data);
    }
    if (!isRefreshing) {
      isRefreshing = true;
      return refreshToken().then((res) => {
        if (!res.data.success) {
          throw new Error('刷新 Token 失败');
        }
        store.commit('setUser', res.data.content);
        requests.forEach((cb) => cb());
        requests = [];
        return request(response.config);
      }).catch((err) => {
        ElMessage.warning('登录已过期，请重新登录');
        store.commit('setUser', null);
        redirectLogin();
        return Promise.reject(response.data);
      }).finally(() => {
        isRefreshing = false;
      });
    }
  } else if (state !== 1) {
    ElMessage.error(message);
    return Promise.reject(response.data);
  }
  return { data: content, code: state, msg: message } as never;
},
async (error) => Promise.reject(error));

export default function (payload: AxiosRequestConfig) {
  const {
    method = 'GET',
    data,
    ...others
  } = payload;
  const axiosConfig: AxiosRequestConfig = {
    method,
    ...others,
  };
  if (method?.toUpperCase() === 'GET') {
    axiosConfig.params = data;
  } else {
    axiosConfig.data = qs.stringify(data);
  }
  return request(axiosConfig);
}
