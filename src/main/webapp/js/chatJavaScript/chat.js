window.addEventListener("load", function () {
    let chatTextSend = document.getElementById('chatTextSend');
    let chatText = document.querySelector('.chatText');
    let chatTextSend_btn = document.getElementById('chatTextSend_btn');
    let users = document.getElementById('user');
    let chat = document.getElementById('chat');
    var exitLogin = document.getElementById("exitLogin");

    function chatTextSendLength() {
        var chatText = $("#chatTextSend").val();
        var chatText_length = chatText.length;
        // 文字显示
        var flag = (chatText_length > 0);
        return flag;
    }

    // 检验登录，将用户名渲染到页面，用户按钮能否点
    $.get("/intangibleCulturalHeritage/isLogin", function (user) {
        if (user.userName != null) {
            users.style.pointerEvents = 'auto';
            chat.style.pointerEvents = 'auto';
            exitLogin.style.display = 'block';
            $("#drop").html("<a href='javascript:void(0)'>" + user.userName + "</a>");
            // 点击向后端传内容
            $("#chatTextSend_btn").click(function () {
                if (chatTextSendLength()) {
                    $.post("/intangibleCulturalHeritage/sendChat", {
                        text: $("#chatTextSend").val(),
                        chatRoomNumber: 1
                    }, function () {
                    });
                    chatTextSend.value = "";
                }
            });
            // 获取聊天内容渲染到页面中,每0.2秒发送请求
            setInterval(function () {
                $.get("/intangibleCulturalHeritage/receiveChat", {chatRoomNumber: 1}, function (says) {
                    if (says != null && says != "null") {
                        chatText.innerHTML = "";
                        let say = says.split("%;%");
                        let char = "";
                        for (let i = 0; i < say.length; i++) {
                            (function (i) {
                                let sa = say[i].split("%-%");
                                if (sa[0] == user.userId) {
                                    char = "\n" +
                                        "                    <div class='myhuman'>\n" +
                                        "                        <div class='user'>\n" +
                                        "                            <img src='" + sa[1] + "'>\n" +
                                        "                        </div>\n" +
                                        "                        <div class='textmain'>\n" +
                                        "                            <div class='name'>" + sa[2] + "</div>\n" +
                                        "                            <div class='textMy'>" + sa[3] + "</div>\n" +
                                        "                        </div>\n" +
                                        "                    </div>";
                                } else {
                                    char = "\n" +
                                        "                    <div class='human'>\n" +
                                        "                        <div class='user'>\n" +
                                        "                            <img src='" + sa[1] + "'>\n" +
                                        "                        </div>\n" +
                                        "                        <div class='textmain'>\n" +
                                        "                            <div class='name'>" + sa[2] + "</div>\n" +
                                        "                            <div class='textOther'>" + sa[3] + "</div>\n" +
                                        "                        </div>\n" +
                                        "                    </div>";
                                }
                                chatText.innerHTML += char;
                            })(i)
                        }
                    } else {
                        chatText.innerHTML = "";
                    }
                });
            }, 200);
        } else {
            users.style.pointerEvents = 'none';
            chat.style.pointerEvents = 'none';
            exitLogin.style.display = 'none';
            $("#drop").html("<a href=\'/intangibleCulturalHeritage/loginOrRegister\'>登录</a>");
        }
    })

    exitLogin.onclick = function () {
        $.get("/intangibleCulturalHeritage/exitServlet", function () {
            location.href = "/intangibleCulturalHeritage/chatRoom";
        })
    }
});
