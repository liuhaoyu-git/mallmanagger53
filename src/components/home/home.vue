<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <img class="img" src="../../assets/logo.png" height="60" width="120" alt="无法显示图片" />
        </el-col>
        <el-col :span="16">
          <h3 class="middle">电商管理平台</h3>
        </el-col>
        <el-col :span="4">
          <el-button class="loginOut" type="info" size="small" round @click="handleSignout">退出按钮</el-button>
          <el-button class="loginOut" type="info" size="small" round >其他按钮</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="!isCollapse">展开</el-radio-button>
          <!-- <el-radio-button :label="true">收起</el-radio-button> -->
        </el-radio-group>
 
        <el-menu
          default-active="1-3"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          :router="true"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="users" >选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>

          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>

          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>

          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
    //newVue之前自动触发
  beforeCreate() {
      //获取token
    const token = localStorage.getItem("token");
    if (!token) {
        //如果没有则跳转到token
      this.$router.push({ name: "login" });
    }
    //有继续渲染组件
  },

  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    handleSignout() {
        //1.清除token
        localStorage.clear();
        //2.提示
        this.$message.success("退出成功");
        //3.来到login组件
        this.$router.push({ name:'login'})
    },

    users(){
      this.$router.push({ name:'users'})
    }
  }
};
</script>

<style>
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
  padding: 0;
}
.aside {
  background-color: #d3dce6;
}
.main {
  background-color: #e9eef3;
}

/*  */
.middle {
  text-align: center;
}
.el-button {
  /* text-align:center */
  margin: 15px 0px 0px 59px;
}
</style>