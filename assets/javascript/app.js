 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyAhYoAJmmInAxIVfwdC4EzRYBe7l0s6XUc",
    authDomain: "train-schedule-3b662.firebaseapp.com",
    databaseURL: "https://train-schedule-3b662.firebaseio.com",
    projectId: "train-schedule-3b662",
    storageBucket: "",
    messagingSenderId: "51642945871",
    appId: "1:51642945871:web:2e1fbd3a9723767a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    let tName = $("#train-name").val().trim();
    let destin = $("#destination").val().trim();
    let firstTrainTime = $("#first-train").val().trim();
    let freqMin = $("#frequency").val().trim();
    

    var newTrain = {
        name: tName,
        destination: destin,
        firstTrain: firstTrainTime,
        frequency: freqMin
        
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);
    console.log(newTrain.firstTrain);
    
// object does show up in firebase!!

    alert("Train has been added!");

    $("#train-name").val("");
    $("#destination").val("");
    $("#frequency").val("");
    $("#first-train").val("");
    

  });

  database.ref().on("child_added", function(childSnapshot) {
      console.log(childSnapshot.val());

        var tName = childSnapshot.val().name;
        var destin = childSnapshot.val().destination;
        var freqMin = childSnapshot.val().frequency;
        // var firstTrainTime = childSnapshot.val().firstTrain;
        

        // console.log(name);
        // console.log(destin);
        // console.log(firstTrainTime);
        // console.log(freqMin);


//MATH

    // time into military time
        var today = new Date();
        var currentTime = today.getHours() + ":" + today.getMinutes() + "";
        console.log(currentTime);

        var nextArrival = parseInt(currentTime)+parseInt(freqMin);
        console.log(nextArrival);
        var nextArrivalTime = moment().diff(nextArrival, "hours"); 
        moment().format("HH:mm");
        console.log(nextArrivalTime); 

        var minutesAway = moment().diff(nextArrivalTime, "hours");
        console.log(minutesAway);




    var newRow= $("<tr>").append(
        $("<td>").text(tName),
        $("<td>").text(destin),
        $("<td>").text(freqMin),
        $("<td>").text(nextArrivalTime),
        $("<td>").text(minutesAway)
        
    );

    $("#train-sched tbody").append(newRow);

  })