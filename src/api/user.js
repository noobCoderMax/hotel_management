import request from '../utils/request';



//更换头像
export async function changeAvator(params) {
    return request({
        url: '/user/avator',
        method: 'post',
        data: params
    });
};
//批量删除list array转字符串
export async function deleteAll(params) {
    return request({
        url: '/user/deleteAll',
        method: 'post',
        data: params
    });
};


//查询所有用户
export async function getUser(params) {
    return request({
        url: '/user/page/' + params.currentPage + '/' + params.pageSize,
        method: 'get',
    });
};


//添加用户
export async function addUser(params) {
    return request({
        url: '/user',
        method: 'post',
        data: params
    });
};

//修改用户信息
export async function updateUser(params) {
    return request({
        url: '/user',
        method: 'put',
        data: params
    });
};
//删除用户
export async function delUser(id) {
    return request({
        url: '/user/' + id,
        method: 'delete',
    });
};


//删除全部用户
export async function delAllUser(params) {
    return request({
        url: '/user/',
        method: 'delete',
    });
};

// echarts

//年龄聚合查询
export async function echartsAge() {
    return request({
        url: '/user/age',
        method: 'get',
    });
};


//性别聚合查询
export async function echartsGender() {
    return request({
        url: '/user/gender',
        method: 'get',
    });
};