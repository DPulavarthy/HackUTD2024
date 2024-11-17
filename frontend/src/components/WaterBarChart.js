import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import Papa from 'papaparse';

const WaterBarChart = ({ csvFile, userDate, userTime }) => {
  const [chartData, setChartData] = useState([]);
  const [chartTitle, setChartTitle] = useState(''); 

  useEffect(() => {
    // Load and parse CSV file
    const fetchData = async () => {
      const response = await fetch(csvFile);
      const csvText = await response.text();
      const parsedData = Papa.parse(csvText, { header: true }).data;

      // Determine which data to use (default or user input)
      let filteredData = parsedData;
      let customDate = '';
      
      // Default to last 4 rows
      filteredData = parsedData.slice(-4);
      parsedData.filter(
        (row) =>  customDate = `${row.Date} ${row.Time}`
      );

      // Sort the data by Floor to ensure order from 1 to 4
      filteredData.sort((a, b) => parseInt(a.Floor) - parseInt(b.Floor));

      // Calculate water consumption per category and format data for the chart
      const formattedData = [
        ['Floor', 'Restrooms', 'Cooling System', 'Kitchen', 'Misc'],
        ...filteredData.map((row) => {
          const totalWater = parseFloat(row['Water Consumption (liters)']);
          const restrooms = (totalWater * parseFloat(row['% Restrooms'])) / 100;
          const coolingSystem = (totalWater * parseFloat(row['% Cooling System'])) / 100;
          const kitchen = (totalWater * parseFloat(row['% Kitchen'])) / 100;
          const misc = (totalWater * parseFloat(row['% Misc.'])) / 100;

          return [
            `Floor ${row.Floor}`,
            restrooms,
            coolingSystem,
            kitchen,
            misc,
          ];
        }),
      ];

      // Set chart data and dynamic title
      setChartData(formattedData);
      setChartTitle(`${customDate} Total Water Consumption`);
    };

    fetchData();
  }, [csvFile, userDate, userTime]);

  return (
    <div>
      {chartData.length > 0 ? (
        <Chart
          chartType="ColumnChart"
          width="100%"
          height="400px"
          data={chartData}
          options={{
            title: chartTitle,
            hAxis: { title: 'Floor'},
            vAxis: { title: 'Water Consumption (liters)' },
            chartArea: { width: '70%' },
            legend: { position: 'bottom' },
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WaterBarChart;
