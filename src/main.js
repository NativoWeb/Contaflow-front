import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index';

import '@/css/styles.css'

const app = createApp(App)
app.use(router)
app.mount('#app');
