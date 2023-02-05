import request from '../utils/request';


//查询所有消息
export async function getMsg(params) {
    return request({
        url: '/advice',
        method: 'get',
    });
};

//删除消息
export async function delMsg(params) {
    return request({
        url: '/advice/' + params.id,
        method: 'delete',
    });
};
//发布消息
export async function addMsg(params) {
    return request({
        url: '/advice',
        method: 'post',
        data: params
    });
};

//删除全部消息
export async function delAllMsg(params) {
    return request({
        url: '/advice/',
        method: 'delete',
    });
};