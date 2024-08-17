import * as dat from 'dat.gui';
import { ThrustForce } from './thrustForce';
import { AirFriction } from './airFriction';
import { WaterFriction } from './waterFriction';
import { Total } from './total';

export const timeParams = {
  speed: 1.0,
};

new ThrustForce();  

export function setupGUI(water, ship) {
  const gui = new dat.GUI();
  
  var variables = {
    total: 0,
  };

  window.firstDigit = 0;

  const calculate = function() {
    const num = window.totalforce;
    if (num > 100000000) {
      if (num < 200000000) {
        window.firstDigit = 0.1;
      } else if (num < 300000000) {
        window.firstDigit = 0.2;
      } else if (num < 400000000) {
        window.firstDigit = 0.3;
      } else if (num < 500000000) {
        window.firstDigit = 0.4;
      } else if (num < 600000000) {
        window.firstDigit = 0.5;
      } else {
        window.firstDigit = 0.6;
      }
    } else {
      window.firstDigit = 0;
    }
    console.log(`\nTotal force simulation: ${window.firstDigit}`);
  };

  const calculateFrictionofThrustForceTotally = function() {
    console.log(`\nTotal force of thrust: ${window.totalforce} N`);
  };

  const put_initial_total = function() {
    window.totalforce = 0;
    console.log('Initial total force set to 0');
  };

  // GUI controls
  gui.add({ calculate: calculateFrictionofThrustForceTotally }, 'calculate').name('Calculate force of Thrust Force totally');
  gui.add({ put_initial_total: put_initial_total }, 'put_initial_total').name('Reset Total Force');

  gui.add(timeParams, 'speed', -7.0, 7.0).name('Water Speed (m.s-1)').onChange(v2 => {
    water.material.uniforms['time'].value = v2 / 60.0;  
    variables.v1 = v2;
  });

  const distortionParams = {
    scale: 3.7,
  };

  gui.add(distortionParams, 'scale', 30, 1000.0).name('Water Height (m)').onChange(value => {
    water.material.uniforms['distortionScale'].value = value;
  });

  return gui;
}
