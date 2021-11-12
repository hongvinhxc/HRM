var firebase = require("firebase/app");
require("firebase/database");

var firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PRODUCT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();

function writeUserData(node, deviceKey, action) {
  let data = {};
  if (action == "run") {
    data = {
      action: "run",
      process: "Đang chạy",
    };
  }
  if (action == "stop") {
    data = {
      process: "Hoàn thành",
      stopAction: "stop",
    };
  }
  database.ref(`users/${node}/${deviceKey}`).update(data);
}

const dispathRoleFirebase = (username, roles, action) => {
  let node = encodeBase64(username);
  roles.forEach((device) => {
    writeUserData(node, device, action);
  });
};

const encodeBase64 = (text) => {
  return Buffer.from(text).toString('base64').replace(/\+/g, "-").replace(/\//g, "_").replace(/\=+$/, "");
};

module.exports = { dispathRoleFirebase };
