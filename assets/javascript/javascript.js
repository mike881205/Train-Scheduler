let firebaseConfig = {
    apiKey: "AIzaSyBclIdAvpb1w4NqLP2o9kFHloYEHURh-XY",
    databaseURL: "https://train-homework-445a6.firebaseio.com",

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.database();

$("#submit-info").on("click", function () {
    event.preventDefault();

    let trainName = $("#name-input").val().trim();
    let trainDestination = $("#destination-input").val().trim();
    let firstTrain = $("#first-input").val().trim();
    let trainFrequency = $("#frequency-input").val().trim();

    database.ref().push({
        name: trainName,
        destination: trainDestination,
        first: firstTrain,
        frequency: trainFrequency,
    });

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#frequency-input").val("");

});

database.ref().on("child_added", function (snapshot) {

    let name = snapshot.val().name
    let destination = snapshot.val().destination
    let firstTrain = snapshot.val().first
    let frequency = snapshot.val().frequency
    
    let firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    let tRemainder = diffTime % frequency;
    let tMinutesTillTrain = frequency - tRemainder;
    let nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");

    let newRow = $("<tr>")

    // Change the HTML to reflect
    let thName = $("<th>").attr("scope", "row").text(name);
    newRow.append(thName);

    let tdDestination = $("<td>").text(destination);
    newRow.append(tdDestination);

    let tdFrequency = $("<td>").text(frequency);
    newRow.append(tdFrequency);

    let tdNext = $("<td>").text(nextTrain);
    newRow.append(tdNext);

    let tdMinAway = $("<td>").text(tMinutesTillTrain);
    newRow.append(tdMinAway);

    $("#trainInfo").append(newRow);

    

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});