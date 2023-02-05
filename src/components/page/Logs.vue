<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-text"></i> 日志管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="danger" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除
                </el-button>
                <el-button>清除日期过滤器</el-button>
                <el-button>清除所有过滤器</el-button>
            </div>
            <!-- 
            <el-table ref="filterTable" :data="tableData" style="width: 100%" > -->
            <el-table ref="multipleTable" :data="tableData" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>


                <el-table-column prop="id" label="ID" width="80"> </el-table-column>
                <el-table-column prop="time" label="时间" width="160"> </el-table-column>


                <el-table-column prop="name" label="名称"> </el-table-column>
                <el-table-column prop="content" label="内容"> </el-table-column>


                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">查看
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" class="red"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
                </el-pagination>
            </div>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="日期">
                    <el-input readonly v-model="form.time"></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input readonly v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="信息">
                    <el-input readonly type="textarea" size="medium" resize="none" autosize v-model="form.content">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {
        getLogByPage,
        getLogById,
        addLog,
        delLog,
        deleteAll
    } from '../../api/log.js'
    export default {
        data() {
            return {
                pageSize: 10,
                currentPage: 2,
                pageTotal: 0,
                editVisible: false,
                form: {},
                multipleSelection: [],

                tableData: [{
                        date: '2016-05-02',
                        name: 'NullPointerException',
                        address: 'NullPointerException',
                        tag: 'info'
                    },
                    {
                        date: '2016-05-04',
                        name: 'NullPointerException',
                        address: 'NullPointerException',
                        tag: 'info'
                    },
                    {
                        date: '2016-05-01',
                        name: 'NullPointerException',
                        address: 'NullPointerException',
                        tag: 'warn'
                    },
                    {
                        date: '2016-05-03',
                        name: 'NullPointerException',
                        address: 'NullPointerException',
                        tag: 'error'
                    }
                ]
            };
        },
        created() {
            this.initLogs()
        },
        methods: {
            initLogs() {
                getLogByPage(this.currentPage, this.pageSize).then(res => {
                    if (res.flag) {
                        this.tableData = res.data.records
                        this.currentPage = res.data.current
                        this.pageSize = res.data.size
                        this.pageTotal = res.data.total
                    }
                }).catch(err => {
                    this.$message.error("获取日志失败！")
                })
            },
            handleSizeChange(val) {
                this.pageSize = val.toString()
                this.initLogs()

            },
            handleCurrentChange(val) {
                this.currentPage = val.toString()
                this.initLogs()
            },

            // 查看日志信息操作
            handleEdit(index, row) {
                this.idx = index;
                this.form = row;
                this.editVisible = true;
            },
            // 确定
            saveEdit() {
                this.editVisible = false;
            },
            // 删除操作
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                        type: 'warning'
                    })
                    .then(() => {
                        delLog(row.id).then(res => {
                            if (res.flag) {
                                this.$message.success('删除成功');
                                this.tableData.splice(index, 1);
                                this.initLogs()
                            }
                        })
                    })
                    .catch(() => {
                        this.$message.error('删除失败');
                    });
            },
            //批量删除
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
                                this.initLogs()
                                this.multipleSelection = [];
                            }
                        })
                    })
                    .catch(() => {
                        this.$message.error('删除失败');
                    });

            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            }
        }
    };
</script>

<style scoped>
    .block {
        margin: 18px;
        text-align: center;
        width: 50%;
        height: 35px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
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