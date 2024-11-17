import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import Papa from 'papaparse';

const PowerComponent = () => {
  const [chartData, setChartData] = useState([]);

  // Load and parse the CSV file
  useEffect(() => {
    // Replace with the path to your CSV file
    const fetchData = async () => {
      const response = await fetch('/electricityData.csv');
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      const result = await reader.read();
      const csv = decoder.decode(result.value);
      Papa.parse(csv, {
        header: true, // Parse CSV with headers
        complete: (results) => {
          // Transform data into Google Charts format
          const data = [['Floor', 'Total Energy Consumed (kWh)']];
          results.data.forEach((row) => {
            data.push([row['Floor'], parseFloat(row['Total Energy Consumed (kWh)'])]);
          });
          setChartData(data);
        },
      });
    };
    fetchData();
  }, []);

  // Chart options
  const options = {
    title: 'Total Energy Consumed (kWh) by Floor',
    hAxis: { title: 'Floor', minValue: 0 },
    vAxis: { title: 'Total Energy Consumed (kWh)', minValue: 0 },
    chartArea: { width: '70%', height: '70%' },
    bar: { groupWidth: '75%' },
  };

  return (
    <div>
      {chartData.length > 1 ? (
        <Chart
          chartType="ColumnChart"
          data={chartData}
          options={options}
          width="100%"
          height="400px"
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default PowerComponent;
