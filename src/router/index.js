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
        path: '/sys-admin/temp/admin/list',
        component: () => import('../views/sys-admin/temp/AdminListView.vue')
      },
      {
        path: '/sys-admin/temp/album/add-new',
        component: () => import('../views/sys-admin/temp/AlbumAddNewView.vue')
      },
      {
        path: '/sys-admin/temp/brand/add-new',
        component: () => import('../views/sys-admin/temp/BrandAddNewView.vue')
      },
      {
        path: '/sys-admin/temp/brand/list', // http://localhost:9000/sys-admin/temp/brand/list
        component: () => import('../views/sys-admin/temp/BrandListView.vue')
      },
      {
        path: '/sys-admin/temp/attribute/add-new',
        component: () => import('../views/sys-admin/temp/AttributeAddNewView.vue')
      },
      {
        path: '/sys-admin/temp/attribute/list', // http://localhost:9000/sys-admin/temp/attribute/list
        component: () => import('../views/sys-admin/temp/AttributeListView.vue')
      },
      {
        path: '/sys-admin/temp/category/add-new',
        component: () => import('../views/sys-admin/temp/CategoryAddNewView.vue')
      },
      {
        path: '/sys-admin/temp/category/list', // http://localhost:9000/sys-admin/temp/category/list
        component: () => import('../views/sys-admin/temp/CategoryListView.vue')
      },
      {
        path: '/sys-admin/temp/attribute-template/add-new',
        component: () => import('../views/sys-admin/temp/AttributeTemplateAddNewView.vue')
      },
      {
        path: '/sys-admin/temp/attribute-template/list', // http://localhost:9000/sys-admin/temp/attribute-template/list
        component: () => import('../views/sys-admin/temp/AttributeTemplateListView.vue')
      },
      {
        path: '/sys-admin/temp/admin/add-new',
        component: () => import('../views/sys-admin/temp/AdminAddNewView.vue')
      },
      {
        path: '/sys-admin/temp/album/list', // http://localhost:9000/sys-admin/temp/album/list
        component: () => import('../views/sys-admin/temp/AlbumListView.vue')
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
