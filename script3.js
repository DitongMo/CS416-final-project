// set the dimensions and margins of the graph
// var margin = {top: 30, right: 30, bottom: 70, left: 60},
//     width = 460 - margin.left - margin.right,
//     height = 400 - margin.top - margin.bottom;

var svg = d3.select("#chart3")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", "0 0 800 400")
    .append("g")
    .attr("transform", "translate(50, 50)");

// Load the data from CSV file
d3.csv("cases_by_age_group_v2.csv").then(function(data) {
    Convert percentage values to numbers
    data.forEach(function(d) {
      d.percent_of_cases = +d.percent_of_cases;
    });

  //    // Sort data
  // data.sort(function(b, a) {
  //   return a.percent_of_cases - b.percent_of_cases;
  // });
  
// X axis
var x = d3.scaleBand()
.range([ 0, width ])
.domain(data.map(function(d) { return d.age_group; }))
.padding(0.2);
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x))
.selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
.domain([0, 22])
.range([ height, 0]);
svg.append("g")
.call(d3.axisLeft(y));

// Bars
svg.selectAll("bar")
.data(data)
.enter()
.append("rect")
  .attr("x", function(d) { return x(d.age_group); })
  .attr("y", function(d) { return y(d.percent_of_cases); })
  .attr("width", x.bandwidth())
  .attr("height", function(d) { return height - y(d.percent_of_cases); })
  .attr("fill", "#69b3a2")
  });

// // Add x-axis label
// svg.append("text")
//   .attr("x", width / 2)
//   .attr("y", height + margin.bottom)
//   .attr("text-anchor", "middle")
//   .text("Age Group");

// // Add y-axis label
// svg.append("text")
//   .attr("transform", "rotate(-90)")
//   .attr("x", -height / 2)
//   .attr("y", -margin.left)
//   .attr("text-anchor", "middle")
//   .text("Percentage of Cases");

// Add chart title
svg.append('text')
  .attr('x', width / 2)
  .attr('y', -margin.top / 2)
  .attr('text-anchor', 'middle')
  .text('Age Group: Percent of Cases in US');
