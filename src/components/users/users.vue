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
    <el-table :data="userlist" stripe style="width: 100%">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="创建日期">
        <!-- {{ xxxx | yyyy }}  插值表达式？-->
        <!-- 单元格只能显示字符串，若想显示非字符串内容
             1、外部需要添加 template 组件
             2、绑定slot-scope (自动找，但是为了方便管理所以不要乱写)
             3、数据填写最外层，最外面那个对象或者array 不是单一的数据值
        4、xxxx.row.yyy  xxx就是最外层数据，yyy是单一数值-->
        <template slot-scope="scope">{{scope.row.create_time | fmtdate}}</template>
      </el-table-column>
      <el-table-column label="用户状态" width="120">
        <template slot-scope="scope">
          <el-switch
          class="TelSwitch"
            disabled
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="" >
          <el-button class="TelButton" size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
          <el-button size="mini" plain type="success" icon="el-icon-check" circle></el-button>
          <el-button size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      quary: "",
      //表格绑定的数据
      userlist: [],
      //分页相关数据
      total: -1,
      pagenum: 1,
      pagesize: 2
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const AUTH_TOKEN = localStorage.getItem("token");
      //axios 封装在http里
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `users?query=${this.quary}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      console.log(res);
      //对象解构赋值
      const {
        meta: { msg, status },
        data: { total, users }
      } = res.data;
      if (status === 200) {
        this.userlist = users;
        this.total = total;
        this.$message.success(msg);
      } else {
        this.$message.warning(msg);
      }
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
.TelButton{
  padding: 0px;
  margin-left: -2px;
}
</style>