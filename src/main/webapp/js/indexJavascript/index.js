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
        console.log(mouses);
    });

    var unLogin = document.getElementById("unLogin");

    lo();

    function lo() {
        $.get("/intangibleCulturalHeritage/isLogin", function (user) {
            var ph = '<img src="../intangibleCulturalHeritage/images/indeImg/head.png" width="100%">';
            var ht = '<a href="/intangibleCulturalHeritage/loginOrRegister" class="fdbg">登录 / 注册</a>';
            chat.style.pointerEvents = 'none';
            unLogin.style.display = "none";
            if (user.userName != null) {
                ht = '<a href="javascript:void(0)" class="fdbg">' + user.userName + "</a>";
                ph = '<img src="' + user.photo + '" width="100%">';
                unLogin.style.display = "block";
                chat.style.pointerEvents = 'auto';

            }
            $("#photo").html(ph);
            $("#name").html(ht);
        });
    };

    exitLogin.onclick = function () {
        $.get("/intangibleCulturalHeritage/exitServlet", function () {
            location.href = "/intangibleCulturalHeritage/index";
        })
    }
});
