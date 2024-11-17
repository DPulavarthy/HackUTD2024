import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import Papa from 'papaparse';

const PowerBarChart = ({ csvFile, userDate, userTime }) => {
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
      
      //
      filteredData = filteredData = parsedData.slice(-4);
      parsedData.filter(
        (row) =>  customDate = `${row.Date} ${row.Time}`
      );

      // Calculate energy consumption per category and format data for the chart
      const formattedData = [
        ['Floor', 'Lighting', 'HVAC', 'Computing', 'Refrigeration', 'Office Equipment', 'Water Heating', 'Misc'],
        ...filteredData.map((row) => {
          const totalEnergy = parseFloat(row['Total Energy Consumed (kWh)']);
          const lighting = (totalEnergy * parseFloat(row['% Lighting Consumption'])) / 100;
          const hvac = (totalEnergy * parseFloat(row['% HVAC Consumption'])) / 100;
          const computing = (totalEnergy * parseFloat(row['% Computing Consumption'])) / 100;
          const refrigeration = (totalEnergy * parseFloat(row['% Refrigeration Consumption'])) / 100;
          const officeEquip = (totalEnergy * parseFloat(row['% Office Equipment'])) / 100;
          const waterHeating = (totalEnergy * parseFloat(row['% Water Heating'])) / 100;
          const misc = (totalEnergy * parseFloat(row['% Misc.'])) / 100;

          return [
            `Floor ${row.Floor}`,
            lighting,
            hvac,
            computing,
            refrigeration,
            officeEquip,
            waterHeating,
            misc,
          ];
        }),
      ];

      setChartData(formattedData);
      setChartTitle(`${customDate} Total Energy Consumption`);
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
            vAxis: { title: 'Total Energy Consumed (kWh)' },
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

export default PowerBarChart;
