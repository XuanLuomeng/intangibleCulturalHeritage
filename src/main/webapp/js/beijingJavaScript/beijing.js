window.addEventListener("load", function () {
  //进入
  var open = document.querySelector(".open-wrap");
  var tcurtain = document.querySelector(".tcurtain");
  var lcurtain = document.querySelector(".lcurtain");
  var rcurtain = document.querySelector(".rcurtain");
  var begin = document.querySelector(".titlebegin");

  begin.onclick = function () {
    lcurtain.classList.add("moveleft");
    rcurtain.classList.add("moveright");
    tcurtain.classList.add("movedisappear");
    begin.style.display = "none";
    setTimeout(() => {
      open.style.display = 'none';
    }, 3000);

  };

  //退出
  var back = document.querySelector('.backIsland')
  back.onclick = function () {
    lcurtain.classList.remove("moveleft");
    rcurtain.classList.remove("moveright");
    tcurtain.classList.remove("movedisappear");
    begin.style.display = "block";
    open.style.display = 'block';
  }

  /* 知识卡片 */
  let book = document.querySelector(".knowledge-wrap");
  let out = document.querySelector(".out");
  let next = document.querySelector(".next");
  let last = document.querySelector(".last");
  let dance = document.querySelector(".danceonclick");
  let music = document.querySelector(".drum");
  let musicTwo = document.querySelector(".urheen");
  let face = document.querySelectorAll(".faceOnclick");
  let role = document.querySelectorAll(".human");
  let flag = document.querySelectorAll(".flag");
  let knowdance = document.querySelector(".dance");
  let knowmusic = document.querySelector(".music");
  let knowface = document.querySelector(".faceintro");
  let knowrole = document.querySelector(".role");
  let knowflag = document.querySelector(".dance");
  let knowtextDance = knowdance.querySelectorAll(".knowtext");
  let knowtextMusic = knowmusic.querySelectorAll(".knowtext");
  let knowtextFace = knowface.querySelectorAll(".knowtext");
  let knowtextRole = knowrole.querySelectorAll(".knowtext");
  let knowtextFlag = knowflag.querySelectorAll(".knowtext");

  //进入介绍
  dance.addEventListener("click", function () {
    book.style.display = "block";
    knowdance.style.display = "block";
  });

  music.addEventListener("click", function () {
    book.style.display = "block";
    knowmusic.style.display = "block";
  });

  musicTwo.addEventListener("click", function () {
    book.style.display = "block";
    knowmusic.style.display = "block";
  });

  for (var i = 0; i < face.length; i++) {
    face[i].index = i;
    face[i].addEventListener("click", function () {
      book.style.display = "block";
      knowface.style.display = "block";
    });
  }

  for (var i = 0; i < role.length; i++) {
    role[i].index = i;
    role[i].addEventListener("click", function () {
      book.style.display = "block";
      knowrole.style.display = "block";
    });
  }

  for (var i = 0; i < flag.length; i++) {
    flag[i].index = i;
    flag[i].addEventListener("click", function () {
      book.style.display = "block";
      knowflag.style.display = "block";
    });
  }

  // 退出
  out.addEventListener("click", function () {
    book.style.display = "none";
    knowdance.style.display = "none";
    knowmusic.style.display = "none";
    knowface.style.display = "none";
    knowrole.style.display = "none";
    knowflag.style.display = "none";
  });

  // 切页
  var num = 0;
  knowtextDance[0].style.display = "block";
  knowtextMusic[0].style.display = "block";
  knowtextFace[0].style.display = "block";
  knowtextRole[0].style.display = "block";
  knowtextFlag[0].style.display = "block";
  next.addEventListener("click", function () {
    if (num + 1 < knowtextDance.length) {
      knowtextDance[num + 1].style.display = "block";
      knowtextMusic[num + 1].style.display = "block";
      knowtextFace[num + 1].style.display = "block";
      knowtextRole[num + 1].style.display = "block";
      knowtextFlag[num + 1].style.display = "block";
      for (var j = 0; j < knowtextDance.length; j++) {
        if (num + 1 != j) {
          knowtextDance[j].style.display = "none";
          knowtextMusic[j].style.display = "none";
          knowtextFace[j].style.display = "none";
          knowtextRole[j].style.display = "none";
          knowtextFlag[j].style.display = "none";
        }
      }
      num++;
    } else {
      alert("已经是最后一页啦");
    }
  });

  last.addEventListener("click", function () {
    if (num > 0) {
      knowtextDance[num - 1].style.display = "block";
      knowtextMusic[num - 1].style.display = "block";
      knowtextFace[num - 1].style.display = "block";
      knowtextRole[num - 1].style.display = "block";
      knowtextFlag[num - 1].style.display = "block";
      for (var j = 0; j < knowtextDance.length; j++) {
        if (num - 1 != j) {
          knowtextDance[j].style.display = "none";
          knowtextMusic[j].style.display = "none";
          knowtextFace[j].style.display = "none";
          knowtextRole[j].style.display = "none";
          knowtextFlag[j].style.display = "none";
        }
      }
      num--;
    } else {
      alert("已经是最前面啦");
    }
  });

  /* 知识问答 */
  var quit = document.querySelector(".quit-wrap");
  var enterQ = document.getElementById("question");
  var prior = document.querySelector(".prior");
  var latter = document.querySelector(".latter");
  var question = document.querySelectorAll(".question");
  var questionback = document.querySelector(".questionback");
  var finish = document.querySelector('.finish');
  var youfinish = document.querySelector('.youfinish');

  // 进入答题
  enterQ.addEventListener("click", function () {
    quit.style.display = "block";
  });

  // 退出
  questionback.addEventListener("click", function () {
    quit.style.display = "none";
    qfinish.style.display = 'none';
  });

  //判断正确
  var correct = document.querySelectorAll(".qcorrect");
  var good = document.querySelectorAll(".good");
  var bad = document.querySelectorAll(".bad");
  var optionOne = document.getElementsByName("one");
  var optionTwo = document.getElementsByName("two");
  var optionThree = document.getElementsByName("three");
  var optionFour = document.getElementsByName("four");
  var optionFive = document.getElementsByName("five");
  var wrong = 0;

  for (var i = 0; i < optionOne.length; i++) {
    optionOne[i].index = i;
    optionTwo[i].index = i;
    optionThree[i].index = i;
    optionFour[i].index = i;
    optionFive[i].index = i;
    optionOne[i].addEventListener("click", function () {
      if (optionOne[this.index].checked) {
        if (optionOne[this.index].value == "A") {
          wrong = 1;
        } else {
          wrong = 0;
        }
      }
    });
    optionTwo[i].addEventListener("click", function () {
      if (optionTwo[this.index].checked) {
        if (optionTwo[this.index].value == "C") {
          wrong = 1;
        } else {
          wrong = 0;
        }
      }
    });
    optionThree[i].addEventListener("click", function () {
      if (optionThree[this.index].checked) {
        if (optionThree[this.index].value == "C") {
          wrong = 1;
        } else {
          wrong = 0;
        }
      }
    });
    optionFour[i].addEventListener("click", function () {
      if (optionFour[this.index].checked) {
        if (optionFour[this.index].value == "D") {
          wrong = 1;
        } else {
          wrong = 0;
        }
      }
    });
    optionFive[i].addEventListener("click", function () {
      if (optionFive[this.index].checked) {
        if (optionFive[this.index].value == "C") {
          wrong = 1;
        } else {
          wrong = 0;
        }
      }
    });
    // 判断正确
    for (var j = 0; j < correct.length; j++) {
      correct[j].index = j;
      correct[j].addEventListener("click", function () {
        if (wrong == 1) {
          latter.style.pointerEvents = "auto";
          good[this.index].style.display = "block";
          bad[this.index].style.display = "none";
          load("2", this.index + 1);
        } else {
          latter.style.pointerEvents = "none";
          bad[this.index].style.display = "block";
          good[this.index].style.display = "none";
        }
      });
    }
  }
  function getCpNum(cpNum, visitors) {
    var count = cpNum - 1;
    for (var j = 0; j < question.length; j++) {
      question[j].classList.remove("questionnext");
      question[j].style.opacity = "0";
    }
    if (cpNum == 0) {
      question[0].style.opacity = "1";
      count = 0;
    } else if (cpNum == 5) {
      question[0].style.opacity = "1";
      if (visitors == '') {
        setTimeout(() => {
          finish.style.display = 'block';
          finish.classList.add("introappear");
        }, 100);
        setTimeout(() => {
          finish.style.display = 'none';
        }, 3000);

      } else {
        setTimeout(() => {
          youfinish.style.display = 'block';
          youfinish.classList.add("introappear");
        }, 100);
        setTimeout(() => {
          youfinish.style.display = 'none';
        }, 3000);
      }
      count = 0;
    } else {
      question[count].style.opacity = "1";
      question[count].classList.add("go");
      question[count].classList.remove("questionlast");
      question[count + 1].classList.add("come");
      question[count + 1].classList.remove("questionnext");
      for (var i = 0; i < question.length; i++) {
        if (count + 1 != i) {
          question[i].classList.remove("come");
        }
      }
      for (var j = 0; j < question.length; j++) {
        if (count != j) {
          question[j].classList.remove("go");
        }
      }
    }
    // 换题
    prior.addEventListener("click", function () {
      if (count > 0) {
        question[count].classList.add("questionnext");
        question[count].style.opacity = "1";
        question[count - 1].classList.add("questionlast");
        question[count - 1].classList.remove("go");
        question[count].classList.remove("come");
        for (var i = 0; i < question.length; i++) {
          if (count - 1 != i) {
            question[i].classList.remove("questionlast");
          }
        }
        for (var j = 0; j < question.length; j++) {
          if (count != j) {
            question[j].classList.remove("questionnext");
            question[count].style.opacity = "0";
          }
        }
        count--;
      } else {
        question[0].style.opacity = "1";
        alert("前面没有啦");
      }
    });

    latter.addEventListener("click", function () {
      latter.style.pointerEvents = "none";
      if (count + 1 < question.length) {
        question[0].style.opacity = "0";
        question[count].classList.add("go");
        question[count].classList.remove("questionlast");
        question[count + 1].classList.add("come");
        question[count + 1].classList.remove("questionnext");
        for (var i = 0; i < question.length; i++) {
          if (count + 1 != i) {
            question[i].classList.remove("come");
          }
        }
        for (var j = 0; j < question.length; j++) {
          if (count != j) {
            question[j].classList.remove("go");
          }
        }
        count++;
      } else {
        if (visitors == '') {
          setTimeout(() => {
            finish.style.display = 'block';
            finish.classList.add("introappear");
          }, 100);
          setTimeout(() => {
            finish.style.display = 'none';
          }, 3000);

        } else {
          setTimeout(() => {
            youfinish.style.display = 'block';
            youfinish.classList.add("introappear");
          }, 100);
          setTimeout(() => {
            youfinish.style.display = 'none';
          }, 3000);
        }
      }
    });
  }
  // 交互
  var isLogin = true;
  $.get("/intangibleCulturalHeritage/isLogin", function (user) {
    if (user.userName == null) {
      window.isLogin = false;
    } else {
      window.isLogin = true;
    }
    getInfo();
  });
  function load(islandId, cpNum) {
    // 用户数据传值
    if (window.isLogin) {
      $.get(
        "/intangibleCulturalHeritage/updateCheckPointInfo",
        { islandId: islandId, cpNum: cpNum },
        function () { }
      );
    }
    // 游客数据传值
    else {
      $.get(
        "/intangibleCulturalHeritage/visitorsSave",
        { islandId: islandId, cpNum: cpNum },
        function () { }
      );
    }
  }
  function getInfo() {
    // 用户关卡响应
    if (window.isLogin) {
      $.get(
        "/intangibleCulturalHeritage/getCheckPointInfo",
        { islandId: 2 },
        function (cpNum) {
          var visitors = '';
          getCpNum(cpNum, visitors);
        }
      );
    } else {
      // 游客关卡响应
      $.get(
        "/intangibleCulturalHeritage/getVisitorsCheckPoint",
        { islandId: 2 },
        function (cpNum) {
          var visitors = 'visitors';
          getCpNum(cpNum, visitors);
        }
      );
    }
  }
});
