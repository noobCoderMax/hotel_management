<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-pie-chart"></i> 数据分析 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="activeName">
                <el-tab-pane label="酒店数据" name="first">
                    <div class="plugins-tips">酒店</div>
                    <div class="con-item-two">
                        <div class="item-it" id="myChart" :style="{ width: '700px', height: '450px' }"></div>
                        <div class="item-it" id="myChart2" :style="{ width: '700px', height: '450px' }"></div>
                        <div class="item-it" id="myChart5" :style="{ width: '700px', height: '450px' }"></div>
                        <div class="item-it" id="myChart6" :style="{ width: '700px', height: '450px' }"></div>
                    </div>
                </el-tab-pane>



                <el-tab-pane label="用户数据" name="second">
                    <div class="plugins-tips">用户</div>
                    <div class="con-item-two">
                        <div class="item-it" id="myChart3" :style="{ width: '700px', height: '500px' }"></div>
                        <div class="item-it" id="myChart4" :style="{ width: '700px', height: '500px' }"></div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import {
        echartsBrand,
        echartsCity,
        echartsScore,
        echartsStar
    } from '../../api/hotel.js'

    import {
        echartsAge,
        echartsGender
    } from '../../api/user.js'
    export default {
        name: 'basecharts',
        data() {
            return {
                activeName: 'first',
            };
        },
        created() {
            this.initBrand()
            this.initCity()
            this.initStar()
            this.initScore()
            this.initGender()
            this.initAge()
        },
        methods: {
            // 品牌分析
            async initBrand() {
                let brand = []
                await echartsBrand().then(res => {
                    if (res.flag) {
                        res.data.forEach(element => {
                            brand.push({
                                name: element.name,
                                value: element.num
                            })
                        });
                    }
                })

                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'));

                var option = {
                    title: {
                        text: '品牌分布图',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left'
                    },
                    series: [{
                        // name: 'Access From',
                        type: 'pie',
                        radius: '50%',
                        data: [],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                }

                option.series[0].data = brand


                // 绘制图表
                myChart.setOption(option);
            },
            // 城市分析
            async initCity() {
                let cityName = []
                let city = []
                await echartsCity().then(res => {
                    if (res.flag) {
                        res.data.forEach(item => {
                            cityName.push(item.name)
                        })
                        for (let i = 0; i < res.data.length; i++) {
                            if (i == 0) {
                                city.push({
                                    value: res.data[i].num,
                                    itemStyle: {
                                        color: 'green'
                                    }
                                })
                            } else if (i == 1) {
                                city.push({
                                    value: res.data[i].num,
                                    itemStyle: {
                                        color: 'pink'
                                    }
                                })
                            } else if (i == 2) {
                                city.push({
                                    value: res.data[i].num,
                                    itemStyle: {
                                        color: 'skyblue'
                                    }
                                })
                            }

                        }
                    }
                })

                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart2'));
                // 绘制图表

                var option = {
                    title: {
                        text: '地域分布图',
                        left: 'center'
                    },
                    xAxis: {
                        type: 'category',
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [],
                        type: 'bar'
                    }]
                }

                option.series[0].data = city
                option.xAxis.data = cityName
                myChart.setOption(option);
            },
            // 星级分布
            async initStar() {
                let star = []
                await echartsStar().then(res => {
                    if (res.flag) {
                        res.data.forEach(item => {
                            star.push({
                                value: item.num,
                                name: item.name
                            })
                        })
                    }
                })

                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart5'));
                // 绘制图表

                var option = {
                    title: {
                        text: '酒店星级分布图',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left'
                    },
                    series: [{
                        // name: 'Access From',
                        type: 'pie',
                        radius: '50%',
                        data: [],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                }

                option.series[0].data = star
                myChart.setOption(option);
            },
            // 评分分布
            async initScore() {
                let scoreName = []
                let score = []
                await echartsScore().then(res => {
                    if (res.flag) {
                        res.data.forEach(item => {
                            score.push({
                                value: item.num,
                                name: item.name + '分'
                            })
                        })

                        res.data.forEach(item => {
                            scoreName.push(item.name + '分')
                        })
                    }
                })
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart6'));

                var option = {
                    title: {
                        text: '酒店评分分布图',
                        left: 'center'
                    },
                    xAxis: {
                        type: 'category',
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [],
                        type: 'bar'
                    }]
                }

                option.series[0].data = score
                option.xAxis.data = scoreName
                myChart.setOption(option)
            },


            //年龄分布
            async initAge() {
                let age = []
                await echartsAge().then(res => {
                    if (res.flag) {
                        res.data.forEach(item => {
                            age.push({
                                value: item.num,
                                name: item.age
                            })
                        })
                    }
                }).catch(err => {
                    this.$message.error("获取年龄信息失败！")
                })

                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart3'));
                // 绘制图表

                let option = {
                    title: {
                        text: '用户年龄分类图',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left'
                    },
                    series: [{
                        // name: 'Access From',
                        type: 'pie',
                        radius: '50%',
                        data: [],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                }

                option.series[0].data = age
                myChart.setOption(option);
            },
            //性别分布
            async initGender() {

                let genderName = []
                let gender = []
                await echartsGender().then(res => {
                    if (res.flag) {
                        for (let i = 0; i < res.data.length; i++) {
                            if (i == 0) {
                                gender.push({
                                    value: res.data[i].num,
                                    itemStyle: {
                                        color: 'green'
                                    }
                                })
                            } else if (i == 1) {
                                gender.push({
                                    value: res.data[i].num,
                                    itemStyle: {
                                        color: 'pink'
                                    }
                                })
                            } else if (i == 2) {
                                gender.push({
                                    value: res.data[i].num,
                                    itemStyle: {
                                        color: 'skyblue'
                                    }
                                })
                            }

                        }
                        res.data.forEach(item => {
                            genderName.push(item.name)
                        })
                    }
                }).catch(err => {
                    this.$message.error("获取性别信息失败！")
                })

                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart4'));
                // 绘制图表

                let option = {
                    title: {
                        text: '用户性别统计表',
                        left: 'center'
                    },
                    xAxis: {
                        type: 'category',

                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [],
                        type: 'bar'
                    }]
                }

                option.series[0].data = gender
                option.xAxis.data = genderName
                myChart.setOption(option);
            }
        }
    };
</script>

<style scoped>
    .test {
        font-size: 13px;
        margin-right: 5px;
    }

    .handle-select {
        width: 120px;
    }

    .con-item-one {
        flex: 1;
    }

    .con-item-two {
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
        margin-bottom: -20px;
        flex-wrap: wrap;
    }

    .item-it {
        padding: 10px;
        box-shadow: 10px 10px 10px #eef1f6;
        border: 9px solid #eef1f6;
        margin: 50px;
    }

    .con-div {
        margin-top: 10px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .mr10 {
        margin-right: 10px;
    }

    .block {
        margin: 18px;
        text-align: center;
        width: 50%;
        height: 35px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    }

    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .schart-box {
        display: inline-block;
        margin: 20px;
    }

    .schart {
        width: 600px;
        height: 400px;
    }

    .content-title {
        clear: both;
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
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

    .schart-box {
        display: inline-block;
        margin: 20px;
    }

    .schart {
        width: 600px;
        height: 400px;
    }

    .content-title {
        clear: both;
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
</style>