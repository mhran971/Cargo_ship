import * as dat from 'dat.gui';
import { ThrustForce } from './thrustForce';
import { AirFriction } from './airFriction';
import { WaterFriction } from './waterFriction';
import { Total } from './total';
export const timeParams = {
  speed: 1.0,
};

new ThrustForce(); // Initialize ThrustForce which
export function setupGUI(water, ship) {
  const gui = new dat.GUI();
  
  var variables = {
    total: 0,
  };

  window.firstDigit = 0;

  var calculate = function() {
    const num = window.totalforce;
    if (window.totalforce > 100000000) {
      if (window.totalforce < 200000000 && window.totalforce > 100000000) {
        window.firstDigit = 0.1;
        confirm('\nTotal force simulation: ' + window.firstDigit);
      } else if (window.totalforce < 300000000 && window.totalforce > 200000000) {
        window.firstDigit = 0.2;
        confirm('\nTotal force simulation: ' + window.firstDigit);
      } else if (window.totalforce < 400000000 && window.totalforce > 300000000) {
        window.firstDigit = 0.3;
        confirm('\nTotal force simulation: ' + window.firstDigit);
      } else if (window.totalforce < 500000000 && window.totalforce > 400000000) {
        window.firstDigit = 0.4;
        confirm('\nTotal force simulation: ' + window.firstDigit);
      } else if (window.totalforce < 600000000 && window.totalforce > 500000000) {
        window.firstDigit = 0.5;
        confirm('\nTotal force simulation: ' + window.firstDigit);
      } else if (window.totalforce > 600000000) {
        window.firstDigit = 0.6;
        confirm('\nTotal force simulation: ' + window.firstDigit);
      }
    } else {
      window.firstDigit = 0;
      confirm('\nTotal force simulation: ' + window.firstDigit);
    }
  };


  
  const calculateFrictionofThrustForceTotally = function () {
    confirm(`\nTotal force of thrust: ${window.totalforce} N`);
  };
  var calculateButton = { calculate: calculateFrictionofThrustForceTotally };
  gui.add(calculateButton, 'calculate').name('Calculate force of Thrust Force totally');

    
     ///////////////////////////////////////////////////////////////////////////
      var calculateButton = { calculate: calculate };
      gui.add(calculateButton, 'calculate').name('Calculate speed of cargo ship');
     
  

   gui.add(timeParams, 'speed', -20.0, 20.0)
   .name('Water Speed (m.s-1)')
   .onChange((v2) => {
       // Update the time speed when the GUI control changes
       var speedofwater = water.material.uniforms['time'].v2 = v2 / 60.0;
       variables.v1 = v2; // Set the value of variables.v1 with the value of timeParams.speed
   })
    
    const distortionParams = {
    scale: 3.7,
    };
    
    gui.add(distortionParams, 'scale', 1.0, 1000.0) .name('Water Height (m)') .onChange((value) => {
    // Update the water height when the GUI control changes
    water.material.uniforms['distortionScale'].value = value; });
    
   
    
    return gui;
    
    }