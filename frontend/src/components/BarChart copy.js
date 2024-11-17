import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Chart } from 'react-google-charts';

const BarChart = ({chart_title, chart_type, graphType, csvFilePath, csvFilesPath, axes, stacked, filter}) => {

  const [data, setData] = useState([]);

  useEffect(() => {
    let xAxis = csvFilesPath ? 'Date' : (axes && axes.x ? axes.x : 'Source Type');  // More explicit fallback
    let yAxis = csvFilesPath ? 'Cost (USD)' : (axes && axes.y ? axes.y : 'Carbon Emissions (kg CO₂)');
    const chartData = [[xAxis, yAxis]];
    const emissionsBySource = {};

    const processCSVData = (csvPath) => {
      return new Promise((resolve, reject) => {
        Papa.parse(csvPath, {
          download: true,
          header: true, // Set to true if your CSV has headers
          complete: (result) => {
            result.data.forEach((row) => {
              // console.log('row',row)
              // console.log('row-cost: ',row['Cost (USD)'])
              const sourceType = row[xAxis];
              const emissions = parseFloat(row[yAxis]) || 0; // Aggregate emissions by Source Type
              if (!emissionsBySource[sourceType]) {
                emissionsBySource[sourceType] = 0;
              }
              emissionsBySource[sourceType] += emissions;
              console.log(emissions);
            });
            resolve();
          },
          error: (error) => reject(error),
        });
      });
    };

    const loadData = async () => {
      try {
        const filterCondition = (row) => parseFloat(row['Cost']) > 100;
        if (filter) {
          await filterCSVData(csvFilePath, filterCondition);
        }
        // First process the csvFilePath if provided
        if (csvFilePath) {
          await processCSVData(csvFilePath);
        }

        // Then process the csvFilesPath if provided
        if (csvFilesPath) {
          await processCSVData(csvFilesPath);
        }

        // Convert aggregated data to array format
        for (const [sourceType, emissions] of Object.entries(emissionsBySource)) {
          chartData.push([sourceType, emissions]);
        }

        

        setData(chartData);
      } catch (error) {
        console.error('Error processing CSV data:', error);
      }
    };

    const filterCSVData = (csvPath, filterLastNRows = 4) => {
      return new Promise((resolve, reject) => {
        Papa.parse(csvFilePath, {
          download: true,
          header: true, // Set to true if your CSV has headers
          complete: (result) => {
            let rows = result.data;
    
            // If sorting by a column like 'Date'
            // if (rows[0]?.Date) { // Check if the 'Date' column exists
            //   rows = rows.sort((a, b) => new Date(a.Date) - new Date(b.Date)); // Sort by date ascending
            // }
    
            // Take the last N rows
            rows = rows.slice(-filterLastNRows);
    
            // Aggregate data for the last N rows
            rows.forEach((row) => {
              const sourceType = row[xAxis];
              const emissions = parseFloat(row[yAxis]) || 0; // Aggregate emissions by Source Type
              if (!emissionsBySource[sourceType]) {
                emissionsBySource[sourceType] = 0;
              }
              emissionsBySource[sourceType] += emissions;
            });
    
            resolve();
          },
          error: (error) => reject(error),
        });
      });
    };

    loadData();
  }, [csvFilePath, csvFilesPath, axes]);


  return (
    <div>
      <h1>{chart_title}</h1>
      {data.length > 1 ? (
        <Chart
          chartType={graphType}
          data={data}
          width="100%"
          height="400px"
          options={{
            title: `${chart_title}`,
            backgroundColor: '#c9e89b',
            titleTextStyle: {
              color: '#624c50',
            },
            textStyle: {
              color: '#624c50'
            },
            chartArea: { width: '60%' },
            hAxis: {
              title: csvFilesPath ? "Date" : axes.x,
              titleTextStyle: {
                color: '#624c50',
              },
              textStyle: {
                color: '#624c50'
              },
              minValue: 0,
            },
            vAxis: {
              title: csvFilesPath ? "Cost" : axes.y,
              titleTextStyle: {
                color: '#624c50',
              },
              textStyle: {
                color: '#624c50'
              },
            },
            bars: 'horizontal', // Render bars horizontally
            series: {
              0: { color: 'f48024' }, // Color for the first series
            },
            // isStacked: true,
            legend:{
              titleTextStyle: {
                color: '#624c50',
              },
              textStyle: {
                color: '#624c50'
              },
            }
          }}
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default BarChart;
