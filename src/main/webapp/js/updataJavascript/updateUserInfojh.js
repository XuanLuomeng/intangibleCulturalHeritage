window.addEventListener('load', function () {
    let userName = document.getElementById('userName');
    let sex = document.getElementById('sex');
    let birthday = document.getElementById('birthday');
    let email = document.getElementById('email');
    let telephone = document.getElementById('telephone');
    // 阿飘鼠标
    var mouses = document.getElementById("P");
    document.addEventListener("mousemove", function (e) {
        var x = e.pageX;
        var y = e.pageY;
        mouses.style.left = x + 5 + "px";
        mouses.style.top = y + 8 + "px";
        console.log(mouses);
    });

    // 将个人信息的值渲染到输入框中

    $.get('/intangibleCulturalHeritage/getUserInfo', function (user) {
        userName.value = user.userName;
        birthday.value = user.birthday;
        email.value = user.email;
        telephone.value = user.telephone;
        if (user.sex = '男') {
            sex.innerHTML = "性别：" +
                "<input type='radio' name='sex' value='男' checked><span>男</span>" +
                "<input type='radio' name='sex' value='女'><span>女</span>";
        } else
            sex.innerHTML = "性别：" +
                "<input type='radio' name='sex' value='男'><span>男</span>" +
                "<input type='radio' name='sex' value='女' checked><span>女</span>";
    })


    let tip = document.querySelectorAll('.tip');

    // 校验修改个人信息
    // 校验昵称
    function checkUserName() {
        let username = $("#userName").val();
        let flag = username.length > 0;
        if (flag) {
            tip[0].innerHTML = "";
            tip[0].className = 'tip';
        } else {
            tip[0].innerHTML = "!  内容不能为空";
            tip[0].className = 'tip wrong';
        }
        return flag;
    }

    // 校验邮箱
    function checkEmail() {
        let email = $("#email").val();
        let reg_email = /^\w+@\w+\.\w+$/;
        let flag = reg_email.test(email);
        if (flag) {
            tip[2].innerHTML = "";
        } else {
            tip[2].innerHTML = "!  邮箱输入错误";
            tip[2].className = 'tip wrong';


        }
        return flag;
    }
    // 校验手机号
    function checkTelephone() {
        let telephone = $("#telephone").val();
        let reg_telephone = /^1[0-9]{10}$/;
        let flag = reg_telephone.test(telephone);
        if (flag) {
            tip[3].innerHTML = "";
        } else {
            tip[3].innerHTML = "!  手机号码输入错误";
            tip[3].className = 'tip wrong';

        }
        return flag;
    }
    $(function () {
        $("#revise_btn").click(function () {
            if (checkUserName() && checkEmail() && checkTelephone()) {
                $.post("/intangibleCulturalHeritage/updateUserInfos", $("#reviseFrom").serialize(), function () {
                    location.href = "/intangibleCulturalHeritage/userInfo";
                    // document.getElementById('mymain').style.display = 'block';
                });
            }
            return false;
        });
        $("#userName").blur(checkUserName);
        $("#email").blur(checkEmail);
        $("#telephone").blur(checkTelephone);
    });
})
