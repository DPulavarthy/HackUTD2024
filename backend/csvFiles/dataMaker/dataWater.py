import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

building_name = "ECSW UTD"
floors = [1, 2, 3, 4]
operating_hours = list(range(9, 18))
days_in_month = 30

random.seed(42)
np.random.seed(42)

def generate_water_percentages():
    percentages = np.random.normal(loc=[40, 30, 20, 10], scale=3, size=4)
    percentages = np.clip(percentages, 0, None)
    percentages = percentages / percentages.sum() * 100
    return percentages.round(2)

def generate_water_usage_data():
    data = []
    start_date = datetime(2024, 10, 1)
    end_date = start_date + timedelta(days=days_in_month)
    
    while start_date < end_date:
        if start_date.hour in operating_hours:
            for floor in floors:
                base_consumption = 50 if start_date.weekday() < 5 else 30
                water_consumption = round(np.random.normal(base_consumption, 10), 2)
                
                if random.random() < 0.03:
                    water_consumption = round(water_consumption * np.random.uniform(1.5, 2.0), 2)
                
                water_consumption = max(water_consumption, 10)
                
                cost = round(water_consumption * 0.002, 2)
                
                restroom_pct, cooling_pct, kitchen_pct, misc_pct = generate_water_percentages()
                
                data.append({
                    "Date": start_date.strftime("%Y-%m-%d"),
                    "Time": start_date.strftime("%H:%M"),
                    "Building": building_name,
                    "Floor": floor,
                    "Water Consumption (liters)": water_consumption,
                    "Cost (USD)": cost,
                    "% Restrooms": restroom_pct,
                    "% Cooling System": cooling_pct,
                    "% Kitchen": kitchen_pct,
                    "% Misc.": misc_pct
                })
        start_date += timedelta(hours=1)
    
    return pd.DataFrame(data)

df_water = generate_water_usage_data()

output_filename = "water_usage_data.csv"
df_water.to_csv(output_filename, index=False)
print(f"Data saved to {output_filename}")

print(df_water.head())
