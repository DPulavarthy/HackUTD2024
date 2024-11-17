import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import Papa from 'papaparse';

const CarbonBarChart = ({ csvFile, userDate, userTime }) => {
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
      
      // Default to last 20 rows
      filteredData = parsedData.slice(-20);

      // Fetch the most recent date for the title
      if (filteredData.length > 0) {
        customDate = `${filteredData[filteredData.length - 1].Date} ${filteredData[filteredData.length - 1].Time}`;
      }

      // Sort the data by Floor to ensure order from 1 to 4
      filteredData.sort((a, b) => parseInt(a.Floor) - parseInt(b.Floor));

      // Prepare chart data
      const formattedData = [
        ['Floor', 'HVAC', 'Lighting', 'Computing', 'Refrigeration', 'Office Equipment'],
      ];

      // Initialize data for each floor
      const floors = [1, 2, 3, 4];
      floors.forEach((floor) => {
        const floorData = filteredData.filter((row) => row.Floor == floor);
        
        // Calculate the total emissions for each source type for this floor
        const hvac = floorData.filter((row) => row['Source Type'] === 'HVAC').reduce((sum, row) => sum + parseFloat(row['Carbon Emissions (kg CO₂)']), 0);
        const lighting = floorData.filter((row) => row['Source Type'] === 'Lighting').reduce((sum, row) => sum + parseFloat(row['Carbon Emissions (kg CO₂)']), 0);
        const computing = floorData.filter((row) => row['Source Type'] === 'Computing').reduce((sum, row) => sum + parseFloat(row['Carbon Emissions (kg CO₂)']), 0);
        const refrigeration = floorData.filter((row) => row['Source Type'] === 'Refrigeration').reduce((sum, row) => sum + parseFloat(row['Carbon Emissions (kg CO₂)']), 0);
        const officeEquip = floorData.filter((row) => row['Source Type'] === 'Office Equipment').reduce((sum, row) => sum + parseFloat(row['Carbon Emissions (kg CO₂)']), 0);
        
        // Add the data for this floor to the chart data
        formattedData.push([
          `Floor ${floor}`, hvac, lighting, computing, refrigeration, officeEquip
        ]);
      });

      // Set chart data and dynamic title
      setChartData(formattedData);
      setChartTitle(`Total Carbon Emissions`);
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
            backgroundColor: '#c9e89b',
            titleTextStyle: {
              color: '#624c50',
            },
            textStyle: {
              color: '#624c50'
            },
            hAxis: {
              title: 'Floor',
              titleTextStyle: {
                color: '#624c50',
              },
              textStyle: {
                color: '#624c50'
              },
            },
            vAxis: { 
              title: 'Carbon Emissions (kg CO₂)',
              titleTextStyle: {
                color: '#624c50',
              },
              textStyle: {
                color: '#624c50'
              }, 
            },
            chartArea: { width: '70%' },
            legend: { position: 'bottom' },
            bar: { groupWidth: '75%' }, // Grouping bars together
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CarbonBarChart;
