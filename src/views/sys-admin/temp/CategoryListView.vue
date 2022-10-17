<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/sys-admin' }">
        <i class="el-icon-s-promotion"></i> 后台管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>类别列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="60" align="center"></el-table-column>
      <el-table-column prop="name" label="名称" width="180" align="center"></el-table-column>
      <el-table-column prop="description" label="简介" align="center"></el-table-column>
      <el-table-column prop="sort" label="排序序号" width="80" align="center"></el-table-column>
      <el-table-column label="是否启用" width="80" align="center">
        <template slot-scope="scope">
          <el-switch
              @change="handleChangeEnable(scope.row)"
              v-model="scope.row.enable"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#999">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="显示在导航栏" width="120" align="center">
        <template slot-scope="scope">
          <el-switch
              @change="handleChangeDisplay(scope.row)"
              v-model="scope.row.isDisplay"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#999">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="子级类别" width="100" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="showSubCategories(scope.row)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" circle
                     @click="handleEdit(scope.row.id)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" circle
                     @click="handleDelete(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 10px 0; float: right;" v-if="parentCategoryId != 0">
      <el-button size="mini" @click="backToRootList()">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parentCategoryId: 0,
      tableData: []
    }
  },
  methods: {
    backToRootList() {
      this.parentCategoryId = 0;
      this.loadCategoryList();
    },
    showSubCategories(category) {
      this.parentCategoryId = category.id;
      this.loadCategoryList();
    },
    handleChangeEnable(category) {

    },
    handleChangeDisplay(category) {

    },
    loadCategoryList() {
      let url = 'http://localhost:9080/categories/list-by-parent?parentId='
          + this.parentCategoryId;
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .get(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.tableData = responseBody.data;
        } else {
          this.$message.error(responseBody.message);
        }
      });
    },
    handleEdit(id) {
      alert('你点击了id=' + id + '的类别数据的【编辑】按钮！');
    },
    handleDelete(id) {
      alert('你点击了id=' + id + '的类别数据的【删除】按钮！');
    }
  },
  mounted() {
    this.loadCategoryList();
  }
}
</script>

<style scoped>

</style>