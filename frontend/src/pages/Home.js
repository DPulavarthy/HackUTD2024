import '../styles/Home.css';
import Navbar from '../components/Navbar';
import React, { useState } from 'react';
import Speech from '../components/Speech';
import { pinata, getFile, getAllFiles } from '../utils/config.js';
import Papa from 'papaparse';
import { Chart } from 'react-google-charts';
import PowerBarChart from '../components/PowerBarChart';
import WaterBarChart from '../components/WaterBarChart';
import CarbonBarChart from '../components/CarbonBarChart';
import WasteBarChart from '../components/WasteBarChart';
import FloorBarChart from '../components/FloorBarChart';
import CostBarChart from '../components/CostBarChart';

export default () => {

  const [isSplit, setIsSplit] = useState(false);

  const handleSplit = () => {
    setIsSplit((prev) => !prev);
  };

  return (<>
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
            <PowerBarChart className="chart" csvFile={'/electricityData.csv'} />
            <h3 className="name">Power</h3>
          </div>
          <div className="chart-container" id="water">
            <WaterBarChart className="chart" csvFile={'/waterData.csv'} />
            <h3 className="name">Water</h3>
          </div>
          <div className="chart-container" id="carbon">
            <CarbonBarChart className="chart" csvFile={'/carbonData.csv'} />
            <h3 className="name">Carbon</h3>
          </div>
          <div className="chart-container" id="cost">
            <CostBarChart className="chart" electricityFile={'electrictyData.csv'} waterFile={'waterData.csv'} />
            <h3 className="name">Cost</h3>
          </div>

          <div className="chart-container" id="waste">
            <WasteBarChart className="chart" csvFile={'/wasteData.csv'} />
            <h3 className="name">Waste</h3>
          </div>
          <div className="chart-container" id="floor">
            <FloorBarChart className="chart" csvFile={'/floorData.csv'} />
            <h3 className="name">Floor</h3>
          </div>
          {isSplit && <>
            <div className="chart-container" id="power">
              <PowerBarChart className="chart" csvFile={'/electricityData.csv'} />
              <h3 className="name">Power</h3>
            </div>
            <div className="chart-container" id="water">
              <WaterBarChart className="chart" csvFile={'/waterData.csv'} />
              <h3 className="name">Water</h3>
            </div>
            <div className="chart-container" id="carbon">
              <CarbonBarChart className="chart" csvFile={'/carbonData.csv'} />
              <h3 className="name">Carbon</h3>
            </div>
            <div className="chart-container" id="cost">
              <CostBarChart className="chart" electricityFile={'electrictyData.csv'} waterFile={'waterData.csv'} />
              <h3 className="name">Cost</h3>
            </div>

            <div className="chart-container" id="waste">
              <WasteBarChart className="chart" csvFile={'/wasteData.csv'} />
              <h3 className="name">Waste</h3>
            </div>
            <div className="chart-container" id="floor">
              <FloorBarChart className="chart" csvFile={'/floorData.csv'} />
              <h3 className="name">Floor</h3>
            </div>
          </>}
        </div>
      </div>
    </div>


  </>);
};
