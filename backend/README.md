# Cargo Shipment System - Python Backend

This is a Flask-based Python backend for the Cargo Shipment System with SQL Server database using pyodbc.

## Setup Instructions

1. **Install Python Dependencies**

   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. **Configure Database Connection**
   Update the connection string in `app.py` and `load_data_from_excel.py`:

   ```python
   return pyodbc.connect(
       "DRIVER={SQL Server};"
       "SERVER=CERULEAN;"
       "DATABASE=GlobalTradeDB;"
       "Trusted_Connection=yes;"
   )
   ```

3. **Run the Application**
   ```bash
   python app.py
   ```
   The API will be available at `http://localhost:5000`

## Database

The application uses SQL Server database (`GlobalTradeDB`) with the following tables:

- Shipment_3NF
- Cargo_3NF
- LoadingPort_3NF
- DischargePort_3NF
- Trade_3NF

## API Endpoints

### Shipments

- `GET /api/shipments` - Get all shipments (optional: `?direction=Import/Export` or `?shipment_id=1`)
- `POST /api/shipments` - Create new shipment
- `PUT /api/shipments/<id>` - Update shipment
- `DELETE /api/shipments/<id>` - Delete shipment

### Cargo

- `GET /api/cargo` - Get all cargo
- `POST /api/cargo` - Create new cargo
- `PUT /api/cargo/<id>` - Update cargo
- `DELETE /api/cargo/<id>` - Delete cargo

### Ports

- `GET /api/ports/loading` - Get all loading ports
- `POST /api/ports/loading` - Create new loading port
- `PUT /api/ports/loading/<id>` - Update loading port
- `DELETE /api/ports/loading/<id>` - Delete loading port

- `GET /api/ports/discharge` - Get all discharge ports
- `POST /api/ports/discharge` - Create new discharge port
- `PUT /api/ports/discharge/<id>` - Update discharge port
- `DELETE /api/ports/discharge/<id>` - Delete discharge port

### Trades

- `GET /api/trades` - Get all trades with joined data (Shipments, Cargo, Loading Ports, Discharge Ports)

### Dashboard

- `GET /api/dashboard/stats` - Get dashboard statistics

### Reports

- `GET /api/reports/shipments/count` - Get total shipments count
- `GET /api/reports/direction` - Get shipments grouped by trade direction

## Database Schema

### Shipment_3NF

- Shipment_ID (PK)
- Year
- Departure_Date
- Arrival_Date
- Transit_Days
- Trade_Direction

### Cargo_3NF

- Cargo_ID (PK)
- Cargo_Type
- Trade_Category
- Description
- Hazard_Level

### LoadingPort_3NF

- Loading_Port_ID (PK)
- Port_Name
- Country
- Port_Type
- Location

### DischargePort_3NF

- Discharge_Port_ID (PK)
- Port_Name
- Country
- Port_Type
- Location

### Trade_3NF

- Trade_ID (PK)
- Shipment_ID (FK)
- Cargo_ID (FK)
- Loading_Port_ID (FK)
- Discharge_Port_ID (FK)

## Example API Usage

### Get all shipments

```bash
curl http://127.0.0.1:5000/api/shipments
```

### Filter shipments by direction

```bash
curl http://127.0.0.1:5000/api/shipments?direction=Import
```

### Get trades with joined data

```bash
curl http://127.0.0.1:5000/api/trades
```

### Get dashboard stats

```bash
curl http://127.0.0.1:5000/api/dashboard/stats
```

## Loading Data from Excel

You can load data from an Excel file using the provided script:

1. Create an Excel file named `data.xlsx` with the following sheets:
   - **Shipments**: Year, Departure_Date, Arrival_Date, Transit_Days, Trade_Direction
   - **Cargo**: Cargo_Type, Trade_Category, Description, Hazard_Level
   - **LoadingPorts**: Port_Name, Country, Port_Type, Location
   - **DischargePorts**: Port_Name, Country, Port_Type, Location

2. Run the script:

```bash
python load_data_from_excel.py
```

See `DATA_TEMPLATE.md` for more details on the Excel template structure.

## Next Steps for Frontend Integration

To connect the React frontend to this backend:

1. Install axios in your React project:

```bash
npm install axios
```

2. Update your React components to fetch data from the backend API instead of using dummy data.

Example for Shipments.js:

```javascript
import axios from "axios";

// Replace the dummy data with API calls
const [allShipments, setAllShipments] = useState([]);

useEffect(() => {
  axios
    .get("http://127.0.0.1:5000/api/shipments")
    .then((response) => setAllShipments(response.data))
    .catch((error) => console.error("Error fetching shipments:", error));
}, []);
```

3. Update the CRUD operations to use the backend API endpoints.
