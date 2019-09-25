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
    var firstTrain = $("#firstTrain-input").val().trim();

    //This creates a local storage variable to refer to later from the firebase
    var trainCheck = {
        name: trainName,
        destination: destination,
        frequency: frequency,
        firstTrain: firstTrain
    }

    //this will push the trainCheck variable to firebase
    database.ref().push(trainCheck);

    console.log(trainCheck.name);
    console.log(trainCheck.destination);
    console.log(trainCheck.frequency);
    console.log(trainCheck.firstTrain);

    //this will clear the search bars of previous history
    $("#trainName-input").val('')
    $("#destination-input").val('')
    $("#frequency-input").val('')
    $("#firstTrain-input").val('')



});
//------------End of On-CLick Event------------------//


//This will take the data in firebase and attach it to the HTML
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

//This stores the data from firebase into variables for later use
var tName = childSnapshot.val().name;
var tDestination = childSnapshot.val().destination;
var tFrequency = childSnapshot.val().frequency;
var tFirstTrain = childSnapshot.val().firstTrain;

//This will console log the variables above
console.log(tName);
console.log(tDestination);
console.log(tFrequency);
console.log(tFirstTrain);

//------------This is the list of variables and calculations to find frequency----------------//

//this variable converts the first time found in firebase
var firstTimeConverted = moment(tFirstTrain, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

//this variable is the current time
var currentTime = moment();
console.log(currentTime);

//this variable is the difference in times, in minutes
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log(diffTime);

//this variable finds the remainder of the diffTime variable and the specific train frequency
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

//this variable shows the minutes to next train by subtracting the remainder from the frequency
var tMinutesTillTrain = tFrequency - tRemainder;
console.log(tMinutesTillTrain);

//this variable finds when the next train is based on current time and the minutes until train variable
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log(nextTrain);

//-----------This completes the calculation section--------------//





//This creates a new row for each train added
var newRow = $("<tr>").append(
    $("<td>").text(tName),
    $("<td>").text(tDestination),
    $("<td>").text(tFrequency),
    $("<td>").text(moment(nextTrain).format("hh:mm a")),
    $("<td>").text(tMinutesTillTrain)

)

$("#train-table > tbody").append(newRow);

})


// This will display the current time, as well as be the current time variable used to do the math
var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

var currentFormatted = "CURRENT TIME: " + moment(currentTime).format("hh:mm a");
    $("#current-time").text(currentFormatted)