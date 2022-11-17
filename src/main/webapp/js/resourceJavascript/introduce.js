// 检查格式的
'use strict';
const _baseAngle = Math.PI / 360,
    R = 230;
let speed = .1,
    angleX = speed * _baseAngle,
    angleY = -speed * _baseAngle,
    _focalLength = R * 1.5;

function Initialization(options) {
    this.options = options;
    this.container = options.container;
    this.dataArr = options.data;
    this.init();
}

Initialization.prototype.init = function () {
    let len = this.dataArr.length;
    let newTags = [];

    for (let i = 0; i < len; i++) {
        var angleA = Math.acos((2 * (i + 1) - 1) / len - 1);
        var angleB = angleA * Math.sqrt(len * Math.PI);
        var z = R * Math.cos(angleA);
        var y = R * Math.sin(angleA) * Math.sin(angleB);
        var x = R * Math.sin(angleA) * Math.cos(angleB);
        var color = '#' + Math.floor(Math.random() * 0xffffff).toString(16);
        this.dataArr[i].style.color = color;
        var newtag = new Tag(this.dataArr[i], x, y, z, this.options);
        newtag.move();
        newTags.push(newtag);
        this.animate();
    }
    this.newTags = newTags;
}


Initialization.prototype.rotateX = function () {
    let cos = Math.cos(angleX),
        sin = Math.sin(angleX);
    this.newTags.forEach((tag) => {
        let y = tag.y * cos - tag.z * sin,
            z = tag.z * cos + tag.y * sin;
        tag.y = y;
        tag.z = z;
    });

}

Initialization.prototype.rotateY = function () {
    let cos = Math.cos(angleY),
        sin = Math.sin(angleY);
    this.newTags.forEach((tag) => {
        let x = tag.x * cos - tag.z * sin,
            z = tag.z * cos + tag.x * sin;
        tag.x = x;
        tag.z = z;
    });
}
Initialization.prototype.animate = function () {
    var that = this;
    setInterval(function () {
        that.rotateX();
        that.rotateY();
        that.newTags.forEach((tag) => {
            tag.move();

        })
    }, 100);


}
function Tag(data, x, y, z, options) {
    this.options = options;
    this.dataArr = options.data;
    this.data = data;
    this.x = x;
    this.y = y;
    this.z = z;
}
Tag.prototype.move = function () {
    var len = this.dataArr.length;
    var scale = _focalLength / (_focalLength - this.z);
    var alpha = (this.z + R) / (2 * R);
    this.data.style.left = this.x + 'px';
    this.data.style.top = this.y + 'px';
    this.data.style.fontSize = 10 * scale + 'px';
}

window.onload = function () {
    var door = document.getElementById("door");
    console.log(door);
    var doorbg = document.getElementById("beforeBg");
    var before = document.getElementById("before");
    var search = document.getElementById("search");
    let tags = document.querySelectorAll('.tag');
    let wrap = document.getElementById('wrap');
    let circle = document.querySelector('.circle');
    let nav = document.querySelector('.header');
    document.addEventListener("scroll", function () {
      if (window.pageYOffset >= 747) {
        nav.style.display = "block";
      }else{
        nav.style.display = "none";
      }
    });

    let options = {
        data: tags,
        container: wrap
    };
    let tagCloud = new Initialization(options);

    //门消失 
    door.addEventListener("click", function () {
        doorbg.classList.add("doorscale");
        before.classList.add("disappear");
        door.classList.add("disappear");
        search.style.display = 'block';
        door.style.display = 'none';

        //文字云 
        document.addEventListener('mousemove', function (e) {
            angleY = 2 * (e.clientX / circle.getBoundingClientRect().width - 0.5) * speed * _baseAngle;
            angleX = 2 * (e.clientY / circle.getBoundingClientRect().height - 0.5) * speed * _baseAngle;
        })
        
        for (let i = 0; i < tags.length; i++) {
            tags[i].index = i;
            tags[i].onmouseover = function () {
                tags[this.index].style.opacity = '1';
                for (let j = 0; j < tags.length; j++) {
                    if (this.index != j) {
                        tags[j].style.opacity = '.3';
                    }
                }
            }
            tags[i].onmouseout = function () {
                for (let j = 0; j < tags.length; j++) {
                    if (this.index != j) {
                        tags[j].style.opacity = '1';
                    }
                }
            }
            // 调接口传值给后端
            let introduce = document.querySelector('.introduce');
            let introduceWord = '';
            tags[i].onclick = function () {
                $.get("/intangibleCulturalHeritage/wikiPediaInfo", { title: tags[this.index].innerHTML }, function (wikiPedia) {
                    introduceWord = '<h2 class="in_title">' + wikiPedia.wikiTitle + '</h2>' +
                        '<div class="in_word">' + wikiPedia.wiki + '</div>' +
                        '<div class="in_photo">' +
                        '<img src="' + wikiPedia.photo + '" alt="">' +
                        '</div>';
                    introduce.innerHTML = introduceWord;
                });

            }
        }

    })

}