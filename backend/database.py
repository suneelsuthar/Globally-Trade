from flask_sqlalchemy import SQLAlchemy
from models import Shipment, Cargo, LoadingPort, DischargePort

db = SQLAlchemy()

def init_db():
    db.create_all()
    
    # Check if data already exists
    if Shipment.query.count() == 0:
        # Insert default shipment data
        default_shipments = [
            Shipment(Year=2024, Departure_Date="2024-01-05", Arrival_Date="2024-01-20", Transit_Days=15, Trade_Direction="Import"),
            Shipment(Year=2024, Departure_Date="2024-02-10", Arrival_Date="2024-02-25", Transit_Days=15, Trade_Direction="Export"),
            Shipment(Year=2024, Departure_Date="2024-03-01", Arrival_Date="2024-03-18", Transit_Days=17, Trade_Direction="Import"),
            Shipment(Year=2024, Departure_Date="2024-03-15", Arrival_Date="2024-03-30", Transit_Days=15, Trade_Direction="Export"),
        ]
        db.session.bulk_save_objects(default_shipments)
    
    if Cargo.query.count() == 0:
        # Insert default cargo data
        default_cargo = [
            Cargo(Cargo_Type="Container Cargo", Trade_Category="Electronics", Description="Electronic Goods", Hazard_Level="Medium"),
            Cargo(Cargo_Type="Liquid Cargo", Trade_Category="Oil & Gas", Description="Petroleum Products", Hazard_Level="High"),
            Cargo(Cargo_Type="Dry Cargo", Trade_Category="Food", Description="Food Products", Hazard_Level="Low"),
            Cargo(Cargo_Type="Hazardous Cargo", Trade_Category="Chemicals", Description="Chemical Materials", Hazard_Level="High"),
        ]
        db.session.bulk_save_objects(default_cargo)
    
    if LoadingPort.query.count() == 0:
        # Insert default loading ports data
        default_loading_ports = [
            LoadingPort(Port_Name="Shanghai Port", Country="China", Port_Type="Seaport", Location="Shanghai"),
            LoadingPort(Port_Name="Karachi Port", Country="Pakistan", Port_Type="Seaport", Location="Karachi"),
            LoadingPort(Port_Name="Singapore Port", Country="Singapore", Port_Type="Seaport", Location="Singapore"),
        ]
        db.session.bulk_save_objects(default_loading_ports)
    
    if DischargePort.query.count() == 0:
        # Insert default discharge ports data
        default_discharge_ports = [
            DischargePort(Port_Name="Karachi Port", Country="Pakistan", Port_Type="Seaport", Location="Karachi"),
            DischargePort(Port_Name="Dubai Port", Country="UAE", Port_Type="Seaport", Location="Dubai"),
            DischargePort(Port_Name="Mumbai Port", Country="India", Port_Type="Seaport", Location="Mumbai"),
        ]
        db.session.bulk_save_objects(default_discharge_ports)
    
    db.session.commit()
    print("Database initialized with default data!")
