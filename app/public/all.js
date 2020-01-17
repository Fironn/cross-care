getDetailAll().then(function (result) {
    for (let i = 0; i < result.data.length; i++) {
        point = result.data[i].point;
        lev = Math.floor(point / 100) + 1;
        var pic;
        if (Math.floor(lev / 3)<6)pic=pics_src[Math.floor(lev / 3)];
        else pic = pics_src[5];
        document.getElementById("group").innerHTML +=
            `<div class="item" onclick="sendHeart(this);"><div class="detail"><span id="uid" style="display:none">` + result.data[i].uid + `</span><div id="userName">` + result.data[i].userName + `</div><div id="petName">` + result.data[i].eggName + `</div><div id="level">` + lev + `</div></div><div id="egg_trim" onclick=""><img id="egg" src=` + pic +`></div><i class="fa fa-heart"></i></div>`
    }
}).catch(error => console.log(error));

function sendHeart(detail){
    function hideHeart() {
        detail.querySelector("i").style.display = "none";
    }
    console.log("clicked");
    if(thisUser){
        if (thisUser.data[5] != detail.querySelector("#uid").innerHTML) {
            detail.querySelector("i").style.display="block";
            setTimeout(hideHeart,500);
            setNote({
                add: 10,
                type: "heart",
                uid: detail.querySelector("#uid").innerHTML,
                note: thisUser.data[7]
            }).then(function (results) {
                console.log(results.data);
            }).catch(error => console.log(error));
        }
    }else{
        getDetail().then(function (result) {
            thisUser=result;
            if (result.data[5] != detail.querySelector("#uid").innerHTML) {
                detail.querySelector("i").style.display="block";
                setTimeout(hideHeart,700);
                setNote({
                    add: 10,
                    type: "heart",
                    uid: detail.querySelector("#uid").innerHTML,
                    note: result.data[7]
                }).then(function (results) {
                    console.log(results.data);
                }).catch(error => console.log(error));
            }
        }).catch(error => console.log(error));
    }
}