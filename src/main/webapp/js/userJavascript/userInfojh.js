window.addEventListener('load', function () {

    let userName = document.getElementById('userName');
    let sex = document.getElementById('sex');
    let birthday = document.getElementById('birthday');
    let email = document.getElementById('email');
    let telephone = document.getElementById('telephone');

    let head = document.getElementById('head');
    let mylike = document.getElementById('mylike');
    let mycomment = document.getElementById('mycomment');
    let myArticle = document.getElementById('myArticle');


    // 将个人信息的值渲染到文本框中
    $.get('/intangibleCulturalHeritage/getUserInfo', function (user) {
        userName.innerHTML = user.userName;
        sex.innerHTML = user.sex;
        birthday.innerHTML = user.birthday;
        email.innerHTML = user.email;
        telephone.innerHTML = user.telephone;
        //将头像和昵称渲染到上面
        head.innerHTML = "<div class='avatar'>" +
            "<img src='" + user.photo + "' width='100%'>" +
            "</div>";
    })

    var aidArray = '';
    // 获取用户发布过的文章
    // 有删除按钮mydel,没有评论
    $.get('/intangibleCulturalHeritage/UserArticle', {currentPageStr: ""}, function (page) {
        if (page.size != 0) {
            for (var i = 0; i < page.list.length; i++) {
                var article = page.list[i];
                var a = "";
                a += "<div class='mypost'>" +
                    "<div class='myavatar'>" +
                    "<div class='m-img'>";
                if (article.photo != null && article.photo != "") {
                    a += "<img src='" + article.photo + "'>";
                }
                a += "</div><div class='m-name'>" + article.userName +
                    "<div class='mytime'>";
                if (article.timeDiffer / 60 / 24 > 7) {
                    a += article.date.split(' ')[0];
                } else {
                    a += time(article.timeDiffer);
                }
                a += "</div>" +
                    "</div>" +
                    "<div class='mydel'>" +
                    "<a href='javascript:;'>" +
                    "<i class='iconfont dropText'>&#xe602</i>" +
                    "</a>" +
                    "</div>" +
                    "</div>" +
                    "<div class='mytexts'>" +
                    "<div class='ptext'>" +
                    "<div class='ptitle'>" + article.title + "</div>" +
                    "<div class='pcontaniner'>" + article.content +
                    "</div>" +
                    "<div class='pimg'>";
                if (article.picture != null && article.picture != "") {
                    a += "<img src='" + article.picture + "' width='60%'>";
                }
                a += "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
                myArticle.innerHTML += a;
                aidArray += article.aid + " ";
            }
            //删除文章
            let dropText = document.querySelectorAll('.dropText');
            let mypost = document.querySelectorAll('.mypost');
            var aidList = aidArray.split(" ");
            for (let i = 0; i < aidList.length; i++) {
                (function (i) {
                    if (aidList[i] != "") {
                        dropText[i].onclick = function () {
                            var r = confirm("是否确认删除？");
                            if (r == true) {
                                mypost[i].style.display = 'none';
                                $.get("/intangibleCulturalHeritage/deleteArticle", {aid: aidList[i]}, function () {
                                });
                            }
                        }
                    }
                })(i);
            }
        }
    })


    var publish = '';

    function time(date) {
        if (date < 1) {
            publish = '刚刚';
        } else if (date < 60) {
            publish = Math.trunc(date) + '分钟之前';
        } else if (date / 60 < 24) {
            publish = Math.trunc(date / 60) + '小时之前';
        } else if (date / 60 / 24 < 7) {
            publish = Math.trunc(date / 60 / 24) + '天之前';
        }
        return publish;
    }
})
