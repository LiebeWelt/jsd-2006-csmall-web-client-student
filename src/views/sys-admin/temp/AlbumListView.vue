<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 18px;">
      <el-breadcrumb-item :to="{ path: '/sys-admin/index' }">
        <i class="el-icon-s-promotion"></i> 后台管理首页
      </el-breadcrumb-item>
      <el-breadcrumb-item>相册列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="60" align="center"></el-table-column>
      <el-table-column prop="name" label="名称" width="200" align="center"></el-table-column>
      <el-table-column prop="description" label="简介" header-align="center"></el-table-column>
      <el-table-column prop="sort" label="排序序号" width="100" align="center"></el-table-column>
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
    openDeleteConfirm(album) {
      let title = '提示';
      let message = '此操作将永久删除【' + album.name + '】相册，是否继续？';
      this.$confirm(message, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(album);
      }).catch(() => {
      });
    },
    handleEdit(album) {
      alert('你点击了id=' + id + '的相册数据的【编辑】按钮！');
    },
    handleDelete(album) {
      // alert('你点击了【' + album.name + ' (id=' + album.id + ')】的【删除】按钮');
      console.log('handleDelete ... id=' + album.id);
      let url = 'http://localhost:9080/albums/' + album.id + '/delete';
      console.log('url = ' + url);
      this.axios.post(url).then((response) => {
        let responseBody = response.data;
        console.log(responseBody);
        if (responseBody.state != 20000) {
          this.$message.error(responseBody.message);
        }
        this.loadAlbumList();
      });
    },
    loadAlbumList() {
      console.log('准备从服务器获取相册列表……');
      let url = 'http://localhost:9080/albums';
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .get(url).then((response) => {
        console.log('服务器端响应的结果：')
        console.log(response);
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.tableData = responseBody.data;
        } else {
          this.$message.error(responseBody.message);
        }
      });
    }
  },
  created() {
    console.log('执行生命周期方法：created');
  },
  mounted() {
    console.log('执行生命周期方法：mounted');
    this.loadAlbumList();
  }
}
</script>