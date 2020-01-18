var point=10;
var lev=1;
const vw=screen.width;
const vh=screen.height;

getDetail().then(function(result) {
    thisUser=result;
    document.getElementById("point").innerText=result.data[4];
    document.getElementById("userName").innerText=result.data[7];
    document.getElementById("petName").innerText=result.data[3];
    document.getElementsByClassName("label")[0].innerText = result.data[0];
    document.getElementsByClassName("label")[1].innerText = result.data[1];
    document.getElementsByClassName("label")[2].innerText = result.data[2];
    point=result.data[4];
    lev=Math.floor(point/100)+1;
    document.getElementById("level").innerText=lev;
    window.onload();
}).catch( error =>  console.log(error) );

window.onload=function(){
    var pic;
    if (Math.floor(lev / 3) < 6) pic = pics_src[Math.floor(lev / 3)];
    else pic = pics_src[5];

    document.getElementById("egg").src = pic;
}

function addPoint(add,type){
    setAdd({
        add: add,
        type: type,
    }).then(function (result) {
        console.log(result.data);
    }).catch(error => console.log(error));
}

large=function() {
    point = parseInt(point, 10);
    point += 10;
    document.getElementById("point").innerText=point;
    if (point > lev * 100 && point % 100 == 0) {
        lev++;
        document.getElementById("level").innerText = lev;
    }
    if(point%100==0)addPoint(point,"tap");
    window.onload();
}

function saveNote() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("layer").style.display = "none";
    var note=""

    if (!document.getElementById("check1").checked) note += document.getElementsByClassName("label")[0].innerText+",";
    if (!document.getElementById("check2").checked) note += document.getElementsByClassName("label")[1].innerText + ",";
    if (!document.getElementById("check3").checked) note += document.getElementsByClassName("label")[2].innerText + ",";
    if(note=="")note="none";

    point = parseInt(point,10);
    point += parseInt(document.getElementById("bar_select").value,10);
    if(point<0)point=0;
    setNote({
        add: parseInt(document.getElementById("bar_select").value,10),
        type: "daily",
        note: note
    }).then(function (result) {
        console.log(result.data);
    }).catch(error => console.log(error));

    addPoint(point, "daily");

    lev = Math.floor(point / 100) + 1;
    document.getElementById("level").innerText = lev;
    document.getElementById("point").innerText = point;
    window.onload();
}