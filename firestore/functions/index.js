const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
 
exports.helloWorld = functions.https.onCall((data, context) => {
    return{text:"Hello from Firebase!"};
});

exports.getData = functions.https.onCall((data,context) => {
    const userId = data.userId;
    if (!userId) {
        throw new functions.https.HttpsError('put the user id');
    }
    return admin.database().ref("/users/"+userId+"/add").once("value")
    .then(snapshot => {
            const products = snapshot.val();
            const array = Object.keys(products).map(key => products[key]);
            return array;
        }
    ).catch(error => {
        throw new functions.https.HttpsError('unknown', error.message, error);
    });
});

exports.setData = functions.https.onCall((data, context) => {
    const userId = data.userId;
    const add=data.add;
    const type=data.type;
    const update=data.text.update;
    if(!userId||!add||!type||!update){
        throw new functions.https.HttpsError('put the data');
    }
    const pushRef = admin.database().ref("/users/"+userId+"/add");
    pushRef.set({
        add: add,
        addType: type,
        update: update
    }, error => {
        if (error) {
            console.log("save error", error.message);
            throw new functions.https.HttpsError('unknown', error.message, error);
        } else {
            console.log("save success");
            throw new functions.https.HttpsError('unknown', error.message, error);
        }
    });
    return data;
});

exports.getDetail = functions.https.onCall((data, context) => {
    const userId = data.userId;
    if (!userId) {
        throw new functions.https.HttpsError('put the user id');
    }
    return admin.database().ref("/users/"+userId+"/detail").once("value")
    .then(snapshot => {
            const products = snapshot.val();
            const array = Object.keys(products).map(key => products[key]);
            return array;
        }
    ).catch(error => {
        throw new functions.https.HttpsError('unknown', error.message, error);
    });
});

exports.setDetail = functions.https.onCall((data, context) => {
    const userName=data.userName;
    const eggName=data.eggName;
    const update=data.text.update;
    if(!userName||!eggName||!update){
        throw new functions.https.HttpsError('put the data');
    }
    const pushRef = admin.database().ref("/users/"+userId+"/add");
    pushRef.set({
        add: add,
        addType: type,
        update: update
    }, error => {
        if (error) {
            console.log("save error", error.message);
            throw new functions.https.HttpsError('unknown', error.message, error);
        } else {
            console.log("save success");
            throw new functions.https.HttpsError('unknown', error.message, error);
        }
    });
    return data;
});