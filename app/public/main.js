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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var functions = firebase.functions();

var getDetail = firebase.functions().httpsCallable('getDetail');
var setDetail = firebase.functions().httpsCallable('setDetail');
var setData = firebase.functions().httpsCallable('setData');


function initApp(){
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            document.getElementById("button").innerHTML = 
                `<div class="goto">
                    <p class="btn-partial-line" onclick="location.href = 'egg.html'"><spam class="larger">わたし</spam>の<br>たまご</p>
                    <p class="btn-partial-line" onclick = "location.href='all.html'"> <spam class="larger">みんな</spam>の<br>たまご</p>
                    <p class="btn-partial-line" onclick="location.href='beacon.html'"><spam class="larger">test</spam><br>Beacon</p>
                </div>`;
            document.getElementById("logout").style.display = "block";
            printUserInfo(user.email);
            log(`ログインしました。`);
        } else {

        }
    });

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
    document.getElementById("log").innerText = `${msg}\n`;
}

window.onload=function(){
    this.initApp();
    // this.popupHide();
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
        update: Date.now()
    }).then(function (result) {
        console.log(result.data);
    }).catch(error => console.log(error));

    setData({
        add: "0",
        type: "init",
        update: Date.now()
    }).then(function (result) {
        console.log(result.data);
    }).catch(error => console.log(error));
}