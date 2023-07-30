
        // Set up the dimensions and margins for the chart
        const width = 800;
        const height = 400;
        const margin = { top: 20, right: 20, bottom: 30, left: 50 };

        // Parse the date format for the "date" column
        const parseDate = d3.timeParse("%Y-%m-%d");

        // Create an SVG element to contain the chart
        const svg = d3.select("#chart")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // Load the data
        d3.csv("data/US_vaccine_cummulative_trend.csv").then(function (data) {
            // Convert data to appropriate types
            data.forEach(function (d) {
                d.Date = parseDate(d.Date);
                d.Administered_Dose1_Pop_Pct = +d.Administered_Dose1_Pop_Pct;
            });

            // Create scales for x and y axes
            const xScale = d3.scaleTime()
                .domain(d3.extent(data, function (d) { return d.Date; }))
                .range([margin.left, width - margin.right]);

            const yScale = d3.scaleLinear()
                .domain([0, d3.max(data, function (d) { return d.Administered_Dose1_Pop_Pct; })])
                .range([height - margin.bottom, margin.top]);

            // Create line generator function
            const line = d3.line()
                .x(function (d) { return xScale(d.Date); })
                .y(function (d) { return yScale(d.Administered_Dose1_Pop_Pct); });

            // Draw the line chart
            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 2)
                .attr("d", line);

            // Add x and y axes
            svg.append("g")
                .attr("transform", `translate(0, ${height - margin.bottom})`)
                .call(d3.axisBottom(xScale));

            svg.append("g")
                .attr("transform", `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(yScale));

            // Add chart title and axis labels
            svg.append("text")
                .attr("x", width / 2)
                .attr("y", margin.top)
                .attr("text-anchor", "middle")
                .text("COVID Vaccine Trend in the US");

            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("x", -(height / 2))
                .attr("y", margin.left / 2)
                .attr("text-anchor", "middle")
                .text("Number of Vaccinations");

        });
