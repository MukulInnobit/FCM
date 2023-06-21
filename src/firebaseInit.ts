// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

import firebase from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const publicKey = "BJjOVXhZwHUmfkFnvmgxZZG4X_Gdm3HSLNTd3Mde8lRMP2kOu4CPnkHk87zeQwQ2Ph81ypf3oTylKoWbMfmO6Qs";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const analytics = getAnalytics(app);

export const getTokenFcm = async (setTokenFound:any) => {
    let currentToken = '';
    try {
      currentToken = await getToken(messaging,{vapidKey: publicKey});
      if (currentToken) {
        setTokenFound(true);
      } else {
        setTokenFound(false);
      }
    } catch (error) {
      console.log('An error occurred while retrieving token.', error);
    }
    console.log(currentToken,"tol")
    return currentToken;
  };

  export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging,(payload) => {
      resolve(payload);
    });
  });