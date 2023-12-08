from flask import jsonify
from flask import Flask, render_template, jsonify
import psycopg2

app = Flask(__name__)

@app.route("/")
def welcome():
    """Welcome to our Covid Tracker"""
    return (    f"Available Routes:<br/>"
                f"/about<br/>"
                f"/dashboard<br/>"
                
                f"Welcome to group 5's project three. <br/> To learn about our purpose please use /about. <br/> Please use /dashboard to go to the covid tracker"

    )

@app.route( '/get_data')
def get_data():
    conn = psycopg2.connect(database="Project_COVID_db",
                            user="postgres",
                            password="postgres",
                            host="localhost", port="5432")
    cur = conn.cursor()

    # Select all data from the tables
    cur.execute('''SELECT * FROM dailycasesdeath;''')
    data_DailyCasesDeath = cur.fetchall()

    cur.execute('''SELECT * FROM vaccinationdata;''')
    data_VaccinationData = cur.fetchall()

    cur.execute('''SELECT * FROM vaccinationmetadata;''')
    data_VaccinationMetaData = cur.fetchall()

    # Close the cursor and connection
    cur.close()
    conn.close()

    return jsonify({'DailyCasesDeath': data_DailyCasesDeath, 'VaccinationData':  data_VaccinationData, 'VaccinationMetaData': data_VaccinationMetaData})


#about page 
@app.route('/about')
def about():
    return (f"We are group five: Anna Brabender, Audrey Nkrumah, Fernando Lopez, and Saiyara Islam.<br/>"
            
            f"The purpose of this dashboard is to be able to look at vaccination rates around the world as well as cumulative deaths and cases around the world.<br/>"
            f"Our data comes from three datasources, they can be found at https://covid19.who.int/data <br/>"
            f"Please note that the dashboard page does take a few second to load the visualization <br/>"
            )  

# Define a route to render the HTML dashboard
@app.route('/dashboard')
def dashboard():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)