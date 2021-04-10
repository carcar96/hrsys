import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局方法
import $utils from './assets/js/utils';
const $moment = require("moment");
//echarts
import * as $echarts from 'echarts'
// element-plus
import { ElRadioGroup, ElRadioButton, ElCard, ElInfiniteScroll, ElRow, ElCol, ElCarousel, ElCarouselItem, ElUpload, ElImage, ElRadio, ElMessage, ElMessageBox, ElDialog, ElDivider, ElSpace, ElAvatar, ElSelect, ElOption, ElPagination, ElFooter, ElDatePicker, ElBadge, ElPopper, ElBreadcrumb, ElBreadcrumbItem, ElButton, ElInput, ElForm, ElFormItem, ElHeader, ElContainer, ElAside, ElMenu, ElSubmenu, ElMenuItemGroup, ElMenuItem, ElDropdown, ElDropdownMenu, ElDropdownItem, ElMain, ElTable, ElTableColumn } from 'element-plus';
import 'element-plus/packages/theme-chalk/src/base.scss';
import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale'
// 设置ele+语言
locale.use(lang);
const components = [
    ElRadioGroup,
    ElRadioButton,
    ElCard,
    ElDialog,
    ElDivider,
    ElSpace,
    ElAvatar,
    ElOption,
    ElSelect,
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
    ElRadio,
    ElImage,
    ElUpload,
    ElCarousel,
    ElCarouselItem,
    ElCol,
    ElRow,
]
const plugins = [
    ElInfiniteScroll,
    ElMessage,
    ElMessageBox,
    // ElLoading,
    // ElNotification,
]



const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})
plugins.forEach(plugin => {
    app.use(plugin)
})

// 全局挂载
app.config.globalProperties.$utils = $utils;
app.config.globalProperties.$moment = $moment;
app.config.globalProperties.$echarts = $echarts;

// 分环境处理
if (process.env.NODE_ENV === 'development') {
    app.config.devtools = true;
}
app.use(store).use(router).mount('#app')
