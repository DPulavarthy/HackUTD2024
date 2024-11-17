import '../styles/Home.css'
import Navbar from '../components/Navbar';
import React, { useEffect } from 'react';

export default () => {

return (
    <>
        <Navbar />
        <div class="home-container"> 
            <button>SPLIT</button>
            <div class="left"></div>
            <div class="right">
              <img class="building-img" src="fake-building.jpg"/>
              <div class="chart-display-container">
                  <div class="chart-container" id="power">
                      <img src="fake-building.jpg" class="chart" />
                      <h3 class="name"> Power </h3>
                  </div>
                  <div class="chart-container" id="water">
                      <img src="fake-building.jpg" class="chart" />
                      <h3 class="name"> Water </h3>
                  </div>
                  <div class="chart-container" id="access">
                      <img src="fake-building.jpg" class="chart" />
                      <h3 class="name"> Access </h3>
                  </div>
                  <div class="chart-container" id="carbon">
                      <img src="fake-building.jpg" class="chart" />
                      <h3 class="name"> Carbon </h3>
                  </div>
                  <div class="chart-container" id="cost">
                      <img src="fake-building.jpg" class="chart" />
                      <h3 class="name"> Cost </h3>
                  </div>
                  <div class="chart-container" id="cost">
                      <img src="fake-building.jpg" class="chart" />
                      <h3 class="name"> Waste </h3>
                  </div>
              </div>
            </div>
        </div>
    </>
)};