import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyD5c8yepSrKccCOBBig9Pk_AHJfzZDRuRw",
    authDomain: "loteriamexicana.firebaseapp.com",
    projectId: "loteriamexicana",
    storageBucket: "loteriamexicana.appspot.com",
    messagingSenderId: "462240258545",
    appId: "1:462240258545:web:d8a8c3df8be5dc8d29cc50",
    measurementId: "G-SX4S6W6KZK"
  };
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
export default storage;