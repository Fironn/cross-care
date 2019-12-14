const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
 
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.setData = functions.https.onRequest((request, response) => {
  if (request.method === "GET") {
      admin.database().ref("/users/"+body["userId"]+"/add").once("value")
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

