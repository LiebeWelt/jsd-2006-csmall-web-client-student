<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/sys-admin' }">
        <i class="el-icon-s-promotion"></i> 后台管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>添加品牌</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="拼音" prop="pinyin">
        <el-input v-model="ruleForm.pinyin"></el-input>
      </el-form-item>
      <el-form-item label="LOGO" prop="logo">
        <el-input v-model="ruleForm.logo"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="description">
        <el-input v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item label="关键词列表" prop="keywords">
        <el-input v-model="ruleForm.keywords"></el-input>
      </el-form-item>
      <el-form-item label="排序序号" prop="sort">
        <el-input v-model="ruleForm.sort"></el-input>
      </el-form-item>
      <el-form-item label="是否启用" prop="enable" style="position: relative">
        <el-switch
            v-model="ruleForm.enable"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#999"
            style="position: absolute;left:0;height: 40px">
        </el-switch>
      </el-form-item>
      <el-form-item style="float: left">
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
        pinyin: '',
        description: '',
        logo: '',
        enable: 1,
        keywords: '',
        sort: 0
      },
      rules: {
        name: [
          {required: true, message: '请输入品牌名称', trigger: 'blur'},
          {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
        ],
        pinyin: [
          {required: true, message: '请输入品牌拼音', trigger: 'blur'},
          {min: 4, max: 25, message: '长度在 4 到 25 个字符', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请输入品牌简介', trigger: 'blur'},
          {min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur'}
        ],
        sort: [
          {pattern: /^(\d{1}|[1-9]{1}[0-9]?)$/, message: '排序序号必须是0-99之间的数字', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = 'http://localhost:9080/brands/add-new';
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
              console.log('添加品牌成功');
              this.$message({
                message: '添加品牌成功！',
                type: 'success'
              });
              this.resetForm(formName);
            } else {
              console.log(responseBody.message);
              this.$message.error(responseBody.message);
            }
          });
        } else {
          alert('error submit!!');
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