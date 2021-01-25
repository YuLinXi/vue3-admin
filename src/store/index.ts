import { InjectionKey } from 'vue';
import { getPermissions } from '@/services/user';
import { createStore, Store, useStore } from 'vuex';

interface State {
  user: any;
  permissions: Array<any> | null;
}

export const key: InjectionKey<Store<State>> = Symbol('injectionKey');

export const iUseStore = () => useStore(key);

export const store = createStore<State>({
  devtools: process.env.NODE_EVN === 'development',
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || 'null'),
    permissions: null,
  },
  mutations: {
    setUser(state, payload): void {
      state.user = JSON.parse(payload);

      window.localStorage.setItem('user', payload);
    },
    setUserPermissions(state, payload): void {
      state.permissions = payload;
    },
  },
  actions: {
    async getUserPermissions({ commit }) {
      try {
        const { data } = await getPermissions();
        commit('setUserPermissions', data?.menuList || []);
      } catch (err) {
        //
      }
    },
  },
  modules: {
  },
});
