import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

building_name = "ECSW UTD"
floors = [1, 2, 3, 4]
floor_areas = {1: 10000, 2: 10000, 3: 8000, 4: 8000}
operating_hours = list(range(9, 18))  # 9 AM to 6 PM
days_in_month = 30

random.seed(42)
np.random.seed(42)

def generate_percentages():
    percentages = np.random.normal(loc=[20, 30, 15, 10, 8, 5, 5], scale=2, size=7)
    percentages = np.clip(percentages, 0, None)
    percentages = percentages / percentages.sum() * 100
    return percentages.round(2)

def generate_energy_data():
    data = []
    start_date = datetime(2024, 10, 1)
    end_date = start_date + timedelta(days=days_in_month)
    
    while start_date < end_date:
        if start_date.hour in operating_hours:
            for floor in floors:
                area = floor_areas[floor]
                
                is_weekend = start_date.weekday() >= 5
                base_energy = 40 if not is_weekend else 20
                total_energy = round(np.random.normal(base_energy, 5), 2)
                
                if random.random() < 0.05:
                    total_energy = round(total_energy * np.random.uniform(1.5, 2.5), 2)
                
                total_energy = max(total_energy, 5)
                
                cost = round(total_energy * 0.12, 2)
                
                lighting_pct, hvac_pct, computing_pct, refrigeration_pct, \
                office_equip_pct, water_heating_pct, misc_pct = generate_percentages()
                
                data.append({
                    "Date": start_date.strftime("%Y-%m-%d"),
                    "Time": start_date.strftime("%H:%M"),
                    "Building": building_name,
                    "Floor": floor,
                    "Area (sq ft)": area,
                    "Total Energy Consumed (kWh)": total_energy,
                    "Cost (USD)": cost,
                    "% Lighting Consumption": lighting_pct,
                    "% HVAC Consumption": hvac_pct,
                    "% Computing Consumption": computing_pct,
                    "% Refrigeration Consumption": refrigeration_pct,
                    "% Office Equipment": office_equip_pct,
                    "% Water Heating": water_heating_pct,
                    "% Misc.": misc_pct
                })
        start_date += timedelta(hours=1)
    
    return pd.DataFrame(data)

df = generate_energy_data()

output_filename = "electricity_usage_data.csv"
df.to_csv(output_filename, index=False)
print(f"Data saved to {output_filename}")

print(df.head())
