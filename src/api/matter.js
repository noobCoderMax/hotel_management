import request from '../utils/request';




// ID查询事项
export async function getMatter(params) {
    return request({
        url: '/matter/' + params.adminId,
        method: 'get',
    });
};

//ID添加事项
export async function addMatter(params) {
    return request({
        url: '/matter',
        method: 'post',
        data: params
    });
};

//删除事项
export async function delMatter(id) {
    return request({
        url: '/matter/' + id,
        method: 'delete',
    });
};