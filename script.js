//--------------------------------------------------------
let map;
let score = 0;
let currentQuestionIndex = 0;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  //map styling to hide labels and edit colors
  const customStyles = [
    { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
    { elementType: "labels", stylers: [{ visibility: "off" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
    
    
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#008c8b"
          },
          {
            "weight": 2.5
          }
        ]
      },
      {
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#008c8b"
          },
          {
            "weight": 0.5
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#c9c9c9"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      }
    ];

  map = new Map(document.getElementById("map"), {
    center: { lat: 34.239223282132976,lng: -118.52956156646678},
    zoom: 17,
    styles: customStyles,
    draggable: false, // Disable dragging
    scrollwheel: false, // Disable zooming with the scroll wheel
    disableDoubleClickZoom: true, // Disable zooming with double click
    zoomControl: false, // Disable zoom controls on the map
    mapTypeControl: false, // Hide the mapType (Satellite) control
    fullscreenControl: false, //Hide full screen button
    streetViewControl: false, //Hide street view icon
  });
  // Add a click listener to the map
  map.addListener("dblclick", function (mapsMouseEvent) {
    // Get the lat, lng of the clicked location
    const clickedLocation = mapsMouseEvent.latLng.toJSON();
    checkAnswer(clickedLocation.lat, clickedLocation.lng);
  });

  // Initialize the first question
  document.getElementById("question").innerText =
    questions[currentQuestionIndex].question;
}

initMap();
//List of Questions
const questions = [
  {
    question: "1. Where is Police Sercives?",
    location: { lat: 34.23877856807364, lng: -118.53326494440273, zoom: 30 },
  },

  {
    question: "2. Where is Bayramian Hall?",
    location: { lat: 34.240403162583796, lng: -118.53088773261032, zoom: 30 },
  },
  {
    question: "3. Where is the CSUN Campus Store?",
    location: { lat: 34.23739073286452,lng: -118.52802199919142, zoom: 30 },
  },
  {
    question: "4. Where is the USU Computer Lab?",
    location: { lat:34.23955949978986, lng: -118.52562939080052, zoom: 30 },
  },
  {
    question: "5. Where is Sierra Hall?",
    location: { lat:34.238151500831236,lng: -118.53071294520224, zoom: 30 },
  },




];
function markLocation(location, isCorrect) {
  const color = isCorrect ? "green" : "red";
  const square = {
    path: "M -2,-2 2,-2 2,2 -2,2 z", // SVG path for square
    fillColor: color,
    fillOpacity: 0.2,
    scale: 20,
    strokeColor: color,
    strokeWeight: 1,
  };

  const marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: square,
  });

  //setTimeout(() => marker.setMap(null), 3000); // Removes marker after 3 seconds
}

function checkAnswer(lat, lng) {
  const correctLocation = questions[currentQuestionIndex].location;
  //checks if selected location is not to far from actualt coordinates 
  const threshold = 0.001; 

  if (
    // calculates the absolute difference in latitude and longitude between the user's selected location and the correct location.
    Math.abs(lat - correctLocation.lat) < threshold &&
    Math.abs(lng - correctLocation.lng) < threshold
  ) {
    score++;
    updateScoreDisplayTrue();
    markLocation(correctLocation, true); // Mark correct answer in green
  } else {
    updateScoreDisplayFalse();
    markLocation(correctLocation, false); // Mark correct answer in red
  }
}

function updateScoreDisplayTrue() {
  const scoreDivTrue = document.getElementById("score")
  scoreDivTrue.innerText = "Correct!";
  scoreDivTrue.classList.add('shake-green');
  //waits to change question after animation is done
  setTimeout(() => {
    scoreDivTrue.classList.remove('shake-green');
    nextQuestion();
    clearScoreDisplay();
  }, 500);//.5 seconds
  console.log("Correct answer");
}
function updateScoreDisplayFalse() {
  const scoreDivFalse = document.getElementById("score");
  scoreDivFalse.innerText = "Incorrect :(";
  scoreDivFalse.classList.add('shake-red');
  //waits to change question after animation is done
  setTimeout(() => {
    scoreDivFalse.classList.remove('shake-red');
    nextQuestion();
    clearScoreDisplay();
  }, 500); //.5 seconds
  console.log("Incorrect answer");
}

function clearScoreDisplay(){
document.getElementById("score").innerText = "";
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    document.getElementById("question").innerText = questions[currentQuestionIndex].question;
  } else {
    finalScore();
  }
}

//alert with final score and resets quiz
function finalScore() {
  alert("Quiz completed! You got " + score + " Correct");

  currentQuestionIndex = 0;
  document.getElementById("question").innerText = questions[currentQuestionIndex].question;
  score = 0;
  clearScoreDisplay(); 
}


