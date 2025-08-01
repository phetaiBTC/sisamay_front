import { createApp } from 'vue'
import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';
import '@/assets/css/style.css'
import 'leaflet/dist/leaflet.css'
import App from './App.vue'
import { router } from './router';
import { i18n } from './plugins/i18n';
import { pinia } from './plugins/pinia';

const app = createApp(App)
app.use(Antd)
    .use(i18n)
    .use(pinia)
    .use(router)
    .mount('#app')
