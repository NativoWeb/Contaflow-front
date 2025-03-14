import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'; // Importa el router correctamente
import '@/css/styles.css'

createApp(App).use(router).mount('#app');
