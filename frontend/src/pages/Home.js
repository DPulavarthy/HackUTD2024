// import '../styles/Home.css'
// import Navbar from '../components/Navbar';
// import React, { useEffect } from 'react';

// export default () => {

// return (
//     <>
//         <Navbar />
//         <div class="home-container"> 
//             <button>SPLIT</button>
//             <div class="left"></div>
//             <div class="right">
//               <img class="building-img" src="fake-building.jpg"/>
//               <div class="chart-display-container">
//                   <div class="chart-container" id="power">
//                       <img src="fake-building.jpg" class="chart" />
//                       <h3 class="name"> Power </h3>
//                   </div>
//                   <div class="chart-container" id="water">
//                       <img src="fake-building.jpg" class="chart" />
//                       <h3 class="name"> Water </h3>
//                   </div>
//                   <div class="chart-container" id="access">
//                       <img src="fake-building.jpg" class="chart" />
//                       <h3 class="name"> Access </h3>
//                   </div>
//                   <div class="chart-container" id="carbon">
//                       <img src="fake-building.jpg" class="chart" />
//                       <h3 class="name"> Carbon </h3>
//                   </div>
//                   <div class="chart-container" id="cost">
//                       <img src="fake-building.jpg" class="chart" />
//                       <h3 class="name"> Cost </h3>
//                   </div>
//                   <div class="chart-container" id="cost">
//                       <img src="fake-building.jpg" class="chart" />
//                       <h3 class="name"> Waste </h3>
//                   </div>
//               </div>
//             </div>
//         </div>
//     </>
// )};

import '../styles/Home.css';
import Navbar from '../components/Navbar';
import React, { useState } from 'react';
import Speech from '../components/Speech';
import BarChart from '../components/BarChart';
import pinata from '../utils/config.js';

export default () => {
  const [isSplit, setIsSplit] = useState(false);

  const handleSplit = () => {
    setIsSplit((prev) => !prev);
  };

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
        <div className={`right ${isSplit ? 'split' : ''}`}>
          {/* <img className="building-img" src="fake-building.jpg" /> */}
          <BarChart />
          <div className={`chart-display-container ${isSplit ? 'split' : ''}`}>
            <div className="chart-container" id="power">
              <img src="fake-building.jpg" className="chart" />
              <h3 className="name">Power</h3>
            </div>
            <div className="chart-container" id="water">
              <img src="fake-building.jpg" className="chart" />
              <h3 className="name">Water</h3>
            </div>
            <div className="chart-container" id="access">
              <img src="fake-building.jpg" className="chart" />
              <h3 className="name">Access</h3>
            </div>
            <div className="chart-container" id="carbon">
              <img src="fake-building.jpg" className="chart" />
              <h3 className="name">Carbon</h3>
            </div>
            <div className="chart-container" id="cost">
              <img src="fake-building.jpg" className="chart" />
              <h3 className="name">Cost</h3>
            </div>
            <div className="chart-container" id="waste">
              <img src="fake-building.jpg" className="chart" />
              <h3 className="name">Waste</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
