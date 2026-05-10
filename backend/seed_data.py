"""Seed database with sample data"""
import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), 'globaltrade.db')
conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

# Add shipments
cursor.executemany('''
    INSERT INTO Shipment_3NF (Year, Departure_Date, Arrival_Date, Transit_Days, Trade_Direction)
    VALUES (?, ?, ?, ?, ?)
''', [
    (2024, '2024-01-05', '2024-01-20', 15, 'Import'),
    (2024, '2024-02-10', '2024-02-25', 15, 'Export'),
    (2024, '2024-03-01', '2024-03-18', 17, 'Import'),
    (2024, '2024-03-15', '2024-03-30', 15, 'Export'),
    (2024, '2024-04-20', '2024-05-05', 15, 'Import'),
])

# Add cargo
cursor.executemany('''
    INSERT INTO Cargo_3NF (Cargo_Type, Trade_Category, Description, Hazard_Level)
    VALUES (?, ?, ?, ?)
''', [
    ('Container Cargo', 'Electronics', 'Electronic Goods', 'Medium'),
    ('Liquid Cargo', 'Oil & Gas', 'Petroleum Products', 'High'),
    ('Dry Cargo', 'Food', 'Food Products', 'Low'),
    ('Hazardous Cargo', 'Chemicals', 'Chemical Materials', 'High'),
    ('Refrigerated Cargo', 'Pharmaceuticals', 'Medical Supplies', 'Low'),
])

# Add loading ports
cursor.executemany('''
    INSERT INTO LoadingPort_3NF (Port_Name, Country, Port_Type, Location)
    VALUES (?, ?, ?, ?)
''', [
    ('Shanghai Port', 'China', 'Seaport', 'Shanghai'),
    ('Karachi Port', 'Pakistan', 'Seaport', 'Karachi'),
    ('Singapore Port', 'Singapore', 'Seaport', 'Singapore'),
    ('Dubai Port', 'UAE', 'Seaport', 'Dubai'),
    ('Mumbai Port', 'India', 'Seaport', 'Mumbai'),
])

# Add discharge ports
cursor.executemany('''
    INSERT INTO DischargePort_3NF (Port_Name, Country, Port_Type, Location)
    VALUES (?, ?, ?, ?)
''', [
    ('Karachi Port', 'Pakistan', 'Seaport', 'Karachi'),
    ('Dubai Port', 'UAE', 'Seaport', 'Dubai'),
    ('Jeddah Port', 'Saudi Arabia', 'Seaport', 'Jeddah'),
    ('Colombo Port', 'Sri Lanka', 'Seaport', 'Colombo'),
    ('Chittagong Port', 'Bangladesh', 'Seaport', 'Chittagong'),
])

# Add trades (linking shipments, cargo, loading and discharge ports)
cursor.executemany('''
    INSERT INTO Trade_3NF (Shipment_ID, Cargo_ID, Loading_Port_ID, Discharge_Port_ID)
    VALUES (?, ?, ?, ?)
''', [
    (1, 1, 1, 1),  # Shipment 1, Cargo 1, Shanghai -> Karachi
    (2, 2, 2, 2),  # Shipment 2, Cargo 2, Karachi -> Dubai
    (3, 3, 3, 3),  # Shipment 3, Cargo 3, Singapore -> Jeddah
    (4, 4, 4, 4),  # Shipment 4, Cargo 4, Dubai -> Colombo
    (5, 5, 5, 5),  # Shipment 5, Cargo 5, Mumbai -> Chittagong
])

conn.commit()
conn.close()
print('Sample data added successfully!')
