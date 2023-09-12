// this creates the interactive drop down overview dashboard for each hospital in our dataset. 

function init() {
  let dropdown = d3.select("#selDataset");
  //create dropdown using hospital names
  let hospData = 'https://raw.githubusercontent.com/sydneysteele03/project-3/main/westcoast_info_df.csv';

  d3.csv(hospData).then((data) => {
    for (let i = 0; i < data.length; i++){
        dropdown.append("option").text(data[i]["Hospital Name"]).property("value", data[i]["Hospital Name"]);
    };

    let firstHospital = data[0]["Hospital Name"];
    demographicInfo(firstHospital);
    createBarChart(data);
    createPieChart(data);
  });
}

// repeat for other hospital names
function select(nextHospital) {
  demographicInfo(nextHospital);
  createBarChart(data);
  createPieChart(data);
}

//create the demographics table for each hospital on dropdown menu
function demographicInfo(hospitalName) {
  let hospData = 'https://raw.githubusercontent.com/sydneysteele03/project-3/main/westcoast_info_df.csv'
  let geoData = 'https://raw.githubusercontent.com/sydneysteele03/project-3/main/westcoast_loc_df.csv'
  d3.csv(hospData).then((data) => {
    d3.csv(geoData).then((geo) => {
      let hospResult = data.filter((hospital) => {
        return hospitalName == hospital['Hospital Name']
      })
      let geoResult = geo.filter((hospital) => {
        return hospitalName ==hospital.name
      })

      let demographics = d3.select("#response-hospInfo");
      //clear table after reselction
      demographics.html("");
      // add the hospital info
      demographics.append("h4").text(`Hospital Name: ${geoResult[0].name}`);
      demographics.append("h4").text(`City: ${geoResult[0].city}`);
      demographics.append("h4").text(`State: ${geoResult[0].state}`);
      demographics.append("h4").text(`Overall Rating Score: ${hospResult[0]["Hospital overall rating"]}`);
      demographics.append("h4").text(`Hospital Type: ${geoResult[0].type}`);
      demographics.append("h4").text(`Ownership: ${geoResult[0].owner}`);
      demographics.append("h4").text(`Number of Beds: ${geoResult[0].beds}`);
      demographics.append("h4").text(`Helipad Available?: ${geoResult[0].helipad}`);
      
    });
});
}

//create bar chart of number of hospitals for each rating 0-5. 
function createBarChart(hospitalRating) {
  let hospData = 'https://raw.githubusercontent.com/sydneysteele03/project-3/main/westcoast_info_df.csv';
  d3.csv(hospData).then((data) => {
    // set bar chart info 
    let hospResult = data.filter((hospital) => {
      return hospitalRating == hospital['Hospital overall rating']
    })
    //initialize rating tallies
    let onestar = 0;
    let twostar = 0;
    let threestar = 0;
    let fourstar = 0;
    let fivestar = 0;
    let topRated = [];
    let d = d3.select("#response");

    for (let i = 0; i< hospitalRating.length; i++) {
      //if statements to separate rating counts
      if (hospitalRating[i]["Hospital overall rating"] == "1.0") {
        onestar++;
      } else if (hospitalRating[i]["Hospital overall rating"] == "2.0") {
        twostar++;
      }else if (hospitalRating[i]["Hospital overall rating"] == "3.0") {
        threestar++;
      }else if (hospitalRating[i]["Hospital overall rating"] == "4.0") {
        fourstar++;
      }else if (hospitalRating[i]["Hospital overall rating"] == "5.0") {
        fivestar++;
        //topRated.push(hospitalRating[i]["Hospital Name"]);
        d.append("h4").text(hospitalRating[i]["Hospital Name"]);
      }
    }
    let ratings = [1.0, 2.0, 3.0, 4.0, 5.0]; 
    let stars = [onestar, twostar, threestar, fourstar, fivestar];
    let chartSpecs = [
    {
      y: stars,
      x: ratings,
      type: 'bar',
      marker: {color: ['rgb(173, 39, 9)','rgb(173, 39, 9)', "rgb(247, 194, 2)", "rgb(2, 145, 247)", "rgb(33, 176, 11)"]}
    }];
    Plotly.newPlot('bar', chartSpecs, {title: "Ratings of West Coast Hospitals", xaxis: {title: "Rating (1-5 scale)"}});
  });
 }

  // Creating pie chart of the different hospital ownership
  function createPieChart(ownership){
    let hospData = 'https://raw.githubusercontent.com/sydneysteele03/project-3/main/westcoast_info_df.csv';
    let geoData = 'https://raw.githubusercontent.com/sydneysteele03/project-3/main/westcoast_loc_df.csv'
    d3.csv(hospData).then((data) => {
    
      // set pie chart info
      let result = data.filter((hospital)=> {
        return hospital_name = hospital["Hospital Name"]
      })
      let owner = data.filter((hospital)=> {
        return hospital_owner = hospital["Hospital Ownership"]
      })
      
      let onestar = 0;
      let twostar = 0;
      let threestar = 0;
      let fourstar = 0;
      let fivestar = 0;
      let sixstar = 0;
  
      for (let i = 0; i< owner.length; i++) {
        //if statements to separate rating counts
        if (owner[i]["Hospital Ownership"] == ["Government - Hospital District or Authority"]) {
          onestar++;
        } else if (owner[i]["Hospital Ownership"] == ["Voluntary non-profit - Church"]) {
          twostar++;
        }else if (owner[i]["Hospital Ownership"] == ["Government - Hospital District or Authority"]) {
          threestar++;
        }else if (owner[i]["Hospital Ownership"] == ["Government - Local"]) {
          fourstar++;
        }else if (owner[i]["Hospital Ownership"] == ["Voluntary non-profit - Private"]) {
          fivestar++;
        }else if (owner[i]["Hospital Ownership"] == ["Voluntary non-profit - Other"]) {
          sixstar++;
      }
    }
    let ownership = ["Government - Hospital District or Authority", "Voluntary non-profit - Church", "Government - Hospital District or Authority", "Government - Local, Voluntary non-profit - Private", "Voluntary non-profit - Other"]; 
    let stars = [onestar, twostar, threestar, fourstar, fivestar, sixstar];
    console.log(ownership);
    console.log(stars);
        
      let data2 = [{
            values: stars,
            labels: ownership,
            type: 'pie',
            textposition: 'outside',
            automargin: true,
            title: 'Different Types of Hospital Ownership'
          }];
      
      var layout = [{
            height: 400,
            width: 400,
            margin: {"t": 0, "b": 0, "l": 0, "r": 0},
            showlegend: false
            }];

          Plotly.newPlot('pie', data2, layout); 
  });
 
} 

// Initialize the hospital overview table
init();
