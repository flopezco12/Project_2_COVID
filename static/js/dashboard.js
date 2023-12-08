//VaccinationMetaData Visualization

// Get the data endpoint
// VaccinationMetaData Visualization

// Get the data endpoint
const data_url = "http://127.0.0.1:5000/get_data";

// Fetch the JSON data and console log it
function init() {
    d3.json(data_url).then(function (data) {
        
        let countries = data.VaccinationData.map(item => item[0]);
        let vaccination_rates = data.VaccinationData.map(item => item[4]);
        let seconddose = data.VaccinationData.map(item => item[5]);

        console.log(data, countries, vaccination_rates);

        // Create the dropdown menu
        const dropdownContainer = document.getElementById('dropdown-container');

        if (dropdownContainer) {
            const dropdown = document.createElement('select');
            dropdown.id = 'country-dropdown';
            dropdown.onchange = function() {
                updateChart(this.value);
                updateChart2(this.value);
            };

            // Add an option for all countries
            const allOption = document.createElement('option');
            allOption.value = 'all';
            allOption.text = 'All Countries';
            dropdown.appendChild(allOption);

            // Add options for each country
            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country;
                option.text = country;
                dropdown.appendChild(option);
            });

            // Append the dropdown to the container
            dropdownContainer.appendChild(dropdown);

            
        }

        // Create the initial vertical bar chart with all countries
        const tracebar1 = {
            x: countries,
            y: vaccination_rates,
            text: vaccination_rates,
            type: "bar",
            marker: {color:'DarkCyan'}
        };

        const layoutbar1 = {
            title: `Total population vaccinated per 100 people`,
            xaxis: { title: "Countries" , tickangle: -45},
            yaxis: { title: "Vaccination Rates" },
        };

        // Update or create the initial bar chart
        Plotly.newPlot("bar", [tracebar1], layoutbar1);

        //Create intial bubble chart with all countries 
        const tracebar2 = {
            x: countries,
            y: seconddose,
            text: seconddose,
            mode: 'markers',
            marker:{
                size: seconddose,
                color: seconddose,
                colorscale:'YlGnBu'
            }
        };

        const layoutbar2 = {
            title: `Population vaccinated with more than one dose per 100 people`,
            xaxis: { title: "Countries" , tickangle: -45},
            yaxis: { title: "Second Dose per 100" },
        };

        // Update or create the initial bar chart
        Plotly.newPlot("bubble", [tracebar2], layoutbar2);

    });
}

// Function to update the bar chart based on the selected country
function updateChart(selectedCountry) {
    d3.json(data_url).then(function (data) {
        
        let countries = data.VaccinationData.map(item => item[0]);
        let vaccination_rates = data.VaccinationData.map(item => item[4]);

        

        if (selectedCountry === 'all') {
            // Show all countries
            Plotly.update("bar", {x: [countries], y: [vaccination_rates]});
        } else {
            console.log(selectedCountry);
            // Show only the selected country
            const selectedIndex = countries.indexOf(selectedCountry);
            const traceUpdate = {
                x: [[countries[selectedIndex]]],
                y: [[vaccination_rates[selectedIndex]]],
            };
            //Plotly.update("bar", [traceUpdate]);
            console.log([countries[selectedIndex]]);
            console.log([vaccination_rates[selectedIndex]]);
            //Plotly.restyle("bar", "x", [countries[selectedIndex]]);
            //Plotly.restyle("bar", "y", [vaccination_rates[selectedIndex]]);
            console.log(selectedIndex);
            Plotly.update("bar", traceUpdate);
        }
    });
}


// Function to update the bubble chart based on the selected country
function updateChart2(selectedCountry) {
    d3.json(data_url).then(function (data) {
        
        let countries = data.VaccinationData.map(item => item[0]);
        let vaccination_rates = data.VaccinationData.map(item => item[5]);
        let seconddose = data.VaccinationData.map(item => item[5]);

        
        if (selectedCountry === 'all') {
            // Show all countries
            Plotly.update("bubble", {x: [countries], y: [seconddose]});
        } else {
            console.log(selectedCountry);
            // Show only the selected country
            const selectedIndex = countries.indexOf(selectedCountry);
            const traceUpdate2 = {
                x: [[countries[selectedIndex]]],
                y: [[seconddose[selectedIndex]]],
            };
            
            
            Plotly.update("bubble", traceUpdate2);
        }
    });
}


// Call the init function to generate the initial plot
init();


//Table using tabulator (a js library)
// Define  data

var tabledata = [
    {  PRODUCT_NAME: "AZD1222", Company_name: "AstraZeneca" },
    { PRODUCT_NAME: "Ad26.COV 2-S", Company_name: "Janssen Pharmaceuticals" },
    { PRODUCT_NAME: "BBIBP-CorV", Company_name: "Beijing Bio-Institute Biological Products (CNBG)" },
    {  PRODUCT_NAME: "CIGB-66", Company_name: "Center for Genetic Engineering and Biotechnology" },
    {  PRODUCT_NAME: "Comirnaty", Company_name: "Pfizer BioNTech" },
    {  PRODUCT_NAME: "Convidecia", Company_name: "CanSino Biologicals" },
    {  PRODUCT_NAME: "Corbevax", Company_name: "Biological E" },
    {  PRODUCT_NAME: "Coronavac", Company_name: "Sinovac" },
    {  PRODUCT_NAME: "Covaxin", Company_name: "Bharat Biotech" },
    {  PRODUCT_NAME: "Covi-Vac", Company_name: "Chumakov" },
    {PRODUCT_NAME: "Covidful", Company_name: "Insitute of Medical Biology" },
    {  PRODUCT_NAME: "Covishield", Company_name: "Serum Institute of India" },
    {  PRODUCT_NAME: "EpiVacCorona", Company_name: "State Research Center of Virology & Biotechnology" },
    {  PRODUCT_NAME: "Gam-Covid-Vac", Company_name: "Gamaleya Research Institute" },
    {PRODUCT_NAME: "Inactivated SARS-CoV-2 vaccine", Company_name: "Wuhan Institute of Biological Products (CNBG)" },
    {  PRODUCT_NAME: "LV-SMENP-DC", Company_name: "Shenzhen GenoImmune Medical Institute" },
    { PRODUCT_NAME: "NUVAXOVID", Company_name: "Novavax" },
    {  PRODUCT_NAME: "QazVac", Company_name: "Research Institute for Biological Safety Problems" },
    { PRODUCT_NAME: "Soberana Plus", Company_name: "Instituto Finlay de Vacunas" },
    {  PRODUCT_NAME: "Soberana-02", Company_name: "Instituto Finlay de Vacunas" },
    {  PRODUCT_NAME: "Spikevax", Company_name: "Moderna" },
    { PRODUCT_NAME: "Sputnik-Light", Company_name: "Gamaleya Research Institute" },
    { PRODUCT_NAME: "VLA2001", Company_name: "Valneva" },
    {  PRODUCT_NAME: "Vaxzevria", Company_name: "AstraZeneca" },
    {  PRODUCT_NAME: "Zifivax", Company_name: "Anhui Zhifei Longcom Biopharmaceutical" },
    { PRODUCT_NAME: "ZyCov-D", Company_name: "Zydus Cadila" },
    {  PRODUCT_NAME: "mRNA-1273", Company_name: "Moderna" },
];





// function heatproto(data) {
//     var svg = d3.selectAll('#node').attr('width', document.getElementById('nodeDiv').offsetWidth);
//     // Using this selection to update the SVG every time the function is called
//     svg.selectAll("*").remove();
//     removeElementsByClass('d3-tip n');
//     var format = d3.format(",");
//     var tip = d3.tip()
//         .attr('class', 'd3-tip')
//         .offset([-10, 0])
//         .html(function (d) {
//             return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Confirmed: </strong><span class='details'>" + format(d.confirmed) + "<br></span>" +
//                 "<strong>Recovered: </strong><span class='details'>" + format(d.recovered) + "<br></span>" + "<strong>Deaths: </strong><span class='details'>" + format(d.deaths) + "<br></span>" +
//                 "<strong>Active: </strong><span class='details'>" + format(d.confirmed - d.recovered - d.deaths) + "<br></span>";
//         });

//     svg.call(tip);

//     // Fetch data only once
//     d3.json(data_url).then(function (data) {
//         var margin = { top: 0, right: 0, bottom: 0, left: 10 },
//             width = document.getElementById('nodeDiv').offsetWidth - margin.left - margin.right,
//             height = document.getElementById('nodeDiv').offsetHeight - margin.top - margin.bottom;

//         var color = d3.scaleThreshold()
//             .domain([10000, 100000, 500000, 1000000, 5000000, 10000000, 50000000, 100000000, 500000000, 1500000000])
//             .range(["rgb(173,216,255)", "rgb(0,255,255)", "rgb(50,205,205)", "rgb(255,255.0)", "rgb(255,0,0)"]);

//         var path = d3.geoPath();

//         var zoom = d3.zoom()
//             .scaleExtent([1, 30])
//             .on("zoom", zoomed);

//         var g = svg.append('g')
//             .attr('class', 'map')
//             .attr('transform', 'translate(50,50)');

//         var projection = d3.geoMercator()
//             .scale(0.03939 * width + 0.104166 * height + 20)
//             .translate([width / 2.3, height / 1.85]);

//         path = d3.geoPath().projection(projection);

//         g.call(zoom);

//         d3.queue()
//             .defer(d3.json, data_url)
//             .await(ready);

//         function ready(error, worldData, population) {
//             var topology = topojson.topology(worldData.features);
//             topology = topojson.presimplify(topology);
//             var final_data_simplified = [];
//             for (i = 0; i < worldData.features.length; i++) {
//                 final_data_simplified.push(topojson.feature(topology, topology.objects[i]));
//             }

//             var populationById = {};
//             population.forEach(function (d) {
//                 populationById[d.id] = +d.confirmed;
//                 populationById[d.id + 1] = +d.recovered;
//                 populationById[d.id + 2] = +d.deaths;
//             });

//             final_data_simplified.forEach(function (d) {
//                 d.confirmed = populationById[d.id];
//                 d.recovered = populationById[d.id + 1];
//                 d.deaths = populationById[d.id + 2];
//             });

//             g.append("g")
//                 .attr("class", "countries")
//                 .selectAll("path")
//                 .data(final_data_simplified)
//                 .enter().append("path")
//                 .attr("d", path)
//                 .style("fill", function (d) { return color(populationById[d.id] * 100); })
//                 .style('stroke', 'white')
//                 .style('stroke-width', 0.5)
//                 .style("opacity", 1)
//                 // tooltips
//                 .style("stroke", "white")
//                 .style('stroke-width', 0.3)
//                 .on('mouseover', function (d) {
//                     tip.show(d);
//                     d3.select(this)
//                         .style("opacity", 0.4)
//                         .style("stroke", "white")
//                         .style("stroke-width", 3);
//                     d3.select(this).style('cursor', 'pointer');
//                 })
//                 .on('click', function (d) {
//                     tip.show(d);
//                     d3.select(this)
//                         .style("opacity", 0.4)
//                         .style("stroke", "white")
//                         .style("stroke-width", 3)
//                         .transition()
//                         .duration(200)
//                         .style('opacity', 0.8);
//                     countrySpecificHist(d.properties.name);
//                     lineGraph(d.properties.name);
//                     latestCases(d.properties.name);
//                     worldRace(d.properties.name);
//                     worldPercent(d.properties.name);
//                     document.getElementById('resetButton').style.visibility = 'visible';
//                 })
//                 .on('mouseout', function (d) {
//                     tip.hide(d);
//                     d3.select(this)
//                         .style("opacity", 1)
//                         .style("stroke", "white")
//                         .style("stroke-width", 0.3);
//                 });

//             g.append("path")
//                 .datum(topojson.mesh(final_data_simplified, function (a, b) { return a.id !== b.id; }))
//                 .attr("class", "names")
//                 .attr("d", path);
//         }
//     });
// }


