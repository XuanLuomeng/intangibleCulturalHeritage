window.addEventListener("load", function () {
    $.get("/intangibleCulturalHeritage/IntangibleRecords", function (data) {
        (function () {
            var myChart = echarts.init(document.getElementById('charttwo'));
            var mapName = 'china'
            var geoCoordMap = {};
            /*获取地图数据*/
            myChart.showLoading();
            var mapFeatures = echarts.getMap(mapName).geoJson.features;
            myChart.hideLoading();
            mapFeatures.forEach(function (v) {
                // 地区名称
                var name = v.properties.name;
                // 地区经纬度
                geoCoordMap[name] = v.properties.cp;
            });

            var max = 480,
                min = 9; // todo
            var maxSize4Pin = 100,
                minSize4Pin = 20;

            var convertData = function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value),
                        });
                    }
                }
                return res;
            };
            option = {
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        if (typeof (params.value)[2] == "undefined") {
                            var toolTiphtml = ''
                            for (var i = 0; i < data.length; i++) {
                                if (params.name == data[i].name) {
                                    toolTiphtml += data[i].name + ':<br>'
                                    toolTiphtml += "项目数量" + ':' + data[i].value + "<br>"
                                }
                            }
                            return toolTiphtml;
                        } else {
                            var toolTiphtml = ''
                            for (var i = 0; i < data.length; i++) {
                                if (params.name == data[i].name) {
                                    toolTiphtml += data[i].name + ':<br>'
                                    toolTiphtml += "项目数量" + ':' + data[i].value + "<br>"
                                }
                            }
                            return toolTiphtml;
                        }
                    }
                },
                visualMap: {
                    show: true,
                    min: 0,
                    max: 300,
                    left: 'left',
                    top: 'bottom',
                    text: ['高', '低'], // 文本，默认为数值文本
                    calculable: true,
                    seriesIndex: [1],
                    inRange: {
                        color: ['#A5CC82', '#00467F'] // 蓝绿
                    }
                },
                geo: {
                    show: true,
                    map: mapName,
                    zoom: 1.2,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false,
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#031525',
                            borderColor: '#3B5077',
                        },
                        emphasis: {
                            areaColor: '#2B91B7',
                        }
                    }
                },
                series: [
                    {
                        name: '散点',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData(data),
                        symbolSize: function (val) {
                            return val[2] / 10;
                        },
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#05C3F9'
                            }
                        }
                    },
                    {
                        type: 'map',
                        map: mapName,
                        geoIndex: 0,
                        aspectScale: 0.75, //长宽比
                        showLegendSymbol: false, // 存在legend时显示
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    color: '#2B91B7'
                                }
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: '#031525',
                                borderColor: '#3B5077',
                            },
                            emphasis: {
                                areaColor: '#2B91B7'
                            }
                        },
                        animation: false,
                        data: data
                    },
                    {
                        name: 'Top 5',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: convertData(data.sort(function (a, b) {
                            return b.value - a.value;
                        }).slice(0, 5)),
                        symbolSize: function (val) {
                            return val[2] / 10;
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'yellow',
                                shadowBlur: 10,
                                shadowColor: 'yellow'
                            }
                        },
                        zlevel: 1
                    },

                ]
            };
            myChart.setOption(option);
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        })();
    })
})
