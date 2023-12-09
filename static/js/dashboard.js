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
                updateLineChart(this.value);
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
// Function to update the line chart based on the selected country
function updateLineChart(selectedCountry) {
    d3.json(data_url).then(function (data) {
        const dailyCasesData = data.DailyCasesDeath;

        // Filter data for the selected country
        const countryData = dailyCasesData.filter(item => item[1] === selectedCountry);

        // Call the createLineChart function with the filtered data
        createLineChart(countryData);
    });
}

function createLineChart(dailyCasesData) {
    const countries = Array.from(new Set(dailyCasesData.map(item => item[1])));
    const dates = Array.from(new Set(dailyCasesData.map(item => item[0])));

    const countryData = countries.map(country => ({
        label: country,
        data: dailyCasesData
            .filter(item => item[1] === country)
            .map(item => item[2]),
        fill: false,
        yAxisID: 'y-axis-new-cases',
    }));

    const cumulativeData = countries.map(country => ({
        label: `${country} (Cumulative)`,
        data: dailyCasesData
            .filter(item => item[1] === country)
            .map(item => item[3]),
        fill: false,
        yAxisID: 'y-axis-cumulative-cases',
    }));

    const lineChartData = {
        labels: dates,
        datasets: [...countryData, ...cumulativeData],
    };

    const ctx = document.getElementById('lineChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: lineChartData,
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            stacked: false,
            plugins: {
                title: {
                    display: true,
                    text: 'COVID-19 New and Cumulative Cases',
                },
            },
            scales: {
                xAxis: {
                    type: 'linear', // Assuming your dates are numeric, change this if they are not
                    position: 'bottom',
                },
                yAxis: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-new-cases',
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    id: 'y-axis-cumulative-cases',
                },
            },
        },
    });
}
// Call the init function to generate the initial plot
init();


// //Table using tabulator (a js library)
// // Define  data

// var tabledata = [
//     {  PRODUCT_NAME: "AZD1222", Company_name: "AstraZeneca" },
//     { PRODUCT_NAME: "Ad26.COV 2-S", Company_name: "Janssen Pharmaceuticals" },
//     { PRODUCT_NAME: "BBIBP-CorV", Company_name: "Beijing Bio-Institute Biological Products (CNBG)" },
//     {  PRODUCT_NAME: "CIGB-66", Company_name: "Center for Genetic Engineering and Biotechnology" },
//     {  PRODUCT_NAME: "Comirnaty", Company_name: "Pfizer BioNTech" },
//     {  PRODUCT_NAME: "Convidecia", Company_name: "CanSino Biologicals" },
//     {  PRODUCT_NAME: "Corbevax", Company_name: "Biological E" },
//     {  PRODUCT_NAME: "Coronavac", Company_name: "Sinovac" },
//     {  PRODUCT_NAME: "Covaxin", Company_name: "Bharat Biotech" },
//     {  PRODUCT_NAME: "Covi-Vac", Company_name: "Chumakov" },
//     {PRODUCT_NAME: "Covidful", Company_name: "Insitute of Medical Biology" },
//     {  PRODUCT_NAME: "Covishield", Company_name: "Serum Institute of India" },
//     {  PRODUCT_NAME: "EpiVacCorona", Company_name: "State Research Center of Virology & Biotechnology" },
//     {  PRODUCT_NAME: "Gam-Covid-Vac", Company_name: "Gamaleya Research Institute" },
//     {PRODUCT_NAME: "Inactivated SARS-CoV-2 vaccine", Company_name: "Wuhan Institute of Biological Products (CNBG)" },
//     {  PRODUCT_NAME: "LV-SMENP-DC", Company_name: "Shenzhen GenoImmune Medical Institute" },
//     { PRODUCT_NAME: "NUVAXOVID", Company_name: "Novavax" },
//     {  PRODUCT_NAME: "QazVac", Company_name: "Research Institute for Biological Safety Problems" },
//     { PRODUCT_NAME: "Soberana Plus", Company_name: "Instituto Finlay de Vacunas" },
//     {  PRODUCT_NAME: "Soberana-02", Company_name: "Instituto Finlay de Vacunas" },
//     {  PRODUCT_NAME: "Spikevax", Company_name: "Moderna" },
//     { PRODUCT_NAME: "Sputnik-Light", Company_name: "Gamaleya Research Institute" },
//     { PRODUCT_NAME: "VLA2001", Company_name: "Valneva" },
//     {  PRODUCT_NAME: "Vaxzevria", Company_name: "AstraZeneca" },
//     {  PRODUCT_NAME: "Zifivax", Company_name: "Anhui Zhifei Longcom Biopharmaceutical" },
//     { PRODUCT_NAME: "ZyCov-D", Company_name: "Zydus Cadila" },
//     {  PRODUCT_NAME: "mRNA-1273", Company_name: "Moderna" },
// ];





