// from data.js
var tableData = data;

// Level 1 & 2 ( Bonus): Automatic Table and Date Search , Level 2: Multiple Search Categories for state and country (Optional)


//create a function to (enter -> update -> exit) to populate the html table data
function update(data) {

  var selection = d3.select("tbody")
					.selectAll("tr")
					.data(data)

  selection.enter()
        .append("tr")
        //.classed("temps", true)
        .merge(selection)
		  .html(function(d) {
			return `<td>${d.datetime}</td><td>${d.city}</td><td>${d.state}<td>${d.country}</td><td>${d.shape}</td><td>${d.durationMinutes}</td><td>${d.comments}</td>`;
		  });

  selection.exit().remove();
}

//Display all data in the html page when loaded
update(tableData);

// Declare variables
var button = d3.select("#filter-btn");
var tbody = d3.select("tbody");

//Function when the button is clicked
button.on("click", function() {

// Select the input element and get the raw HTML node
var datetime = d3.select("#datetime");
var city = d3.select("#city");
var state = d3.select("#state");
var country = d3.select("#country");

// Get the value property of the input element
var dateinputValue = datetime.property("value");
//var cityinputValue = city.property("value");
var stateinputValue = state.property("value");
var countryinputValue = country.property("value");


// filter the date as required to display the filtered data
var filteredData = tableData.filter(tdata => tdata.datetime === dateinputValue && tdata.state === stateinputValue && tdata.country === countryinputValue );
var filterdate=tableData.filter(tdata => tdata.datetime === dateinputValue);
//var filtercity=tableData.filter(tdata => tdata.city === cityinputValue);
var filterstate=tableData.filter(tdata => tdata.state === stateinputValue );
var filtercountry=tableData.filter(tdata => tdata.country === countryinputValue );
  
  //var filteredcity = tableData.filter(tdata => tdata.city === cityinputValue);
console.log(filteredData);
if (filteredData.length !== 0)
  {  
	console.log(filteredData.length);
	update(filteredData);
  }


 /* else if (filteredData.length === 0 && (( filterdate.length !== 0) || (filterstate.length !== 0) || (filtercountry.length !== 0))){
		  update(filterdate) || update(filterstate) || update(filtercountry) ;
		  console.log("in");
  } */
else if (filteredData.length === 0){
	//console.log(filteredData.length)
	if ( filterdate.length !== 0) {
	  update(filterdate);
	  console.log("filterdate");
	  console.log(filterdate);
	}
	/* else if (filtercity.length !== 0) {
	  update(filtercity)  ;
	  console.log("filtercity");
	  console.log(filtercity);
	} */
	else if (filterstate.length !== 0) {
	  update(filterstate)  ;
	  console.log("filterstate");
	  console.log(filterstate);
	}
	else {
		update(filtercountry) ;
		console.log("filtercountry");
	  console.log(filtercountry);
	}
	  
} 
else {
//tbody.append("tr").append("td").text("No results found!"); 
d3.select("tbody")
.select("tr")
.data(filteredData)
.enter()
.append("tr")
.text("No results found!");
}
  
});