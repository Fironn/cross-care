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
  lev=Math.floor(point/100);
  document.getElementById("level").innerText=lev;
  window.onload();
}).catch( error =>  console.log(error) );

window.onload=function(){
    var cvs=document.getElementById("egg");
    var ctx=cvs.getContext("2d");
    ctx.fillStyle="black";
    ctx.beginPath();
    ctx.arc(vw/2,vh/2,40*x,0,Math.PI*2);
    ctx.fill();
}

large=function(){
    x+=0.03;
    point+=10;
    document.getElementById("point").innerText=point;
    if(point>lev*100&&point%100==0){
        lev++;
        document.getElementById("level").innerText=lev;
    }
    window.onload();
}
