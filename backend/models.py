from database import db

class Shipment(db.Model):
    __tablename__ = 'shipments'
    Shipment_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Year = db.Column(db.Integer, nullable=False)
    Departure_Date = db.Column(db.String, nullable=False)
    Arrival_Date = db.Column(db.String, nullable=False)
    Transit_Days = db.Column(db.Integer, nullable=False)
    Trade_Direction = db.Column(db.String, nullable=False)
    
    def to_dict(self):
        return {
            'Shipment_ID': self.Shipment_ID,
            'Year': self.Year,
            'Departure_Date': self.Departure_Date,
            'Arrival_Date': self.Arrival_Date,
            'Transit_Days': self.Transit_Days,
            'Trade_Direction': self.Trade_Direction
        }

class Cargo(db.Model):
    __tablename__ = 'cargo'
    Cargo_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Cargo_Type = db.Column(db.String, nullable=False)
    Trade_Category = db.Column(db.String, nullable=False)
    Description = db.Column(db.String, nullable=False)
    Hazard_Level = db.Column(db.String, nullable=False)
    
    def to_dict(self):
        return {
            'Cargo_ID': self.Cargo_ID,
            'Cargo_Type': self.Cargo_Type,
            'Trade_Category': self.Trade_Category,
            'Description': self.Description,
            'Hazard_Level': self.Hazard_Level
        }

class LoadingPort(db.Model):
    __tablename__ = 'loading_ports'
    Loading_Port_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Port_Name = db.Column(db.String, nullable=False)
    Country = db.Column(db.String, nullable=False)
    Port_Type = db.Column(db.String, nullable=False)
    Location = db.Column(db.String, nullable=False)
    
    def to_dict(self):
        return {
            'Loading_Port_ID': self.Loading_Port_ID,
            'Port_Name': self.Port_Name,
            'Country': self.Country,
            'Port_Type': self.Port_Type,
            'Location': self.Location
        }

class DischargePort(db.Model):
    __tablename__ = 'discharge_ports'
    Discharge_Port_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Port_Name = db.Column(db.String, nullable=False)
    Country = db.Column(db.String, nullable=False)
    Port_Type = db.Column(db.String, nullable=False)
    Location = db.Column(db.String, nullable=False)
    
    def to_dict(self):
        return {
            'Discharge_Port_ID': self.Discharge_Port_ID,
            'Port_Name': self.Port_Name,
            'Country': self.Country,
            'Port_Type': self.Port_Type,
            'Location': self.Location
        }
