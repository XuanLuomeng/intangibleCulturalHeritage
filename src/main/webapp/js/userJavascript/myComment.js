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


    // 获取评论过的文章
    // 没有删除按钮mydel,有评论review
    $.get('/intangibleCulturalHeritage/userCommentArticle', function (page) {
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
                a += "</div>" +
                    "<div class='m-name'>" + article.userName +
                    "<div class='mytime'>";
                if (article.timeDiffer / 60 / 24 > 7) {
                    a += article.date.split(' ')[0];
                } else {
                    a += time(article.timeDiffer);
                }
                a += "</div > " +
                    "</div>" +
                    "</div>" +
                    "<div class='mytexts'>" +
                    "<div class='ptext'>" +
                    "<div class='ptitle'>" + article.title + "</div>" +
                    "<div class='pcontaniner'>" + article.content + "</div>" +
                    "<div class='pimg'>";
                if (article.picture != null && article.picture != "") {
                    a += "<img src='" + article.picture + "' width='60%'>";
                }
                a += "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "<div class='review'>" +
                    "<ul class='commentap'>";
                // 评论
                for (var i = 0; i < article.comments.length; i++) {
                    var com = article.comments[i];
                    a += "<li><div class='pin'><img src='" + com.photoUrl + "'></div>" +
                        "<div class='word'>" + com.userName + "&nbsp;:&nbsp;" + com.content + "</div></li>";
                }
                a += "</ul>" +
                    "</div>" +
                    "</div>";
                mycomment.innerHTML += a;
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
