const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
 
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
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

exports.updatePoint = functions.database.ref('/users/{pushId}/add')
    .onUpdate((change, context) => {
        const products = change.after.val();
        const array = Object.keys(products).map(key => products[key]);

        console.log(array);
        return admin.database().ref("/users/"+context.params.pushId+"/detail").update({
            update: Date.now(),
            point: array[0]
        }).then(() => {
            console.log('New Message written');
            // Returning the sanitized message to the client.
            return data;
        }).catch(error => {
            throw new functions.https.HttpsError('unknown', error.message, error);
        });
    });
