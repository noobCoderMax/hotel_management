<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20">
                    <div class="user-info">
                        <img :src="adminData.avator" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{ adminData.nickname }}</div>
                            <div>{{ role }}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        管理员描述 ：
                        <span>{{adminData.sign}}</span>
                    </div>
                    <div class="user-info-list">
                        管理员邮箱 ：
                        <span>{{adminData.email}}</span>
                    </div>
                    <div class="user-info-list">
                        管理员电话 ：
                        <span>{{adminData.phone}}</span>
                    </div>
                    <div class="user-info-list">
                        上次登录时间 ：
                        <span>2022-8-06</span>
                    </div>
                    <div class="user-info-list">
                        上次登录地点 ：
                        <span>西安</span>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height: 252px">
                    <div slot="header" class="clearfix">
                        <span>访问比例</span>
                    </div>
                    <el-progress :percentage="visit.admin"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">9999</div>
                                    <div>今日用户访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">321</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">5000</div>
                                    <div>数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height: 403px">
                    <div slot="header" class="clearfix">
                        <span>待办事项</span>
                        <el-button @click="dialogFormVisible = true" style="float: right; padding: 5px 6px" type="text"
                            class="el-icon-circle-plus-outline">
                            添加</el-button>
                    </div>
                    <el-table :show-header="false" :data="todoList" style="width: 100%">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div class="todo-item" :class="{ 'todo-item-del': scope.row.status }">
                                    {{ scope.row.content }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div class="todo-item" :class="{ 'todo-item-del': scope.row.status }">
                                    {{ scope.row.createTime }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template slot-scope="scope">
                                <el-button type="text" icon="el-icon-delete" class="red"
                                    @click="deleteItem(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <!-- 添加Form -->
        <el-dialog title="添加事项" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="事项内容" :label-width="formLabelWidth">
                    <el-input type="textarea" autosize v-model="form.content" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="时间" :label-width="formLabelWidth">
                    <div class="block">
                        <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择日期时间" align="right"
                            :picker-options="pickerOptions">
                        </el-date-picker>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveItem">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        getMatter,
        addMatter,
        delMatter
    } from '../../api/matter.js';

    import {
        getAdminInfo,
    } from '../../api/admin.js';


    import Schart from 'vue-schart';
    export default {
        name: 'dashboard',
        data() {
            return {
                name: "管理",
                visit: {
                    student: 71.3,
                    teacher: 24.1,
                    admin: 13.7
                },
                todoList: [],
                form: {
                    id: '',
                    adminId: '1',
                    content: '',
                    createTime: ''
                },
                dialogFormVisible: false,
                formLabelWidth: '120px',
                pickerOptions: {
                    shortcuts: [{
                            text: '今天',
                            onClick(picker) {
                                picker.$emit('pick', new Date());
                            }
                        },
                        {
                            text: '昨天',
                            onClick(picker) {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24);
                                picker.$emit('pick', date);
                            }
                        },
                        {
                            text: '一周前',
                            onClick(picker) {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit('pick', date);
                            }
                        }
                    ]
                },
                params: {
                    adminId: '1',
                },
                adminData: {}
            };
        },
        components: {
            Schart
        },
        computed: {
            role() {
                return this.adminData.level === '1' ? '超级管理员' : '普通管理员';
            }
        },
        created() {
            this.getItem()
            this.adminData = JSON.parse(localStorage.getItem('admin'))
        },
        mounted() {
            this.initAdmin()
        },
        methods: {
            initAdmin() {
                getAdminInfo(this.adminData.id).then(res => {
                    if (res.flag) {
                        this.adminData = res.data
                    }
                })
            },
            // 初始化待办事项
            getItem() {
                getMatter(this.params).then(res => {
                    if (res.flag) {
                        this.todoList = res.data
                    }
                }).catch(err => {
                    this.$message.error("获取代办事项失败！")
                })
            },
            // 保存代办事项
            saveItem() {
                if (this.form.content.length > 0) {
                    if (this.form.startTime.length == 0) {
                        this.form.createTime = this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
                    }
                    this.form.adminId = this.params.adminId;
                    addMatter(this.form).then(res => {
                        if (res.flag) {
                            this.$message.success(res.msg);
                            this.dialogFormVisible = false;
                        }
                    }).catch(err => {
                        this.$message.error('服务器出错了~');
                    })
                } else {
                    this.$message.error('请完善信息!');
                }
            },
            //删除事项
            deleteItem(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                        type: 'warning'
                    })
                    .then(() => {
                        delMatter(row.id).then(res => {
                            if (res.flag) {
                                this.$message.success('删除成功');
                                this.todoList.splice(index, 1);
                            }
                        }).catch(err => {
                            this.$message.error('服务器出错了~');
                        })

                    })
                    .catch(() => {});
            }
        }
    };
</script>


<style scoped>
    .red {
        color: #ff0000;
    }

    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 10px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

    .schart {
        width: 100%;
        height: 300px;
    }
</style>