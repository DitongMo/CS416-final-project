// Use D3.js to load the CSV data and create the bar chart
d3.csv('cases_by_age_group.csv').then(data => {
  // Data preprocessing
  data.forEach(d => {
    d.percent_of_cases = +d.Percent_of_cases;
    d.percent_of_us_population = +d.percent_of_us_population;
  });

  // Define the dimensions of the chart
  const margin = { top: 20, right: 20, bottom: 60, left: 60 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // Create the SVG element
  const svg = d3.select('.chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // Define the x and y scales
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.age_group))
    .range([0, width])
    .padding(0.1);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => Math.max(d.percent_of_cases, d.percent_of_us_population))])
    .range([height, 0]);

  // Create the bars for "Percent of Cases"
  svg.selectAll('.bar-cases')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => xScale(d.age_group)
    .attr('y', d => yScale(d.percent_of_cases))
    .attr('width', xScale.bandwidth() / 2)
    .attr('height', d => height - yScale(d.percent_of_us_population));

  // Create the bars for "Percent of US Population"
  svg.selectAll('.bar-population')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar us-population')
    .attr('x', d => xScale(d.age_group) + xScale.bandwidth() / 2)
    .attr('y', d => yScale(d.percent_of_us_population))
    .attr('width', xScale.bandwidth() / 2)
    .attr('height', d => height - yScale(d.percent_of_us_population));

  // Add x-axis
  svg.append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale))
    .selectAll('text')
    .attr('transform', 'rotate(-45)')
    .style('text-anchor', 'end');

  // Add y-axis
  svg.append('g')
    .attr('class', 'axis y-axis')
    .call(d3.axisLeft(yScale));

  // Add chart title
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', -margin.top / 2)
    .attr('text-anchor', 'middle')
    .text('Age Group: Percent of Cases and Percent of US Population');
});
