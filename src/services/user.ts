/**
 * 用户相关请求模块
 */

import request from '@/utils/request';
import qs from 'qs';
import type { User, UserFilter, UserId } from './user.d';

export const login = (data: User) => request({
  method: 'POST',
  url: '/front/user/login',
  data,
});

export const getUserInfo = () => request({
  method: 'GET',
  url: '/front/user/getInfo',
});

export const getUserPages = (data: UserFilter) => request({
  method: 'POST',
  url: '/boss/user/getUserPages',
  data,
});

export const forbidUser = (data: UserId) => request({
  method: 'POST',
  url: '/boss/user/forbidUser',
  data,
});
