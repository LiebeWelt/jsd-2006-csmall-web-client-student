<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/sys-admin' }">
        <i class="el-icon-s-promotion"></i> 后台管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>添加相册</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="description">
        <el-input v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item label="排序序号" prop="sort">
        <el-input v-model="ruleForm.sort"></el-input>
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
        name: '',
        description: '暂无',
        sort: 0
      },
      rules: {
        name: [
          {required: true, message: '请输入相册名称', trigger: 'blur'},
          {min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请输入相册简介', trigger: 'blur'},
          {min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur'}
        ]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = 'http://localhost:9080/albums/add-new';
          console.log('尝试添加相册……');
          console.log('请求路径为：' + url);
          console.log('请求参数为：' + this.ruleForm);
          console.log(this.ruleForm);
          let formData = this.qs.stringify(this.ruleForm);
          console.log('将ruleForm对象转换为FormData：');
          console.log(formData);
          this.axios
              .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
              .post(url, formData).then((response) => {
            console.log('服务器端响应的结果：' + response);
            console.log(response);
            let responseBody = response.data;
            if (responseBody.state == 20000) {
              console.log('添加相册成功');
              this.$message({
                message: '添加相册成功！',
                type: 'success'
              });
              this.resetForm(formName);
            } else {
              console.log(responseBody.message);
              this.$message.error(responseBody.message);
            }
          });
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