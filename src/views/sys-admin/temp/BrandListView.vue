<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/sys-admin' }">
        <i class="el-icon-s-promotion"></i> 后台管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>品牌列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="60" align="center"></el-table-column>
      <el-table-column prop="logo" label="LOGO" width="120" align="center"></el-table-column>
      <el-table-column prop="name" label="名称" width="120" align="center"></el-table-column>
      <el-table-column prop="pinyin" label="拼音" width="180" align="center"></el-table-column>
      <el-table-column prop="description" label="简介" align="center"></el-table-column>
      <el-table-column prop="sort" label="排序序号" width="80" align="center"></el-table-column>
      <el-table-column label="是否启用" align="center" width="80">
        <template slot-scope="scope">
          <el-switch
              @change="changeEnable(scope.row)"
              v-model="scope.row.enable"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ccc">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" circle
                     @click="handleEdit(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" circle
                     @click="openDeleteConfirm(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    changeEnable(brand) {
      let enableText = ['禁用', '启用'];
      let url = 'http://localhost:9080/brands/' + brand.id;
      if (brand.enable == 1) {
        url += '/enable';
      } else {
        url += '/disable';
      }
      console.log('url = ' + url);
      this.axios.post(url).then((response) => {
        let responseBody = response.data;
        console.log(responseBody);
        if (responseBody.state == 20000) {
          this.$message({
            message: '将【' + brand.name + '】的启用状态设置为【' + enableText[brand.enable] + '】成功',
            type: 'success'
          });
        } else {
          // this.$message.error(responseBody.message);
          let title = '操作失败';
          this.$alert(responseBody.message, title, {
            confirmButtonText: '确定',
            callback: action => {}
          });
          this.loadAdminList();
        }
      });
    },
    openDeleteConfirm(brand) {
      let title = '提示';
      let message = '此操作将永久删除【' + brand.name + '】品牌，是否继续？';
      this.$confirm(message, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(brand);
      }).catch(() => {
      });
    },
    loadBrandList() {
      let url = 'http://localhost:9080/brands';
      this.axios
          // .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
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
      alert('你点击了id=' + id + '的品牌数据的【编辑】按钮！');
    },
    handleDelete(brand) {
      // alert('你点击了id=' + id + '的品牌数据的【删除】按钮！');
      console.log('handleDelete ... id=' + brand.id);
      let url = 'http://localhost:9080/brands/' + brand.id + '/delete';
      console.log('url = ' + url);
      this.axios.post(url).then((response) => {
        let responseBody = response.data;
        console.log(responseBody);
        if (responseBody.state != 20000) {
          this.$message.error(responseBody.message);
        }
        this.loadBrandList();
      });

    }
  },
  mounted() {
    this.loadBrandList();
  }
}
</script>

<style scoped>

</style>