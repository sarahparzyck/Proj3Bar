// Submit Button handler
function handleSubmit() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
  
    // Select the input value from the form
    var artist = d3.select("#stockInput").node().value;
    console.log(artist);
  
    // clear the input value
    d3.select("#stockInput").node().value = "";
  
    // Build the plot with the new stock
    buildBarChart(artist);
  };

// SARAH Create a function to populate the bar charts with corresponding values for the selected artist
async function buildBarChart(artist) {
    
    // SARAH Define the varibles and constant for artist that will result in the url that will be queried to update the bar chart
    var url = 'https://billboard-top-100.herokuapp.com/api/v1.0/hot100/'+artist;
    console.log(url);

    var data = await d3.json(url);
    console.log(data);
    
      // Grab values from the response json object to build the plots

      //COUNTS (many attempts)
//      var counts = Object.values(data)[1]
//      data.map(x => x[counts]);

//       for (i = 0; i < data.length; i++){
//         Object.values(data[i]).forEach(counts => counts.shift());
//         console.log(counts)    
//     }

//      var counts = Object.values(data[1]).forEach(value => console.log(value))
//    const values = Object.values(data);

//    Object.entries(data).forEach(([value]) => {
//        console.log(value);
//     });

    var counts = []

    Object.values(data).forEach(function(key){console.log(key,data[key])

    counts.push(data[key])
    console.log(counts)
    });

      //YEARS (incorrect)
     var years = Object.values(data)[2]
     data.map(x => x[years]);
      //console.log(years);


    var myChart = //new Chart(ctx, 
        {
      type: 'bar',
      responsive: true,
      legend: {
        display: false
      },
      data: {
        labels: years,
        datasets: [{
          label: "Years",
          fill: true,
          //backgroundColor: gradientStroke,
          //hoverBackgroundColor: gradientStroke,
          borderColor: '#1f8ef1',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: counts,
        }]
      },
      //options: gradientBarChartConfiguration
    };
//)
    var config ={responsive:true}

    // Render the plot to the div tag with id "CountryChart" instead of Plot
    Plotly.plot('plot', myChart, config)
//)}
  };


// Add event listener for submit button
d3.select("#submit").on("click", handleSubmit);