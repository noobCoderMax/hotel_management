import request from '../utils/request';


//更换头像
export async function changeAvator(params) {
    return request({
        url: '/admin/avator',
        method: 'post',
        data: params
    });
};
//批量删除list array转字符串
export async function deleteAll(params) {
    return request({
        url: '/admin/deleteAll',
        method: 'post',
        data: params
    });
};
//修改自己当前密码
export async function changePassword(params) {
    return request({
        url: '/admin/upd',
        method: 'post',
        data: params
    });
};
//获取邮箱激活码
export async function getEmailCode(params) {
    return request({
        url: '/admin/code',
        method: 'post',
        data: params
    });
};



//登录
export async function login(params) {
    return request({
        url: '/admin/login',
        method: 'post',
        data: params
    });
};


//查询管理员信息
export async function getAdminInfo(id) {
    return request({
        url: '/admin/' + id,
        method: 'get',
    });
};

//添加管理员信息
export async function addAdminInfo(params) {
    return request({
        url: '/admin',
        method: 'post',
        data: params
    });
};


//修改管理员信息
export async function updateAdminInfo(params) {
    return request({
        url: '/admin',
        method: 'put',
        data: params
    });
};

//删除管理员信息
export async function delAdminInfo(id) {
    return request({
        url: '/admin/' + id,
        method: 'delete'
    });
};

// 分页查询管理员
export async function getAdminByPage(currentPage, pageSize) {
    return request({
        url: '/admin/page/' + currentPage + '/' + pageSize,
        method: 'get'
    });
};



//修改密码
// export async function updatePassword(params) {
//     return request({
//         url: '/updatePassword',
//         method: 'put',
//         data:params
//     });
// };
// //找回密码
// export async function findPassword(params) {
//     return request({
//         url: '/findPassword',
//         method: 'post',
//         data:params
//     });
// };
// //找回密码2
// export async function findPassword2(params) {
//     return request({
//         url: '/findPassword2',
//         method: 'post',
//         data:params
//     });
// };





// 查询事项
export async function getMsg(params) {
    return request({
        url: '/matter/' + params.id,
        method: 'get',
    });
};
//添加事项
export async function addTask(params) {
    return request({
        url: '/task',
        method: 'post',
        data: params
    });
};
//删除事项
export async function delTask(params) {
    return request({
        url: '/task/' + params.taskNumb,
        method: 'delete',
    });
};
//发布事项
export async function addMsg(params) {
    return request({
        url: '/message',
        method: 'post',
        data: params
    });
};
//删除事项
export async function delMsg(params) {
    return request({
        url: '/message/' + params.msgId,
        method: 'delete',
    });
};
//删除全部事项
export async function delAllMsg(params) {
    return request({
        url: '/delAllMsg/' + params.adminNumb,
        method: 'delete',
    });
};