window.onload = function () {
  let users = document.getElementById('user');
  let chat = document.getElementById('chat');
  let exitLogin = document.getElementById("exitLogin");
  let nolive = document.querySelectorAll('.nolive');
  let finish = document.querySelector('.finish');

  let nav = document.querySelector('.header');
  document.addEventListener("scroll", function () {
    if (window.pageYOffset >= 717) {
      nav.style.display = "block";
    } else {
      nav.style.display = "none";
    }
  });
  for (var i = 0; i < nolive.length; i++) {
    nolive[i].onclick = function () {
      setTimeout(() => {
        finish.style.display = 'block';
        finish.classList.add("introappear");
      }, 100);
      setTimeout(() => {
        finish.style.display = 'none';
      }, 2000);
    }
  }
  var tip = document.querySelector('.tip');
  $.get("/intangibleCulturalHeritage/getLiveState", { tid: 1 }, function (state) {
    if (state == true) {
      tip.style.display = 'block';
    } else {
      tip.style.display = 'none';
    }
  })

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
