window.addEventListener("load", () => {
    // 要操作到的元素
    let login = document.getElementById("login");
    let register = document.getElementById("register");
    let form_box = document.getElementsByClassName("form-box")[0];
    let register_box = document.getElementsByClassName("register-box")[0];
    let login_box = document.getElementsByClassName("login-box")[0];
    // 去注册按钮点击事件
    register.addEventListener("click", () => {
        form_box.style.transform = "translateX(90%)";
        login_box.classList.add("hidden");
        register_box.classList.remove("hidden");
    });
    // 去登录按钮点击事件
    login.addEventListener("click", () => {
        form_box.style.transform = "translateX(0%)";
        register_box.classList.add("hidden");
        login_box.classList.remove("hidden");
    });
    let input = document.querySelectorAll("input");
    let num = document.querySelectorAll(".number");
    let tipone = document.querySelectorAll(".tipone");
    let tiptwo = document.querySelectorAll(".tiptwo");

    // 获取焦点
    num[0].addEventListener("focus", () => {
        tipone[0].innerHTML = "！请输入6~14位数字";
        tipone[0].className = "tipone";
    });
    num[1].addEventListener("focus", () => {
        tipone[1].innerHTML = "！请输入6~14位数字";
        tipone[1].className = "tipone";
    });

    // 表单校验
    // 注册页面
    // 校验注册账号是否符合要求
    function register_checkUserid() {
        let reg_userid = /^[0-9]{6,14}$/;
        let flag = reg_userid.test(num[0].value);
        if (!flag) {
            tipone[0].innerHTML = "! 请输入6~14位数字";
            tipone[0].className = "tipone wrong";
            return false;
        } else {
            tipone[0].innerHTML = "√ 输入正确";
            tipone[0].className = "tipone dui";
            return true;
        }
    }

    // 校验注册密码是否符合要求
    function register_checkPassword() {
        let reg_password = /^\w{6,14}$/;
        let flag = reg_password.test(num[1].value);
        if (!flag) {
            tipone[1].innerHTML = "! 请输入6~14位数字、字母";
            tipone[1].className = "tipone wrong";
            return false;
        } else {
            tipone[1].innerHTML = "√ 输入正确";
            tipone[1].className = "tipone dui";
            return true;
        }
    }

    function repassword() {
        if (num[1].value == num[2].value) {
            tipone[2].innerHTML = "√ 输入正确";
            tipone[2].className = "tipone dui";
            return true;
        } else {
            tipone[2].innerHTML = "x 两次输入密码不一致";
            tipone[2].className = "tipone wrong";
            return false;
        }
    }

    $(function () {
        $("#register_btn").click(function () {
            if (register_checkUserid() && register_checkPassword() && repassword()) {
                $("#register_btn").html("注册中");
                $("#registerForm").css("pointer-events", "none");
                setTimeout(function () {
                    $("#registerForm").css("pointer-events", "auto");
                    $("#register_btn").html("注册");
                }, 3000);

                $.post("/intangibleCulturalHeritage/registUserServlet", $("#registerForm").serialize(), function (data) {
                    if (data.flag) {
                        alert("注册成功");
                        for (let i = 0; i < tipone.length; i++) {
                            tipone[i].innerHTML = "";
                        }
                        $("#login_userid").val($("#register_userid").val());
                        $("#username").val("");
                        $("#register_userid").val("");
                        $("#register_password").val("");
                        $("#repassword").val("");
                        $("#login").click();
                    } else {
                        alert("账号已存在");
                    }
                }
                );
            }
            return false;
        });
        $("#register_userid").blur(register_checkUserid);
        $("#register_password").blur(register_checkPassword);
        $("#repassword").blur(repassword);
    });

    // 校验登录账号是否符合要求
    function login_checkUserid() {
        let login_userid = $("#login_userid").val();
        let reg_userid = /^[0-9]{6,14}$/;
        let flag = reg_userid.test(login_userid);
        if (flag) {
            tiptwo[0].innerHTML = "";
        } else {
            tiptwo[0].innerHTML = "!  账号格式错误";
            tiptwo[0].className = "tiptwo wrong";
        }
        return flag;
    }

    // 校验登录密码是否符合要求
    function login_checkPassword() {
        let login_password = $("#login_password").val();
        let reg_password = /^\w{6,14}$/;
        let flag = reg_password.test(login_password);
        if (flag) {
            tiptwo[1].innerHTML = "";
        } else {
            tiptwo[1].innerHTML = "!  密码格式错误";
            tiptwo[1].className = "tiptwo wrong";
        }
        return flag;
    }

    $(function () {
        $("#login_btn").click(function () {
            if (login_checkUserid() && login_checkPassword()) {
                $.post("/intangibleCulturalHeritage/loginServlet", $("#loginForm").serialize(), function (data) {
                    if (data.flag) {
                        location.href = "/intangibleCulturalHeritage/"+data.errorMsg+"";
                    } else {
                        alert("账号或密码错误");
                    }
                });
            }
            return false;
        });
        $("#login_userid").blur(login_checkUserid);
        $("#login_password").blur(login_checkPassword);
    });

    // 阿飘鼠标
    var mouses = document.getElementById("P");
    document.addEventListener("mousemove", function (e) {
        var x = e.pageX;
        var y = e.pageY;
        mouses.style.left = x + 5 + "px";
        mouses.style.top = y + 8 + "px";
        console.log(mouses);
    });
});
