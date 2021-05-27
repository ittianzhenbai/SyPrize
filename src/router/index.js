import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login')
  },
  {
    path: '/prizeSetting',
    name: 'prizeSetting',
    component: () => import(/* webpackChunkName: "praiseSetting" */ '../views/prizeSetting')
  },
  {
    path: '/prizeBystore',
    name: 'prizeBystore',
    component: () => import(/* webpackChunkName: "praiseBystore" */ '../views/prizeBystore')
  },
  {
    path: '/activityList',
    name: 'activityList',
    meta:{title:"活动列表"},
    component: () => import(/* webpackChunkName: "activityList" */ '../views/activityList')
  },
  {
    path: '/resultDetail',
    name: 'resultDetail',
    component: () => import(/* webpackChunkName: "resultDetail" */ '../views/resultDetail')
  },
  {
    path: '/resultDetailing',
    name: 'resultDetailing',
    component: () => import(/* webpackChunkName: "resultDetailing" */ '../views/resultDetailing')
  },
  {
    path: '/attendPersonLogin',
    name: 'attendPersonLogin',
    component: () => import(/* webpackChunkName: "attendPersonLogin" */ '../views/attendPersonLogin')
  },
  {
    path: '/prizeOver',
    name: 'prizeOver',
    component: () => import(/* webpackChunkName: "praiseOver" */ '../views/prizeOver')
  },
  {
    path: '/erweima',
    name: 'erweima',
    component: () => import(/* webpackChunkName: "erweima" */ '../views/erweima')
  },
  {
    path: '/prizePersonList',
    name: 'prizePersonList',
    component: () => import(/* webpackChunkName: "prizePersonList" */ '../views/prizePersonList')
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to,from,next)=>{//beforeEach是router的钩子函数，在进入路由前执行
    if(to.meta.title){//判断是否有标题
      document.title = to.meta.title
    }else{
      document.title = "石原金牛抽奖系统"
    }
    next() //执行进入路由，如果不写就不会进入目标页
})
export default router
