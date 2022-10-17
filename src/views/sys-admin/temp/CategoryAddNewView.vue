<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/sys-admin' }">
        <i class="el-icon-s-promotion"></i> 后台管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>添加类别</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
      <el-form-item label="父级类别" prop="parentId">
        <el-input v-model="ruleForm.parentId" placeholder="请输入父级类别的id，一级类别请填0"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="关键词列表" prop="keywords">
        <el-input v-model="ruleForm.keywords"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input v-model="ruleForm.icon"></el-input>
      </el-form-item>
      <el-form-item label="排序序号" prop="sort">
        <el-input v-model="ruleForm.sort"></el-input>
      </el-form-item>
      <el-form-item label="是否启用" prop="enable">
        <el-switch
            v-model="ruleForm.enable"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#999">
        </el-switch>
      </el-form-item>
      <el-form-item label="是否显示在导航栏" prop="isDisplay">
        <el-switch
            v-model="ruleForm.isDisplay"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#999">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        parentId: '',
        name: '',
        keywords: '',
        sort: 0,
        icon: '',
        enable: 1,
        isDisplay: 1
      },
      rules: {
        parentId: [
          {required: true, message: '请输入父级类别id，一级类别请填0', trigger: 'blur'},
        ],
        name: [
          {required: true, message: '请输入类别名称', trigger: 'blur'},
          {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}
        ],
        sort: [
          {pattern: /^(\d{1}|[1-9]{1}[0-9]?)$/, message: '自定义排序序号必须是0-99之间的数字', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = 'http://localhost:9080/categories/add-new';
          console.log('请求路径为：' + url);
          console.log('请求参数为：' + this.ruleForm);
          console.log(this.ruleForm);
          let formData = this.qs.stringify(this.ruleForm);
          console.log('将ruleForm对象转换为FormData：');
          console.log(formData);
          this.axios
              .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
              .post(url,formData).then((response)=>{
            let responseBody = response.data;
            if (responseBody.state == 20000) {
              console.log('添加类别成功');
              this.$message({
                message: '添加类别成功！',
                type: 'success'
              });
              this.resetForm(formName);
            } else {
              console.log(responseBody.message);
              this.$message.error(responseBody.message);
            }
          });
          // let url = 'http://localhost:9080/categories/add-new';
          // console.log('尝试添加类别……');
          // console.log('请求路径：' + url);
          // console.log('请求参数：' + this.ruleForm);
          // console.log(this.ruleForm);
          // let formData = this.qs.stringify(this.ruleForm);
          // console.log('将ruleForm对象转换为FormData：');
          // console.log(formData);
          // this.axios
          //     .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          //     .post(url, formData).then((response) => {
          //   console.log('服务器端响应的结果：' + response);
          //   console.log(response);
          //   let responseBody = response.data;
          //   if (responseBody.state == 20000) {
          //     console.log('添加类别成功');
          //     this.$message({
          //       message: '添加类别成功！',
          //       type: 'success'
          //     });
          //     this.resetForm(formName);
          //   } else {
          //     console.log(responseBody.message);
          //     this.$message.error(responseBody.message);
          //   }
          // });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>

</style>