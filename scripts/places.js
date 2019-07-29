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
