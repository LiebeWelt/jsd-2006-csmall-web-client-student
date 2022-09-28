import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: HomeView,
    children:[
      {
        path: '/sys-admin/temp/album/add-new',
        component: () => import('../views/sys-admin/temp/AlbumAddNewView.vue')
      },
      {
        path: '/sys-admin/temp/brand/add-new',
        component: () => import('../views/sys-admin/temp/BrandAddNewView.vue')
      },
      {
        path: '/sys-admin/temp/attribute/add-new',
        component: () => import('../views/sys-admin/temp/AttributeAddNewView.vue')
      },
      {
        path: '/sys-admin/temp/category/add-new',
        component: () => import('../views/sys-admin/temp/CategoryAddNewView.vue')
      },
      {
        path: '/sys-admin/temp/attribute-template/add-new',
        component: () => import('../views/sys-admin/temp/AttributeTemplateAddNewView.vue')
      },
      {
        path: '/sys-admin/temp/admin/add-new',
        component: () => import('../views/sys-admin/temp/AdminAddNewView.vue')
      },

    ]
  },
  {
    path: '/about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
