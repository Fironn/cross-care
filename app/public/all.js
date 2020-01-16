var getDetailAll = firebase.functions().httpsCallable('getDetailAll');
var pics_src = new Array("img/1.png", "img/2.png", "img/3.png", "img/4.png", "img/5.png", "img/6.png");

getDetailAll().then(function (result) {
    for (let i = 0; i < result.data.length; i++) {
        point = result.data[i].point;
        lev = Math.floor(point / 100) + 1;
        var pic;
        if (Math.floor(lev / 3)<6)pic=pics_src[Math.floor(lev / 3)];
        else pic = pics_src[5];
        document.getElementById("group").innerHTML +=
            `<div class="item"><div class="detail"><div id="userName">` + result.data[i].userName + `</div><div id="petName">` + result.data[i].eggName + `</div><div id="level">` + lev + `</div></div><div id="egg_trim"><img id="egg" src=`+pic+`></div></div>`
    }
}).catch(error => console.log(error));