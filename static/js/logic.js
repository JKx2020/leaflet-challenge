/////////Level 1: Basic Visualizations


//create myMap & add in the map layer
var myMap = L.map("map", {
    center: [39.8283, -98.579],
    zoom: 5
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);



//choose dataset - All Earthquakes in the past 1 Day
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";



//create a function which determins the color of the circles by magnatiude
function chooseColor(mag) {
  if (mag > 4) {
    return "#000080";
  };
  if (mag > 3) {
    return " #0000CD";
  };
  if (mag >= 2) {
    return "1E90FF";
  };
  if (mag < 2) {
    return "87CEFA";
  };
};


//read in the earthquake data
d3.json(link, function(data) {
  console.log(data);

  //add the data as markers to the map
  L.geoJson(data, {

    pointToLayer: function(feature, latlng) {
      console.log(feature.properties.mag)
      //pointToLayer to take the coordinates and create circle markers
      return new L.circleMarker(latlng, {

            radius: feature.properties.mag*10,
            color: "white",
            fillColor: chooseColor(feature.properties.mag),
            fillOpacity: .85,
            weight: 2
      });
    },
    onEachFeature: function(feature, layer) {
      layer.on({
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 1
          });
        },
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
      });
      layer.bindPopup("<h2>Location: "+feature.properties.place+"</h2><hr><h3> Magnitude: "+feature.properties.mag+"</h3>");
    }
  }).addTo(myMap);
});