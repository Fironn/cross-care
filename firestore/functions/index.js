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

                  console.log("reference success", array);
                  response.status(200).json(array).end();
              }
          ).catch(error => {
              console.log("reference error", error);
              response.status(500).end();
          }
      );

  } else if (request.method === "POST") {
      var now = new Date();
      const body = request.body;
      const pushRef = admin.database().ref("/users/"+body["userId"]+"/add");

      pushRef.set({
          add: body["add"],
          addType: body["type"],
          update: now
      }, error => {

          if (error) {
              console.log("save error", error.message);
              response.status(500).send(error.message).end();
          } else {
              console.log("save success");
              response.status(200).end();
          }
      });

  } else response.status(404).end();
});

exports.usersDetail = functions.https.onRequest((request, response) => {
  if (request.method === "GET") {
      admin.database().ref("/users/"+body["userId"]+"/detail").once("value")
          .then(snapshot => {
                  const products = snapshot.val();
                  const array = Object.keys(products).map(key => products[key]);

                  console.log("reference success", array);
                  response.status(200).json(array).end();
              }
          ).catch(error => {
              console.log("reference error", error);
              response.status(500).end();
          }
      );

  } else if (request.method === "POST") {
      var now = new Date();
      const body = request.body;
      const pushRef = admin.database().ref("/users/"+body["userId"]+"/detail");

      pushRef.set({
          userName: body["userName"],
          eggName: body["eggName"]
      }, error => {

          if (error) {
              console.log("save error", error.message);
              response.status(500).send(error.message).end();
          } else {
              console.log("save success");
              response.status(200).end();
          }
      });

  } else response.status(404).end();
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
