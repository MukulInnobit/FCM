 // Scripts for firebase and firebase messaging
 importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
 importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");
import firebase from "firebase/app"
import { getMessaging, getToken, onMessage } from "firebase/messaging";

 // Initialize the Firebase app in the service worker by passing the generated config
 const firebaseConfig = {
  apiKey: "AIzaSyDLYiE1_qo-Dt_NMXWBJUWILxLzsZ9kWGk",
  authDomain: "fir-67ba4.firebaseapp.com",
  databaseURL: "https://fir-67ba4-default-rtdb.firebaseio.com",
  projectId: "fir-67ba4",
  storageBucket: "fir-67ba4.appspot.com",
  messagingSenderId: "326196783788",
  appId: "1:326196783788:web:e40921624b1cfba4cf4d09",
  measurementId: "G-5XKV8F164J"
};

 const app = firebase.initializeApp(firebaseConfig);

 // Retrieve firebase messaging
 const messaging = getMessaging(app);

//  messaging.onBackgroundMessage(function(payload) {
//    console.log("Received background message ", payload);

//    const notificationTitle = payload.notification.title;
//    const notificationOptions = {
//      body: payload.notification.body,
//    };

//    self.registration.showNotification(notificationTitle, notificationOptions);
//  });