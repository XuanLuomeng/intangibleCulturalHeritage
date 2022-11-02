window.addEventListener('load', function () {
    // 发布
    var issue = document.getElementById('issueAppear')
    var ulFunction = document.getElementById('functions');
    var issuebtn = ulFunction.children[0];
    var k = 1;
    issuebtn.addEventListener('click', function () {
        if (k % 2 != 0) {
            issue.style.display = 'block';
        } else {
            issue.style.display = 'none';
        }
        k++;
    })
})
