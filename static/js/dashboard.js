//VaccinationMetaData Visualization

// Fetch data from the /get_data route

fetch('http://127.0.0.1:5000/get_data')
    .then(response => {  
        return response.json()})
    .then(data => {
        console.log(data)
        // Process vaccination data
        //const vaccinationdata = data.vaccinationdata;
        //const labels = vaccinationdata.map(item => item.COUNTRY);
        //const values = vaccinationdata.map(item => item.TOTAL_VACCINATIONS_PER100);
        //console.log(data.VaccinationData[Object.keys(data.VaccinationData)])  
    
        let countries = data.VaccinationData.map( item => item[0])
        let vaccination_rates = data.VaccinationData.map( item => item[4])
        console.log(countries, vaccination_rates)

        // var countries = data.VaccinationData[function() {for (row in data.VaccinationData) return row[0]}]
        // console.log(countries)

        // Create a bar chart using Chart.js
        const ctx = document.getElementById('vaccinationRateChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Vaccination Rate per 100 People',
                    data: values,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        })
    .catch(error => console.error('Error fetching data:', error));


   