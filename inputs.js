import * as dat from 'dat.gui';
import { Floating } from './floating';
import { ThrustForce } from './thrustForce';
import { AirFriction } from './airFriction';
import { WaterFriction } from './waterFriction';

export function setupGUI(water, ship) {
  // Initialize the GUI
  const gui = new dat.GUI();
// Setup Floating GUI elements
    const floatingInstance = new Floating();
    const floatingFolder = gui.addFolder('Floating');
    floatingFolder.add(floatingInstance.variables, 'm').name('Mass (Kg)').onChange((value) => floatingInstance.setVariable('m', value));
    floatingFolder.add(floatingInstance.variables, 'g').name('Gravity (m.s-2)').onChange((value) => floatingInstance.setVariable('g', value));
    floatingFolder.add(floatingInstance.variables, 'R').name('Radius (Kg.m-3)').onChange((value) => floatingInstance.setVariable('R', value));
    floatingFolder.add(floatingInstance.variables, 'V').name('Velocity (m-3)').onChange((value) => floatingInstance.setVariable('V', value));

    const floatingCalculateButton = { calculate: () => floatingInstance.calculateFloating(ship) };
    floatingFolder.add(floatingCalculateButton, 'calculate').name('Calculate W and F');
    floatingFolder.open();
    

  // Setup Thrust Force GUI elements
  const ThrustForceInstance = new ThrustForce();
    const thrustFolder = gui.addFolder('Thrust Force');
    thrustFolder.add(ThrustForceInstance.variables, 'R3').name('Radius (Kg.m-3)').onChange((value) => ThrustForceInstance.setVariable('R3', value));
    thrustFolder.add(ThrustForceInstance.variables, 'RPM').name('RPM (Rolls per Min)').onChange((value) => ThrustForceInstance.setVariable('RPM', value));
    thrustFolder.add(ThrustForceInstance.variables, 'PR3').name('Propeller Radius').onChange((value) => ThrustForceInstance.setVariable('PR3', value));
    thrustFolder.add(ThrustForceInstance.variables, 'LP3').name('Long Propeller').onChange((value) => ThrustForceInstance.setVariable('LP3', value));

    const thrustCalculateButton = { calculate: () => ThrustForceInstance.calculateThrustForce(ship) };
    thrustFolder.add(thrustCalculateButton, 'calculate').name('Calculate force of Thrust Force');
    thrustFolder.open();

     const Frictionofair = new AirFriction();
    const airFolder = gui.addFolder('Air Friction');
    airFolder.add(Frictionofair.variables, 'A2').name('space (m-2)').onChange((value) => Frictionofair.setVariable('A2', value));
    airFolder.add(Frictionofair.variables, 'R2').name('Radius (Kg.m-3)').onChange((value) => Frictionofair.setVariable('R2', value));
    airFolder.add(Frictionofair.variables, 'v2').name('speed (m.s-1)').onChange((value) => Frictionofair.setVariable('v2', value));
  
    const FrictionofairCalculateButton = { calculate: () => Frictionofair.calculateFrictionofair(ship) };
    airFolder.add(FrictionofairCalculateButton, 'calculate').name('Calculate force of Friction of air');
    airFolder.open();

    const waterfriction = new WaterFriction();
    const waterFolder = gui.addFolder('Water Friction');
    waterFolder.add(waterfriction.variables, 'A1').name('space (m-2)').onChange((value) => waterfriction.setVariable('A1', value));
    waterFolder.add(waterfriction.variables, 'R1').name('Radius (Kg.m-3)').onChange((value) => waterfriction.setVariable('R1', value));
    waterFolder.add(waterfriction.variables, 'v1').name('Water Speed (m.s-1)').onChange((value) => waterfriction.setVariable('v1', value));
    

    const waterFrictionCalculateButton = { calculate: () => waterfriction.calculateFrictionofwater(ship) };
    waterFolder.add(waterFrictionCalculateButton, 'calculate').name('Calculate force of Friction of water');
    waterFolder.open();
}