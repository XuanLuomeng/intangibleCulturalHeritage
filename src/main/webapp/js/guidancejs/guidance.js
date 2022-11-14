window.onload = function () {
  let users = document.getElementById('user');
  let chat = document.getElementById('chat');
  let exitLogin = document.getElementById("exitLogin");
  let nolive = document.querySelectorAll('.nolive');
  let finish = this.document.querySelector('.finish');
  let nav = document.querySelector('.header');
  document.addEventListener("scroll", function () {
    if (window.pageYOffset >= 717) {
      nav.style.display = "block";
    } else {
      nav.style.display = "none";
    }
  });
  for (var i = 0; i < nolive.length; i++){
    nolive[i].onclick = function () {
      setTimeout(function () {
        finish.style.display = 'block';
    }, 2000);
    }
  }
  $.get("/intangibleCulturalHeritage/isLogin", function (user) {
    if (user.userName != null) {
      users.style.pointerEvents = 'auto';
      chat.style.pointerEvents = 'auto';
      exitLogin.style.display = 'block';
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
      location.href = "/intangibleCulturalHeritage/chatRoom";
    })
  }

}