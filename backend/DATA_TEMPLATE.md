# Excel Data Template

If you want to load data from an Excel file, create an Excel file named `data.xlsx` in the backend directory with the following sheets and columns:

## Sheet 1: Shipments

| Year | Departure_Date | Arrival_Date | Transit_Days | Trade_Direction |
|------|----------------|--------------|--------------|-----------------|
| 2024 | 2024-01-05     | 2024-01-20   | 15           | Import          |
| 2024 | 2024-02-10     | 2024-02-25   | 15           | Export          |
| 2024 | 2024-03-01     | 2024-03-18   | 17           | Import          |
| 2024 | 2024-03-15     | 2024-03-30   | 15           | Export          |

## Sheet 2: Cargo

| Cargo_Type       | Trade_Category | Description        | Hazard_Level |
|------------------|---------------|--------------------|--------------|
| Container Cargo  | Electronics   | Electronic Goods    | Medium       |
| Liquid Cargo     | Oil & Gas     | Petroleum Products | High         |
| Dry Cargo        | Food          | Food Products      | Low          |
| Hazardous Cargo  | Chemicals     | Chemical Materials | High         |

## Sheet 3: LoadingPorts

| Port_Name       | Country   | Port_Type | Location   |
|-----------------|-----------|-----------|------------|
| Shanghai Port   | China     | Seaport   | Shanghai   |
| Karachi Port    | Pakistan  | Seaport   | Karachi    |
| Singapore Port  | Singapore | Seaport   | Singapore  |

## Sheet 4: DischargePorts

| Port_Name       | Country | Port_Type | Location |
|-----------------|---------|-----------|----------|
| Karachi Port    | Pakistan| Seaport   | Karachi  |
| Dubai Port      | UAE     | Seaport   | Dubai    |
| Mumbai Port     | India   | Seaport   | Mumbai   |

## How to Load Data from Excel

1. Create your Excel file (`data.xlsx`) with the sheets and columns as shown above
2. Run the load script:
```bash
python load_data_from_excel.py
```

This will load all the data from your Excel file into the SQLite database.

## Note

The backend already includes default data matching the tables above. You only need to use the Excel loading feature if you want to:
- Add more data
- Modify the existing data
- Import data from external sources
