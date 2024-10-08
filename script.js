// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6kuJ17xVCs6LEMJwGApu57EpG6CKhEyI",
  authDomain: "sample-firebase-ai-app-6930f.firebaseapp.com",
  projectId: "sample-firebase-ai-app-6930f",
  storageBucket: "sample-firebase-ai-app-6930f.appspot.com",
  messagingSenderId: "674112392572",
  appId: "1:674112392572:web:57a38a70767def5372e8f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Realtime Database
var db = firebase.database();

// Handle form submission event
document.getElementById("paste-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var pasteData = document.getElementById("paste-data").value;
    db.ref("paste").push({
        data: pasteData
    });
});

// Retrieve paste data from Realtime Database
db.ref("paste").on("child_added", function(data) {
    var pasteOutput = document.getElementById("paste-output");
    pasteOutput.innerHTML += "<p>" + data.val().data + "</p>";
});
