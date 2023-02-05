import request from '../utils/request';

//批量删除list array转字符串
export async function deleteAll(params) {
    return request({
        url: '/log/deleteAll',
        method: 'post',
        data: params
    });
};


export async function getLogByPage(currentPage, pageSize) {
    return request({
        url: '/log/' + currentPage + '/' + pageSize,
        method: 'get'
    })
}

export async function getLogById(id) {
    return request({
        url: '/log/' + id,
        method: 'get'
    })
}

export async function addLog(params) {
    return request({
        url: '/log',
        method: 'post',
        data: params
    })
}

export async function delLog(id) {
    return request({
        url: '/log/' + id,
        method: 'delete'
    })
}