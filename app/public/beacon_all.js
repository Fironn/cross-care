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

const vw =screen.width;
const vh =screen.height;
console.log(vw,vh);

firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.database();
var functions = firebase.functions();

var getRSSIAll = firebase.functions().httpsCallable('getRSSIAll');


getRSSIAll().then(function (result) {
    for (let i = 0; i < result.data.length; i++) {
        if(result.data[i]){
            var uid,width,height,left,top,bottom;
            for (let j = 0; j < result.data[i].length;j++){
                if (result.data[i][j].uid){
                    uid = result.data[i][j].uid;
                    break;
                }
            }
            console.log(result.data[i]);
            if (result.data[i].length>2){
                width = Math.floor(result.data[i][2].rssi - result.data[i][0].rssi);
                width*=100;
                if(width<0)width=width*-1;
                if(width<10)width=50;
                var height1 = result.data[i][1].rssi - result.data[i][2].rssi;
                var height2 = result.data[i][1].rssi - result.data[i][0].rssi;
                height = Math.floor(((height1+height2)/2)*100);
                if(height<0)height=height*-1;
                if(height<10)height=50;
                left = (result.data[i][2].rssi - result.data[i][0].rssi)*100;
                if(left<0)left=left*-1;
                var top1 = (result.data[i][1].rssi - result.data[i][0].rssi)*100; 
                var top2 = (result.data[i][1].rssi - result.data[i][2].rssi)*100;
                top = Math.floor((top1 + top2) / 2+vh/2);
                if(top<0)top=top*-1;

                var randomColor = "rgb(" + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ")";

                console.log(uid,width,height,left,top);
                console.log("<div class='human' style='background-color: " + randomColor + "; height:" + height.toString(10) + "px; width:" + width.toString(10) + "px; left:" + left.toString(10) + "px; top:" + top.toString(10) + "px' id='" + uid + "'></div>");

                document.getElementById("map").innerHTML += "<div class='human' style='background-color: " + randomColor + "; height:" + height.toString(10) + "px; width:" + width.toString(10) + "px; left:" + left.toString(10) + "px; top:" + top.toString(10)+"px' id='" + uid+"'></div>";
                console.log(document.getElementById(uid).style);
            }
        }
    }
    console.log(result.data);
    
}).catch(error => console.log(error));