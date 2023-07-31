// Load the data from CSV file
d3.csv("hospital.csv").then(function(data) {
  // Convert date strings to Date objects
  data.forEach(function(d) {
    d.Date = new Date(d.Date);
    d.Hospital = +d.Hospital;
  });

  // Set up SVG container
  var svg = d3.select("#chart1")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", "0 0 800 400")
    .append("g")
    .attr("transform", "translate(50, 50)");

  // Set up scales and axes
  var xScale = d3.scaleTime()
    .domain(d3.extent(data, function(d) { return d.Date; }))
    .range([0, 700]);

  var yScale = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d.Hospital; })])
    .range([300, 0]);

  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);

  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0, 300)")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y-axis")
    .call(yAxis);

  // Create a line generator
  var line = d3.line()
    .x(function(d) { return xScale(d.Date); })
    .y(function(d) { return yScale(d.Hospital); });

  // Draw the line chart
  svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);
});
