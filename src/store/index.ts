import { createStore } from 'vuex';

export default createStore({
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || 'null'),
  },
  mutations: {
    setUser(state, payload): void {
      state.user = JSON.parse(payload);

      window.localStorage.setItem('user', payload);
    },
  },
  actions: {
  },
  modules: {
  },
});
