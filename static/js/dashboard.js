//VaccinationMetaData Visualization

// Get the data endpoint
// VaccinationMetaData Visualization

// Get the data endpoint
const data_url = "http://127.0.0.1:5000/get_data";

// Fetch the JSON data and console log it
d3.json(data_url).then(function (data) {
    // Assuming data is an object with a property 'VaccinationData'
    let countries = data.VaccinationData.map(item => item[0]);
    let vaccination_rates = data.VaccinationData.map(item => item[4]);

    console.log(data, countries, vaccination_rates);

    // Display the default plot 
    function init() {
        // Use 'let' or 'const' to declare the 'data' variable
        let data = [{
            values: vaccination_rates,
            labels: countries,
            type: "bar"
        }];

        let layout = {
            height: 600,
            width: 800
        };

        Plotly.newPlot("bar", data, layout);
    }

    // Call the init function to generate the plot
    init();
});


