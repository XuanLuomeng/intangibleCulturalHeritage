window.addEventListener('load', function () {
    var isLogin = true;
    var userName = '';
    var uid = '';
    let users = document.getElementById('user');
    let drop = document.querySelector('.drop');
    let cut = document.querySelector('.cut');
    let addText = document.getElementById('addText');
    let dropText = document.getElementById('dropText');
    let tipone = document.getElementById('tipone');
    let tiptwo = document.getElementById('tiptwo');
    let unLogin = this.document.querySelector('.unLogin');
    var exitLogin = document.getElementById("exitLogin");
    let chat = document.getElementById('chat');

    // 用户能否点击，登录按钮的内容及跳转
    $.get("/intangibleCulturalHeritage/isLogin", function (user) {
        if (user.userName != null) {
            window.isLogin = true;
            window.userName = user.userName;
            $("#data").attr("value", user.id);
            users.style.pointerEvents = 'auto';
            exitLogin.style.display = 'block';
            chat.style.pointerEvents = 'auto';
            $("#drop").html("<a href='javascript:void(0)'>" + window.userName + "</a>");
            addText.onclick = function () {
                pushTheme();
            };
        } else {
            window.isLogin = false;
            // 未登录显示提示，过五秒后消失
            unLogin.style.display = 'block';
            setTimeout(function () {
                unLogin.style.display = 'none';
            }, 5000);
            users.style.pointerEvents = 'none';
            chat.style.pointerEvents = 'none';
            exitLogin.style.display = 'none';
            $("#drop").html("<a href=\'/intangibleCulturalHeritage/loginOrRegister\'>登录</a>");
        }
    })

    $.get("/intangibleCulturalHeritage/share/article", function (article) {
        let essay = document.getElementById('article');
        let cidArrays = "";
        let a = "";
        a += "<div class='post-one'>" +
            "<div class='puser'>" +
            "<div class='use-img'><img src='" + article.photo + "'></div>" +
            "<div class='u-name'>" + article.userName +
            "<div class='time'>";
        if (article.timeDiffer / 60 / 24 > 7) {
            a += article.date.split(' ')[0];
        } else {
            a += time(article.timeDiffer);
        }
        a += "</div>" +
            "</div>" +
            "</div>" +
            "<div class='texts'>" +
            "<div class='ptext'>" +
            "<div class='ptitle'>" + article.title + "</div>" +
            "<div class='pcontaniner'>" + article.content + "</div>" +
            "<div class='pimg'>";
        if (article.picture != null && article.picture != "") {
            a += "<img src='" + article.picture + "' width='60%'>";
        }
        a += "</div>" +
            "</div>" +
            "<div class='review'>" +
            "<div class='comuser'></div>" +
            "<ul class='commentap'>";
        for (let j = 0; j < article.comments.length; j++) {
            let com = article.comments[j];
            a += "<li class='commentBox'><div class='pin'><img src='" + com.photoUrl + "'></div><div class='word'>" + com.userName + "&nbsp;:&nbsp;" + com.content + "</div>";
            if (com.uid == $("#data").attr("value")) {
                a += "<a class='deleteComment' href='javascript:void(0);'>删除</a>";
                cidArrays += com.cid + " ";
            }
            a += "</li>";
        }
        a += "</ul>";
        a += "</div>" +
            "</div>" +
            "</div>";
        essay.innerHTML += a;
    })
})
