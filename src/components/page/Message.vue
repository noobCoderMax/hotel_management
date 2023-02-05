<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 消息管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">

                <!-- 发布消息 -->
                <el-tab-pane label="发布消息" name="four">
                    <div class="four-div">
                        <el-form :label-position="labelPosition" style="margin: 10px;" label-width="80px"
                            :model="formInfo">
                            <el-form-item label="消息类型">
                                <el-select v-model="formInfo.theme" style="width: 250px" placeholder="选择类型">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="消息内容">
                                <el-input type="textarea" placeholder="请输入内容" style="width: 250px"
                                    v-model="formInfo.message"></el-input>
                            </el-form-item>
                            <div class="handle-row">
                                <el-button type="primary" @click="addMessage">发布消息</el-button>
                                <el-button type="info" @click="resetMessage">重置</el-button>
                            </div>
                        </el-form>
                    </div>
                </el-tab-pane>

                <!-- 新消息 -->
                <el-tab-pane :label="`新消息(${read.length>0 ? read.length:''})`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="read" :show-header="false" style="width: 100%"
                            :highlight-current-row="isHightLight">
                            <el-table-column width="60px">
                                <template slot-scope="scope">
                                    <span class="message-title">{{ scope.row.theme}}</span>
                                </template>
                            </el-table-column>


                            <el-table-column width="140px">
                                <template slot-scope="scope">
                                    <span class="message-title">{{ scope.row.email }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column width="100px">
                                <template slot-scope="scope">
                                    <span class="message-title">{{ scope.row.phone }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column width="140px">
                                <template slot-scope="scope">
                                    <span class="message-title">{{ scope.row.time }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{ scope.row.message }}</span>
                                </template>
                            </el-table-column>



                            <el-table-column prop="createTime" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="handleDel(scope.row,scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row" v-show="read.length>0" style="margin-left: 0px;">
                            <el-button type="danger" @click="delAllMsg">删除全部</el-button>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import {
        addMsg,
        delMsg,
        delAllMsg,
        getMsg
    } from '../../api/advice';
    export default {
        name: 'tabs',
        data() {
            return {
                message: 'second',
                showHeader: false,
                isHightLight: true,
                read: [],
                labelPosition: 'right',
                formInfo: {
                    nickname: '',
                    theme: '0',
                    message: '',
                    email: '',
                    phone: '',
                    createTime: ""
                },
                options: [{
                        value: '1',
                        label: '系统通知'
                    },
                    {
                        value: '2',
                        label: '管理通知'
                    },
                    {
                        value: '3',
                        label: '更新通知'
                    },
                    {
                        value: '4',
                        label: '紧急通知'
                    }
                ],
                params: {
                    adminNumb: '',
                    id: ''
                }
            };
        },
        created() {
            this.initMsg()
        },
        methods: {
            initMsg() {
                getMsg().then(res => {
                    console.log(res);
                    if (res.flag) {
                        this.read = res.data;
                    }
                }).catch(err => {
                    this.$message.error('服务器出错了~');
                })
            },
            // 删除信息
            handleDel(row, index) {
                this.params.id = row.id;
                delMsg(this.params).then(res => {
                    if (res.flag) {
                        this.$message.success(res.msg);
                        this.initMsg()
                    }
                }).catch(err => {
                    this.$message.error('服务器出错了~');
                })
            },
            // 删除所有信息
            delAllMsg() {
                delAllMsg().then(res => {
                    if (res.flag) {
                        this.$message.success(res.msg);
                    }
                }).catch(err => {
                    this.$message.error('服务器出错了~');
                })
            },
            //发布消息
            addMessage() {
                if (this.formInfo.message.length > 0) {
                    this.formInfo.createTime = this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
                    addMsg(this.formInfo).then(res => {
                        if (res.flag) {
                            this.formInfo.message = '';
                            this.$message.success(res.msg);
                        } else {
                            this.$message.error(res.msg);
                        }
                    }).catch(err => {
                        this.$message.error('服务器出错了~');
                    })
                } else {
                    this.$message.error('请完善信息!');
                }
            },
            //重置消息
            resetMessage() {
                this.formInfo.message = '';
            }
        },
    };
</script>

<style>
    .four-div {
        margin: 10px;
        padding-top: 10px;
        width: 30%;
        height: 220px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    }

    .handle-row {
        margin: 10px;
        margin-left: 80px;
    }

    .message-title {
        cursor: pointer;
    }

    .handle-row {
        margin-top: 30px;
    }
</style>