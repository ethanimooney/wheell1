let thePlaceLatitude = 0;
let thePlaceLongitude = 0;

var input = "";

function initMap(){
  var map = new google.maps.Map(document.getElementById('mapdos'), {
    center: {lat: 47.6062, lng: -122.3321},
    zoom: 13
  });

  input = document.getElementById('pac-input');
   console.log("Input: " + input);

   var autocomplete = new google.maps.places.Autocomplete(input);
   console.log(autocomplete);
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
    infowindowContent.children['place-address'].textContent =  place.formatted_address;
    infowindow.open(map, marker);

     // @@@ set the lat and long
    thePlaceLatitude = place.geometry.location.lat();
    thePlaceLongitude = place.geometry.location.lng();
    console.log("The lat/long is " + thePlaceLatitude + "/" + thePlaceLongitude);

     findAccessibilityResults(thePlaceLatitude, thePlaceLongitude, 1000);
  });
  console.log(name);
}








function popMap(){


  var address = $('#pac-input').val().replace(' ', '+');

  $('#map').append('<iframe id="map" width="500" height="500" frameborder="0" style="border:0"src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB1ziyUz1bNBbMp_FYNearmctKuZYqVbmY&q=' + address + '" allowfullscreen></iframe>');
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
    let printWheelAcc = "wheelchair accessibility = " + accessibility;
    let printName = "Name = " + name;
    // let result = "name=" + name + ", category=" + category + ", address= " + address + ", website=" + website + ", wheelchair accessibility=" + accessibility;
    // $("#resultlist").append('<ul> ' + printName + '</ul>');
    i+=1;
    $("#resultlist").append('<ul> ' + printWheelAcc + '</ul>')
    if(accessibility == true){
      $("#listBox").css("background-color", "#7DCE82");
    }else if(accessibility == false){
      $("#listBox").css("background-color", "#ee6c52");
    }
  }
}
