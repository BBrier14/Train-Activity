// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDeOij3ke3Zgtb68cnDOlwSIm28hn169Ik",
    authDomain: "train-90107.firebaseapp.com",
    databaseURL: "https://train-90107.firebaseio.com",
    projectId: "train-90107",
    storageBucket: "",
    messagingSenderId: "823295532375",
    appId: "1:823295532375:web:9cc91a4247ebeb4bb67212"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  
//This variable is a simple way to refer to the firebase database
var database = firebase.database();

//------------------ON CLICK EVENT------------------//
//This On-click event will take the user input and push it into the firebase storage
$("#add-train-btn").on("click", function (event){
    event.preventDefault();

//On click part 2: this reads what the user inputs and turns it into a variable
var trainName = $("#trainName-input").val().trim();  
var destination = $("#destination-input").val().trim(); 
var frequency = $("#frequency-input").val().trim();
var minutes = $("#minutes-input").val().trim(); 

//This creates a local storage variable to refer to later from the firebase
var trainCheck = {
    name: trainName,
    destination: destination,
    frequency: frequency,
    minutesAway: minutes,

}

//this will push the trainCheck variable to firebase
database.ref().push(trainCheck);

console.log(trainCheck.name);
console.log(trainCheck.destination);
console.log(trainCheck.frequency);
console.log(trainCheck.minutes);

});
//------------End of On-CLick Event------------------//

