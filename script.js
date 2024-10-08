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

const app = initializeApp(firebaseConfig);
var db = firebase.database();

document.getElementById("paste-form).addEventListener("submit", function(event) {
  event.preventDefault();
  var pasteData = document.getElementById("paste-data").value;

  // Generate a new unique key for the paste
  var newPasteKey = db.ref().child('paste').push().key; 

  // Store the paste data along with its URL
  db.ref('paste/' + newPasteKey).set({
    data: pasteData
  }).then(() => {
    // Construct the URL for the paste
    var pasteUrl = window.location.href + newPasteKey; 

    // Display the URL to the user
    var pasteOutput = document.getElementById("paste-output");
    pasteOutput.innerHTML = '<p>Your paste is available at: <a href="' + pasteUrl + '">' + pasteUrl + '</a></p>';
  });
});


// When a user visits a paste URL directly
function displayPasteFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const pasteId = urlParams.get('id'); 

  if (pasteId) {
    db.ref('paste/' + pasteId).once('value')
      .then(snapshot => {
        if (snapshot.exists()) {
          const pasteData = snapshot.val().data;
          document.getElementById("paste-output").innerHTML = '<pre>' + pasteData + '</pre>';
        } else {
          document.getElementById("paste-output").innerHTML = '<p>Paste not found.</p>';
        }
      });
  }
}

// Call the function to display paste if ID is in the URL
displayPasteFromUrl();
