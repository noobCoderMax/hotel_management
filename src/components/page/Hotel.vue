<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-qrcode"></i> 酒店管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="danger" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除
                </el-button>
                <el-select clearable v-model="query.insStatus" placeholder="状态" @change="changeState"
                    class="handle-select mr10">
                    <el-option key="1" label="启用" value="1"></el-option>
                    <el-option key="2" label="禁用" value="0"></el-option>
                </el-select>
                <el-input clearable v-model="query.insName" placeholder="名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="success" icon="el-icon-circle-plus-outline" class="handle-del mr10"
                    @click="dialogFormVisible = true">新增</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column label="图片 (查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image class="table-td-thumb" :src="scope.row.pic" :preview-src-list="[scope.row.pic]">
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="名称" width="190px"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
                <el-table-column prop="price" label="价格"></el-table-column>
                <el-table-column prop="score" label="评分"></el-table-column>
                <el-table-column prop="brand" label="品牌"></el-table-column>
                <el-table-column prop="city" label="城市"></el-table-column>
                <el-table-column prop="starName" label="星级"></el-table-column>
                <el-table-column prop="business" label="商圈"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.insStatus ==1? 'success' : 'danger'">
                            {{ scope.row.insStatus==1 ? '启用':'禁用' }}</el-tag>
                    </template>
                </el-table-column>

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
                <el-pagination background layout="total, prev, pager, next" :current-page="query.currentPage"
                    :page-size="query.pageSize" :total="query.pageTotal" @current-change="handlePageChange">
                </el-pagination>
            </div>
        </div>


        <!-- 编辑 弹出框 -->
        <el-dialog title="编辑酒店信息" :visible.sync="editVisible">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="图片">
                    <span>选择酒店图片：</span>
                    <div class="crop-demo" style="max-lines: 60px;">
                        <el-upload ref='upload' action="http://localhost:8099/hotel/avator" :limit="count"
                            :show-file-list="false" :on-success="editHandleAvatarSuccess"
                            :before-upload="beforeAvatarUpload" :on-error="imgUploadError">
                            <img style="width: 360px;height: 210px;" v-if="form.pic" :src="form.pic" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="form.status" class="handle-select mr10">
                        <el-option key="1" label="启用" value="1"></el-option>
                        <el-option key="2" label="禁用" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="城市">
                    <el-input v-model="form.city"></el-input>
                </el-form-item>
                <el-form-item label="详细地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="品牌">
                    <el-input v-model="form.brand"></el-input>
                </el-form-item>
                <el-form-item label="商圈">
                    <el-input v-model="form.business"></el-input>
                </el-form-item>
                <el-form-item label="星级">
                    <el-input v-model="form.starName"></el-input>
                </el-form-item>
                <el-form-item label="评分">
                    <el-input v-model="form.score"></el-input>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="form.price"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">保 存</el-button>
            </span>
        </el-dialog>

        <!-- 添加 弹出框 -->
        <el-dialog title="添加新酒店" :visible.sync="dialogFormVisible" width="40%">
            <el-form :model="saveForm">
                <el-form-item label="名称">
                    <el-input v-model="saveForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <span>选择酒店图片：</span>
                    <div class="crop-demo" style="max-lines: 60px;">
                        <el-upload ref='upload' action="http://localhost:8099/hotel/avator" :limit="count"
                            :show-file-list="false" :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload" :on-error="imgUploadError">
                            <img style="width: 360px;height: 210px;" v-if="saveForm.pic" :src="saveForm.pic"
                                class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item label="商圈">
                    <el-input v-model="saveForm.business"></el-input>
                </el-form-item>
                <el-form-item label="城市">
                    <el-input v-model="saveForm.city"></el-input>
                </el-form-item>
                <el-form-item label="详细地址">
                    <el-input v-model="saveForm.address"></el-input>
                </el-form-item>
                <el-form-item label="品牌">
                    <el-input v-model="saveForm.brand"></el-input>
                </el-form-item>
                <el-form-item label="星级">
                    <el-input v-model="saveForm.starName"></el-input>
                </el-form-item>
                <el-form-item label="评分">
                    <el-input v-model="saveForm.score"></el-input>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="saveForm.price"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveSchool">添 加</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        getHotels,
        getHotel,
        addHotel,
        updateHotel,
        delHotel,
        delAllHotel,
        deleteAll,
        changePic
    } from '../../api/hotel.js';
    export default {
        data() {
            return {
                count: 1,
                query: {
                    status: '',
                    name: '',
                    currentPage: 1,
                    pageSize: 10,
                    pageTotal: 1,
                },
                tableData: [],
                multipleSelection: [],
                editVisible: false,
                form: {},
                idx: -1,
                id: -1,
                dialogFormVisible: false,
                fileList: [],
                dialogVisible: false,
                saveForm: {
                    name: '',
                    address: '',
                    price: '',
                    score: '',
                    brand: '',
                    city: '',
                    starName: '',
                    business: '',
                    longitude: '',
                    latitude: '',
                    pic: ''

                },
            };
        },
        created() {
            this.getPage();
        },
        methods: {
            // 分页查询
            getPage() {
                getHotels(this.query)
                    .then((res) => {
                        if (res.flag) {
                            this.query.currentPage = res.data.current;
                            this.query.pageSize = res.data.size;
                            this.query.pageTotal = res.data.total;
                            this.tableData = res.data.records;
                        }
                    })
                    .catch((err) => {
                        this.$message.error('服务器出错了~');
                    });
            },
            //添加
            saveSchool() {
                console.log(this.form);
                if (this.saveForm.name == '' || this.saveForm.address == '' || this.saveForm.city == '' || this.saveForm
                    .pic == '' || this.saveForm.brand == '' || this.saveForm.business == '') {
                    this.$message.error('请完善信息!');
                } else {
                    addHotel(this.saveForm).then(res => {
                        if (res.flag) {
                            this.$message.success(res.msg);
                            this.dialogFormVisible = false;
                        } else {
                            this.$message.error(res.msg);
                        }
                    }).catch(err => {
                        this.$message.error('服务器出错了~');
                    })
                }
            },
            //根据状态查询
            changeState() {
                this.getPage();
            },
            //触发搜索按钮
            handleSearch() {
                getHotels(this.query)
                    .then((res) => {
                        if (res.flag) {
                            console.log(res.data);
                            this.tableData = res.data.records;
                            this.query.currentPage = res.data.current;
                            this.query.pageSize = res.data.size;
                            this.query.pageTotal = res.data.total;
                        }
                    })
                    .catch((err) => {
                        this.$message.error('服务器出错了~');
                    });
            },
            //删除操作
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                        type: 'warning'
                    })
                    .then(() => {
                        delHotel(row.id).then(res => {
                            if (res.flag) {
                                this.$message.success("删除成功！");
                                this.tableData.splice(index, 1);
                            }
                        }).catch(err => {
                            this.$message.error('服务器出错了~');
                        })
                    })
                    .catch(() => {});
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //全部删除
            delAllSelection() {
                this.$confirm('确定要删除吗？', '提示', {
                        type: 'warning'
                    })
                    .then(() => {
                        delAllHotel().then(res => {
                            if (res.flag) {
                                this.$message.success("删除全部酒店成功！");
                                this.getPage()
                            }
                        }).catch(err => {
                            this.$message.error('服务器出错了~');
                        })
                    }).catch(() => {
                        this.$message.error('删除失败');
                    });

            },
            // 编辑操作
            handleEdit(index, row) {
                this.idx = index;
                this.form = row;
                this.editVisible = true;
            },
            // 保存编辑
            saveEdit() {
                updateHotel(this.form).then(res => {
                    if (res.flag) {
                        this.editVisible = false;
                        this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                        this.$set(this.tableData, this.idx, this.form);
                    }
                }).catch(err => {
                    this.$message.error('服务器出错了~');
                })
            },
            //分页导航
            handlePageChange(val) {
                this.query.currentPage = val;
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
                this.saveForm.pic = res.data
                //图片上传成功
            },
            imgUploadError(err, file, fileList) {

                //图片上传失败调用
                this.$message.error("上传图片失败!");
            },
            editHandleAvatarSuccess(res, file) {
                this.form.pic = res.data
                //图片上传成功
            },
        }
    };
</script>

<style scoped>
    ::v-deep .el-dialog {
        border: 1px solid rgb(13, 210, 236);
        padding: 20px 60px;
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

    .example-p {
        height: 45px;
        display: flex;
        align-items: center;
    }

    .search-box {
        text-align: center;
        margin-top: 10px;
    }

    .search {
        width: 300px;
    }

    ul,
    li {
        list-style: none;
    }

    .icon-li {
        display: inline-block;
        padding: 10px;
        width: 120px;
        height: 120px;
    }

    .icon-li-content {
        display: flex;
        height: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .icon-li-content i {
        font-size: 36px;
        color: #606266;
    }

    .icon-li-content span {
        margin-top: 10px;
        color: #787878;
    }
</style>