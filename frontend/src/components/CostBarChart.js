import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import Papa from 'papaparse';

const CostDoughnutChart = ({ electricityFile, waterFile }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Load and parse both CSV files
    const fetchData = async () => {
      const responseElectricity = await fetch(electricityFile);
      const csvTextElectricity = await responseElectricity.text();
      const parsedElectricityData = Papa.parse(csvTextElectricity, { header: true }).data;

      const responseWater = await fetch(waterFile);
      const csvTextWater = await responseWater.text();
      const parsedWaterData = Papa.parse(csvTextWater, { header: true }).data;

      // Get the last date in the electricity and water data
      const lastDateElectricity = parsedElectricityData[parsedElectricityData.length - 1].Date;
      const lastDateWater = parsedWaterData[parsedWaterData.length - 1].Date;

      // Filter data for the last date in both datasets
      const electricityData = parsedElectricityData.filter(
        (row) => row.Date === lastDateElectricity
      ).slice(-4);  // Get last 4 rows for the selected date

      const waterData = parsedWaterData.filter(
        (row) => row.Date === lastDateWater
      ).slice(-4);  // Get last 4 rows for the selected date

      // Calculate total cost per floor for electricity and water
      const floorCost = { 'Floor 1': 0, 'Floor 2': 0, 'Floor 3': 0, 'Floor 4': 0 };

      electricityData.forEach((row) => {
        const floor = `Floor ${row.Floor}`;
        floorCost[floor] += parseFloat(row['Cost (USD)']);
      });

      waterData.forEach((row) => {
        const floor = `Floor ${row.Floor}`;
        floorCost[floor] += parseFloat(row['Cost (USD)']);
      });

      // Prepare data for the doughnut chart
      const doughnutData = [
        ['Floor', 'Cost (USD)'],
        ['Floor 1', floorCost['Floor 1']],
        ['Floor 2', floorCost['Floor 2']],
        ['Floor 3', floorCost['Floor 3']],
        ['Floor 4', floorCost['Floor 4']],
      ];

      setChartData(doughnutData);
    };

    fetchData();
  }, [electricityFile, waterFile]);

  return (
    <div>
      {chartData.length > 0 ? (
        <Chart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={chartData}
          options={{
            title: `Total Costs for Each Floor`,
            backgroundColor: '#c9e89b',
            titleTextStyle: {
              color: '#624c50',
            },
            textStyle: {
              color: '#624c50'
            },
            pieHole: 0.4,  // Makes it a doughnut chart
            slices: {
              0: { offset: 0.1 },
              1: { offset: 0.1 },
              2: { offset: 0.1 },
              3: { offset: 0.1 },
            },
            legend: { position: 'bottom' },
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CostDoughnutChart;
