<template>
  <div>
    <!-- 整个页面的外层容器 -->
    <el-container>
      <!-- 顶栏 -->
      <el-header class="layout-header">
        <h1>酷鲨商城运营管理平台</h1>
      </el-header>
      <!-- 下半部分区域 -->
      <el-container class="layout-body">
        <!-- 左侧边栏 -->
        <el-aside class="layout-aside">
          <el-menu
              router
              :default-active="$router.currentRoute.path"
              background-color="#222c32"
              text-color="#fff"
              active-text-color="#f93"
              class="el-menu-vertical-demo">
            <el-menu-item index="/sys-admin/index">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>

            <el-submenu index="0">
              <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span>临时页面</span>
              </template>
              <el-menu-item index="/sys-admin/temp/brand/add-new">
                <i class="el-icon-circle-plus"></i>
                <span slot="title">添加品牌</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/temp/brand/list">
                <i class="el-icon-s-operation"></i>
                <span slot="title">品牌列表</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/temp/category/add-new">
                <i class="el-icon-circle-plus"></i>
                <span slot="title">添加类别</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/temp/category/list">
                <i class="el-icon-s-operation"></i>
                <span slot="title">类别列表</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/temp/album/add-new">
                <i class="el-icon-circle-plus"></i>
                <span slot="title">添加相册</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/temp/album/list">
                <i class="el-icon-s-operation"></i>
                <span slot="title">相册列表</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/temp/attribute-template/add-new">
                <i class="el-icon-circle-plus"></i>
                <span slot="title">添加属性模板</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/temp/attribute-template/list">
                <i class="el-icon-s-operation"></i>
                <span slot="title">属性模板列表</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/temp/attribute/add-new">
                <i class="el-icon-circle-plus"></i>
                <span slot="title">添加属性</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/temp/attribute/list">
                <i class="el-icon-s-operation"></i>
                <span slot="title">属性列表</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/temp/admin/add-new">
                <i class="el-icon-circle-plus"></i>
                <span slot="title">添加管理员</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/temp/admin/list">
                <i class="el-icon-s-operation"></i>
                <span slot="title">管理员列表</span>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-s-goods"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item index="/sys-admin/product/spu-management">
                <i class="el-icon-s-grid"></i>
                <span slot="title">SPU台账</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/product/spu-add-new">
                <i class="el-icon-circle-plus"></i>
                <span slot="title">新增SPU</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/product/album-management">
                <i class="el-icon-picture"></i>
                <span slot="title">相册管理</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/product/category-management">
                <i class="el-icon-s-unfold"></i>
                <span slot="title">商品类别</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/product/attribute-template-management">
                <i class="el-icon-s-flag"></i>
                <span slot="title">属性模板</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/product/brand-management">
                <i class="el-icon-s-data"></i>
                <span slot="title">品牌管理</span>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-order"></i>
                <span>订单管理</span>
              </template>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-ticket"></i>
                <span>营销管理</span>
              </template>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-s-shop"></i>
                <span>商家管理</span>
              </template>
            </el-submenu>

            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-s-check"></i>
                <span>权限管理</span>
              </template>
            </el-submenu>

          </el-menu>
        </el-aside>



        <!-- 主体 -->
        <el-main class="layout-main">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.layout-header { background: #1684b0; color: #fff; }
.layout-header h1 { line-height: 60px; }
.layout-body { border: 5px solid #000; }
.layout-aside { background: #222c32; }
.layout-aside i {
  color: #fff !important;
}
/*.layout-main { border: 5px solid #0f0; }*/

.el-menu-item.is-active {
  background: #2d3c4d !important;
}
</style>

<script>
export default {}
</script>