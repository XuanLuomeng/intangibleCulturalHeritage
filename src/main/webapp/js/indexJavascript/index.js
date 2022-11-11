window.addEventListener("load", () => {
    let img = document.querySelectorAll(".img");
    let small = document.querySelectorAll(".small");
    var exitLogin = document.getElementById("exitLogin");
    let chat = document.getElementById('chat');
    for (let i = 0; i < img.length; i++) {
        img[i].addEventListener("mouseover", function () {
            small[i].style.opacity = "1";
        });
        img[i].addEventListener("mouseout", function () {
            small[i].style.opacity = "0";
        });
    }

    // 阿飘鼠标
    var mouses = document.getElementById("P");
    document.addEventListener("mousemove", function (e) {
        var x = e.pageX;
        var y = e.pageY;
        mouses.style.left = x + 5 + "px";
        mouses.style.top = y + 8 + "px";
    });

    var unLogin = document.getElementById("unLogin");

    lo();

    function lo() {
        $.get("/intangibleCulturalHeritage/isLogin", function (user) {
            var ph = '<img src="../intangibleCulturalHeritage/images/indeImg/head.png" width="100%">';
            var ht = '<a href="/intangibleCulturalHeritage/loginOrRegister" class="fdbg">登录 / 注册</a>';
            chat.style.pointerEvents = 'none';
            unLogin.style.display = "none";
            $("#photo").html(ph);
            $("#name").html(ht);
            if (user.userName != null) {
                ht = '<a href="javascript:void(0)" class="fdbg">' + user.userName + '</a>';
                ph = '<img src="' + user.photo + '" width="100%" title="点击查看学习记录表" id="checkRecord">';
                var aph = '<img src="' + user.photo + '" width="100%">';
                var aht = '<a href="javascript:void(0)" class="fdbg">' + user.userName + '</a>';
                unLogin.style.display = "block";
                chat.style.pointerEvents = 'auto';
                $("#photo").html(ph);
                $("#name").html(ht);
                $("#a_photo").html(aph);
                $("#a_name").html(aht);
                var checkRecord = document.getElementById('checkRecord');
                var taskbg = document.querySelector('.taskbg');
                var btnclose = document.querySelector('.btnclose');
                let head = document.getElementById('head');
                checkRecord.onclick = function () {
                    head.innerHTML = "<div class='avatar'>" +
                        "<img src='" + user.photo + "' width='100%'>" +
                        "<div class='name'>" + user.userName + "</div>" +
                        "</div>";
                    $.get("/intangibleCulturalHeritage/learningProgress", function (array) {
                        (function () {
                            var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6", "#60cda0"];
                            // 1. 实例化对象
                            var myChart = echarts.init(document.getElementById('chartone'));
                            // 2. 指定配置和数据
                            // 数据在55行，76行
                            var percent = new Array(6);
                            for (var i = 0; i < array.length; i++) {
                                (function (i) {
                                    array[i].index = i;
                                    percent[i] = array[i] / 5 * 100;
                                })(i)
                            }
                            var option = {
                                grid: {
                                    top: "1%",
                                    left: "18%",
                                    bottom: "20%"
                                    // containLabel: true
                                },
                                // 不显示x轴的相关信息
                                xAxis: {
                                    show: false
                                },
                                yAxis: [
                                    {
                                        type: "category",
                                        inverse: true,
                                        data: ["皮影", "京剧", "剪纸", "纸鸢", "扎染", "鱼灯"],
                                        // 不显示y轴的线
                                        axisLine: {
                                            show: false
                                        },
                                        // 不显示刻度
                                        axisTick: {
                                            show: false
                                        },
                                        axisLabel: {
                                            color: "rgb(139, 157, 230)",
                                            fontSize: "18"
                                        }
                                    },
                                    {
                                        data: array,
                                        inverse: true,
                                        // 不显示y轴的线
                                        axisLine: {
                                            show: false
                                        },
                                        // 不显示刻度
                                        axisTick: {
                                            show: false
                                        },
                                        // 把刻度标签里面的文字颜色设置为白色
                                        axisLabel: {
                                            color: "rgb(139, 157, 230)",
                                            fontSize: "18"
                                        }
                                    }
                                ],
                                series: [
                                    {
                                        name: "条",
                                        type: "bar",
                                        data: percent,
                                        yAxisIndex: 0,
                                        // 修改第一组柱子的圆角
                                        itemStyle: {
                                            barBorderRadius: 20,
                                            // 此时的color 可以修改柱子的颜色
                                            color: function (params) {
                                                // params 传进来的是柱子对象
                                                // console.log(params);
                                                // dataIndex 是当前柱子的索引号
                                                return myColor[params.dataIndex];
                                            }
                                        },
                                        // 柱子之间的距离
                                        barCategoryGap: 50,
                                        //柱子的宽度
                                        barWidth: 26,
                                        // 显示柱子内的文字
                                        label: {
                                            show: true,
                                            position: "inside",
                                            // {c} 会自动的解析为 数据  data里面的数据
                                            formatter: "{c}%"
                                        }
                                    },
                                    {
                                        name: "框",
                                        type: "bar",
                                        barCategoryGap: 50,
                                        barWidth: 30,
                                        yAxisIndex: 1,
                                        data: [100, 100, 100, 100, 100, 100],
                                        itemStyle: {
                                            color: "none",
                                            borderColor: "#00c1de",
                                            borderWidth: 3,
                                            barBorderRadius: 20
                                        }
                                    }
                                ]
                            };
                            // 3. 把配置给实例对象
                            myChart.setOption(option);
                            // 4. 让图表跟随屏幕自动的去适应
                            window.addEventListener("resize", function () {
                                myChart.resize();
                            });
                        })();
                    });
                    taskbg.style.display = "block";
                    btnclose.onclick = function () {
                        taskbg.style.display = "none";
                    }
                }
            }
        });
    };
    exitLogin.onclick = function () {
        $.get("/intangibleCulturalHeritage/exitServlet", function () {
            location.href = "/intangibleCulturalHeritage/index";
        })
    }
});
