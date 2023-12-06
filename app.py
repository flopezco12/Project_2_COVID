from flask import jsonify
from flask import Flask, render_template, jsonify
import psycopg2

app = Flask(__name__)

@app.route("/")
def welcome():
    """Welcome to our Covid Tracker"""
    return (    f"Available Routes:<br/>"
                f"/dashboard<br/>"

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


        

# Define a route to render the HTML dashboard
@app.route('/dashboard')
def dashboard():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)