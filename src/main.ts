import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/index.scss';

createApp(App)
  .use(ElementPlus)
  .use(store)
  .use(router)
  .mount('#app');
