import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 引入全局方法
import utils from './assets/js/utils';
const moment = require("moment");

// echarts
import * as echarts from 'echarts'; // 全部引入
// import echarts from './assets/js/echarts'; // 按需引入

// tinymce 编辑器
import tinymce from "tinymce/tinymce";

// element-plus
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
// ele+语言
import 'dayjs/locale/zh-cn';
import locale from 'element-plus/lib/locale/lang/zh-cn'

const app = createApp(App);
// const app = Vue.createApp(App);

// 开启devtools
if (process.env.NODE_ENV === 'development') {
    app.config.devtools = true;
}

// 全局挂载
app.config.globalProperties.$utils = utils;
app.config.globalProperties.$moment = moment;
app.config.globalProperties.$echarts = echarts;
app.config.globalProperties.$tinymce = tinymce;

app.use(ElementPlus, { locale });
app.use(store).use(router).mount('#app');
