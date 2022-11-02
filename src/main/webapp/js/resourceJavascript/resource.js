window.addEventListener("load",function(){
    var door = document.getElementById("door");
    var doorbg = document.getElementById("beforeBg");
    var before = document.getElementById("before");
    var search = document.getElementById("search");

    door.addEventListener("click",function(){
         doorbg.classList.add("doorscale");
         before.classList.add("disappear");
         door.classList.add("disappear");
         search.style.display='block';
         door.style.display='none';
    })
    // 阿飘鼠标
    var mouses = document.getElementById("P");
    document.addEventListener("mousemove", function (e) {
      var x = e.pageX;
      var y = e.pageY;
      mouses.style.left = x + 5 + "px";
      mouses.style.top = y + 8 + "px";
      console.log(mouses);
    });

})