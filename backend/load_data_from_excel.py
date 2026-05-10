"""
Script to load data from Excel file into the database.
Place your Excel file in the backend directory and run this script.
"""

import pandas as pd
import pymssql

def get_connection():
    return pymssql.connect(
        server='CERULEAN',
        database='GlobalTradeDB',
        user='sa',
        password='your_password'
    )

def load_shipments_from_excel(file_path):
    """Load shipment data from Excel file"""
    df = pd.read_excel(file_path, sheet_name='Shipments')
    
    conn = get_connection()
    cursor = conn.cursor()
    
    for index, row in df.iterrows():
        cursor.execute("""
            INSERT INTO Shipment_3NF (Year, Departure_Date, Arrival_Date, Transit_Days, Trade_Direction)
            VALUES (?, ?, ?, ?, ?)
        """, (row['Year'], str(row['Departure_Date']), str(row['Arrival_Date']), 
              row['Transit_Days'], row['Trade_Direction']))
    
    conn.commit()
    conn.close()
    print(f"Loaded {len(df)} shipments from Excel")

def load_cargo_from_excel(file_path):
    """Load cargo data from Excel file"""
    df = pd.read_excel(file_path, sheet_name='Cargo')
    
    conn = get_connection()
    cursor = conn.cursor()
    
    for index, row in df.iterrows():
        cursor.execute("""
            INSERT INTO Cargo_3NF (Cargo_Type, Trade_Category, Description, Hazard_Level)
            VALUES (?, ?, ?, ?)
        """, (row['Cargo_Type'], row['Trade_Category'], row['Description'], row['Hazard_Level']))
    
    conn.commit()
    conn.close()
    print(f"Loaded {len(df)} cargo items from Excel")

def load_loading_ports_from_excel(file_path):
    """Load loading ports data from Excel file"""
    df = pd.read_excel(file_path, sheet_name='LoadingPorts')
    
    conn = get_connection()
    cursor = conn.cursor()
    
    for index, row in df.iterrows():
        cursor.execute("""
            INSERT INTO LoadingPort_3NF (Port_Name, Country, Port_Type, Location)
            VALUES (?, ?, ?, ?)
        """, (row['Port_Name'], row['Country'], row['Port_Type'], row['Location']))
    
    conn.commit()
    conn.close()
    print(f"Loaded {len(df)} loading ports from Excel")

def load_discharge_ports_from_excel(file_path):
    """Load discharge ports data from Excel file"""
    df = pd.read_excel(file_path, sheet_name='DischargePorts')
    
    conn = get_connection()
    cursor = conn.cursor()
    
    for index, row in df.iterrows():
        cursor.execute("""
            INSERT INTO DischargePort_3NF (Port_Name, Country, Port_Type, Location)
            VALUES (?, ?, ?, ?)
        """, (row['Port_Name'], row['Country'], row['Port_Type'], row['Location']))
    
    conn.commit()
    conn.close()
    print(f"Loaded {len(df)} discharge ports from Excel")

if __name__ == '__main__':
    excel_file = 'data.xlsx'  # Change this to your Excel file name
    
    try:
        # Load all sheets
        load_shipments_from_excel(excel_file)
        load_cargo_from_excel(excel_file)
        load_loading_ports_from_excel(excel_file)
        load_discharge_ports_from_excel(excel_file)
        print("Data loaded successfully!")
    except Exception as e:
        print(f"Error loading data: {e}")
