window.addEventListener('load', function () {
    var leaf = document.querySelectorAll('.lotusleaf');
    var boat = document.getElementById('boat');
    var flower = document.querySelectorAll(".flower")
    var bg = document.querySelectorAll(".taskbg");
    var btnclose = document.querySelectorAll(".btnclose");
    var tv = document.querySelectorAll(".videos");
    var isLogin = true;
    var finish = this.document.querySelector('.finish');
    var youfinish = document.querySelector('.youfinish');
    $.get("/intangibleCulturalHeritage/isLogin", function (user) {
        if (user.userName == null) {
            window.isLogin = false;
        } else {
            window.isLogin = true;
        }
        getInfo();
    })
    for (var i = 0; i < leaf.length; i++) {
        leaf[i].index = i;
        leaf[i].onclick = function () {
            bg[this.index].style.display = "block";
            if (this.index + 1 == leaf.length) {
                leaf[this.index].style.pointerEvents = 'auto';
            } else {
                leaf[this.index + 1].style.pointerEvents = 'auto';
            }
            // 调用传值函数
            load('1', this.index + 1);
        }
    }
    function getCpNum(visitors) {
        for (var i = 0; i < btnclose.length; i++) {
            btnclose[i].index = i;
            btnclose[i].onclick = function () {
                bg[this.index].style.display = 'none';
                flower[this.index].classList.add('flowerap');
                if (this.index == 0) {
                    tv[0].pause();
                    boat.classList.add('moveone');
                }
                if (this.index == 1) {
                    tv[1].pause();
                    boat.classList.remove('moveone');
                    boat.classList.add("movetwo");
                }
                if (this.index == 2) {
                    boat.classList.remove('movetwo');
                    boat.classList.add("movethree");
                }
                if (this.index == 3) {
                    tv[2].pause();
                    boat.classList.remove('movethree');
                    boat.classList.add("movefour");
                }
                if (this.index == 4) {
                    boat.classList.remove('movefour');
                    boat.classList.add('movefive');
                    if (visitors == '') {
                        setTimeout(() => {
                            finish.style.display = 'block';
                            finish.classList.add("introappear");
                        }, 100);
                        setTimeout(() => {
                            finish.style.display = 'none';
                        }, 3000);

                    } else {
                        setTimeout(() => {
                            youfinish.style.display = 'block';
                            youfinish.classList.add("introappear");
                        }, 100);
                        setTimeout(() => {
                            youfinish.style.display = 'none';
                        }, 3000);
                    }
                }
            }
        }

    }

    function load(islandId, cpNum) {
        // 用户数据传值
        if (window.isLogin) {
            $.get('/intangibleCulturalHeritage/updateCheckPointInfo', { islandId: islandId, cpNum: cpNum }, function () {
            })
        }
        // 游客数据传值
        else {
            $.get('/intangibleCulturalHeritage/visitorsSave', { islandId: islandId, cpNum: cpNum }, function () {
            })
        }
    }

    function getInfo() {
        // 用户关卡响应
        if (window.isLogin) {
            $.get('/intangibleCulturalHeritage/getCheckPointInfo', { islandId: 1 }, function (cpNum) {
                getCpNum('');
                if (cpNum == 0) {
                    leaf[0].style.pointerEvents = 'auto';
                    boat.style.top = '110px';
                    boat.style.left = '0';
                } else if (cpNum == 1) {
                    for (var i = 0; i < cpNum; i++) {
                        leaf[i + 1].style.pointerEvents = 'auto';
                        flower[i].classList.add('flowerap');
                    }
                    boat.style.top = '20px';
                    boat.style.left = '170px';
                } else if (cpNum == 2) {
                    for (var i = 0; i < cpNum; i++) {
                        leaf[i + 1].style.pointerEvents = 'auto';
                        flower[i].classList.add('flowerap');
                    }
                    boat.style.top = '90px';
                    boat.style.left = '390px';
                } else if (cpNum == 3) {
                    for (var i = 0; i < cpNum; i++) {
                        leaf[i + 1].style.pointerEvents = 'auto';
                        flower[i].classList.add('flowerap');
                    }
                    boat.style.top = '90px';
                    boat.style.left = '650px';
                } else if (cpNum == 4) {
                    for (var i = 0; i < cpNum; i++) {
                        leaf[i + 1].style.pointerEvents = 'auto';
                        flower[i].classList.add('flowerap');
                    }
                    boat.style.top = '80px';
                    boat.style.left = '890px';
                } else if (cpNum == 5) {
                    for (var i = 0; i < cpNum; i++) {
                        leaf[i].style.pointerEvents = 'auto';
                        flower[i].classList.add('flowerap');
                    }
                    boat.style.top = '120px';
                    boat.style.left = '1300px';
                    setTimeout(() => {
                        youfinish.style.display = 'block';
                        youfinish.classList.add("introappear");
                    }, 100);
                    setTimeout(() => {
                        youfinish.style.display = 'none';
                    }, 3000);

                }
            })
        } else {
            // 游客关卡响应
            $.get('/intangibleCulturalHeritage/getVisitorsCheckPoint', { islandId: 1 }, function (cpNum) {
                getCpNum('visitors');
                if (cpNum == 0) {
                    leaf[0].style.pointerEvents = 'auto';
                    boat.style.top = '110px';
                    boat.style.left = '0';
                } else if (cpNum == 1) {
                    for (var i = 0; i < cpNum; i++) {
                        leaf[i + 1].style.pointerEvents = 'auto';
                        flower[i].classList.add('flowerap');
                    }
                    boat.style.top = '20px';
                    boat.style.left = '170px';
                } else if (cpNum == 2) {
                    for (var i = 0; i < cpNum; i++) {
                        leaf[i + 1].style.pointerEvents = 'auto';
                        flower[i].classList.add('flowerap');
                    }
                    boat.style.top = '90px';
                    boat.style.left = '390px';
                } else if (cpNum == 3) {
                    for (var i = 0; i < cpNum; i++) {
                        leaf[i + 1].style.pointerEvents = 'auto';
                        flower[i].classList.add('flowerap');
                    }
                    boat.style.top = '90px';
                    boat.style.left = '650px';
                } else if (cpNum == 4) {
                    for (var i = 0; i < cpNum; i++) {
                        leaf[i + 1].style.pointerEvents = 'auto';
                        flower[i].classList.add('flowerap');
                    }
                    boat.style.top = '80px';
                    boat.style.left = '890px';
                } else if (cpNum == 5) {
                    for (var i = 0; i < cpNum; i++) {
                        leaf[i].style.pointerEvents = 'auto';
                        flower[i].classList.add('flowerap');
                    }
                    boat.style.top = '120px';
                    boat.style.left = '1300px';
                    setTimeout(() => {
                        youfinish.style.display = 'block';
                        youfinish.classList.add("introappear");
                    }, 100);
                    setTimeout(() => {
                        youfinish.style.display = 'none';
                    }, 3000);
                }

            })
        }
    }

    let mouses = document.querySelector(".mouse");
    document.addEventListener("mousemove", function (e) {
        var x = e.pageX;
        var y = e.pageY;
        mouses.style.left = x + 5 + "px";
        mouses.style.top = y + 8 + "px";
    });
})