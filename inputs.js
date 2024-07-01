import * as dat from 'dat.gui';
import { Floating } from './floating';
import { ThrustForce } from './thrustForce';
import { AirFriction } from './airFriction';
import { WaterFriction } from './waterFriction';
import { Wave } from './wave.js';

export function setupGUI(water, ship) {
  // Initialize the GUI
  const gui = new dat.GUI();

  // Setup Floating GUI elements
  const floatingInstance = new Floating();
  const floatingFolder = gui.addFolder('Floating');
  floatingFolder.add(floatingInstance.variables, 'm', 0, 64000, 0.1).name('Mass (Kg)').onChange((value) => floatingInstance.setVariable('m', value));
  floatingFolder.add(floatingInstance.variables, 'g', -20, 20, 0.1).name('Gravity (m.s-2)').onChange((value) => floatingInstance.setVariable('g', value));
  floatingFolder.add(floatingInstance.variables, 'R', 0, 1000, 0.1).name('Radius (Kg.m-3)').onChange((value) => floatingInstance.setVariable('R', value));
  floatingFolder.add(floatingInstance.variables, 'V', 0, 64000, 0.1).name('Velocity (m-3)').onChange((value) => floatingInstance.setVariable('V', value));
  const floatingCalculateButton = { calculate: () => floatingInstance.calculateFloating(ship) };
  floatingFolder.add(floatingCalculateButton, 'calculate').name('Calculate W and F');
  floatingFolder.open();

  // Setup Thrust Force GUI elements
  const ThrustForceInstance = new ThrustForce();
  const thrustFolder = gui.addFolder('Thrust Force');
  thrustFolder.add(ThrustForceInstance.variables, 'R3', 0, 1000, 0.1).name('Radius (Kg.m-3)').onChange((value) => ThrustForceInstance.setVariable('R3', value));
  thrustFolder.add(ThrustForceInstance.variables, 'RPM', 0, 150, 10).name('RPM (Rolls per Min)').onChange((value) => ThrustForceInstance.setVariable('RPM', value));
  thrustFolder.add(ThrustForceInstance.variables, 'PR3', 0, 20, 0.1).name('Propeller Radius').onChange((value) => ThrustForceInstance.setVariable('PR3', value));
  thrustFolder.add(ThrustForceInstance.variables, 'LP3', 0, 7, 0.1).name('Long Propeller').onChange((value) => ThrustForceInstance.setVariable('LP3', value));
  const thrustCalculateButton = { calculate: () => ThrustForceInstance.calculateThrustForce(ship) };
  thrustFolder.add(thrustCalculateButton, 'calculate').name('Calculate force of Thrust Force');
  thrustFolder.open();


  // Setup Air Friction GUI elements
  const Frictionofair = new AirFriction();
  const airFolder = gui.addFolder('Air Friction');
  airFolder.add(Frictionofair.variables, 'A2', 0, 440, 0.1).name('Space (m-2)').onChange((value) => Frictionofair.setVariable('A2', value));
  airFolder.add(Frictionofair.variables, 'R2', 0, 1000, 0.1).name('Radius (Kg.m-3)').onChange((value) => Frictionofair.setVariable('R2', value));
  airFolder.add(Frictionofair.variables, 'v2', -21, 21, 0.1).name('Speed (m.s-1)').onChange((value) => Frictionofair.setVariable('v2', value));
  const FrictionofairCalculateButton = { calculate: () => Frictionofair.calculateFrictionofair(ship) };
  airFolder.add(FrictionofairCalculateButton, 'calculate').name('Calculate force of Friction of air');
  airFolder.open();

  // Setup Water Friction GUI elements
  const waterFriction = new WaterFriction();
  const waterFolder = gui.addFolder('Water Friction');
  waterFolder.add(waterFriction.variables, 'A1', 0, 160, 0.1).name('Space (m-2)').onChange((value) => waterFriction.setVariable('A1', value));
  waterFolder.add(waterFriction.variables, 'R1', 0, 1000, 0.1).name('Radius (Kg.m-3)').onChange((value) => waterFriction.setVariable('R1', value));
  waterFolder.add(waterFriction.variables, 'v1', -7, 7, 0.1).name('Water Speed (m.s-1)').onChange((value) => waterFriction.setVariable('v1', value));
  const FrictionofwaterCalculateButton = { calculate: () => waterFriction.calculateFrictionofwater(ship) };
  waterFolder.add(FrictionofwaterCalculateButton, 'calculate').name('Calculate force of Friction of water');
  waterFolder.open();
  

  // Setup Wave Friction GUI elements
  const Frictionofwave = new Wave(ship);
  const waveFolder = gui.addFolder('Wave Friction');
  waveFolder.add(Frictionofwave.variables, 'Q', 0, 100, 0.1).name('Amplitude (cm)').onChange(value => Frictionofwave.setVariable('Q', value));
  waveFolder.add(Frictionofwave.variables, 'F', 0.04, 100, 1).name('Freq (HZ/100)').onChange(value => Frictionofwave.setVariable('F', value));
  const FrictionofwaveCalculateButton = { calculate: () => Frictionofwave.calculateFrictionOfWave() };
  waveFolder.add(FrictionofwaveCalculateButton, 'calculate').name('Calculate force of Friction of wave');
  waveFolder.open();
}

