<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 管理员 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="danger" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除
                </el-button>
                <el-select clearable v-model="query.status" @change="changeState" placeholder="状态"
                    class="handle-select mr10">
                    <el-option key="1" label="启用" value="1"></el-option>
                    <el-option key="2" label="禁用" value="0"></el-option>
                </el-select>
                <el-input clearablet v-model="query.id" placeholder="管理号" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="success" icon="el-icon-circle-plus-outline" class="handle-del mr10"
                    @click="dialogFormVisible = true">新增</el-button>
            </div>



            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="80px"></el-table-column>
                <el-table-column prop="nickname" label="昵称"></el-table-column>

                <el-table-column label="头像(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image class="table-td-thumb" :src="scope.row.avator" :preview-src-list="[scope.row.avator]">
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="permLevel" label="权限">
                    <template slot-scope="scope">
                        {{
                            scope.row.level==0 ? '普通管理员':'超级管理员'
                        }}
                    </template>
                </el-table-column>

                <el-table-column label="状态" width="80" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status ==0 ? 'danger':'success' ">{{
                            scope.row.status==0 ? '禁用':'启用'
                        }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="birth" label="生日"></el-table-column>
                <el-table-column prop="phone" label="手机号"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" class="red"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background layout="total, prev, pager, next" :current-page="currentPage"
                    :page-size="pageSize" :total="pageTotal" @current-change="handlePageChange">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item>
                    <span style="margin-left: -50px;">选择管理员头像：</span>
                    <div class="crop-demo" style="margin-left: -20px;">
                        <el-upload ref='upload' action="http://localhost:8099/user/avator" :limit="count"
                            :show-file-list="false" :on-success="editHandleAvatarSuccess"
                            :before-upload="beforeAvatarUpload" :on-error="imgUploadError">
                            <img style="width: 360px;height: 210px;" v-if="form.avator" :src="form.avator"
                                class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </el-form-item>

                </el-form-item>

                <el-form-item label="状态">
                    <el-select v-model="form.status" class="handle-select mr10">
                        <el-option key="1" label="启用" :value="1"></el-option>
                        <el-option key="2" label="禁用" :value="0"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="权限">
                    <el-select v-model="form.level" class="handle-select mr10">
                        <el-option key="1" label="普通管理员" value="0"></el-option>
                        <el-option key="2" label="超级管理员" value="1"></el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="昵称">
                    <el-input v-model="form.nickname"></el-input>
                </el-form-item>

                <el-form-item label="邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>


                <el-form-item label="性别">
                    <el-select v-model="form.gender" class="handle-select mr10">
                        <el-option key="1" label="男" value="1"></el-option>
                        <el-option key="2" label="女" value="0"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="生日">
                    <el-date-picker v-model="form.birth" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>




                <el-form-item label="手机号">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>


                <el-form-item label="密码">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>

                <el-form-item label="描述">
                    <el-input v-model="form.sign" type="text"></el-input>
                </el-form-item>





            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">保 存</el-button>
            </span>
        </el-dialog>


        <!-- 添加弹出框 -->
        <el-dialog title="添加管理员" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="saveForm" width="40%">

                <el-form-item>
                    <span>选择管理员头像：</span>
                    <div class="crop-demo" style="max-lines: 60px;">
                        <el-upload ref='upload' action="http://localhost:8099/user/avator" :limit="count"
                            :show-file-list="false" :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload" :on-error="imgUploadError">
                            <img style="width: 360px;height: 210px;" v-if="saveForm.avator" :src="saveForm.avator"
                                class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </el-form-item>

                <el-form-item label="状态">
                    <el-select v-model="saveForm.status" class="handle-select mr10">
                        <el-option key="1" label="启用" :value="1"></el-option>
                        <el-option key="2" label="禁用" :value="0"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="权限">
                    <el-select v-model="saveForm.level" class="handle-select mr10">
                        <el-option key="1" label="普通管理员" value="0"></el-option>
                        <el-option key="2" label="超级管理员" value="1"></el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="昵称">
                    <el-input v-model="saveForm.nickname"></el-input>
                </el-form-item>

                <el-form-item label="邮箱">
                    <el-input v-model="saveForm.email"></el-input>
                </el-form-item>


                <el-form-item label="性别">
                    <el-select v-model="saveForm.gender" class="handle-select mr10">
                        <el-option key="1" label="男" value="1"></el-option>
                        <el-option key="2" label="女" value="0"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="生日">
                    <el-date-picker v-model="saveForm.birth" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="手机号">
                    <el-input v-model="saveForm.phone"></el-input>
                </el-form-item>

                <el-form-item label="密码">
                    <el-input v-model="saveForm.password"></el-input>
                </el-form-item>

                <el-form-item label="描述">
                    <el-input v-model="saveForm.sign" type="text"></el-input>
                </el-form-item>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdmin">添 加</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        getAdminInfo,
        addAdminInfo,
        updateAdminInfo,
        delAdminInfo,
        getAdminByPage,
        deleteAll,
        changeAvator
    } from '../../api/admin.js';
    import VueCropper from 'vue-cropperjs';

    export default {
        name: 'basetable',
        data() {
            return {
                count: 1,
                query: {
                    status: 1,
                    id: '',
                    currentPage: 1,
                    pageSize: 10,
                    pageTotal: 0,
                },
                currentPage: 1,
                pageSize: 10,
                pageTotal: 0,
                tableData: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                form: {
                    onlineStatus: 1,
                    email: '',
                    password: '',
                    level: '',
                    gender: '',
                    status: 1,
                    nickname: '',
                    phone: '',
                    sign: '',
                    birth: '',
                    avator: ''
                },
                idx: -1,
                id: -1,
                dialogFormVisible: false,
                saveForm: {
                    email: '',
                    password: '',
                    level: '',
                    gender: '',
                    status: 1,
                    nickname: '',
                    phone: '',
                    sign: '',
                    birth: '',
                    avator: ''
                },

                value: '',
                fileList: [],
                dialogVisible: false
            };
        },
        components: {
            VueCropper
        },
        created() {
            this.getPage();
        },
        methods: {
            getPage() {
                getAdminByPage(this.currentPage, this.pageSize).then(res => {
                        if (res.flag) {
                            this.tableData = res.data.records
                            this.pageTotal = res.data.total
                            console.log(res.data.records[0]);
                            this.currentPage = res.data.current
                            this.pageSize = res.data.size
                        }
                    })
                    .catch((err) => {
                        this.$message.error('服务器出错了~');
                    });
            },
            // //根据状态查询
            changeState() {
                // this.getPage();
            },
            // //添加管理员
            saveAdmin() {
                console.log(this.saveForm);
                addAdminInfo(this.saveForm).then(res => {
                    if (res.flag) {
                        this.dialogFormVisible = false;
                        this.$message.success('添加成功!');
                    }
                }).catch(err => {
                    this.$message.error('服务器出错了~');
                })
            },


            // // 触发搜索按钮
            handleSearch() {
                this.getPage();
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            // // 删除操作
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                        type: 'warning'
                    }).then(() => {
                        delAdminInfo(row.id).then(res => {
                            if (res.flag) {
                                this.$message.success('删除成功');
                                this.tableData.splice(index, 1);
                            }
                        }).catch(err => {
                            this.$message.error('服务器出错了~');
                        })
                    })
                    .catch(() => {});
            },

            //多选删除
            delAllSelection() {
                let list = []

                for (let i = 0; i < this.multipleSelection.length; i++) {
                    list.push(
                        parseInt(this.multipleSelection[i].id)
                    )
                }


                this.$confirm('确定要删除吗？', '提示', {
                        type: 'warning'
                    })
                    .then(() => {
                        deleteAll(list).then(res => {
                            if (res.flag) {
                                this.$message.success("删除成功！")
                                this.multipleSelection = [];
                                this.getPage()
                            }
                        }).catch(err => {
                            this.$message.error('服务器出错了~');
                        })
                    })
                    .catch(() => {
                        this.$message.error('删除失败');
                    });

            },
            // // 编辑操作
            handleEdit(index, row) {
                this.idx = index;
                this.form = row;
                this.editVisible = true;
            },
            // // 保存编辑
            saveEdit() {
                updateAdminInfo(this.form).then(res => {
                    if (res.flag) {
                        this.editVisible = false;
                        this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                        this.$set(this.tableData, this.idx, this.form);
                    }
                }).catch((err) => {
                    this.$message.error('服务器出错了~');
                });
            },
            // // 分页导航
            handlePageChange(val) {
                this.currentPage = val;
                this.getPage();
            },

            beforeAvatarUpload(file) {
                //文件上传之前调用做一些拦截限制
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 20;

                if (!isJPG) {
                    this.$message.error('上传广告图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error("上传图片大小不能超过 2MB!");
                }
                return isJPG && isLt2M;
            },
            handleAvatarSuccess(res, file) {

                this.saveForm.avator = res.data
                //图片上传成功
            },
            imgUploadError(err, file, fileList) {

                //图片上传失败调用
                this.$message.error("上传图片失败!");
            },
            editHandleAvatarSuccess(res, file) {
                this.form.avator = res.data
                //图片上传成功
            },
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
    }

    .collapse-btn {
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }

    .header .logo {
        float: left;
        width: 200px;
        padding-left: 35px;
        line-height: 70px;
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

    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .mr10 {
        margin-right: 10px;
    }

    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }

    ::v-deep .el-dialog {
        border: 1px solid rgb(13, 210, 236);
        padding: 20px 60px;
    }
</style>