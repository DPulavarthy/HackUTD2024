import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

building_name = "ECSW UTD"
floors = [1, 2, 3, 4]
days_in_month = 30

random.seed(42)
np.random.seed(42)

def generate_waste_data():
    data = []
    start_date = datetime(2024, 10, 1)
    end_date = start_date + timedelta(days=days_in_month)
    
    while start_date < end_date:
        for floor in floors:
            base_waste = 20 if floor <= 2 else 15
            waste_amount = round(np.random.normal(base_waste, 5), 2)
            
            if random.random() < 0.05:
                waste_amount = round(waste_amount * np.random.uniform(1.5, 2.0), 2)
            
            waste_amount = max(waste_amount, 5)
            
            data.append({
                "Date": start_date.strftime("%Y-%m-%d"),
                "Building": building_name,
                "Floor": floor,
                "Wasteage (kg)": waste_amount
            })
        start_date += timedelta(days=1)
    
    return pd.DataFrame(data)

df_waste = generate_waste_data()

output_filename = "waste_data.csv"
df_waste.to_csv(output_filename, index=False)
print(f"Data saved to {output_filename}")

print(df_waste.head())
