// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyChJyeair2I4TkizlQD91yY2JEJ8CdFhq8",
    authDomain: "cross-care-d73be.firebaseapp.com",
    databaseURL: "https://cross-care-d73be.firebaseio.com",
    projectId: "cross-care-d73be",
    storageBucket: "cross-care-d73be.appspot.com",
    messagingSenderId: "476335307395",
    appId: "1:476335307395:web:b42767053c1a18f92639b6",
    measurementId: "G-N508Y1632H"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
var noteAll="";
var database = firebase.database();
var functions = firebase.functions();
var getDetail = firebase.functions().httpsCallable('getDetail');
var setDetail = firebase.functions().httpsCallable('setDetail');
var setAdd = firebase.functions().httpsCallable('setAdd');
var getAdd = firebase.functions().httpsCallable('getAdd');
var getDetailAll = firebase.functions().httpsCallable('getDetailAll');
var setNote = firebase.functions().httpsCallable('setNote');
var getNote = firebase.functions().httpsCallable('getNote');

var pics_src = new Array("img/1.png", "img/2.png", "img/3.png", "img/4.png", "img/5.png", "img/6.png");

var thisUser;
startNoti();

if (!Date.now) {
    Date.now = function now() {
        return new Date().getTime();
    };
}
// "child_added"
function startNoti(){
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var notice = firebase.database().ref('/users/' + user.uid + '/note');
            notice.on("child_added", function (data) {
                const products= data.val();
                const array = Object.keys(products).map(key => products[key]);
                console.log(array);
                var text="";
                var date = new Date(array[3]);
                if(array[2]=="daily"){
                    text += (date.getMonth()+1)+"月";
                    text += date.getDate()+"日";
                    text+=" Daily : ";
                    text += array[0].toString(10);
                    text+="pt ";
                    array_note = array[1].split(",");
                    if(array_note.length>1){
                        array_note.pop();
                        text += array_note.join('/') + " をもっとがんばろう！";
                    }else text+="いつもお疲れ様です！"
                } else if (array[2] == "heart") {
                    text += (date.getMonth() + 1) + "月";
                    text += date.getDate() + "日";
                    text += " ♡ : ";
                    text += array[0].toString(10);
                    text += "pt ";
                    text+= array[1]+"さんからハートが届きました。"
                    text+="いつも応援しています！"
                }
                noteAll += "<div>"+text +"</div>";
                document.getElementById("noti").innerText =text;
                console.log(text);
                document.getElementById("note_detail").innerHTML =noteAll;
            });
        } else {
        }
    });
}


function initApp(){
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            document.getElementById("button").innerHTML = 
                `<div class="goto">
                    <p class="btn-partial-line" onclick="location.href = 'egg.html'"><spam class="larger">わたし</spam>の<br>たまご</p>
                    <p class="btn-partial-line" onclick = "location.href='all.html'"> <spam class="larger">みんな</spam>の<br>たまご</p>
                    <p class="btn-partial-line" onclick = "onButtonClick();"> <spam class="larger">すれ違い</spam>を<br>アップデート</p>
                </div>`;
            document.getElementById("logout").style.display = "block";
            printUserInfo(user.email);
            log(`ログインしました。`);
            showEgg();
        } else {
        }
    });
}
{/* <p class="btn-partial-line" onclick="location.href='beacon.html'"><spam class="larger">test</spam><br>Beacon</p> */}


function showEgg(){
    getDetailAll().then(function (result) {
        var point=0;
        for (let i = 0; i < result.data.length; i++) {
            point +=result.data[i].point;
        }
        lev = Math.floor(point / 1000) + 1;
        var pic;
        if (Math.floor(lev / 3) < 6) pic = pics_src[Math.floor(lev / 3)];
        else pic = pics_src[5];
        document.getElementById("egg_all").src = pic;
    }).catch(error => console.log(error));
}

function printUserInfo(email) {
    document.getElementById(
        "userinfo"
    ).innerHTML = `<p>${email}</p>`;
}

function clearUserInfo() {
    document.getElementById("userinfo").innerHTML = `<p>未ログイン</p>`;
}

function clearForm() {
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
}

onSignUpButtonClicked = function () {
    const email = getEmail();
    const password = getPassword();

    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(function (auth) {
            log(`サインアップしました。: ${email}`);
            popupShow();
        })
        .catch(function (error) {
            log(`サインアップできませんでした。${error}`);
        });
};

onSignInButtonClicked = function () {
    const email = getEmail();
    const password = getPassword();

    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(function (error) {
            log(`ログインできませんでした。${error}`);
        });
};

function getEmail() {
    return document.getElementById("email").value;
}

function getPassword() {
    return document.getElementById("password").value;
}

onSignOutButtonClicked = function () {
    firebase
        .auth()
        .signOut()
        .then(function () {
            document.getElementById("button").innerHTML =
                `<div class="form">
                    <div>
                    <label for="email">Email</label>
                    <input type="email" id="email" />
                    </div>
                    <div>
                    <label for="password">Password</label>
                    <input type="password" id="password" />
                    </div>
                </div>
                <div class="goto">
                    <p class="btn-partial-line" id="sign-in" onclick="onSignInButtonClicked();">ログイン</p>
                    <p class="btn-partial-line" id="sign-up" onclick="onSignUpButtonClicked();">新規登録</p>
                </div>`;
            document.getElementById("logout").style.display = "none";
            document.getElementById("email").value="";
            log("ログアウトしました。");
            document.getElementById("userinfo").innerHTML = `<p></p>`;
        })
        .catch(function (error) {
            log(`ログアウトできませんでした。${error}`);
        });
};

function log(msg) {
    document.getElementById("noti").innerText = `${msg}\n`;
}

function popupShow(){
    document.getElementById("popup").style.display ="block";
    document.getElementById("layer").style.display ="block";
}

function popupHide() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("layer").style.display="none";
    
    setDetail({ 
        userName: document.getElementById("userName").value,
        eggName: document.getElementById("eggName").value,
        update: Date.now(),
        check1: document.getElementById("check1").value,
        check2: document.getElementById("check2").value,
        check3: document.getElementById("check3").value
    }).then(function (result) {
        console.log(result.data);
    }).catch(error => console.log(error));

    setAdd({
        add: "0",
        type: "init",
        update: Date.now()
    }).then(function (result) {
        console.log(result.data);
    }).catch(error => console.log(error));
    showEgg();
}

function noteShow() {
    document.getElementById("popup_note").style.display = "block";
    document.getElementById("layer").style.display = "block";
}

function noteHide() {
    document.getElementById("popup_note").style.display = "none";
    document.getElementById("layer").style.display = "none";
}
