import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

building_name = "ECSW UTD"
floors = [1, 2, 3, 4]
source_types = ["HVAC", "Lighting", "Computing", "Refrigeration", "Office Equipment"]
operating_hours = list(range(9, 18))  # 9 AM to 6 PM
days_in_month = 30

random.seed(42)
np.random.seed(42)

def generate_carbon_emissions_data():
    data = []
    start_date = datetime(2024, 10, 1)
    end_date = start_date + timedelta(days=days_in_month)
    
    while start_date < end_date:
        if start_date.hour in operating_hours:
            for floor in floors:
                for source in source_types:
                    base_emissions = {
                        "HVAC": 5,
                        "Lighting": 2,
                        "Computing": 3,
                        "Refrigeration": 4,
                        "Office Equipment": 1.5
                    }
                    emissions = round(np.random.normal(base_emissions[source], 0.5), 2)
                    
                    emissions = max(emissions, 0)
                    
                    data.append({
                        "Date": start_date.strftime("%Y-%m-%d"),
                        "Time": start_date.strftime("%H:%M"),
                        "Building": building_name,
                        "Floor": floor,
                        "Carbon Emissions (kg CO₂)": emissions,
                        "Source Type": source
                    })
        start_date += timedelta(hours=1)
    
    return pd.DataFrame(data)

df_carbon = generate_carbon_emissions_data()

output_filename = "carbon_emissions_data.csv"
df_carbon.to_csv(output_filename, index=False)
print(f"Data saved to {output_filename}")

print(df_carbon.head())
