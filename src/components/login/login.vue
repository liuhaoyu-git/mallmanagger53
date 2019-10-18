<template>
  <div class="divCard">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户登录</span>
      </div>

      <div>
        <el-form ref="form" :model="form" :label-position="labelPosition">
          <el-form-item label="用户名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>

          <el-form-item label="密码">
            <!-- @keyup.enter.native 绑定回车属性 -->
            <el-input v-model="form.password" @keyup.enter.native="onLogin"></el-input>
          </el-form-item>

          <el-form-item>
            <!-- click.prevent -->
            <el-button class="login-btn" type="primary" @click="onLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "right",
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
   async onLogin() {
      const res = await this.$http.post("login", this.form)
        const {
          data,
          meta: { msg, status }
        } = res.data;
        //console.log(res);

        if (status === 200) {
          //登录成功
          //0.保存token 用来保护用户登录安全问题
          localStorage.setItem('token', data.token)
          //1 跳转home页面
          this.$router.push({ name:'home'});
          //2、提示成功
          this.$message({
            showClose: true,
            message: msg,
            type: "success"
          });
        } else {
          this.$message({
            showClose: true,
            message: msg,
            type: "error"
          });
        }
    },

    onLogin123() {
      //const res = await this.$http.post("login", this.form)
      //异步操作
      this.$http.post("login", this.form).then(res => {
        //console.log(res.data);
        //对象的解构赋值的第二中写法 将值给出来
        const {
          data,
          meta: { msg, status }
        } = res.data;

        //第一种写法，将对象整体给出去
        // const {meta:{}} = {meta:{msg:"111",status:200}}
        // const {meta:{msg,status}} = {meta:{msg:"111",status:200}}
        // obj = {msg:"111",status:200}
        //{msg,status} = {msg:"111",status:200}
        //msg:111 status:200

        if (status === 200) {
          //登录成功
          //1 跳转home页面
          this.$router.push({ name:'home'});
          //2、提示成功
          this.$message({
            showClose: true,
            message: msg,
            type: "success"
          });
        } else {
          this.$message({
            showClose: true,
            message: msg,
            type: "error"
          });
        }
      });
    },

  }
};
</script>

<style>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.divCard {
  /* height: 100%; */
  display: flex;
  align-items: center;
  justify-content: center;
}

.box-card {
  width: 480px;
  margin-top: 150px;
}

.login-btn {
  width: 100%;
}
</style>