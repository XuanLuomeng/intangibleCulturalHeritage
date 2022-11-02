window.addEventListener('load', function () {
    // 点击切换出现页面
    var li = document.querySelectorAll('.jump');
    var mymain = document.querySelectorAll('.mymain');
    for (var i = 0; i < li.length; i++) {
        li[i].index = i;
        mymain[i].index = i;
        li[i].addEventListener("click", function () {
            li[this.index].classList.add("turn");
            mymain[this.index].style.display = "block";
            for (var j = 0; j < li.length; j++) {
                if (this.index != j) {
                    li[j].classList.remove('turn');
                    mymain[j].style.display = "none";
                };
            };
        });
    };

})