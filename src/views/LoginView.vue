<template>
  <div>
    <div style="width: 600px; background: #fff; margin: 50px auto; padding: 30px 60px;">
      <h1 style="text-align: center; margin: 20px 0;">管理员登录</h1>      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: 'root',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = 'http://localhost:9081/admins/login';
          console.log('url = ' + url);
          let formData = this.qs.stringify(this.ruleForm);
          this.axios.post(url, formData).then((response) => {
            console.log('服务器端的响应：');
            console.log(response);
            let responseBody = response.data;
            if (responseBody.state == 20000) {
              // 登录成功，服务器端将响应JWT
              let jwt = responseBody.data;
              console.log('登录成功，服务器端响应的JWT：' + jwt);
              // 使用LocalStorage存储JWT
              localStorage.setItem('jwt', jwt);
              console.log('将JWT数据保存到LocalStorage！');
              // 测试：从LocalStorage中取出JWT
              // let localJwt = localStorage.getItem('jwt');
              // console.log('测试：从LocalStorage中取出JWT：' + localJwt);
              // 提示
              this.$message({
                message: '登录成功！',
                type: 'success'
              });
              // 跳转页面
              this.$router.push('/');
            } else {
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

<style>
body {
  background: #12487d;
}
</style>