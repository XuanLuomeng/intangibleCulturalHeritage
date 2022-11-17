window.addEventListener("load", function () {
  var game = document.querySelectorAll(".gamecontext");
  var colorPlay = document.querySelector(".colorPlay");
  var colorClose = colorPlay.querySelector(".close");
  var musicPlay = document.querySelector(".musicPlay");
  var musicClose = musicPlay.querySelector(".close");
  var differPlay = document.querySelector(".differPlay");
  var differClose = differPlay.querySelector(".close");
  var recoverPlay = document.querySelector(".recoverPlay");
  var recoverClose = recoverPlay.querySelector(".close");

  // 点击出现游戏
  game[0].addEventListener("click", function () {
    colorPlay.style.display = "block";
  });
  game[1].addEventListener("click", function () {
    musicPlay.style.display = "block";
  });
  game[2].addEventListener("click", function () {
    differPlay.style.display = "block";
  });
  game[3].addEventListener("click", function () {
    recoverPlay.style.display = "block";
  });

  // 退出游戏
  colorClose.addEventListener("click", function () {
    colorPlay.style.display = "none";
    for (var i = 0; i < color.length; i++) {
      color[i].src = "";
      changebtn[i].style.backgroundColor = "";
    }
    change.style.display = 'block';
    colorDiv.style.display = 'block';
    intro.style.display = 'none';
    introWrap.classList.remove('introappear');
  });

  musicClose.addEventListener("click", function () {
    musicPlay.style.display = "none";
    bigDrum.classList.remove("bigdrumscale");
    bigDrum.classList.remove("disappear");
    drumFace.classList.remove("appear");
    bigDrumClose.classList.remove("disappear");
  });

  differClose.addEventListener("click", function () {
    differPlay.style.display = "none";
    for (var i = 0; i < changecircle.length; i++) {
      changecircle[i].style.opacity = "0";
      beforecircle[i].style.opacity = "0";
      changeluck.style.display = 'none';
      differluck.classList.remove("introappear");
      num = 0;
    }
  });

  recoverClose.addEventListener("click", function () {
    recoverPlay.style.display = "none";
    recoverluck.style.display = 'none';
    reluck.classList.remove("introappear");
  });

  // 上色游戏
  var change = document.querySelector('.change');
  var changebtn = document.querySelectorAll(".changebtn");
  var colorDiv = document.querySelector(".bumph");
  var color = colorDiv.querySelectorAll("img");
  var introbtn = document.querySelector('.colorCorrect');
  var intro = document.querySelector('.gameintro');
  var introWrap = document.querySelector('.gameintrowrap');

  for (var i = 0; i < changebtn.length; i++) {
    changebtn[i].index = i;
    var count = 0;
    changebtn[i].onclick = function () {
      count++;
      if (count % 4 == 1) {
        // 紫色
        changebtn[this.index].style.backgroundColor = "rgb(56, 30, 90)";
        if (this.index == 0) {
          color[0].src =
            "../../intangibleCulturalHeritage/images/gameImg/bumphgame/descolor/purple.png";
        } else if (this.index == 1) {
          color[1].src =
            "../../intangibleCulturalHeritage/images/gameImg/bumphgame/wingcolor/purple.png";
        } else if (this.index == 2) {
          color[2].src =
            "../../intangibleCulturalHeritage/images/gameImg/bumphgame/bodycolor/purple.png";
        } else if (this.index == 3) {
          color[3].src =
            "../../intangibleCulturalHeritage/images/gameImg/bumphgame/bordercolor/purple.png";
        }
      } else if (count % 4 == 2) {
        // 红
        changebtn[this.index].style.backgroundColor = "rgb(254, 60, 0)";
        if (this.index == 0) {
          color[0].src =
            "../../intangibleCulturalHeritage/images/gameImg/bumphgame/descolor/red.png";
        } else if (this.index == 1) {
          color[1].src =
            "../../intangibleCulturalHeritage/images/gameImg/bumphgame/wingcolor/red.png";
        } else if (this.index == 2) {
          color[2].src =
            "../../intangibleCulturalHeritage/images/gameImg/bumphgame/bodycolor/red.png";
        } else if (this.index == 3) {
          color[3].src =
            "../../intangibleCulturalHeritage/images/gameImg/bumphgame/bordercolor/red.png";
        }
      } else if (count % 4 == 3) {
        // 绿
        changebtn[this.index].style.backgroundColor = "rgb(68, 112, 88)";
        if (this.index == 0) {
          color[0].src =
            "../../intangibleCulturalHeritage/images/gameImg/bumphgame/descolor/green.png";
        } else if (this.index == 1) {
          color[1].src =
            "../../intangibleCulturalHeritage/images/gameImg/bumphgame/wingcolor/green.png";
        } else if (this.index == 2) {
          color[2].src =
            "../../intangibleCulturalHeritage/images/gameImg/bumphgame/bodycolor/green.png";
        } else if (this.index == 3) {
          color[3].src =
            "../../intangibleCulturalHeritage/images/gameImg/bumphgame/bordercolor/green.png";
        }
      } else {
        // 黄
        changebtn[this.index].style.backgroundColor = "rgb(255, 160, 78)";
        if (this.index == 0) {
          color[0].src =
            "../../intangibleCulturalHeritage/images/gameImg/bumphgame/descolor/yellow.png";
        } else if (this.index == 1) {
          color[1].src =
            "../../intangibleCulturalHeritage/images/gameImg/bumphgame/wingcolor/yellow.png";
        } else if (this.index == 2) {
          color[2].src =
            "../../intangibleCulturalHeritage/images/gameImg/bumphgame/bodycolor/yellow.png";
        } else if (this.index == 3) {
          color[3].src =
            "../../intangibleCulturalHeritage/images/gameImg/bumphgame/bordercolor/yellow.png";
        }
      }
    };
  }

  introbtn.onclick = function () {
    change.style.display = 'none';
    colorDiv.style.display = 'none';
    intro.style.display = 'block';
    introWrap.classList.add('introappear');
  }

  // 击鼓游戏
  var bigDrum = document.querySelector(".bigdrum");
  var bigDrumClose = document.querySelector(".bigdrum-wrap");
  var drumFace = document.querySelector(".drumFace");
  var audio = document.querySelectorAll(".music");
  var audioImg = document.querySelectorAll(".audioImg");
  bigDrum.onclick = function () {
    bigDrum.classList.add("bigdrumscale");
    bigDrum.classList.add("disappear");
    drumFace.classList.add("appear");
    bigDrumClose.classList.add("disappear");
  };

  for (var i = 0; i < audio.length; i++) {
    audio[i].pause(); //打开页面时无音乐
    audioImg[i].index = i;
    audioImg[i].onclick = function () {
      if (audio[this.index].paused) {
        audio[this.index].play();
      } else {
        audio[this.index].pause();
        audio.currentTime = 0; //音乐从头播放
      }
    };
  }

  // 鼓棒
  var mallet = document.getElementById("mallet");
  document.addEventListener("mousemove", function (e) {
    var x = e.pageX;
    var y = e.pageY;
    mallet.style.left = x + 5 + "px";
    mallet.style.top = y + 8 + "px";
  });

  // 找不同
  var beforefish = document.querySelector(".beforeFish");
  var changefish = document.querySelector(".changeFish");
  var changecircle = changefish.querySelectorAll(".circle");
  var beforecircle = beforefish.querySelectorAll(".circle");
  var changeluck = differPlay.querySelector('.luck-wrap')
  var differluck = changeluck.querySelector('.luck')
  var num = 0;

  for (var i = 0; i < changecircle.length; i++) {
    changecircle[i].index = i;
    changecircle[i].addEventListener("click", function () {
      console.log(changecircle[this.index]);
      changecircle[this.index].style.opacity = "1";
      beforecircle[this.index].style.opacity = "1";
      num++;
      console.log(num);
      if (num == 6) {
        setTimeout(() => {
          changeluck.style.display = 'block';
          differluck.classList.add("introappear");
        }, 100);
        setTimeout(() => {
          changeluck.style.display = 'none';
        }, 2000);
      }
    });
  }

});
