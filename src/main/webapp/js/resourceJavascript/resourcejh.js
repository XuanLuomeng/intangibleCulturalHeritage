window.addEventListener("load", function () {
    let main = document.querySelector('.main');
    let searchText = document.getElementById('searchText');
    let search_btn = document.getElementById('search_btn');
    let tip = document.querySelector('.tip');
    let users = document.getElementById('user');
    var exitLogin = document.getElementById("exitLogin");
    let chat = document.getElementById('chat');

    // 检验登录，将用户名渲染到页面，用户按钮能否点
    $.get("/intangibleCulturalHeritage/isLogin", function (user) {
        if (user.userName != null) {
            users.style.pointerEvents = 'auto';
            exitLogin.style.display = 'block';
            chat.style.pointerEvents = 'auto';
            $("#drop").html("<a href='javascript:void(0)'>" + user.userName + "</a>");
        } else {
            users.style.pointerEvents = 'none';
            chat.style.pointerEvents = 'none';
            exitLogin.style.display = 'none';
            $("#drop").html("<a href=\'/intangibleCulturalHeritage/loginOrRegister\'>登录</a>");
        }
    })

    exitLogin.onclick = function () {
        $.get("/intangibleCulturalHeritage/exitServlet", function () {
            location.href = "/intangibleCulturalHeritage/resource";
        })
    }

    //校验搜索框输入的内容是否为空
    function checksearchText() {
        let reg_searchText = $("#searchText").val();
        let flag = reg_searchText.length > 0;
        if (flag) {
            tip.innerHTML = "";
            tip.className = 'tip';
        } else {
            tip.innerHTML = "!  输入内容不能为空";
            tip.className = 'tip wrong';
        }
        return flag;
    }

     getWiki(null, null);

    //点击搜索提交文本框信息给后端
    search_btn.onclick = function () {
        if (checksearchText()) {
            getWiki(null, searchText.value);
        }
    }

    function getWiki(currentPage, theme) {
        $.get("/intangibleCulturalHeritage/wikiInfo", {currentPageStr: currentPage, title: theme}, function (page) {
            if (typeof (page.size) != "undefined") {
                // 获取搜索内容渲染到页面中
                main.innerHTML = "";
                if (page.size != 0) {
                    for (let i = 0; i < page.size; i++) {
                        let wiki = page.list[i];
                        main.innerHTML += wiki.wiki;
                    }
                    //定位页面顶部
                    window.scrollTo(0, 0);
                } else {
                    var con = confirm("站内暂时没有与" + theme + "相关的内容，是否需要跳转到“百度”进行搜索？");
                    if (con) {
                        location.href = 'https://www.baidu.com/s?wd=' + theme;
                    } else {
                        location.href = '/intangibleCulturalHeritage/resource';
                    }
                }
            }
        });
    }
})