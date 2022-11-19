function share(aid) {
    let share_hover = document.querySelector('.share_hover');
    share_hover.style.display = 'block';
    setTimeout(function () {
        share_hover.style.display = 'none';
    }, 3000);
    var clipboard = new ClipboardJS('.shareArticle', {
        text: function (trigger) {
            return "http://localhost:8080/intangibleCulturalHeritage/share/" + aid + "";
        }
    });
    clipboard.on('success', function (e) {
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);
        e.clearSelection();
    });
    clipboard.on('error', function (e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });
}

function load(currentPageStr) {
    let essay = document.getElementById('article');
    let artcilePage = document.getElementById('articlePage');
    $.get("/intangibleCulturalHeritage/Article", {currentPageStr: currentPageStr}, function (page) {
        essay.innerHTML = "";
        artcilePage.innerHTML = "";
        let aidArrays = "";
        let likeArrays = "";
        let cidArrays = "";
        if (page.size != 0) {
            for (let i = 0; i < page.list.length; i++) {//获取文章有多篇
                (function (i) {
                    var article = page.list[i];
                    aidArrays += article.aid + " ";
                    likeArrays += article.isLike + " ";
                    var a = "";
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
                        "<div class='tools-wrap'>" +
                        "<div class='tools'>" +
                        "<a href='javascript:;'><i class='iconfont good'>&#xe651</i></a>" +
                        "<a href='javascript:;'><i class='iconfont'>&#xe745</i></a>" +
                        "<button class='shareArticle' onclick='share(" + article.aid + ")'><i class='iconfont'>&#xe604</i></button>" +
                        "</div>" +
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
                    a += "<div class='btn'>" +
                        "<textarea name='' id='' class='textarea' placeholder='写评论'></textarea>" +
                        "<button class='button'>评论</button>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>";
                    essay.innerHTML += a;
                })(i);
            }
            let aidArray = aidArrays.split(" ");
            //发表评论
            let btn = document.querySelectorAll('.button');
            let text = document.querySelectorAll('.textarea');
            for (let i = 0; i < aidArray.length; i++) {
                (function (i) {
                    if (aidArray[i] != "") {
                        btn[i].onclick = function () {
                            let textContext = text[i].value;
                            // 校验评论框输入的内容是否为空
                            if (textContext == null) {
                                alert('您没有输入内容');
                            } else {
                                $.get("/intangibleCulturalHeritage/insertComment", {
                                    aid: aidArray[i],
                                    content: textContext
                                }, function (comment) {
                                    location.href = "/intangibleCulturalHeritage/forum";
                                });
                            }
                        }
                    }
                })(i);
            }
            let likeArray = likeArrays.split(" ");
            let good = document.querySelectorAll('.good');
            for (let j = 0; j < aidArray.length; j++) {
                (function (j) {
                    if (aidArray[j] != "") {
                        if ($("#data").attr("value") != "") {
                            if (likeArray[j] == '1') {
                                good[j].style.color = 'red';
                                good[j].style.pointerEvents = 'none';
                            } else {
                                good[j].style.color = 'black';
                                good[j].style.pointerEvents = 'auto';
                                good[j].onclick = function () {
                                    $.get("/intangibleCulturalHeritage/likeArticle", {aid: aidArray[j]}, function () {
                                        good[j].style.color = 'red';
                                        good[j].style.pointerEvents = 'none';
                                    });
                                }
                            }
                        } else {
                            good[j].style.color = 'black';
                            good[j].style.pointerEvents = 'none';
                        }
                    }
                })(j);
            }
            let cidArray = cidArrays.split(" ");
            let deleteComment = document.querySelectorAll('.deleteComment');
            let commentBox = document.querySelectorAll('.commentBox');
            for (let k = 0; k < cidArray.length; k++) {
                (function (k) {
                    if (cidArray[k] != "") {
                        deleteComment[k].onclick = function () {
                            let r = confirm("是否确认删除评论？");
                            if (r) {
                                $.get("/intangibleCulturalHeritage/deleteComment", {cid: cidArray[k]}, function () {
                                    commentBox[k].style.display = "none";
                                })
                            }
                        }
                    }
                })(k);
            }
        }
        let articlePageStr = '';
        if (page.currentPage != 1) {
            articlePageStr += '<li><a id="firstPage" href="javascript:load(1);">首页</a></li>';
            articlePageStr += '<li><a id="previousPage" href="javascript:load(' + (page.currentPage - 1) + ');">上一页</a></li>';
        }
        for (let i = 0; i < page.navigatePageNums.length; i++) {
            (function (i) {
                articlePageStr += '<li><a id="page' + i + '" href="javascript:load(' + page.navigatePageNums[i] + ');">' + page.navigatePageNums[i] + '</a></li>';
            })(i);
        }
        if (page.currentPage != page.totalPage) {
            articlePageStr += " <li><a id='nextPage' href='javascript:load(" + (page.currentPage + 1) + ")'>下一页</a></li>";
            articlePageStr += ' <li><a id="lastPage" href="javascript:load(' + page.totalPage + ')">末页</a></li>';
        }
        artcilePage.innerHTML += articlePageStr;
        //定位页面顶部
    })
    window.scrollTo(0, 0);
}

// 上传图片
// 判断浏览器是否支持FileReader接口
if (typeof FileReader == 'undefined') {
    document.getElementById("xmTanDiv").innerHTML = "<h1>当前浏览器不支持FileReader接口</h1>";
    // 使选择控件不可操作
    document.getElementById("xdaTanFileImg").setAttribute("disabled", "disabled");
}

// 选择图片，预览
function xmTanUpLoadImg(obj) {
    var file = obj.files[0];
    var reader = new FileReader();
    // 读取文件过程方法
    reader.onload = function (e) {
        var img = document.getElementById("xmTanImg");
        img.src = e.target.result;
    }
    reader.readAsDataURL(file);
}

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
            addText.style.pointerEvents = 'auto';
            dropText.style.pointerEvents = 'auto';
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
            addText.style.pointerEvents = 'none';
            dropText.style.pointerEvents = 'none';
            exitLogin.style.display = 'none';
            $("#drop").html("<a href=\'/intangibleCulturalHeritage/loginOrRegister\'>登录</a>");
        }
    })

    load(1);

    var publish = '';

    // 输入标题时显示还有多少字可以写
    function pushTheme() {
        var issuetitle = document.querySelector('.issuetitle');
        issuetitle.focus = function () {
            var issuetitle = $(".issuetitle").val();
            var issuetitle_length = issuetitle.length;
            var issuetitleLength = (issuetitle_length < 20);
            var bl = "标题不可超过20字数，现已有" + issuetitle_length + "字！";
            if (issuetitleLength) {
                tiptwo.innerHTML = bl;
            } else {
                tiptwo.innerHTML = '标题字数已超出要求';
            }
        }

        // 输入内容时显示还有多少字可以写
        var issuetextFocus = document.querySelector('.issuetext');
        issuetextFocus.focus = function () {
            var issuetext = $(".issuetext").val();
            var issuetext_length = issuetext.length;
            var al = "内容还剩" + (300 - issuetext_length) + "字可写;";
            // 文字显示
            var textLength = (issuetext_length <= 300);
            if (textLength) {
                tipone.innerHTML = al;
            } else {
                tipone.innerHTML = '内容字数已超出要求'
            }
        }
    }

    // 发表论坛校验
    // 标题（<20）
    //内容（<300)
    function checkissuetextLength() {
        var issuetext = $(".issuetext").val();
        var issuetext_length = issuetext.length;
        // 文字显示
        var flag = (issuetext_length <= 300) && (issuetext_length > 0);
        return flag;
    }

    function checkThemeLength() {
        var theme = $(".issuetitle").val();
        var theme_length = theme.length;
        var flag = (theme_length < 20) && (theme_length > 0);
        return flag;
    }

    $("#fabu").click(function () {
        if (checkissuetextLength() && checkThemeLength()) {
            var formData = new FormData;
            var photo = $("#xdaTanFileImg")[0].files[0];
            var issuetitle = $("#issuetitle").val();
            var issuetext = $("#issuetext").val();
            console.log(photo);
            formData.append("issuetitle", issuetitle);
            formData.append("issuetext", issuetext);
            formData.append("photo", photo);
            $.ajax({
                    type: "post",
                    url: "/intangibleCulturalHeritage/InsertArticle",
                    data: formData,
                    cache: false,
                    processData: false,
                    contentType: false,
                    dataType: "json",
                    success: function () {
                    }
                }
            )
            setTimeout(function () {
                location.reload();
            }, 100);
        }
    });
    exitLogin.onclick = function () {
        $.get("/intangibleCulturalHeritage/exitServlet", function () {
            location.href = "/intangibleCulturalHeritage/forum";
        })
    }
})