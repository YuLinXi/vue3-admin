/**
 * 用户相关请求模块
 */

import request from '@/utils/request';
import qs from 'qs';

interface User {
  phone: string;
  password: string;
}

interface UserId {
  userId: string | number;
}

export const login = (data: User) => request({
  method: 'POST',
  url: '/front/user/login',
  data,
});

export const getUserInfo = () => request({
  method: 'GET',
  url: '/front/user/getInfo',
});

export const getUserPages = (data: object) => request({
  method: 'POST',
  url: '/boss/user/getUserPages',
  data,
});

export const forbidUser = (data: UserId) => request({
  method: 'POST',
  url: '/boss/user/forbidUser',
  data,
});
