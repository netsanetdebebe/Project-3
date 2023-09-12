// functions to read in csv data and create visual html plots 
let geoData = 'https://raw.githubusercontent.com/sydneysteele03/project-3/main/westcoast_loc_df.csv'
let hospData = 'https://raw.githubusercontent.com/sydneysteele03/project-3/main/westcoast_info_df.csv'
function createMap(locations){
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
   });
  let myMap = L.map("map", {
     center: [36.778259, -119.417931],
     zoom: 5,
     layers: [street, locations]
  });
  let baseMaps = {
     "street Map": street
   };
  let overlayMaps = {
     Locations: locations
   };
   L.control.layers(baseMaps, overlayMaps, {
     collapsed: false
    }).addTo(myMap);
};
function createMarker(locationInfo, hospitalInfo){
  let locationMarkers = []
  for (let i = 0; i < locationInfo.length; i++) {
    let location = locationInfo[i]
    let selectedHospital = hospitalInfo.filter((hospital) => {

      return location.name == hospital["Hospital Name"]
    })
    
    let locationMarker = L.marker([location.latitude, location.longitude])
      .bindPopup(`<h4>Name:</h4> <h5>${location.name}</h5> <h4>Address:</h4> <h5>${location.address}</h5> 
      <h4>Rating:</h4> <h5>${selectedHospital[0]["Hospital overall rating"]}</h5>`)
    
    locationMarkers.push(locationMarker)
  }
  createMap(L.layerGroup(locationMarkers))
};

d3.csv(geoData).then(locationInfo => {
  d3.csv(hospData).then(hospitalInfo =>{
    // console.log(locationInfo)
    // console.log(hospitalInfo)
    createMarker(locationInfo, hospitalInfo)
  })
})