import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';

import './assets/tailwind.css';
import 'element-plus/dist/index.css';
import './assets/style.css';

createApp(App).use(router).use(store).mount('#app');
