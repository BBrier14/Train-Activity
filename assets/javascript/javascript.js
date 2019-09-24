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
$("#add-train-btn").on("click", function(event) {
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
        minutesaway: minutes

    }

    //this will push the trainCheck variable to firebase
    database.ref().push(trainCheck);

    console.log(trainCheck.name);
    console.log(trainCheck.destination);
    console.log(trainCheck.frequency);
    console.log(trainCheck.minutes);

});
//------------End of On-CLick Event------------------//


//This will take the data in firebase and attach it to the HTML
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

//This stores the data from firebase into variables for later use
var tName = childSnapshot.val().name;
var tDestination = childSnapshot.val().destination;
var tFrequency = childSnapshot.val().frequency;
var tMinutes = childSnapshot.val().minutesAway;

//This will console log the variables above
console.log(tName);
console.log(tDestination);
console.log(tFrequency);
console.log(tMinutes);

//This creates a new row for each train added
var newRow = $("<tr>").append(
    $("<td>").text(tName),
    $("<td>").text(tDestination),
    $("<td>").text(tFrequency),
    $("<td>").text(tMinutes)
)

$("#train-table > tbody").append(newRow);

})