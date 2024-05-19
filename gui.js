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
    const num = window.totalforce; // Assuming variables.total is the number (e.g., x.3133124)
    const digitsBeforeDecimal = parseInt(num.toString().charAt(0)); // Extract the first digit before the decimal point
    const digitsAfterDecimal = parseFloat(num.toString().slice(1, 7)); // Extract the 6 digits after the decimal point
    
    window.firstDigit = parseFloat(`${digitsBeforeDecimal}.${digitsAfterDecimal}`);
    window.firstDigit =window.firstDigit*0.5;
      confirm('\nTotal force simulation: ' + window.firstDigit);
    
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