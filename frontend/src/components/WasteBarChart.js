import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import Papa from 'papaparse';

const WasteageLineChart = ({ csvFile }) => {
  const [chartData, setChartData] = useState([]);
  const [chartTitle, setChartTitle] = useState('');

  useEffect(() => {
    // Load and parse CSV file
    const fetchData = async () => {
      const response = await fetch(csvFile);
      const csvText = await response.text();
      const parsedData = Papa.parse(csvText, { header: true }).data;

      // Prepare chart data in the format required for Google Charts
      const formattedData = [['Date', 'Floor 1', 'Floor 2', 'Floor 3', 'Floor 4']];

      // Group by Date and aggregate wasteage for each floor
      const dateGrouped = parsedData.reduce((acc, row) => {
        const { Date, Floor, 'Wasteage (kg)': wasteage } = row;
        if (!acc[Date]) {
          acc[Date] = { '1': 0, '2': 0, '3': 0, '4': 0 };
        }
        acc[Date][Floor] = parseFloat(wasteage);  // Add wasteage for each floor on that date
        return acc;
      }, {});

      // Convert the grouped data into the correct chart data format
      Object.keys(dateGrouped).forEach(date => {
        formattedData.push([
          date,
          dateGrouped[date]['1'] || 0,
          dateGrouped[date]['2'] || 0,
          dateGrouped[date]['3'] || 0,
          dateGrouped[date]['4'] || 0,
        ]);
      });

      // Set the chart data and title
      setChartData(formattedData);
      setChartTitle('Wasteage per Floor Over Time');
    };

    fetchData();
  }, [csvFile]);

  return (
    <div>
      {chartData.length > 0 ? (
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={chartData}
          options={{
            title: chartTitle,
            hAxis: { title: 'Date' },
            vAxis: { title: 'Wasteage (kg)' },
            legend: { position: 'bottom' },
            pointSize: 5,  // Adjust the point size for better visibility
            curveType: 'function',  // Smoothing for the lines
            chartArea: { width: '80%' },
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WasteageLineChart;
