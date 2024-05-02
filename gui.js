import * as dat from 'dat.gui';

export const timeParams = {
  speed: 1.0,
};

export function setupGUI(water, ship) {
    const gui = new dat.GUI();
    
    var variables = {
    m: 0, // mass
    g: 0, // acceleration due to gravity
    R: 0, // radius
    V: 0, // velocity
    };
    
    var allVariablesSet = false;
    var floating =true;
    // Calculate W and F
    var calculate = function () {
    if (setVariablesSetFlag) {
    
    var W = variables.m * variables.g;
    var F = variables.R * variables.V * variables.g;
  
    // Or display the results in an alert box
    //alert('W: ' + W + '\nF: ' + F);
    
    if (F < W) {
        var floating = false;
        // alert('The ship will sink');
      
        var startTime = Date.now();
        var duration = 5000; // Two seconds
      
        function updateShipPosition() {
          var elapsed = Date.now() - startTime;
          var progress = elapsed / duration;
          var deltaPos = 0.2 * progress;
          ship.speed.pos -= deltaPos;
      
          if (elapsed < duration) {
            setTimeout(updateShipPosition, 16); // Run the update function approximately every 16 milliseconds for smooth animation
          }
        }
      
        updateShipPosition();
      }
    }
}
    // Create a folder for the variables
    var variablesFolder = gui.addFolder('Floating');
    
    // Add event listeners to trigger the calculation when inputs change
    variablesFolder.add(variables, 'm').name('Mass (Kg)').onChange(setVariablesSetFlag);
    variablesFolder.add(variables, 'g').name('Gravity (m.s-2)').onChange(setVariablesSetFlag);
    variablesFolder.add(variables, 'R').name('Radius (Kg.m-3)').onChange(setVariablesSetFlag);
    variablesFolder.add(variables, 'V').name('Velocity (m-3)').onChange(setVariablesSetFlag);
    
    function setVariablesSetFlag() {
    allVariablesSet = areAllVariablesSet();
    }
    
    function areAllVariablesSet() {
    return variables.m !== 0 && variables.g !== 0 && variables.R !== 0 && variables.V !== 0;
    }
    
    gui.add(timeParams, 'speed', -10.0, 10.0)
    .name('Water Speed (m.s-1)')
    .onChange((value) => {
    // Update the time speed when the GUI control changes
    water.material.uniforms['time'].value = value / 60.0;
    });
    
    const distortionParams = {
    scale: 3.7,
    };
    
    gui.add(distortionParams, 'scale', 1.0, 1000.0)
    .name('Water Height (m)')
    .onChange((value) => {
    // Update the water height when the GUI control changes
    water.material.uniforms['distortionScale'].value = value;
    });
    
    // Create a button to initiate the calculation and display results
    var calculateButton = { calculate: calculate };
    variablesFolder.add(calculateButton, 'calculate').name('Calculate W and F');
    
    return gui;
    
}