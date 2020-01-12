const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
 
exports.helloWorld = functions.https.onCall((data, context) => {
    return{text:"Hello from Firebase!"};
});

exports.getData = functions.https.onCall((data,context) => {
    const userId = context.auth.uid;
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
    const userId = context.auth.uid;
    const add=data.add;
    const type=data.type;
    const update=data.update;
    if(!userId||!add||!type||!update){
        throw new functions.https.HttpsError('put the data');
    }
    return admin.database().ref("/users/" + userId + "/add").set({
        add: add,
        addType: type,
        update: update
    }).then(() => {
        console.log('New Message written');
        // Returning the sanitized message to the client.
        return data;
    }).catch(error => {
        throw new functions.https.HttpsError('unknown', error.message, error);
    });
});

exports.getDetail = functions.https.onCall((data, context) => {
    const userId = context.auth.uid;
    if (!userId) {
        throw new functions.https.HttpsError('put the user id');
    }
    return admin.database().ref("/users/"+userId+"/detail").once("value")
    .then(snapshot => {
        const products = snapshot.val();
        const array = Object.keys(products).map(key => products[key]);
        return array;
    }).catch(error => {
        throw new functions.https.HttpsError('unknown', error.message, error);
    });
});

exports.setDetail = functions.https.onCall((data, context) => {
    const userId = context.auth.uid;
    const userName=data.userName;
    const eggName=data.eggName;
    const update=data.update;
    if(!userName||!eggName||!update){
        throw new functions.https.HttpsError('put the data');
    }
    return admin.database().ref("/users/" + userId + "/detail").set({
        userName: userName,
        eggName: eggName,
        update: update,
        point: 0
    }).then(() => {
        console.log('New Message written');
        // Returning the sanitized message to the client.
        return data;
    }).catch(error => {
        throw new functions.https.HttpsError('unknown', error.message, error);
    });
});

exports.getDetailAll = functions.https.onCall((data, context) => {
    return admin.database().ref("/users").once("value")
    .then(snapshot => {
            const products = snapshot.val();
            const array = Object.keys(products).map(key => products[key]);
            var arraySend = [];
            for (var i=0; i<array.length;i++){
                arraySend.push(array[i]["detail"]);
            }
            return arraySend;
        }
    ).catch(error => {
        throw new functions.https.HttpsError('unknown', error.message, error);
    });
});