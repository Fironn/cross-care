
// var provider = new firebase.auth.GoogleAuthProvider();

// document.getElementById("sign-in").onclick = function() {
//     firebase.auth().signInWithRedirect(provider);

//     firebase.auth().getRedirectResult().then(function(result) {
//         if (result.credential) {
//             // This gives you a Google Access Token. You can use it to access the Google API.
//             var token = result.credential.accessToken;
//             // ...
//         }
//         // The signed-in user info.
//         var user = result.user;
//         }).catch(function(error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // The email of the user's account used.
//         var email = error.email;
//         // The firebase.auth.AuthCredential type that was used.
//         var credential = error.credential;
//         // ...
//     });
// };

// document.getElementById("sign-out").onclick = function() {
//     firebase.auth().signOut().then(function() {
//         // Sign-out successful.
//     }).catch(function(error) {
//     // An error happened.
//     });

// }

var register=document.getElementById("register");
var login=document.getElementById("login");
var signin=document.getElementById("sign-in");

signin.addEventListener('click', function(e) {
    firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

//新規登録処理
register.addEventListener('click', function(e) {
    var mailAddress = document.getElementById('mailAddress').value;
    var password = document.getElementById('password').value;
    
    firebase.auth().createUserWithEmailAndPassword(mailAddress, password)
    .catch(function(error) {
      alert('登録できません（' + error.message + '）');
    });
  });

  //ログイン処理
login.addEventListener('click', function(e) {
    var mailAddress = document.getElementById('mailAddress').value;
    var password = document.getElementById('password').value;
    
    firebase.auth().signInWithEmailAndPassword(mailAddress, password)
    .catch(function(error) {
      alert('ログインできません（' + error.message + '）');
    });
  });