function initMap() {	function initMap() {
  var center = {lat: 47.6062, lng: -122.3321};	  var center = {lat: 47.6062, lng: -122.3321};
  //folder with the different pinpoints	  //folder with the different pinpoints
  var iconBase = '/../markers/';	  var iconBase = '../markers/';
      //a dictionary of the icons	      //a dictionary of the icons
       var icons = {	       var icons = {
         red: {	         red: {
  106  scripts/places.js
@@ -0,0 +1,106 @@
// This sample uses the Place Autocomplete widget to allow the user to search
// for and select a place. The sample then displays an info window containing
// the place ID and other information about the place that the user has
// selected.

 // This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">



 // @@@ Set these as global variables
let thePlaceLatitude = 0;
let thePlaceLongitude = 0;

 function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.6062, lng: -122.3321},
    zoom: 13
  });

   var input = document.getElementById('pac-input');

   var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

   // Specify just the place data fields that you need.
  autocomplete.setFields(['place_id', 'geometry', 'name']);

   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

   var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);

   var marker = new google.maps.Marker({map: map});

   marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

   autocomplete.addListener('place_changed', function() {
    infowindow.close();

     var place = autocomplete.getPlace();

     if (!place.geometry) {
      return;
    }

     if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

     // Set the position of the marker using the place ID and location.
    marker.setPlace({
      placeId: place.place_id,
      location: place.geometry.location
    });

     marker.setVisible(true);

     infowindowContent.children['place-name'].textContent = place.name;
    infowindowContent.children['place-id'].textContent = place.place_id;
    infowindowContent.children['place-address'].textContent =
        place.formatted_address;
    infowindow.open(map, marker);

     // @@@ set the lat and long
    thePlaceLatitude = place.geometry.location.lat();
    thePlaceLongitude = place.geometry.location.lng();
    console.log("The lat/long is " + thePlaceLatitude + "/" + thePlaceLongitude);

     findAccessibilityResults(thePlaceLatitude, thePlaceLongitude, 1000);
  });
}

 function findAccessibilityResults(lat, lng, accuracy) {
  let appToken = "1ca3179662ad6d3cb237cdee41265a58";
  let accessibilityUrl = "https://accessibility-cloud.freetls.fastly.net/place-infos.json?appToken=" + appToken +
    "&latitude=" + lat + "&longitude=" + lng + "&accuracy=" + accuracy + "&limit=1";
  console.log(accessibilityUrl);

   $.get(accessibilityUrl, null, processResponse);
}

 function processResponse(response) {
  console.log(response);

   for(let i = 0; i < response.features.length; i++) {
    let feature = response.features[i];
    let lng = feature.geometry.coordinates[0];
    let lat = feature.geometry.coordinates[1];
    let name = feature.properties.name;
    let distance = feature.properties.distance;
    let address = feature.properties.address;
    let website = feature.properties.placeWebsiteUrl;
    let accessibility = feature.properties.accessibility.accessibleWith.wheelchair;
    let category = feature.properties.category;
    let result = "name=" + name + ", category=" + category + ", address= " + address + ", website=" + website + ", wheelchair accessibility=" + accessibility;
    $("#resultlist").append('<li> ' + result + '</ul>');
  }
}
  75  templates/places.html
@@ -0,0 +1,75 @@
<!DOCTYPE html>
<html>
  <head>
    <title>Place ID Finder</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <script src="../scripts/places.js"></script>
    <style>
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        height: 50%;
      }
      /* Optional: Makes the sample page fill the window. */
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
      .controls {
        background-color: #fff;
        border-radius: 2px;
        border: 1px solid transparent;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        box-sizing: border-box;
        font-family: Roboto;
        font-size: 15px;
        font-weight: 300;
        height: 29px;
        margin-left: 17px;
        margin-top: 10px;
        outline: none;
        padding: 0 11px 0 13px;
        text-overflow: ellipsis;
        width: 400px;
      }
       .controls:focus {
        border-color: #4d90fe;
      }
      .title {
        font-weight: bold;
      }
      #infowindow-content {
        display: none;
      }
      #map #infowindow-content {
        display: inline;
      }
     </style>
  </head>
  <body>
    <div style="display: none">
        <input id="pac-input"
               class="controls"
               type="text"
               placeholder="Enter a location">
    </div>
    <div id="map"></div>
    <div id="infowindow-content">
        <span id="place-name" class="title"></span><br>
        <strong>Place ID:</strong> <span id="place-id"></span><br>
        <span id="place-address"></span>
    </div>
    <div id="results">
      The results go here
      <ul id = "resultlist">
      <ul>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCEneSUi1bSMZO3vNog-3HhzpP6stc1afs&libraries=places&callback=initMap"
        async defer></script>
  </body>
</html>
0 comments on commit cee8af2
@Saiylor


Leave a comment

Attach files by dragging & dropping, selecting or pasting them.

 You’re receiving notifications because you’re watching this repository.
© 2019 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
Pricing
API
Training
Blog
About
