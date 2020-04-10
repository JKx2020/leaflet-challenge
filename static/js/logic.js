//Level 1: Basic Visualizations

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

//create a circles variable
var circles;

//create a function which determins the color of the circles by magnatiude
function chooseColor(mag) {
  if (mag > 4) {
    return "black";
  };
  if (mag > 3) {
    return " navy blue";
  };
  if (mag >= 2) {
    return "blue";
  };
  if (mag < 2) {
    return "light blue";
  };
};

//read in the earthquake data
d3.json(link, function(data) {
  console.log(data);

  L.geoJson(data, {
    style: function(feature) {
      return {color: feature.properties.mag};
    }
  }).addTo(myMap);
  });

    


