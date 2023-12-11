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
        
        const cumulativecases = data.DailyCasesDeath.map(item => item[3]);

        console.log(data, countries, vaccination_rates);

        // Create the dropdown menu
        const dropdownContainer = document.getElementById('dropdown-container');

        if (dropdownContainer) {
            const dropdown = document.createElement('select');
            dropdown.id = 'country-dropdown';
            dropdown.onchange = function() {
                updateChart(this.value);
                updateChart2(this.value);
                updateChart3(this.value);
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

        // Update or create the initial bubbble chart
        Plotly.newPlot("bubble", [tracebar2], layoutbar2);

        //Create intial cases bar chart with all countries 
        const tracebar3 = {
            x: countries,
            y: cumulativecases,
            text: cumulativecases,
            type: "bar",
            marker: {color:'DarkCyan'}
        };

        const layoutbar3 = {
            title: `Cumulative COVID-19 cases`,
            xaxis: { title: "Days" , tickangle: -45},
            yaxis: { title: "Cumulative Cases" },
        };

        // Update or create the initial line chart
        Plotly.newPlot("bar2", [tracebar3], layoutbar3);


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

// Function to update the bar2 chart based on the selected country
function updateChart3(selectedCountry) {
    d3.json(data_url).then(function (data) {
        
        let countries = data.VaccinationData.map(item => item[0]);
        let vaccination_rates = data.VaccinationData.map(item => item[5]);
        let seconddose = data.VaccinationData.map(item => item[5]);
        let cases = data.DailyCasesDeath.map(item=> item[3]);
        
        if (selectedCountry === 'all') {
            // Show all countries
            Plotly.update("line", {x: [countries], y: [cases]});
        } else {
            console.log(selectedCountry);
            // Show only the selected country
            const selectedIndex = countries.indexOf(selectedCountry);
            const traceUpdate3 = {
                x: [[countries[selectedIndex]]],
                y: [[seconddose[selectedIndex]]],
            };
            
            
            Plotly.update("bar2", traceUpdate3);
        }
    });
}



// Call the init function to generate the initial plot
init();










