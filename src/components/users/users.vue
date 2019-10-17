<template>
  <el-card class="box-card">
    <!-- 1、面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 2、搜索  思路：一行好多列-->
    <el-row class="searchRow">
      <el-col>
        <el-input placeholder="请输入内容" v-model="quary" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" plain class="userButton">添加用户</el-button>
      </el-col>
    </el-row>

    <!--  -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="date" label="姓名" width="180"></el-table-column>
      <el-table-column prop="name" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="address" label="电话"></el-table-column>
      <el-table-column prop="address" label="创建日期"></el-table-column>
      <el-table-column prop="address" label="用户状态"></el-table-column>
      <el-table-column prop="address" label="操作"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      quary: "",
      pagenum: 1,
      pagesize: 2,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        }
      ]
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const AUTH_TOKEN = localStorage.getItem('token')
      //axios 封装在http里
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN;
      const res = await this.$http.get(
        `users?query=${this.quary}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      console.log(res);
    }
  }
};
</script>

<style>
.box-card {
  height: 100%;
}
.input-with-select {
  width: 20%;
}
.searchRow {
  margin-top: 0px;
}
.userButton {
  margin-left: 7px;
}
</style>