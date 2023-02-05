import Vue from 'vue';
import Router from 'vue-router';
import VueRouter from 'vue-router'

Vue.use(Router);

const routes = [{
        path: '/',
        name: 'login',
        component: () => import( /* webpackChunkName: "home" */ '../components/page/Login.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import( /* webpackChunkName: "home" */ '../components/page/Login.vue'),
    },
    {
        path: '/',
        component: () => import( /* webpackChunkName: "home" */ '../components/common/Home.vue'),
        meta: {
            title: '自述文件',
            requireAuth: true
        },
        children: [{
                path: '/dashboard',
                component: () => import( /* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                meta: {
                    title: '系统首页',
                    requireAuth: true
                }
            },
            {
                path: '/function',
                component: () => import( /* webpackChunkName: "icon" */ '../components/page/Function.vue'),
                meta: {
                    title: '功能模块',
                    requireAuth: true
                }
            },
            {
                path: '/hotel',
                component: () => import( /* webpackChunkName: "icon" */ '../components/page/Hotel.vue'),
                meta: {
                    title: '酒店管理',
                    requireAuth: true
                }
            },
            {
                path: '/logs',
                component: () => import( /* webpackChunkName: "icon" */ '../components/page/Logs.vue'),
                meta: {
                    title: '日志管理',
                    requireAuth: true
                }
            },
            {
                path: '/administrator',
                component: () => import( /* webpackChunkName: "table" */ '../components/page/Administrator.vue'),
                meta: {
                    title: '管理员',
                    requireAuth: true
                }
            },
            {
                path: '/message',
                component: () => import( /* webpackChunkName: "tabs" */ '../components/page/Message.vue'),
                meta: {
                    title: '消息管理',
                    requireAuth: true
                }
            },
            {
                path: '/user',
                component: () => import( /* webpackChunkName: "form" */ '../components/page/User.vue'),
                meta: {
                    title: '用户管理',
                    requireAuth: true
                }
            },
            {
                // vue-schart组件
                path: '/charts',
                component: () => import( /* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                meta: {
                    title: '数据分析',
                    requireAuth: true
                }
            }
        ]
    },
    {
        path: '/findpassword',
        component: () => import( /* webpackChunkName: "login" */ '../components/page/FindPd.vue'),
        meta: {
            title: '找回密码',
            requireAuth: true
        }
    },
    {
        path: '/login',
        component: () => import( /* webpackChunkName: "login" */ '../components/page/Login.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '*',
        redirect: '/404'
    }
]
const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    let key = localStorage.getItem('admin')

    if (to.path == '/dashboard' || to.path == '/message' || to.path == '/user' || to.path == '/administrator' || to.path == '/hotel' || to.path == '/function' || to.path == '/logs' || to.path == '/charts') {
        if (key) {
            next();
        } else {
            alert("您还未登录，请先登录再访问！")
            next('/login');
        }
    } else {
        next();
    }
})



const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


export default router