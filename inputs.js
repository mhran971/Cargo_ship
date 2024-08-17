import * as dat from 'dat.gui';
import { Floating } from './floating';
import { ThrustForce } from './thrustForce';
import { AirFriction } from './airFriction';
import { WaterFriction } from './waterFriction';
import { Wave } from './wave.js';

export function setupGUI(water, ship) {
   const gui = new dat.GUI();

   let airFrictionUpdated = false;
  let waterFrictionUpdated = false;
  let thrustForceUpdated = false;

   function debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

   function checkAndRunFinalFunction() {
    if ((airFrictionUpdated && waterFrictionUpdated && thrustForceUpdated)!=0) {
      runFinalFunction();
    }
  }

   const floatingInstance = new Floating();
  floatingInstance.variables.g = 10; 
  const floatingFolder = gui.addFolder('Floating');
  floatingFolder.add(floatingInstance.variables, 'm', 0, 6400000, 0.1).name('Mass (Kg)').onChange(debounce(() => floatingInstance.calculateFloating(ship), 500));
  floatingFolder.add(floatingInstance.variables, 'g', -20, 20, 0.1).name('Gravity (m.s-2)').onChange(debounce(() => floatingInstance.calculateFloating(ship), 500));
  floatingFolder.add(floatingInstance.variables, 'R', 0, 1000, 0.1).name('Radius (Kg.m-3)').onChange(debounce(() => floatingInstance.calculateFloating(ship), 500));
  floatingFolder.add(floatingInstance.variables, 'V', 0, 64000, 0.1).name('Velocity (m-3)').onChange(debounce(() => floatingInstance.calculateFloating(ship), 500));
  floatingFolder.open();

   const thrustForceInstance = new ThrustForce();
  const thrustFolder = gui.addFolder('Thrust Force');
  thrustFolder.add(thrustForceInstance.variables, 'R3', 0, 1000, 0.1).name('Radius (Kg.m-3)').onChange(debounce(() => {
    thrustForceInstance.calculateThrustForce(ship);
    thrustForceUpdated = true;
    checkAndRunFinalFunction();
  }, 500));
  thrustFolder.add(thrustForceInstance.variables, 'RPM', 0, 150, 10).name('RPM (Rolls per Min)').onChange(debounce(() => {
    thrustForceInstance.calculateThrustForce(ship);
    thrustForceUpdated = true;
    checkAndRunFinalFunction();
  }, 500));
  thrustFolder.add(thrustForceInstance.variables, 'PR3', 0, 20, 0.1).name('Propeller Radius').onChange(debounce(() => {
    thrustForceInstance.calculateThrustForce(ship);
    thrustForceUpdated = true;
    checkAndRunFinalFunction();
  }, 500));
  thrustFolder.add(thrustForceInstance.variables, 'LP3', 0, 7, 0.1).name('Long Propeller').onChange(debounce(() => {
    thrustForceInstance.calculateThrustForce(ship);
    thrustForceUpdated = true;
    checkAndRunFinalFunction();
  }, 500));
  thrustFolder.open();

   const airFriction = new AirFriction();
  const airFolder = gui.addFolder('Air Friction');
  airFolder.add(airFriction.variables, 'A2', 0, 440, 0.1).name('Space (m-2)').onChange(debounce(() => {
    airFriction.calculateFrictionofair(ship);
    airFrictionUpdated = true;
    checkAndRunFinalFunction();
  }, 500));
  airFolder.add(airFriction.variables, 'R2', 0, 1000, 0.1).name('Radius (Kg.m-3)').onChange(debounce(() => {
    airFriction.calculateFrictionofair(ship);
    airFrictionUpdated = true;
    checkAndRunFinalFunction();
  }, 500));
  airFolder.add(airFriction.variables, 'v2', -21, 21, 0.1).name('Speed (m.s-1)').onChange(debounce(() => {
    airFriction.calculateFrictionofair(ship);
    airFrictionUpdated = true;
    checkAndRunFinalFunction();
  }, 500));
  airFolder.open();

   const waterFriction = new WaterFriction();
  const waterFolder = gui.addFolder('Water Friction');
  waterFolder.add(waterFriction.variables, 'A1', 0, 160, 0.1).name('Space (m-2)').onChange(debounce(() => {
    waterFriction.calculateFrictionofwater(ship);
    waterFrictionUpdated = true;
    checkAndRunFinalFunction();
  }, 500));
  waterFolder.add(waterFriction.variables, 'R1', 0, 1000, 0.1).name('Radius (Kg.m-3)').onChange(debounce(() => {
    waterFriction.calculateFrictionofwater(ship);
    waterFrictionUpdated = true;
    checkAndRunFinalFunction();
  }, 500));
  waterFolder.add(waterFriction.variables, 'v1', -7, 7, 0.1).name('Water Speed (m.s-1)').onChange(debounce(() => {
    waterFriction.calculateFrictionofwater(ship);
    waterFrictionUpdated = true;
    checkAndRunFinalFunction();
  }, 500));
  waterFolder.open();

  const waveInstance = new Wave(ship);
  const waveFolder = gui.addFolder('Wave Friction');
  
   const debouncedCalculateWaveFriction = debounce(() => {
    waveInstance.calculateFrictionOfWave();
  }, 500);
  
  waveFolder.add(waveInstance.variables, 'Q', 0, 100, 0.1).name('Amplitude (cm)').onChange(value => {
    waveInstance.setVariable('Q', value);
    debouncedCalculateWaveFriction();
  });
  waveFolder.add(waveInstance.variables, 'F', 0.04, 100, 1).name('Freq (HZ/100)').onChange(value => {
    waveInstance.setVariable('F', value);
    debouncedCalculateWaveFriction();
  });
  
  waveFolder.open();

   function runFinalFunction() {
    console.log(`\nTotal force of thrust: ${window.totalforce} N`);
    calculate();
  }
  var calculate = function() {
    const num = window.totalforce;
    if (window.totalforce > 100000000) {
      if (window.totalforce < 200000000 && window.totalforce > 100000000) {
        window.firstDigit = 0.1;
        console.log('\nTotal force simulation: ' + window.firstDigit);
      } else if (window.totalforce < 300000000 && window.totalforce > 200000000) {
        window.firstDigit = 0.2;
        console.log('\nTotal force simulation: ' + window.firstDigit);
      } else if (window.totalforce < 400000000 && window.totalforce > 300000000) {
        window.firstDigit = 0.3;
        console.log('\nTotal force simulation: ' + window.firstDigit);
      } else if (window.totalforce < 500000000 && window.totalforce > 400000000) {
        window.firstDigit = 0.4;
        console.log('\nTotal force simulation: ' + window.firstDigit);
      } else if (window.totalforce < 600000000 && window.totalforce > 500000000) {
        window.firstDigit = 0.5;
        console.log('\nTotal force simulation: ' + window.firstDigit);
      } else if (window.totalforce > 600000000) {
        window.firstDigit = 0.6;
        console.log('\nTotal force simulation: ' + window.firstDigit);
      }
    } else {
      window.firstDigit = 0;
      console.log('\nTotal force simulation: ' + window.firstDigit);
    }
  };
}
