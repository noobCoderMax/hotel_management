<template>
    <div class="header">
        <div class="logo">酒店后台管理系统</div>
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :contnt="fullscreen ? `取消全屏` : `全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator">
                    <img :src="adminData.avator" />
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="hover" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{ form.id }}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
                        <el-dropdown-item divided command="updatePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item divided command="loginOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>


        <!-- form修改密码 -->
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
            <el-form :model="formP">
                <el-form-item label="管理员邮箱" :label-width="formLabelWidth">
                    <strong>{{formP.email}}</strong>
                </el-form-item>
                <el-form-item label="新密码" :label-width="formLabelWidth">
                    <el-input style="width:300px;" v-model="formP.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth">
                    <el-input style="width:300px;" v-model="formP.ackPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱验证码" :label-width="formLabelWidth">
                    <el-input style="width:300px;" v-model="formP.code" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="提示：" :label-width="formLabelWidth">
                    <span style="color: blue;">*邮件发送有延迟，请您稍微等待~</span>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="getCodeBtn">获取邮箱验证码</el-button>
                <el-button @click="cancleUpdate ">取 消</el-button>
                <el-button type="primary" @click="updatePasswordBtn">保 存</el-button>
            </div>
        </el-dialog>
        <!-- form个人信息 -->
        <el-dialog title="个人信息" :visible.sync="dialogFormVisibleU">
            <el-form>
                <el-form-item label="头像" :label-width="formLabelWidth">
                    <img :src="adminData.avator" class="pre-img" />
                </el-form-item>
                <el-form-item label="管理员号" :label-width="formLabelWidth">
                    <span>{{adminData.nickname}}</span>

                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <span>{{adminData.email}}</span>

                </el-form-item>
                <el-form-item label="权限" :label-width="formLabelWidth">
                    <span>{{level}}</span>

                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleU = false">取 消</el-button>
            </div>
        </el-dialog>


    </div>
</template>
<script>
    import
    bus
    from './bus.js';


    import {
        getAdminInfo,
        updateAdminInfo,
        getMsg,
        changePassword,
        findPassword,
        getEmailCode
    } from '../../api/admin.js'
    export default {
        data() {
            return {
                collapse: false,
                fullscreen: false,
                name: 'linxin',
                message: 0,
                dialogFormVisible: false,
                dialogFormVisibleU: false,
                dialogFormVisibleF: false,
                form: {},
                formP: {
                    id: '',
                    password: '',
                    ackPassword: '',
                    code: '',
                    email: ''
                },
                formT: {
                    email: '',
                    adminNumb: ''
                },
                formLabelWidth: '100px',
                defaultSrc: require('../../assets/img/img.jpg'),
                fileList: [],
                imgSrc: '',
                cropImg: '',
                dialogVisible: false,
                params: {
                    adminNumb: ''
                },
                adminData: {}
            };
        },

        created() {
            this.initAdminLocal()
        },
        mounted() {
            this.initAdmin()
        },
        computed: {
            level: function () {
                let level = ''
                return level = this.adminData.level == '1' ? "超级管理员" : "普通管理员"
            }

        },
        methods: {
            initAdminLocal() {
                this.adminData = JSON.parse(localStorage.getItem('admin'))
                this.formP.email = JSON.parse(localStorage.getItem('admin')).email
                this.formP.id = JSON.parse(localStorage.getItem('admin')).id
            },
            initAdmin() {
                getAdminInfo(this.adminData.id).then(res => {
                    if (res.flag) {
                        this.adminData = res.data
                    }
                })
            },
            getCodeBtn() {
                console.log(this.formP);
                getEmailCode(this.formP).then(res => {
                    console.log(res);
                    if (res.flag) {
                        this.$message.success("发送验证码成功！请注意查看！")
                    }
                }).catch(err => {
                    this.$message.error("发送验证码失败！")
                })
            },
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                //退出登录
                if (command == 'loginOut') {
                    this.$confirm('确认退出吗?', '提示', {})
                        .then(() => {
                            localStorage.removeItem('admin');
                            this.$router.replace('/login');
                        })
                        .catch(() => {});
                    return;
                }
                //个人信息
                if (command == 'userInfo') {
                    this.dialogFormVisibleU = true;
                    return;
                }
                //修改密码
                if (command == 'updatePassword') {
                    this.dialogFormVisible = true;
                    return;
                }
            },
            cancleUpdate() {
                this.dialogFormVisible = false
                this.formP.password = ''
                this.formP.ackPassword = ''
                this.formP.code = ''
            },
            //修改密码
            updatePasswordBtn() {
                console.log(this.formP);
                if (this.formP.password !== this.formP.ackPassword) {
                    this.$message.error("请检查确认密码与密码是否一致！")
                    return
                } else if (this.formP.code == '') {
                    this.$message.error("请填写邮箱验证码！")
                    return
                } else {
                    changePassword(this.formP).then(res => {
                        if (res.flag) {
                            this.$message.success("修改密码成功，请重新登录！")
                            this.$router.replace({
                                name: "login"
                            })
                            localStorage.removeItem('admin')
                        }
                    }).catch(err => {
                        this.$message.error("修改密码出错了！")
                    })
                }

                // if (this.formP.password.length > 5 && this.formP.newPassword == this.formP.newPasswordTwo) {

                // }


            },
            //修改个人信息
            userInfo() {
                //发请求
                // updateAdminInfo(this.form).then(res=>{
                //     if (res.flag) {
                //         this.$message.success(res.msg);
                //         this.dialogFormVisibleU = false;
                //     }
                // }).catch(err=>{
                //    this.$message.error('服务器出错了~');
                // })
            },
            //找回密码
            findPassword() {
                // findPassword(this.formT).then(res=>{
                //     if (res.flag) {
                //         this.dialogFormVisibleF = false;
                //         this.$message.success(res.msg);
                //     }else{
                //         this.$message.error(res.msg);
                //     }
                // }).catch(err=>{
                //     this.$message.error('服务器出错了~');
                // })
            },
            // 侧边栏折叠
            collapseChage() {
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
            // 全屏事件
            handleFullScreen() {
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            },
        },
        mounted() {
            if (document.body.clientWidth < 1500) {
                this.collapseChage();
            };
        }
    };
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
        background-color: #1bd1a5;
    }

    .collapse-btn {
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }

    .collapse-btn:hover {
        background-color: #1bd1a5;
    }

    .header .logo {
        position: relative;
        float: left;
        width: 200px;
        padding-left: 35px;
        line-height: 70px;
        text-align: right;
        /* margin-left: 70px; */
    }

    .header .logo::before {
        position: absolute;
        left: 20px;
        top: 50%;
        margin-top: -70px;
        height: 70px;
        content: url(../../assets/img/logo.png);
        /* width: 70px; */
        /* height: 70px; */
        zoom: .3;
    }

    .header-right {
        float: right;
        padding-right: 50px;
    }

    .header-user-con {
        display: flex;
        height: 70px;
        align-items: center;
    }

    .btn-fullscreen {
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }

    .btn-bell,
    .btn-fullscreen {
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }

    .btn-bell-badge {
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }

    .btn-bell .el-icon-bell {
        color: #fff;
    }

    .user-name {
        margin-left: 10px;
    }

    .user-avator {
        margin-left: 20px;
    }

    .user-avator img {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .el-dropdown-link {
        color: #fff;
        cursor: pointer;
    }

    .el-dropdown-menu__item {
        text-align: center;
    }

    .content-title {
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }

    .pre-img {
        width: 80px;
        height: 80px;
        background: #f8f8f8;
        border: 1px solid #eee;
        border-radius: 40px;
    }

    .crop-demo {
        display: flex;
        align-items: flex-end;
    }

    .crop-demo-btn {
        position: relative;
        width: 80px;
        height: 30px;
        line-height: 30px;
        padding: 0 15px;
        margin-left: 20px;
        margin-bottom: 25px;
        background-color: #409eff;
        color: #fff;
        font-size: 12px;
        border-radius: 4px;
        box-sizing: border-box;
    }

    .crop-input {
        position: absolute;
        width: 100px;
        height: 40px;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }
</style>