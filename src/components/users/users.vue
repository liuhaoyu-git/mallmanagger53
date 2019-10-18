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
        <!-- 组件事件 
             1、可以是函数
        2、可以是值直接改变-->
        <el-input
          @clear="clear"
          clearable
          placeholder="请输入内容"
          v-model="quary"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search" @click="seach"></el-button>
        </el-input>
        <el-button type="success" plain class="userButton" @click="dis">添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 3、列表 -->
    <el-table :data="userlist" stripe style="width: 100%" height="300px">
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
      <!-- 用户状态 -->
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
        <!-- 修改 -->
        <template slot-scope="scope">
          <!-- 修改 -->
          <el-button
            class="TelButton"
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
            @click="editUser(scope.row)"
          ></el-button>
          <!-- 对勾 -->
          <el-button size="mini" plain type="success" icon="el-icon-check" circle></el-button>
          <!-- 删除 -->
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
            @click="showDel(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div>
      <!-- 1、size-change 每页显示条数变化时触发
          2、current-change 当前页改变时触发
          3、current-page 设置当前页是第几页
          4、page-size 设置显示多少条 
      5、数据总数-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 2, 20, 50]"
        :page-size="8"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 弹出对话框 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="500px">
      <el-form
        :model="form"
        status-icon
        ref="form"
        label-width="100px"
        class="demo-ruleForm"
        style="width:85%"
      >
        <el-form-item label="姓名" prop="username">
          <el-input v-model="form.username" :disabled="disabled"></el-input>
        </el-form-item>
        <!-- v-if vue的渲染 -->
        <el-form-item label="密码" prop="password" v-if="title != '修改用户'">
          <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="dialogVisible = false">取消</el-button>
          <el-button @click="addUser">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
import mix from "./user"
export default {
  mixins:[mix]
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
.TelButton {
  padding: 0px;
  margin-left: -2px;
}
</style>