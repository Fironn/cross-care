const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
 
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.getAdd = functions.https.onCall((data,context) => {
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

exports.setAdd = functions.https.onCall((data, context) => {
    const userId = context.auth.uid;
    const add = data.add;
    const type = data.type;
    if (!userId || !type) {
        throw new functions.https.HttpsError('put the data');
    }
    return admin.database().ref("/users/" + userId + "/add").set({
        add: add,
        addType: type,
        update: Date.now()
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
    return admin.database().ref("/users/" + userId + "/detail").once("value")
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
    const userName = data.userName;
    const eggName = data.eggName;
    const check1 = data.check1;
    const check2 = data.check2;
    const check3 = data.check3;

    if (!userName || !eggName) {
        throw new functions.https.HttpsError('put the data');
    }
    return admin.database().ref("/users/" + userId + "/detail").set({
        userName: userName,
        uid:userId,
        eggName: eggName,
        update: Date.now(),
        point: 0,
        check1:check1,
        check2:check2,
        check3:check3
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

exports.updatePoint = functions.database.ref('/users/{pushId}/add').onUpdate((change, context) => {
    const products = change.after.val();
    const array = Object.keys(products).map(key => products[key]);

    console.log(array);
    return admin.database().ref("/users/"+context.params.pushId+"/detail").update({
        update: Date.now(),
        point: array[0]
    }).then(() => {
        console.log('New Message written');
        // Returning the sanitized message to the client.
        return array;
    }).catch(error => {
        throw new functions.https.HttpsError('unknown', error.message, error);
    });
});

exports.getNote = functions.https.onCall((data, context) => {
    const userId = context.auth.uid;
    if (!userId) {
        throw new functions.https.HttpsError('put the user id');
    }
    return admin.database().ref("/users/" + userId + "/note").once("value")
        .then(snapshot => {
            const products = snapshot.val();
            const array = Object.keys(products).map(key => products[key]);
            return array;
        }).catch(error => {
            throw new functions.https.HttpsError('unknown', error.message, error);
        });
});

exports.setNote = functions.https.onCall((data, context) => {
    var userId;
    if (data.uid)userId=data.uid;
    else userId = context.auth.uid;
    const note= data.note;
    const update = Date.now();
    const add=data.add;
    const type=data.type;
    
    return admin.database().ref("/users/" + userId + "/note").push({
        note: note,
        update: update,
        add: add,
        type:type
    }).then(() => {
        console.log('New Message written');
        // Returning the sanitized message to the client.
        return data;
    }).catch(error => {
        throw new functions.https.HttpsError('unknown', error.message, error);
    });
});