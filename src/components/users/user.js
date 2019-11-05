export default {

    data() {
        return {
            quary: "",
            dialogVisible: false,
            disabled: false,
            dialogAlloUser: false,
            title: "",
            //表格绑定的数据
            userlist: [],
            //弹窗绑定的数据
            form: {},
            //分页相关数据
            total: -1,
            pagenum: 1,
            pagesize: 5,

            //选择器
            options: [{
                value: '主管',
                label: '主管'
            }, {
                value: '测试角色2',
                label: '测试角色2'
            }, {
                value: '测试角色',
                label: '测试角色'
            }, {
                value: '超级管理员',
                label: '超级管理员'
            }, {
                value: 'test',
                label: 'test'
            }],
            value: '',

            //分配角色
            currRoleId: -1,
            currUserId:-1,
            currUsername: '',

            //保存所有角色数据
            roles: [],
        };
    },
    created() {
        this.getUserList();
    },
    methods: {

        //1、点击对勾弹出对话框 2、getlist 获取内容显示对话框 3、点击保存保存修改信息
        async allocUser(users) {//分配用户角色
            this.dialogAlloUser = true
            this.title = "分配用户角色";
            this.form.username = users.username
            //获取所有的角色
            const res1 = await this.$http.get(`roles`)
            console.log("1111=",res1);
            this.roles = res1.data.data

            //获取当前用户的角色id
            const res = await this.$http.get(`users/${users.id}`)
            console.log(res)
            this.currRoleId = res.data.data.rid
            //this.alloUserButton(users); 为啥穿不下
            this.currUserId = users.id;
        },
        async alloUserButton() {
            //users/:id/role  我这样乱传搞崩了数据库
            const res = await this.$http.put(`users/${this.currUserId}/role`,{
                rid:this.currRoleId
            })
            console.log("res=",res)
            const {
                meta: { msg, status },
                data: { total, users }
            } = res.data;
            if(status == 200){
                this.$message.success(msg);
            }else{
                this.$message.error(msg);
            }
            this.dialogAlloUser = false
        },

        //修改用户状态
        async changeMgState(users) {
            const res = await this.$http.put(`users/${users.id}/state/${users.mg_state}`);
            console.log("修改用户状态=", res);
        },

        //修改用户
        editUser(users) {
            this.title = "修改用户";
            this.dialogVisible = true;
            this.disabled = true;
            this.form = users;
        },

        //showDel 删除用户
        showDel(userID) {
            console.log(userID);
            this.$confirm("将删除该用户, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                    const res = await this.$http.delete(`users/${userID}`);
                    //console.log(res);
                    if (res.data.meta.status === 200) {
                        this.getUserList();
                        this.$message.success(res.data.meta.msg);
                    } else {
                        this.$message.warning(res.data.meta.msg);
                    }
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },

        //弹出
        dis() {
            this.form = {}; //清空
            this.title = "增加用户";
            this.dialogVisible = true;
        },
        async addUser() {
            //console.log(this.form)
            if (this.title === "修改用户") {
                //疑问 我传了全部的数据，为什么可以
                const res = await this.$http.put(`users/${this.form.id}`, this.form);
                console.log(res);
                const { meta } = res.data;
                if (meta.status === 200) {
                    this.dialogVisible = false;
                    this.$message.success(meta.msg);
                    this.getUserList();
                    //this.form = {};
                } else {
                    this.$message.success(meta.msg);
                }
            } else {
                const res = await this.$http.post(`users`, this.form);
                //console.log(res);
                const {
                    meta: { msg, status }
                } = res.data;

                if (status === 201) {
                    this.dialogVisible = false;
                    this.$message.success(msg);
                    this.getUserList();
                    this.form = {};
                } else {
                    this.$message.warning(msg);
                }
            }
        },

        //分页操作
        handleSizeChange(val) {
            //console.log(`每页 ${val} 条`);
            this.pagesize = val;
            this.pagenum = 1;
            this.getUserList();
        },
        handleCurrentChange(val) {
            //console.log(`当前页: ${val}`);
            this.pagenum = val;
            this.getUserList();
        },

        //更新内容
        async getUserList() {
            //不带token会返回错误信息
            const AUTH_TOKEN = localStorage.getItem("token");
            //axios 封装在http里
            this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
            const res = await this.$http.get(
                `users?query=${this.quary}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
            );
            console.log("更新内容=", res);
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
        },

        //搜索框搜索用户
        seach() {
            this.getUserList();
        },
        //搜索框点击x时刷新列表
        clear() {
            this.getUserList();
        }
    }
}
