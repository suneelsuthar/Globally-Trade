from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)

# Manual CORS handling for all responses
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    return response

# Handle OPTIONS preflight for all routes
@app.route('/', defaults={'path': ''}, methods=['OPTIONS'])
@app.route('/<path:path>', methods=['OPTIONS'])
def handle_options(path):
    return jsonify({}), 200

# DATABASE CONNECTION
DB_PATH = os.path.join(os.path.dirname(__file__), 'globaltrade.db')

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()
    
    # Create tables
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Shipment_3NF (
            Shipment_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            Year INTEGER NOT NULL,
            Departure_Date TEXT NOT NULL,
            Arrival_Date TEXT NOT NULL,
            Transit_Days INTEGER NOT NULL,
            Trade_Direction TEXT NOT NULL
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Cargo_3NF (
            Cargo_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            Cargo_Type TEXT NOT NULL,
            Trade_Category TEXT NOT NULL,
            Description TEXT NOT NULL,
            Hazard_Level TEXT NOT NULL
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS LoadingPort_3NF (
            Loading_Port_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            Port_Name TEXT NOT NULL,
            Country TEXT NOT NULL,
            Port_Type TEXT NOT NULL,
            Location TEXT NOT NULL
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS DischargePort_3NF (
            Discharge_Port_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            Port_Name TEXT NOT NULL,
            Country TEXT NOT NULL,
            Port_Type TEXT NOT NULL,
            Location TEXT NOT NULL
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Trade_3NF (
            Trade_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            Shipment_ID INTEGER NOT NULL,
            Cargo_ID INTEGER NOT NULL,
            Loading_Port_ID INTEGER NOT NULL,
            Discharge_Port_ID INTEGER NOT NULL,
            FOREIGN KEY (Shipment_ID) REFERENCES Shipment_3NF(Shipment_ID),
            FOREIGN KEY (Cargo_ID) REFERENCES Cargo_3NF(Cargo_ID),
            FOREIGN KEY (Loading_Port_ID) REFERENCES LoadingPort_3NF(Loading_Port_ID),
            FOREIGN KEY (Discharge_Port_ID) REFERENCES DischargePort_3NF(Discharge_Port_ID)
        )
    ''')
    
    conn.commit()
    conn.close()
    print("Database initialized!")

# Initialize database
init_db()

# CHECKING APIs
@app.route('/')
def home():
    return jsonify({"message": "API is running"})

# ==================== SHIPMENTS API ====================

@app.route('/api/shipments', methods=['GET'])
def get_shipments():
    direction = request.args.get('direction')
    shipment_id = request.args.get('shipment_id')
    
    conn = get_connection()
    cursor = conn.cursor()
    
    if shipment_id:
        cursor.execute("SELECT * FROM Shipment_3NF WHERE Shipment_ID = ?", (int(shipment_id),))
    elif direction:
        cursor.execute("SELECT * FROM Shipment_3NF WHERE Trade_Direction = ?", (direction,))
    else:
        cursor.execute("SELECT * FROM Shipment_3NF")
    
    rows = cursor.fetchall()
    
    result = []
    for row in rows:
        result.append({
            "Shipment_ID": row['Shipment_ID'],
            "Year": row['Year'],
            "Departure_Date": str(row['Departure_Date']),
            "Arrival_Date": str(row['Arrival_Date']),
            "Transit_Days": row['Transit_Days'],
            "Trade_Direction": row['Trade_Direction']
        })
    
    conn.close()
    return jsonify(result)

@app.route('/api/shipments', methods=['POST'])
def create_shipment():
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("""
        INSERT INTO Shipment_3NF (Year, Departure_Date, Arrival_Date, Transit_Days, Trade_Direction)
        VALUES (?, ?, ?, ?, ?)
    """, (data['Year'], data['Departure_Date'], data['Arrival_Date'], data['Transit_Days'], data['Trade_Direction']))
    
    conn.commit()
    conn.close()
    return jsonify({"message": "Shipment created successfully"}), 201

@app.route('/api/shipments/<int:id>', methods=['PUT'])
def update_shipment(id):
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("""
        UPDATE Shipment_3NF
        SET Year = ?, Departure_Date = ?, Arrival_Date = ?, Transit_Days = ?, Trade_Direction = ?
        WHERE Shipment_ID = ?
    """, (data.get('Year'), data.get('Departure_Date'), data.get('Arrival_Date'), 
          data.get('Transit_Days'), data.get('Trade_Direction'), id))
    
    conn.commit()
    conn.close()
    return jsonify({"message": "Shipment updated successfully"})

@app.route('/api/shipments/<int:id>', methods=['DELETE'])
def delete_shipment(id):
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("DELETE FROM Shipment_3NF WHERE Shipment_ID = ?", (id,))
    
    conn.commit()
    conn.close()
    return jsonify({"message": "Shipment deleted successfully"})

# ==================== CARGO API ====================

@app.route('/api/cargo', methods=['GET'])
def get_cargo():
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM Cargo_3NF")
    rows = cursor.fetchall()
    
    result = []
    for row in rows:
        result.append({
            "Cargo_ID": row['Cargo_ID'],
            "Cargo_Type": row['Cargo_Type'],
            "Trade_Category": row['Trade_Category'],
            "Description": row['Description'],
            "Hazard_Level": row['Hazard_Level']
        })
    
    conn.close()
    return jsonify(result)

@app.route('/api/cargo', methods=['POST'])
def create_cargo():
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("""
        INSERT INTO Cargo_3NF (Cargo_Type, Trade_Category, Description, Hazard_Level)
        VALUES (?, ?, ?, ?)
    """, (data['Cargo_Type'], data['Trade_Category'], data['Description'], data['Hazard_Level']))
    
    conn.commit()
    conn.close()
    return jsonify({"message": "Cargo created successfully"}), 201

@app.route('/api/cargo/<int:id>', methods=['PUT'])
def update_cargo(id):
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("""
        UPDATE Cargo_3NF
        SET Cargo_Type = ?, Trade_Category = ?, Description = ?, Hazard_Level = ?
        WHERE Cargo_ID = ?
    """, (data.get('Cargo_Type'), data.get('Trade_Category'), data.get('Description'), 
          data.get('Hazard_Level'), id))
    
    conn.commit()
    conn.close()
    return jsonify({"message": "Cargo updated successfully"})

@app.route('/api/cargo/<int:id>', methods=['DELETE'])
def delete_cargo(id):
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("DELETE FROM Cargo_3NF WHERE Cargo_ID = ?", (id,))
    
    conn.commit()
    conn.close()
    return jsonify({"message": "Cargo deleted successfully"})

# ==================== PORTS API ====================

@app.route('/api/ports/loading', methods=['GET'])
def get_loading_ports():
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM LoadingPort_3NF")
    rows = cursor.fetchall()
    
    result = []
    for row in rows:
        result.append({
            "Loading_Port_ID": row['Loading_Port_ID'],
            "Port_Name": row['Port_Name'],
            "Country": row['Country'],
            "Port_Type": row['Port_Type'],
            "Location": row['Location']
        })
    
    conn.close()
    return jsonify(result)

@app.route('/api/ports/loading', methods=['POST'])
def create_loading_port():
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("""
        INSERT INTO LoadingPort_3NF (Port_Name, Country, Port_Type, Location)
        VALUES (?, ?, ?, ?)
    """, (data['Port_Name'], data['Country'], data['Port_Type'], data['Location']))
    
    conn.commit()
    conn.close()
    return jsonify({"message": "Loading port created successfully"}), 201

@app.route('/api/ports/loading/<int:id>', methods=['PUT'])
def update_loading_port(id):
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("""
        UPDATE LoadingPort_3NF
        SET Port_Name = ?, Country = ?, Port_Type = ?, Location = ?
        WHERE Loading_Port_ID = ?
    """, (data.get('Port_Name'), data.get('Country'), data.get('Port_Type'), 
          data.get('Location'), id))
    
    conn.commit()
    conn.close()
    return jsonify({"message": "Loading port updated successfully"})

@app.route('/api/ports/loading/<int:id>', methods=['DELETE'])
def delete_loading_port(id):
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("DELETE FROM LoadingPort_3NF WHERE Loading_Port_ID = ?", (id,))
    
    conn.commit()
    conn.close()
    return jsonify({"message": "Loading port deleted successfully"})

@app.route('/api/ports/discharge', methods=['GET'])
def get_discharge_ports():
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM DischargePort_3NF")
    rows = cursor.fetchall()
    
    result = []
    for row in rows:
        result.append({
            "Discharge_Port_ID": row['Discharge_Port_ID'],
            "Port_Name": row['Port_Name'],
            "Country": row['Country'],
            "Port_Type": row['Port_Type'],
            "Location": row['Location']
        })
    
    conn.close()
    return jsonify(result)

@app.route('/api/ports/discharge', methods=['POST'])
def create_discharge_port():
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("""
        INSERT INTO DischargePort_3NF (Port_Name, Country, Port_Type, Location)
        VALUES (?, ?, ?, ?)
    """, (data['Port_Name'], data['Country'], data['Port_Type'], data['Location']))
    
    conn.commit()
    conn.close()
    return jsonify({"message": "Discharge port created successfully"}), 201

@app.route('/api/ports/discharge/<int:id>', methods=['PUT'])
def update_discharge_port(id):
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("""
        UPDATE DischargePort_3NF
        SET Port_Name = ?, Country = ?, Port_Type = ?, Location = ?
        WHERE Discharge_Port_ID = ?
    """, (data.get('Port_Name'), data.get('Country'), data.get('Port_Type'), 
          data.get('Location'), id))
    
    conn.commit()
    conn.close()
    return jsonify({"message": "Discharge port updated successfully"})

@app.route('/api/ports/discharge/<int:id>', methods=['DELETE'])
def delete_discharge_port(id):
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("DELETE FROM DischargePort_3NF WHERE Discharge_Port_ID = ?", (id,))
    
    conn.commit()
    conn.close()
    return jsonify({"message": "Discharge port deleted successfully"})

# ==================== TRADES API (JOINED DATA) ====================

@app.route('/api/trades', methods=['GET'])
def get_trades():
    conn = get_connection()
    cursor = conn.cursor()
    
    query = """
    SELECT 
        t.Trade_ID,
        s.Shipment_ID,
        s.Departure_Date,
        s.Arrival_Date,
        s.Trade_Direction,
        c.Cargo_Type,
        lp.Port_Name AS Loading_Port,
        dp.Port_Name AS Discharge_Port
    FROM Trade_3NF t
    JOIN Shipment_3NF s ON t.Shipment_ID = s.Shipment_ID
    JOIN Cargo_3NF c ON t.Cargo_ID = c.Cargo_ID
    JOIN LoadingPort_3NF lp ON t.Loading_Port_ID = lp.Loading_Port_ID
    JOIN DischargePort_3NF dp ON t.Discharge_Port_ID = dp.Discharge_Port_ID
    """
    
    cursor.execute(query)
    rows = cursor.fetchall()
    
    result = []
    for row in rows:
        result.append({
            "Trade_ID": row['Trade_ID'],
            "Shipment_ID": row['Shipment_ID'],
            "Departure_Date": str(row['Departure_Date']),
            "Arrival_Date": str(row['Arrival_Date']),
            "Trade_Direction": row['Trade_Direction'],
            "Cargo_Type": row['Cargo_Type'],
            "Loading_Port": row['Loading_Port'],
            "Discharge_Port": row['Discharge_Port']
        })
    
    conn.close()
    return jsonify(result)

# ==================== DASHBOARD API ====================

@app.route('/api/dashboard/stats', methods=['GET'])
def get_dashboard_stats():
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT COUNT(*) FROM Shipment_3NF")
    shipments_count = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM LoadingPort_3NF")
    loading_ports_count = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM DischargePort_3NF")
    discharge_ports_count = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM Cargo_3NF")
    cargo_count = cursor.fetchone()[0]
    
    conn.close()
    
    return jsonify({
        'shipments': shipments_count,
        'ports': loading_ports_count + discharge_ports_count,
        'cargo': cargo_count,
        'trades': shipments_count
    })

# ==================== REPORTS API ====================

@app.route('/api/reports/shipments/count', methods=['GET'])
def shipment_count():
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT COUNT(*) FROM Shipment_3NF")
    count = cursor.fetchone()[0]
    
    conn.close()
    return jsonify({"Total_Shipments": count})

@app.route('/api/reports/direction', methods=['GET'])
def direction_report():
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("""
        SELECT Trade_Direction, COUNT(*)
        FROM Shipment_3NF
        GROUP BY Trade_Direction
    """)
    
    rows = cursor.fetchall()
    
    result = []
    for row in rows:
        result.append({
            "Trade_Direction": row[0],
            "Count": row[1]
        })
    
    conn.close()
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
