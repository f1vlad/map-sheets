var data, request, store, storeFront, storeId, address, lat, lon;

store = "https://spreadsheets.google.com/feeds/list/1Ouip-u1ZkHyJSqeinoJf-HXcKc08MjIodbnt1KLSF1A/od6/public/values?alt=json";
storeFront = "https://docs.google.com/spreadsheets/d/1Ouip-u1ZkHyJSqeinoJf-HXcKc08MjIodbnt1KLSF1A/edit?usp=sharing";
storeId = "1Ouip-u1ZkHyJSqeinoJf-HXcKc08MjIodbnt1KLSF1A";
request = new XMLHttpRequest();
request.open('GET', store, true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    console.log('Connection successful.');
    data = JSON.parse(request.responseText);
  } else {
    console.log('Connection error.');
  }
};

request.onerror = function() {
  console.log('Connection error.');
};

request.send();

setTimeout(function(){
  // console.log(data.feed.entry);
  var geocoder = new google.maps.Geocoder();

  var i = 0;

  while(i < data.feed.entry.length) {
    console.log(data.feed.entry[i]['gsx$address']['$t'] + ' --- ' + data.feed.entry[i]['gsx$name']['$t']);
    address = data.feed.entry[i]['gsx$address']['$t'];
    geocoder.geocode({'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        lat = results[0].geometry.location.lat();
        lon = results[0].geometry.location.lng();
        console.log(lat + ', ' + lon);
      }
    });
    i++;
  }
}, 3000)

function initMap () {
  setTimeout(function(){
    drawMap();
  }, 3000);
}

function drawMap() {
  var uluru = {lat: -25.363, lng: 131.044},
      huiluru = {lat: -25.033, lng: 130.1};
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -25.360, lng: 131.0},
    zoom: 6
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
  marker = new google.maps.Marker({
    position: huiluru,
    map: map
  });
}
