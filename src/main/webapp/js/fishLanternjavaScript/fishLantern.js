window.addEventListener('load', function () {
    var fishes = document.querySelectorAll('.fishes');
    var fishWrap = document.querySelector('.fish');
    var bg = document.querySelectorAll(".taskbg");
    var btnclose = document.querySelectorAll(".btnclose");
    var fish = fishWrap.querySelectorAll('img');
    var back = document.querySelector('.back');
    var finish = document.querySelector('.finish');
    var youfinish = document.querySelector('.youfinish');

    var isLogin = true;
    $.get("/intangibleCulturalHeritage/isLogin", function (user) {
        if (user.userName == null) {
            window.isLogin = false;
        } else {
            window.isLogin = true;
        }
        getInfo();
    })
    function getCpNum(cpNum, visitors) {
        if (cpNum == 0) {
            fishes[0].style.pointerEvents = 'auto';
        }
        else if (cpNum == 1) {
            for (var i = 0; i < cpNum; i++) {
                fishes[i + 1].style.pointerEvents = 'auto';
            }
            fishes[0].classList.add("imgone");
            fish[0].src = '../../intangibleCulturalHeritage/images/fishLanternImg/lightone.png';
        }
        else if (cpNum == 2) {
            for (var i = 0; i < cpNum; i++) {
                fishes[i + 1].style.pointerEvents = 'auto';
            }
            fishes[0].classList.add("imgone");
            fish[0].src = '../../intangibleCulturalHeritage/images/fishLanternImg/lightone.png';
            fishes[1].classList.add("imgtwo");
            fish[1].src = '../../intangibleCulturalHeritage/images/fishLanternImg/lighttwo.png';
        }
        else if (cpNum == 3) {
            for (var i = 0; i < cpNum; i++) {
                fishes[i + 1].style.pointerEvents = 'auto';
            }
            fishes[0].classList.add("imgone");
            fish[0].src = '../../intangibleCulturalHeritage/images/fishLanternImg/lightone.png';
            fishes[1].classList.add("imgtwo");
            fish[1].src = '../../intangibleCulturalHeritage/images/fishLanternImg/lighttwo.png';
            fishes[2].classList.add("imgthree");
            fish[2].src = '../../intangibleCulturalHeritage/images/fishLanternImg/lightthree.png';

        }
        else if (cpNum == 4) {
            for (var i = 0; i < cpNum; i++) {
                fishes[i + 1].style.pointerEvents = 'auto';
            }
            fishes[0].classList.add("imgone");
            fish[0].src = '../../intangibleCulturalHeritage/images/fishLanternImg/lightone.png';
            fishes[1].classList.add("imgtwo");
            fish[1].src = '../../intangibleCulturalHeritage/images/fishLanternImg/lighttwo.png';
            fishes[2].classList.add("imgthree");
            fish[2].src = '../../intangibleCulturalHeritage/images/fishLanternImg/lightthree.png';
            fishes[3].classList.add("imgfour");
            fish[3].src = '../../intangibleCulturalHeritage/images/fishLanternImg/lightfour.png';
        }
        else if (cpNum == 5) {
            for (var i = 0; i < cpNum; i++) {
                fishes[i].style.pointerEvents = 'auto';
            }
            if (visitors == '') {
                finish.style.display = 'block';
                setTimeout(function () {
                    finish.style.display = 'none';
                }, 3000);
            } else {
                youfinish.style.display = 'block';
                setTimeout(function () {
                    youfinish.style.display = 'none';
                }, 3000);
            }
            fishes[0].classList.add("imgone");
            fish[0].src = '../../intangibleCulturalHeritage/images/fishLanternImg/lightone.png';
            fishes[1].classList.add("imgtwo");
            fish[1].src = '../../intangibleCulturalHeritage/images/fishLanternImg/lighttwo.png';
            fishes[2].classList.add("imgthree");
            fish[2].src = '../../intangibleCulturalHeritage/images/fishLanternImg/lightthree.png';
            fishes[3].classList.add("imgfour");
            fish[3].src = '../../intangibleCulturalHeritage/images/fishLanternImg/lightfour.png';
            fishes[4].classList.add("imgfive");
            fish[4].src = '../../intangibleCulturalHeritage/images/fishLanternImg/lightfive.png';
        }

        for (var i = 0; i < fishes.length; i++) {
            fishes[i].index = i;
            fishes[i].onclick = function () {
                bg[this.index].style.display = "block";
                if (this.index + 1 == fishes.length) {
                    fishes[this.index].style.pointerEvents = 'auto';
                } else {
                    fishes[this.index + 1].style.pointerEvents = 'auto';
                }
                // 调用传值函数
                load('3', this.index + 1);
            }
        }

        for (var i = 0; i < btnclose.length; i++) {
            btnclose[i].index = i;
            btnclose[i].onclick = function () {
                bg[this.index].style.display = 'none';
                back.style.display = 'block';
                if (this.index == 4) {
                    if (visitors == '') {
                        finish.style.display = 'block';
                        setTimeout(function () {
                            finish.style.display = 'none';
                        }, 3000);
                    } else {
                        youfinish.style.display = 'block';
                        setTimeout(function () {
                            youfinish.style.display = 'none';
                        }, 3000);
                    }
                }
            }
        }
        for (var i = 0; i < fish.length; i++) {
            fish[i].index = i;
            fish[i].onclick = function () {
                back.style.display = 'none';
                if (this.index == 0) {
                    fishes[0].classList.add("imgone");
                    fish[0].src = '../../intangibleCulturalHeritage/images/fishLanternImg/lightone.png';
                }
                if (this.index == 1) {
                    fishes[1].classList.add("imgtwo");
                    fish[1].src = '../../intangibleCulturalHeritage/images/fishLanternImg/lighttwo.png';
                }
                if (this.index == 2) {
                    fishes[2].classList.add("imgthree");
                    fish[2].src = '../../intangibleCulturalHeritage/images/fishLanternImg/lightthree.png';
                }
                if (this.index == 3) {
                    fishes[3].classList.add("imgfour");
                    fish[3].src = '../../intangibleCulturalHeritage/images/fishLanternImg/lightfour.png';
                }
                if (this.index == 4) {
                    fishes[4].classList.add("imgfive");
                    fish[4].src = '../../intangibleCulturalHeritage/images/fishLanternImg/lightfive.png';
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
            $.get('/intangibleCulturalHeritage/getCheckPointInfo', { islandId: 3 }, function (cpNum) {
                var visitors = '';
                getCpNum(cpNum, visitors);
            })
        } else {
            // 游客关卡响应
            $.get('/intangibleCulturalHeritage/getVisitorsCheckPoint', { islandId: 3 }, function (cpNum) {
                var visitors = 'visitors';
                getCpNum(cpNum, visitors);
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