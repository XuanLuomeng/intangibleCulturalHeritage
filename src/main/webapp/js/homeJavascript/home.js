window.addEventListener("load", function () {
  // 关于我们
  // 阿飘出现
  // 检验登录，将用户名渲染到页面，用户按钮能否点
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
      location.href = "/intangibleCulturalHeritage/home";
    })
  }

  var ghmove = document.getElementById("gh");
  document.addEventListener("scroll", function () {
    if (window.pageYOffset >= 3450) {
      ghmove.style.display = "block";
      ghmove.classList.add("ghMove");
    }
  });

  // 美育
  var tree = document.querySelectorAll(".tree");
  var num = document.querySelectorAll(".numberappear");
  var numap = document.querySelectorAll(".num");
  var numtext = document.querySelectorAll(".numtext");
  document.addEventListener("scroll", function () {
    if (window.pageYOffset >= 420) {
      // 出现树
      tree[0].classList.add("treeap");
      tree[1].classList.add("treeap");
      // 出现数字背景
      num[0].classList.add("numone");
      num[1].classList.add("numtwo");
      num[2].classList.add("numthree");
      num[3].classList.add("numfour");
    }
    for (var j = 0; j < numap.length; j++) {
      numap[j].classList.add("numap");
      numtext[j].classList.add("numtextap");
    }
  });

  // 资源库
  // 轮播图
  var cur_ul = document.getElementById("banner");
  var cur_li = cur_ul.querySelectorAll("li");
  var arr = new Array();
  for (i = 0; i < 3; i++) {
    cur_ul.onmouseenter = function () {
      clearInterval(timer);
    };
    cur_ul.onmouseleave = function () {
      timer = setInterval(get_next, 3000);
    };
    arr.push(cur_li[i]);
  }

  var len = arr.length - 1;
  // 左边图片并调整位置
  arr[len - 2].style.left = "0px";
  // 中间图片并调整位置
  arr[len - 1].style.left = "200px";
  // 右边图片并调整位置
  arr[len].style.left = "400px";
  // 中间图片变大
  arr[len - 1].style.transform = "scale(1.3)";
  arr[len - 1].style.zIndex = 100;
  function get_next() {
    var give_up = arr[arr.length - 1];
    arr.pop();
    arr.unshift(give_up);
    for (var i = 0; i < arr.length; i++) {
      arr[i].style.zIndex = i;
      arr[i].style.transform = "scale(1)";
    }
    // 展示后三张图片
    arr[len - 2].style.left = "0px";
    arr[len - 1].style.left = "200px";
    arr[len].style.left = "400px";
    arr[len - 1].style.transform = "scale(1.3)";
    arr[len - 1].style.zIndex = 100;
  }
  //定时器
  var timer = setInterval(get_next, 2000);

  var pre_img = cur_ul.querySelector(".preImg");
  var next_img = cur_ul.querySelector(".nextImg");

  //绑定
  pre_img.onclick = function () {
    get_pre();
  };
  next_img.onclick = function () {
    get_next();
  };
  function get_pre() {
    var give_up = arr[0];
    arr.shift(); //取出来最后一张图片
    arr.push(give_up); //把最后一张图片放到第一张
    for (var i = 0; i < arr.length; i++) {
      arr[i].style.zIndex = i;
      arr[i].style.transform = "scale(1)";
    }
    arr[len - 2].style.left = "0px";
    arr[len - 1].style.left = "200px";
    arr[len].style.left = "400px";
    arr[len - 1].style.transform = "scale(1.3)";
    arr[len - 1].style.zIndex = 100;
  }

  // 返回顶部
  var back = document.querySelector(".backtop");
  document.addEventListener("scroll", function () {
    if (window.pageYOffset >= 1230) {
      back.style.display = 'block';
    } else {
      back.style.display = 'none';
    }
    // console.log(window.pageYOffset);
  });
  back.onclick = function () {
    animateY(window, 0);
  }

  function animateY(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
      var step = (target - window.pageYOffset) / 10;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      if (window.pageYOffset == target) {
        clearInterval(obj.timer);
        callback && callback();
      }
      window.scroll(0, window.pageYOffset + step);
    }, 15)
  }

  // 阿飘鼠标
  var mouses = document.getElementById("P");
  document.addEventListener("mousemove", function (e) {
    var x = e.pageX;
    var y = e.pageY;
    mouses.style.left = x + 5 + "px";
    mouses.style.top = y + 8 + "px";
  });
});
