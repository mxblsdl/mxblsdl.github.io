// Functions to support the new and improved C-BREC modeling tool powered by leaflet

// Functions to call the python script and create the chart js charts

// Function to display coordinates which are stored as an array
//************* This will be augmented to include the XML request ******************//
function displayCoords(){
	if (coords.length === 0){
	M.toast({html: 'Please Select Area With the Drawing Tools', classes: 'rounded blue'});
	}
	else{
	   // Show loading image 
	document.getElementById("loading-image").style.display = "block";
	var coordsDisplay = [];
	for ( i = 0; i < coords[0].length; i++) {
	coordsDisplay.push([coords[0][i].lat, coords[0][i].lng]);	
	}
	document.getElementById("coordinates").innerHTML = coordsDisplay;
// 	grab other variables concerning harvest operations
    var treat = document.getElementById("treatment").value;
    var per = document.getElementById("percent").value;
    if (treat !== "RM100"){
        treat = treat + per;
    }
    var har = document.getElementById("harvest-type").value;
    var style = document.getElementById("harvest-style").value;
        // This is a temp string just to show the variables that are being grabbed
        // These will go to the XML request eventually
    document.getElementById("harvestString").innerHTML = "treat="+treat+"?har="+har+"?style="+style;

    // define the url that the server sits on
    // Trying on reclaim server
    //  Reclaim, runs into issue. Doesn't seem to be running python and processes as text file
    // URL="http://python.max-gis.com/scripts/CBREC_backend.py?TreatmentFlag="+treat+"&Lat1="+coords[0][0].lat+"&Lon1="+coords[0][0].lng+"&Lat2="+coords[0][3].lat+"&Lon2="+coords[0][3].lng;
    // URL="http://cbi.max-gis.com/c_brec/py/CBREC_backend.py?TreatmentFlag="+treat+"&Lat1="+coords[0][0].lat+"&Lon1="+coords[0][0].lng+"&Lat2="+coords[0][3].lat+"&Lon2="+coords[0][3].lng;
    //  Jim server
	URL="http://137.150.144.29/Projects/CBI/PythonScripts/raster_processing.py?TreatmentFlag="+treat+"&Lat1="+coords[0][0].lat+"&Lon1="+coords[0][0].lng+"&Lat2="+coords[0][2].lat+"&Lon2="+coords[0][2].lng;
	 SetURL(URL); //Call the setURL function which actually calls the request
	
	// create some example data to show off the charts
	var Buckets = [];
	function randomArray(min, max, len) {
		arr = [];
	for (var i = 0 ; i < len; i++) {
		v = Math.floor(Math.random() * (max - min)) + min;
			arr.push(v);
		}
			Buckets.push(arr);
	};

	randomArray(10,100,100)//CO2
	randomArray(1,20,100)//Others
	
	data = Math.random();
	PieData = [1-data, data];

	DisplayLine(Buckets);
	DisplayPieChart(PieData);
	}
};
	
function SetURL(URL){
	this.URL=URL;
	var TheRequest=new XMLHttpRequest(); // wait staff at the resturant
	TheRequest.open("GET",URL,true); // the URL is what we ordered 
	TheRequest.TheURL=URL;
	TheRequest.TheDataset=this;

	TheRequest.onreadystatechange=function() 
	{
		if (this.readyState == 4)  // done
		{
			if (this.status == 200) // OK
			{
				var TheText=TheRequest.responseText;
				// // clip the data if ClipBoundary is set
				var TheJSON=JSON.parse(TheText);
// 		************	Insert Chart.js here  ***********************//
//   Remove loading image
	    document.getElementById("loading-image").style.display = "none";
Buckets = TheJSON[0];
PieData = [TheJSON[1],1-TheJSON[1]];

DisplayPieChart(PieData);
DisplayLine(Buckets);

				}
			else alert("HTTP error "+this.status+" "+this.statusText+" ("+this.TheURL+")");
		}
	};
	TheRequest.send();

	// trigger the tables for now
	// This will be changed to accept calculated values from the python script
	greenhouseGasesTable('box');
	criteriaPollutants('box2');
	climateMetrics('box3');
}

// ************************* Chart JS ****************************//
// Function to create a sequence of 1-100
function range(start, end) {
    var ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
}
// Sum function for if/then test
 function getSum(total, num) {
    return total + num;
}

function DisplayPieChart(PieData){
	var PieChart = null;
    var PieChartData={
        type:'pie',
        data:{
            labels:["Forested Area", "Non-Forested Area"],
            datasets:[{
                labels:["Forested Area", "Non-Forested Area"],
                data:PieData,
                backgroundColor:['rgba(99,221,103,.7)','rgba(227,230,80,.7)'],
                hoverBackgroundColor:['rgba(99,221,103,.9)','rgba(277,230,80,.9)'],
            }]
        },
        options:{
            title:{
                display:true,
                text:'Amount of forested area in selected region'
            },
            tooltips: {
                callbacks: {
                label: function(tooltipItem, data) {
        	    var dataset = data.datasets[tooltipItem.datasetIndex];
                var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                return previousValue + currentValue;
          });
                var currentValue = dataset.data[tooltipItem.index];
                var precentage = (((currentValue/total) * 100)+0.5).toFixed(2);         
                return precentage + "%";
        }
      },
		    backgroundColor: '#888888',
		  //  label:{[PieData[0].toFixed(2), PieData[1].toFixed(2)]}
        },
            legend:{
                position:'bottom'
        }
    }
    };
    Chart.defaults.global.legend.display = true;
	ThePieChart=document.getElementById("PieChart");
	TheContext=ThePieChart.getContext("2d");
	if (PieChart != null){PieChart.destroy();}
	PieChart = new Chart(TheContext,PieChartData);
}

// Need to define for line chart return from server request
function DisplayLine(Buckets){
var	LineChart = null
var years = range(2020,2120);    
var Color="rgba(66, 134, 244,.8)";
	var LineChartData={
		type: 'line',
		data: {
			labels : years,
			datasets : [{
			    label:'CO2',
				data : Buckets[0],
				backgroundColor: "rgba(181,181,181, 0.5)",
				borderColor: "rgba(181,181,181,1)",
			    pointBackgroundColor: "rgba(127,201,127,1)",
			    pointBorderColor: "#B5B5B5",
			    pointHoverBackgroundColor: "rgba(127,201,127,0.8)",
			    pointHoverBorderColor: "rgba(127,201,127,1)",
            },{
	            label: "Other Criteria Pollutants",
	            data: Buckets[1],
	            backgroundColor: "rgba(255, 165, 163, 0.5)",
				borderColor: "rgba(255, 165, 163,1)",
			    pointBackgroundColor: "rgba(115,201,115,1)",
			    pointBorderColor: "#B5B5B5",
			    pointHoverBackgroundColor: "rgba(115,201,115,0.8)",
			    pointHoverBorderColor: "rgba(115,201,115,1)",
                }],
		},
		options:{
		    title:{
		        display:true,
		        text:'Climate Forcing'
		    },
		    tooltips: {
		    backgroundColor: '#888888',
            callbacks: {
                label: function(tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].label || '';
                    if (label) {
                        label += ': ';
                    }
                    label += (parseFloat(tooltipItem.yLabel).toFixed(2)) ;
                    return label;
                },
                afterLabel: function(tooltipItem, data) {
               var someValue2 = 'GWP';
               return someValue2;
            }
            }
        },
		    legend:{
		        position:'bottom'
		    },
			scales:{
				xAxes:[{
					scaleLabel:{
						display:true,
						labelString:'Years from Residue Generation'
					},
					ticks:{
						beginAtZero:true,
						autoSkip:true,
						maxTicksLimit:11
					}
				}],
				yAxes:[{
					scaleLabel:{
						display:true,
						labelString:'Climate Forcing Metric'
					},
				ticks:{
					beginAtZero:true,
					 userCallback: function(value, index, values) {
					    value = Math.round(value);// This fixes the issue with lots of decimal places on really small values.
						value = value.toString();
						value = value.split(/(?=(?:...)*$)/);
						value = value.join(',');
						return value;
					 }}}]}}};
// 	Chart.options.scales.xAxes[0].ticks.minor.fontSize = 20;
//     Chart.options.scales.yAxes[0].ticks.minor.fontSize = 20;
    
	Chart.defaults.global.defaultFontSize = 14;	
	Chart.defaults.global.legend.display = true;
	TheChartCanvas = document.getElementById("LineChart");
	TheContext = TheChartCanvas.getContext("2d");
	if (LineChart != null){LineChart.destroy()}
	LineChart = new Chart(TheContext,LineChartData);
	
// 	Changing what is being displayed
	 document.getElementById("loading-image").style.opacity="0";
	 document.getElementById("outCharts").style.display="block";
}

        /****************** END *************/ 


        /********** Other Functions ********/ 
// From the JSON the var name is names
var Data = JSON.parse(names);
//  Need to be replaced with the actual facilities
function populateBio(){
	var select = document.getElementById("biomass-plant"); 
	var options = []; 
//  The variable here is called 'Data', not the best name...
for (var i = 0; i < Data.length; i++) {
	options.push(Data[i].Name);
}
	for(var i = 0; i < options.length; i++) {
	    var opt = options[i];
	    var el = document.createElement("option");
	    el.text = opt;
	    el.value = opt;
	    select.add(el);
	}
}
function populateMill(){
	var select = document.getElementById("mill"); 
//  The variable here is called 'Data', not the best name...
	var options = []; 
for (var i = 0; i < Data.length; i++) {
	options.push(Data[i].Name);
}
	for(var i = 0; i < options.length; i++) {
	    var opt = options[i];
	    var el = document.createElement("option");
	    el.text = opt;
	    el.value = opt;
	    select.add(el);
	}
}

	
// ************ Dynamic tables ************************/
// Each table function calls the create table function with given information
// These will need to be changed to accept values from the server once raster stats are calculated. 
function greenhouseGasesTable(id){
	var project = [1,2,3,4]; // Variables that will be outputs from the model
	var reference = [5,6,7,8];
	var net  = []; // calculated as the difference between project and reference below

	for (var i = 0; i < project.length; i++) {
		net.push(project[i]- reference[i])
	}
	// Add Names to the table rows
	project.unshift("Project");
	reference.unshift("Reference");
	net.unshift("Net");
	// Put everything for the table into one object
	var rows = [{
	    title: "Greenhouse Gases (metric T/BDT)",
	    gases: ["","CO<sub>2</sub>","CH<sub>4</sub>","N<sub>2</sub>O", "SLCPs"],
	    project: project, 
	    reference: reference,
	    net: net
	}];
	 tableBody(rows, project, reference, net, id);
}
function criteriaPollutants(id){
	var project = [3, 4, 1, 7, 5, 6];
	var reference = [0, 3, 65, 3, 43, 45];
	var net = [];
	for (var i = 0; i < project.length; i++) {
		net.push(project[i]- reference[i])
	}
	// Add Names to the table rows
	project.unshift("Project");
	reference.unshift("Reference");
	net.unshift("Net");
	// Put everything for the table into one object
	var rows = [{
	    title: "Criteria Pollutants (kg/BDT)",
	    gases:["", "PM2.5", "PM10", "O<sub>3</sub>", "CO", "NO<sub>x</sub>", "SO<sub>x</sub>"],
	    project: project, 
	    reference: reference,
	    net: net
	}];
	tableBody(rows, project, reference, net, id);
}
function climateMetrics(id){
	var project = [76, 45, 23, 45];
	var reference = [23, 34, 45, 56];
	var net = [];
	for (var i = 0; i < project.length; i++) {
		net.push(project[i]- reference[i])
	}
	// Add Names to the table rows
	project.unshift("Project");
	reference.unshift("Reference");
	net.unshift("Net");
	// Put everything for the table into one object
	var rows = [{
	    title: "Climate Metrics (units as specified)",
	    gases:["", "T CO<sub>2</sub>e", "AGWP (Wm<sup>-2</sup> yr", "iAGTP (K yr)", "iGTP CO<sub>2</sub>e (MT)", "NO<sub>x</sub>", "SO<sub>x</sub>"],
	    project: project, 
	    reference: reference,
	    net: net
	}];
	tableBody(rows, project, reference, net, id);
}
// Function that creates table, can be reused as long as number of rows remains the same. Columns can differ.
function tableBody(rows, project, reference, net, id){
	// Creates the table. Iterate through each row
	    var html = "<table class='output'>";
	    html += "<tr><th colspan ="+rows[0].gases.length+">"+rows[0].title+"</th></tr>"; //
 		
 		html+="<tr>";//put the tr on the outside of the loop
	    for (var i = 0; i < project.length; i++) {
	        html+="<td>"+rows[0].gases[i]+"</td>";
	    }
	    html+="<tr>";//put the tr on the outside of the loop
	    for (var i = 0; i < project.length; i++) {
	        html+="<td>"+rows[0].project[i]+"</td>";
	    }
	    html+="</tr>";
	    for (var i = 0; i < project.length; i++) {
	        html+="<td>"+rows[0].reference[i]+"</td>";
	    }
	    html+="</tr>";
	    for (var i = 0; i < project.length; i++) {
	        html+="<td><strong>"+rows[0].net[i]+"</strong></td>";
	    }
	    html+="</table>";
	    document.getElementById(id).innerHTML = html;
}

