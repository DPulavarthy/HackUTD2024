import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Chart } from 'react-google-charts';

const BarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Replace with the path to your CSV file
    const csvFilePath = '/carbonData.csv';

    // Fetch and parse the CSV file
    Papa.parse(csvFilePath, {
      download: true,
      header: true, // Set to true if your CSV has headers
      complete: (result) => {
        const chartData = [['Source Type', 'Carbon Emissions (kg CO₂)']];
        const emissionsBySource = {};

        result.data.forEach((row) => {
            const sourceType = row['Source Type'];
            const emissions = parseFloat(row['Carbon Emissions (kg CO₂)']) || 0;// Aggregate emissions by Source Type
            if (!emissionsBySource[sourceType]) {
              emissionsBySource[sourceType] = 0;
            }
            emissionsBySource[sourceType] += emissions;
          });
  
          // Convert aggregated data to array format
          for (const [sourceType, emissions] of Object.entries(emissionsBySource)) {
            chartData.push([sourceType, emissions]);
          }
  
          setData(chartData);
      },
    });
  }, []);

  return (
    <div>
      <h1>Carbon Emissions by Source Type</h1>
      {data.length > 1 ? (
        <Chart
          chartType="BarChart"
          data={data}
          width="100%"
          height="400px"
          options={{
            title: 'Total Carbon Emissions by Source Type',
            chartArea: { width: '60%' },
            hAxis: {
              title: 'Carbon Emissions (kg CO₂)',
              minValue: 0,
            },
            vAxis: {
              title: 'Source Type',
            },
            bars: 'horizontal', // Render bars horizontally
          }}
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default BarChart;
