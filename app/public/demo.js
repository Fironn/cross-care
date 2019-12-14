var x=1;
window.onload=function(){
    var cvs=document.getElementById("cvs1");
    var ctx=cvs.getContext("2d");
    ctx.strokeStyle="red";
    ctx.fillStyle="red";
    
    ctx.beginPath();
    ctx.arc(200,100,40*x,0,Math.PI*2,false);
    ctx.fill();
}

large=function(){
    x+=0.1;
    window.onload();
}
