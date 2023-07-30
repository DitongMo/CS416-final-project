// Set up the dimensions and margins for the map
        const width = 800;
        const height = 600;

        // Create an SVG element to contain the map
        const svg = d3.select("#map")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // Load the GeoJSON data for US states
        d3.json("us-states.json").then(function (geojson) {
            // Load the state data (replace with your data loading method)
            d3.csv("stateData.csv").then(function (data) {
                // Process the state data and join it with the GeoJSON data
                const dataMap = d3.map(data, function (d) {
                    return d.state;
                });

                geojson.features.forEach(function (d) {
                    const stateName = d.properties.name;
                    const stateValue = dataMap.get(stateName);
                    d.properties.value = stateValue ? +stateValue.value : 0;
                });

                // Define a color scale based on the data values
                const colorScale = d3.scaleSequential(d3.interpolateBlues)
                    .domain([0, d3.max(data, function (d) {
                        return +d.value;
                    })]);

                // Create the map using D3's geoPath
                const projection = d3.geoAlbersUsa().fitSize([width, height], geojson);
                const path = d3.geoPath().projection(projection);

                svg.selectAll("path")
                    .data(geojson.features)
                    .enter().append("path")
                    .attr("d", path)
                    .style("fill", function (d) {
                        return colorScale(d.properties.value);
                    });

                // Add a legend (optional)
                const legend = svg.append("g")
                    .attr("class", "legend")
                    .attr("transform", "translate(20, 20)");

                const legendScale = d3.scaleLinear()
                    .domain([0, d3.max(data, function (d) {
                        return +d.value;
                    })])
                    .range([0, 100]);

                const legendAxis = d3.axisRight(legendScale);

                legend.append("g")
                    .attr("transform", "translate(60, 0)")
                    .call(legendAxis);

                legend.append("text")
                    .attr("x", 10)
                    .attr("y", 10)
                    .attr("dy", "0.35em")
                    .text("Legend Title");
            });
        });
