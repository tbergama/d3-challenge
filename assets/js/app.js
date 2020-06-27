
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function(data) {

    data.forEach(function(d) {
        d.poverty = +d.poverty;
        d.smokes = +d.smokes;
    });

    // Scales
    var xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.poverty))
        .range([0, width]);

    var yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.smokes))
        .range([height, 0]);


    // Axes
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(bottomAxis);
    
    // text label for the x axis
    chartGroup.append("text")             
        .attr("transform",
            "translate(" + (width/2) + " ," + 
                            (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Poverty (%)");

    chartGroup.append("g").call(leftAxis);

    // text label for the y axis
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Smokes (%)");

    console.log(data.map(d => xScale(d.poverty)));

    // Add dots
    chartGroup.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
        .attr("cx", d => xScale(d.poverty) )
        .attr("cy", d => yScale(d.smokes) )
        .attr("r", 15)
        .attr("fill", "#69b3a2");


    chartGroup.append('g')
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
        .text(d => d.abbr)
        .attr("x", d => xScale(d.poverty))
        .attr("y", d => yScale(d.smokes) + 5)
        .attr("font-size", "12px")
        .attr("fill", "white")
        .style("text-anchor", "middle");


}).catch(function(error) {
    console.log(error);
});
  

