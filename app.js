var data, request, store, storeFront, storeId, address, lat, lon, marker, markers = [];

storeJson = "https://spreadsheets.google.com/feeds/list/1Ouip-u1ZkHyJSqeinoJf-HXcKc08MjIodbnt1KLSF1A/od6/public/values?alt=json";
storeFront = "https://docs.google.com/spreadsheets/d/1Ouip-u1ZkHyJSqeinoJf-HXcKc08MjIodbnt1KLSF1A/edit?usp=sharing";
storeId = "1Ouip-u1ZkHyJSqeinoJf-HXcKc08MjIodbnt1KLSF1A";
request = new XMLHttpRequest();
request.open('GET', storeJson, true);

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
    address = data.feed.entry[i]['gsx$address']['$t'];
    geocoder.geocode({'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        lat = results[0].geometry.location.lat();
        lon = results[0].geometry.location.lng();
        markers.push({lat: lat, lng: lon});
      }
    });
    i++;
  }
}, 2000)

function initMap () {
  setTimeout(function(){
    drawMap();
  }, 4000);
}

function drawMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.3236421, lng: -102.01350230000003},
    zoom: 4
  });

  markers.forEach(function(ll) {
    marker = new google.maps.Marker({
      position: ll,
      map: map
    });
  });
}
