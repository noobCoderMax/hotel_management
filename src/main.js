import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;
import moment from 'moment';
Vue.prototype.$moment = moment;
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

/* 路由拦截 */
// router.beforeEach((to, from, next) => {
//     document.title = `${to.meta.title} | 星星云考`;
//     if (to.matched.some(res => res.meta.requireAuth)) { // 验证是否需要登陆
//       if (localStorage.getItem('adminNumb')) { // 查询本地存储信息是否已经登陆
//         next();
//       } else {
//         next('/login');
//       }
//     } else {
//       next();
//     }
//   });


new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
