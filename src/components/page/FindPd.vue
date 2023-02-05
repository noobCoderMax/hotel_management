<template>
    <div class="home">
        <div class="finder">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="新的密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    // import {findPassword2} from '../../api/admin';
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    password: '',
                    checkPass: '',
                    adminNumb: ''
                },
                rules: {
                    pass: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                    checkPass: [{
                        validator: validatePass2,
                        trigger: 'blur'
                    }]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.ruleForm.adminNumb = this.$cookies.get('adminNumb');
                        findPassword2(this.ruleForm).then(res => {
                            if (res.flag) {
                                this.$message.success(res.msg);
                                this.$router.push('/');
                            } else {
                                this.$message.error(res.msg);
                            }
                        }).catch(err => {
                            this.$message.error('服务器出错了~');
                        })
                    } else {
                        this.$message.error('密码格式不符合要求~');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    };
</script>

<style scope>
    .finder {
        margin: 0 auto;
        margin-top: 10%;
        width: 400px;
        height: 400px;
    }

    .home {
        position: relative;
        top: 35px;
        margin: 0 auto;
        background-color: whitesmoke;
        padding-top: 12%;
        width: 900px;
        border-radius: 15px
    }
</style>