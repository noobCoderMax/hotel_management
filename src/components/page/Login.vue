<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">酒店后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="adminNumb">
                    <el-input v-model="param.email" placeholder="管理员邮箱">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="param.password"
                        @keyup.enter.native="submitForm()">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {
        login
    } from '../../api/admin';
    export default {
        data: function () {
            return {
                param: {
                    email: '',
                    password: '',
                },
                rules: {
                    email: [{
                        required: true,
                        message: '请输入管理员邮箱',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请输入密码,长度不少于6位',
                        trigger: 'blur'
                    }],
                },
            };
        },
        methods: {
            submitForm() {
                login(this.param).then(res => {
                    if (res.flag) {
                        this.keepValue(res.data)
                        this.$message.success("登录成功！")
                        this.$router.push('/dashboard')

                    } else {
                        this.$message.error("请重新检查账号密码！")
                    }
                }).catch(err => {
                    this.$message.error("请重新检查账号密码！")
                })
            },
            keepValue(data) {
                localStorage.setItem('admin', JSON.stringify(data))
            }
        },
    };
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../../assets/img/login-bg.jpg);
        background-size: 100%;
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }
</style>