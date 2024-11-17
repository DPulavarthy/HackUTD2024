import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

building_name = "ECSW UTD"
floors = [1, 2, 3, 4]
days_in_month = 30

random.seed(42)
np.random.seed(42)

def generate_floor_data():
    data = []
    start_date = datetime(2024, 10, 1)
    end_date = start_date + timedelta(days=days_in_month)
    
    while start_date < end_date:
        for floor in floors:
            # Generate base values
            area = 10000 if floor <= 2 else 8000
            max_capacity = area / 10
            
            base_energy_consumption = area * np.random.uniform(3, 5)
            energy_consumption = round(np.random.normal(base_energy_consumption, 500), 2)
            
            carbon_emissions = round(energy_consumption * np.random.uniform(0.05, 0.1), 2)
            
            base_water_consumption = area * np.random.uniform(0.005, 0.01)
            water_consumption = round(np.random.normal(base_water_consumption, 50), 2)
            
            base_waste = 20 if floor <= 2 else 15
            waste_amount = round(np.random.normal(base_waste, 5), 2)
            
            if random.random() < 0.05:
                waste_amount = round(waste_amount * np.random.uniform(1.5, 2.0), 2)
            
            waste_amount = max(waste_amount, 5)
            
            base_people = (area / 1000) * 10
            people_adjustment = (carbon_emissions / 5) + (waste_amount / 20) + (water_consumption / 50)
            random_variation = np.random.normal(0, 0.2)
            num_people = max(0, int(base_people + people_adjustment + random_variation))            
            
            data.append({
                "Date": start_date.strftime("%Y-%m-%d"),
                "Building": building_name,
                "Floor": floor,
                "Maximum Capacity of Floor": max_capacity,
                "Area": area,
                "# of People": num_people
            })
        start_date += timedelta(days=1)
    
    return pd.DataFrame(data)

df_floor = generate_floor_data()

output_filename = "updated_floor_data.csv"
df_floor.to_csv(output_filename, index=False)
print(f"Data saved to {output_filename}")

print(df_floor.head())
