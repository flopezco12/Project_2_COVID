//VaccinationMetaData Visualization

// Get the data endpoint
// VaccinationMetaData Visualization

// Get the data endpoint
const data_url = "http://127.0.0.1:5000/get_data";

// Fetch the JSON data and console log it
function init() {
    d3.json(data_url).then(function (data) {
        // Assuming data is an object with a property 'VaccinationData'
        let countries = data.VaccinationData.map(item => item[0]);
        let vaccination_rates = data.VaccinationData.map(item => item[4]);

        console.log(data, countries, vaccination_rates);

        // Create the dropdown menu
        const dropdownContainer = document.getElementById('dropdown-container');

        if (dropdownContainer) {
            const dropdown = document.createElement('select');
            dropdown.id = 'country-dropdown';
            dropdown.onchange = function() {
                updateChart(this.value);
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
        };

        const layoutbar1 = {
            title: `Vaccination rates`,
            xaxis: { title: "Countries" , tickangle: -45},
            yaxis: { title: "Vaccination Rates" },
        };

        // Update or create the initial bar chart
        Plotly.newPlot("bar", [tracebar1], layoutbar1);
    });
}

// Function to update the chart based on the selected country
function updateChart(selectedCountry) {
    d3.json(data_url).then(function (data) {
        let countries = data.VaccinationData.map(item => item[0]);
        let vaccination_rates = data.VaccinationData.map(item => item[4]);

        if (selectedCountry === 'all') {
            // Show all countries
            Plotly.update("bar", {x: [countries], y: [vaccination_rates]});
        } else {
            // Show only the selected country
            const selectedIndex = countries.indexOf(selectedCountry);
            const traceUpdate = {
                x: [countries[selectedIndex]],
                y: [vaccination_rates[selectedIndex]],
            };
            Plotly.update("bar", traceUpdate);
        }
    });
}

// Call the init function to generate the initial plot
init();

