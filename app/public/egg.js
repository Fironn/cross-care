var x=1;
var point=10;
var lev=1;
const vw=screen.width;
const vh=screen.height;
const userId='1';

var getData = firebase.functions().httpsCallable('getDetail');

getData().then(function(result) {
  console.log(result.data);
  document.getElementById("point").innerText=result.data[1];
  document.getElementById("userName").innerText=result.data[0];
  document.getElementById("petName").innerText=result.data[3];
  point=result.data[1];
  x=point/100;
  lev=Math.floor(point/100)+1;
  document.getElementById("level").innerText=lev;
  window.onload();
}).catch( error =>  console.log(error) );

var pics_src = new Array("img/1.png", "img/2.png", "img/3.png", "img/4.png", "img/5.png", "img/6.png");

window.onload=function(){
    var pic;
    if (Math.floor(lev / 3) < 6) pic = pics_src[Math.floor(lev / 3)];
    else pic = pics_src[5];

    document.getElementById("egg").src = pic;
}

function addPoint(add,type){
    setData({
        add: add,
        type: type,
        update: Date.now()
    }).then(function (result) {
        console.log(result.data);
    }).catch(error => console.log(error));
}

large=function() {
    x += 0.03;
    point += 10;
    document.getElementById("point").innerText=point;
    if (point > lev * 100 && point % 100 == 0) {
        lev++;
        document.getElementById("level").innerText = lev;
    }
    if(point%100==0)addPoint(point,"tap");
    window.onload();
}