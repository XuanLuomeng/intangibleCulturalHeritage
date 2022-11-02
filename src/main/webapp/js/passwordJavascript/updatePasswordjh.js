window.addEventListener('load', function () {
    let tip = document.querySelectorAll('.tip');
    let oldPassword = document.getElementById('oldPassword');
    let newPassword = document.getElementById('newPassword');
    let rePassword = document.getElementById('rePassword');

    // 阿飘鼠标
    var mouses = document.getElementById("P");
    document.addEventListener("mousemove", function (e) {
        var x = e.pageX;
        var y = e.pageY;
        mouses.style.left = x + 5 + "px";
        mouses.style.top = y + 8 + "px";
        console.log(mouses);
    });


    // 校验修改密码是否符合要求
    function checkoldPassword() {
        if (oldPassword.value.length < 6 || oldPassword.value.length > 14) {
            tip[0].innerHTML = "! 请输入6~14位数字";
            tip[0].className = 'tip wrong';
            return false;
        } else {
            tip[0].innerHTML = "";
            tip[0].className = 'tip';
            return true;
        }
    }

    function checkDifferpassword() {
        if (oldPassword.value == newPassword.value) {
            tip[1].innerHTML = "新旧密码不能一致";
            tip[1].className = 'tip wrong';
            return false;
        } else {
            tip[1].innerHTML = "";
            tip[1].className = 'tip';
            return true;
        }
    }

    function checknewPassword() {
        if (newPassword.value.length < 6 || newPassword.value.length > 14) {
            tip[1].innerHTML = "! 请输入正确密码";
            tip[1].className = 'tip wrong';
            return false;
        } else {
            tip[1].innerHTML = "";
            tip[1].className = 'tip';
            return true;
        }
    }

    function checkrepassword() {
        if (newPassword.value == rePassword.value) {
            tip[2].innerHTML = "";
            tip[2].className = 'tip';
            return true;
        } else {
            tip[2].innerHTML = "x 两次输入密码不一致";
            tip[2].className = 'tip wrong';
            return false;
        }
    }

    $(function () {
        $("#password_btn").click(function () {
            if (checkoldPassword() && checknewPassword() && checkrepassword() && checkDifferpassword()) {
                $.post("/intangibleCulturalHeritage/updatePassword", $("#passwordForm").serialize(), function (data) {
                    if (data.flag) {
                        location.href = "/intangibleCulturalHeritage/userInfo";
                    } else {
                        alert("旧密码错误！");
                    }
                });
            }
            return false;
        });
        $("#oldPassword").blur(checkoldPassword);
        $("#newPassword").blur(checknewPassword);
        $("#rePassword").blur(checkrepassword);
        $("#newPassword").blur(checkDifferpassword);
        $("#newPassword").blur(checkrepassword);
        $("#rePassword").blur(checkDifferpassword);
    });
})
