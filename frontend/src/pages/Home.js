import '../styles/Home.css';
import Navbar from '../components/Navbar';
import React, { useState } from 'react';
import Speech from '../components/Speech';
import BarChart from '../components/BarChart';
import { pinata, getFile, getAllFiles } from '../utils/config.js';

export default () => {
  const [isSplit, setIsSplit] = useState(false);

  const handleSplit = () => {
    setIsSplit((prev) => !prev);
  };

  // getFile('carbonData.csv')
  // getAllFiles();

  return (
    <>
      <Navbar />
      <div className='center'>
        <button onClick={handleSplit}>
          <img src="wizard.png" alt="split" />
        </button>
      </div>
      <div className={`home-container ${isSplit ? 'split-view' : ''}`}>
        <div className={`left ${isSplit ? 'visible' : 'hidden'}`}>
          <Speech />
        </div>
        <div className={`right ${isSplit ? 'split flowset' : ''}`}>
          <div className={`chart-display-container ${isSplit ? 'split animate' : ''}`}>
            <div className="chart-container" id="power">
              <BarChart className="chart" chart_type="power" chart_title="Energy Consumption by Floor" csvFilePath={'/electricityData.csv'} axes={{ 'x': 'Floor', 'y': 'Total Energy Consumed (kWh)' }} graphType="PieChart" />
              <h3 className="name">Power</h3>
            </div>
            <div className="chart-container" id="water">
              <BarChart className="chart" chart_type="water" chart_title="Water Consumption by Day" csvFilePath={'/waterData.csv'} axes={{ 'x': 'Date', 'y': 'Water Consumption (liters)' }} graphType="PieChart" />
              <h3 className="name">Water</h3>
            </div>
            <div className="chart-container" id="access">
              <BarChart className="chart" chart_type="access" chart_title="# of People occupying by Day" csvFilePath={'/floorData.csv'} axes={{ 'x': 'Date', 'y': '# of People' }} graphType="AreaChart" />
              <h3 className="name">Access</h3>
            </div>
            <div className="chart-container" id="cost">
              <BarChart className="chart" chart_type="cost" chart_title="Total Cost of Utilities" csvFilePath={'/waterData.csv'} csvFilesPath={'electricityData.csv'} axes={{ 'x': 'Source Type', 'y': '' }} graphType="BarChart" />
              <h3 className="name">Cost</h3>
            </div>
            <div className="chart-container" id="carbon">
              <BarChart className="chart" chart_type="carbon" chart_title="Carbon Emissions by Source" csvFilePath={'/carbonData.csv'} axes={{ 'x': 'Source Type', 'y': 'Carbon Emissions (kg CO₂)' }} graphType="BarChart" />
              <h3 className="name">Carbon</h3>
            </div>
            <div className="chart-container" id="waste">
              <BarChart className="chart" chart_type="waste" chart_title="Wastage by Floor" csvFilePath={'/wasteData.csv'} axes={{ 'x': 'Floor', 'y': 'Wasteage (kg)' }} graphType="LineChart" />
              <h3 className="name">Waste</h3>
            </div>
            {isSplit && <>
              <div className="chart-container dupe" id="power">
                <BarChart className="chart" chart_type="power" chart_title="Energy Consumption by Floor" csvFilePath={'/electricityData.csv'} axes={{ 'x': 'Floor', 'y': 'Total Energy Consumed (kWh)' }} graphType="PieChart" />
                <h3 className="name">Power</h3>
              </div>
              <div className="chart-container dupe" id="water">
                <BarChart className="chart" chart_type="water" chart_title="Water Consumption by Day" csvFilePath={'/waterData.csv'} axes={{ 'x': 'Date', 'y': 'Water Consumption (liters)' }} graphType="PieChart" />
                <h3 className="name">Water</h3>
              </div>
              <div className="chart-container dupe" id="access">
                <BarChart className="chart" chart_type="access" chart_title="# of People occupying by Day" csvFilePath={'/floorData.csv'} axes={{ 'x': 'Date', 'y': '# of People' }} graphType="AreaChart" />
                <h3 className="name">Access</h3>
              </div>
              <div className="chart-container dupe" id="cost">
                <BarChart className="chart" chart_type="cost" chart_title="Total Cost of Utilities" csvFilePath={'/waterData.csv'} csvFilesPath={'electricityData.csv'} axes={{ 'x': 'Source Type', 'y': '' }} graphType="BarChart" />
                <h3 className="name">Cost</h3>
              </div>
              <div className="chart-container dupe" id="carbon">
                <BarChart className="chart" chart_type="carbon" chart_title="Carbon Emissions by Source" csvFilePath={'/carbonData.csv'} axes={{ 'x': 'Source Type', 'y': 'Carbon Emissions (kg CO₂)' }} graphType="BarChart" />
                <h3 className="name">Carbon</h3>
              </div>
              <div className="chart-container dupe" id="waste">
                <BarChart className="chart" chart_type="waste" chart_title="Wasteage by Floor" csvFilePath={'/wasteData.csv'} axes={{ 'x': 'Floor', 'y': 'Wasteage (kg)' }} graphType="LineChart" />
                <h3 className="name">Waste</h3>
              </div>
            </>}
          </div>
        </div>
      </div>
    </>
  );
};
