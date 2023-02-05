import request from '../utils/request';



//批量删除list array转字符串
export async function deleteAll(params) {
    return request({
        url: '/hotel/deleteAll',
        method: 'post',
        data: params
    });
};

// 改变酒店图片
export async function changePic(params) {
    return request({
        url: '/hotel/avator',
        method: 'post',
        data: params
    });
};



//查询所有酒店
export async function getHotels(params) {
    return request({
        url: '/hotel/page/' + params.currentPage + '/' + params.pageSize,
        method: 'get',
        data: params
    });
};


// ID查询酒店
export async function getHotel(params) {
    return request({
        url: '/hotel' + params.id,
        method: 'get',
    });
};

//添加酒店
export async function addHotel(params) {
    return request({
        url: '/hotel',
        method: 'post',
        data: params
    });
};

//修改酒店
export async function updateHotel(params) {
    return request({
        url: '/hotel',
        method: 'put',
        data: params
    });
};


//删除酒店
export async function delHotel(params) {
    return request({
        url: '/hotel/' + params.id,
        method: 'post',
    });
};


//删除全部酒店
export async function delAllHotel() {
    return request({
        url: '/hotel',
        method: 'delete',
    });
};


// echarts
//品牌聚合查询
export async function echartsBrand() {
    return request({
        url: '/hotel/brand',
        method: 'get',
    });
};

//城市聚合查询
export async function echartsCity() {
    return request({
        url: '/hotel/city',
        method: 'get',
    });
};

//评分聚合查询
export async function echartsScore() {
    return request({
        url: '/hotel/score',
        method: 'get',
    });
};

//星级聚合查询
export async function echartsStar() {
    return request({
        url: '/hotel/star',
        method: 'get',
    });
};