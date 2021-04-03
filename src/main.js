import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局方法
import $utils from './assets/js/utils';
const $moment = require("moment");
// element-plus
import { ElPagination, ElFooter, ElDatePicker, ElBadge, ElPopper, ElBreadcrumb, ElBreadcrumbItem, ElButton, ElInput, ElForm, ElFormItem, ElHeader, ElContainer, ElAside, ElMenu, ElSubmenu, ElMenuItemGroup, ElMenuItem, ElDropdown, ElDropdownMenu, ElDropdownItem, ElMain, ElTable, ElTableColumn } from 'element-plus';
import 'element-plus/packages/theme-chalk/src/base.scss';
import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale'
// 设置ele+语言
locale.use(lang);
const components = [
    ElButton,
    ElInput,
    ElForm,
    ElFormItem,
    ElHeader,
    ElContainer,
    ElAside,
    ElMenu,
    ElSubmenu,
    ElMenuItemGroup,
    ElMenuItem,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElMain,
    ElTable,
    ElTableColumn,
    ElBreadcrumb,
    ElBreadcrumbItem,
    ElPopper,
    ElBadge,
    ElDatePicker,
    ElFooter,
    ElPagination,
]

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

app.config.globalProperties.$utils = $utils;
app.config.globalProperties.$moment = $moment;

// 分环境处理
if (process.env.NODE_ENV === 'development') {
    app.config.devtools = true;
}
app.use(store).use(router).mount('#app')
