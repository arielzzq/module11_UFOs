// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = {};

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    let changedelement = d3.select(this);
    // 4b. Save the value that was changed as a variable.
    let elementvalue = d3.select(this).property("value");
    console.log(elementvalue);
    // 4c. Save the id of the filter that was changed as a variable.
    let filterid = d3.select(this).attr("id");
    console.log(filterid);

    // 5. If a filter value was entered then add that filterId and value
    if(elementvalue){
        filters[filterid] = elementvalue;
    }
    // to the filters list. Otherwise, clear that filter from the filters object.
    else{
        delete filters[filterid];
    }
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }
  
  // 7. Use this function to filter the table when data is entered.
function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    let filteredData = tableData;
    console.log(filteredData);
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    for (var filterid in filters){
        if (filterid === "state"){
            filteredData = filteredData.filter(row => row.state === filters[filterid]);
        }
        if (filterid === "city"){
            filteredData = filteredData.filter(row => row.city === filters[filterid]);
        }
        if (filterid === "country"){
            filteredData = filteredData.filter(row => row.country === filters[filterid]);
        }
        if (filterid === "shape"){
            filteredData = filteredData.filter(row => row.shape === filters[filterid]);
        }
        if (filterid === "datetime"){
            filteredData = filteredData.filter(row => row.datetime === filters[filterid]);
        }
    }
    
  
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);
  }
  
  // 2. Attach an event to listen for changes to each filter
  d3.selectAll("input").on("change", updateFilters);
  
  // Build the table when the page loads
  buildTable(tableData);
