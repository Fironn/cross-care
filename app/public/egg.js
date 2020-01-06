var x=1;
var point=10;
var lev=1;
const vw=screen.width;
const vh=screen.height;
const userId='1';

firebase.initializeApp({
    apiKey: "AIzaSyChJyeair2I4TkizlQD91yY2JEJ8CdFhq8",
    authDomain: "cross-care-d73be.firebaseapp.com",
    projectId: "cross-care-d73be",
    databaseURL: "https://cross-care-d73be.firebaseio.com"
});
var functions = firebase.functions();

var getData = firebase.functions().httpsCallable('getDetail');
getData({userId:userId}).then(function(result) {
  console.log(result.data);
  document.getElementById("point").innerText=result.data[1];
  document.getElementById("userName").innerText=result.data[0];
  document.getElementById("petName").innerText=result.data[3];
  point=result.data[1];
  x=point/100;
  lev=Math.floor(point/100);
  document.getElementById("level").innerText=lev;
  window.onload();
}).catch( error =>  console.log(error) );;

window.onload=function(){
    // var levelBar = document.getElementById('levelBar');
    // var levBcontext = levelBar.getContext('2d');
    // levBcontext.fillRect(0,0,point,20);
    // levBcontext.fillStyle = 'rgb(255,00,00)';
    // levBcontext.fill();
    
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
    if(point>lev*100&&point%(lev*100)==0){
        lev++;
        document.getElementById("level").innerText=lev;
    }
    window.onload();
}
