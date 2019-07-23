function initMap() {
  var center = {lat: 47.6062, lng: -122.3321};
  //folder with the different pinpoints
  var iconBase = '../markers/';
      //a dictionary of the icons
       var icons = {
         red: {
           icon: iconBase + 'red.png'
         },
         yellow: {
           icon: iconBase + 'yellow.png'
         },
         green: {
           icon: iconBase + 'green.png'
         }
       };
  //each marked location with name, address, link to directions, coordinates, and pinpoint color
  var locations = [
    ['Space Needle<br>\
    400 Broad St, Seattle, WA 98109<br>\
   <a href="https://bit.ly/2sqN50P">Get Directions</a>',   47.6205063, -122.3514661, 'green'],
    ['Sky View Observatory<br>\
    700 4th Ave 73rd floor, Seattle, WA 981041<br>\
   <a href="https://bit.ly/2Y9wI4f">Get Directions</a>', 47.604452, -122.3328827, 'green'],
    ['Museum of Pop Culture<br>\
    325 5th Ave N, Seattle, WA 98109<br>\
    <a href="https://bit.ly/2SAuHwz">Get Directions</a>', 47.6214824, -122.3503132, 'green'],
    ['The Seattle Great Wheel<br>\
    21301 Alaskan Way, Seattle, WA 98101<br>\
    <a href="https://bit.ly/2Y8Y8qP">Get Directions</a>', 47.6062158, -122.3447071, 'green'],
    ['Pike Place Market<br>\
    85 Pike St, Seattle, WA 98101<br>\
   <a href="https://bit.ly/2XWoVvf">Get Directions</a>', 47.6084287, -122.3427207, 'yellow'],
    ['Chihuly Garden and Glass<br>\
    305 Harrison St, Seattle, WA 98109<br>\
    <a href="https://bit.ly/2GozGvI">Get Directions</a>', 47.620563, -122.3526547, 'green'],
    ['Seattle Aquarium<br>\
    1483 Alaskan Way, Seattle, WA 98101<br>\
    <a href="https://bit.ly/2JKLNVJ">Get Directions</a>', 47.6074048, -122.3450761, 'green'],
    ['Woodland Park Zoo<br>\
    5500 Phinney Ave N, Seattle, WA 98103<br>\
    <a href="https://bit.ly/2YcIYAF">Get Directions</a>', 47.6685161, -122.3565331, 'yellow'],
    ['Museum of Flight<br>\
    9404 E Marginal Way S, Seattle, WA 98108<br>\
    <a href="http://bit.ly/2LHT3UP">Get Directions</a>', 47.517993, -122.2985726, 'green'],
    ['Seattle Art Museum<br>\
    1300 1st Ave, Seattle, WA 98101<br>\
    <a href="http://bit.ly/2JJhHCa">Get Directions</a>', 47.607309, -122.3403218, 'green'],
  ];
var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: center
  });
  //adds the window with each place's info
var infowindow =  new google.maps.InfoWindow({});
var marker, count;
for (count = 0; count < locations.length; count++) {
    var image = {
      url: icons[locations[count][3]].icon,
      scaledSize: new google.maps.Size(40, 40)
    }
    //adds pinpoints
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[count][1], locations[count][2]),
      icon: image,
      map: map,
      title: locations[count][0]
    });
google.maps.event.addListener(marker, 'click', (function (marker, count) {
      return function () {
        infowindow.setContent(locations[count][0]);
        infowindow.open(map, marker);
      }
    })(marker, count));
  }
}
