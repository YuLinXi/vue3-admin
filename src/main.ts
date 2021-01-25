import { createApp, ComponentPublicInstance } from 'vue';
import ElementPlus from 'element-plus';
import App from './App.vue';
import router from './router';
import { key, store } from './store';
import './styles/index.scss';

createApp(App)
  .use(ElementPlus)
  .use(store, key)
  .use(router)
  .mount('#app');
