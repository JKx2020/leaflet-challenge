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
  if (mag >= 4) {
    return "#2F4F4F";
  }
  else if (mag >= 3) {
    return "#20B2AA";
  }
  else if (mag >= 2) {
    return "#00FA9A";
  }
  else if (mag >=1) {
    return "#7CFC00";
  }
  else {
    return "#FFFF00";
  };
};

var geojson;

//read in the earthquake data geoJson
d3.json(link, function(data) {
  console.log(data);

  geojson = L.geoJson(data, {

    //must use pointToLayer so that the markers can be changed to circles
    pointToLayer: function(feature, latlng) {

      //pointToLayer to take the coordinates and create circle markers
      return new L.circleMarker(latlng, {

            radius: feature.properties.mag*10,
            color: "white",
            fillColor: chooseColor(feature.properties.mag),
            fillOpacity: .75,
            weight: 2
      });
    },

    //Add on the event listeners
    //mouse on & mouse off events
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
            fillOpacity: 0.75
          });
        },
      });

      //pop-up
      layer.bindPopup("<h1>Earthquake!!</h1><hr><h2>Location: "+feature.properties.place+"</h2><hr><h3> Magnitude: "+feature.properties.mag+"</h3>");
    }
  }).addTo(myMap);

  // Set up the legend
  var legend = L.control({position: "bottomright"});

  legend.onAdd = function() {

    var div = L.DomUtil.create("div", "info legend");
    var categories = ["Mag 4+", "Mag 3-4","Mag 2-3", "Mag 1-2", "Mag 0-1"];
    var colors = ["#2F4F4F", "#20B2AA", "#00FA9A","#7CFC00","#FFFF00"];

    // var legendInfo = "<h1>Earthquake Magnitude<h1>"+ 
    // "<div class=\"labels\">" +
    // for (i=0; i<colors.length; i++) {
    //   div.innerHTML +=
    //   '<ii style=\"background":' + categories[i] +'"></li>' +(categories[i] ? categories[i] +'<br>' : '+')
    // }
  }
  //add the legend to the map   
  // legend.addTo(myMap)
    



});