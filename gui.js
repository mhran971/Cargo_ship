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
    R1: 0, // radius
    R2: 0, // radius
    V: 0, // velocity
    A1: 0, //space
    v1:0 , //speed
    A2: 0, //space
    v2:0 , //speed
    A: 0, //space
    v:0 , //speed
    allv: 0,
    };
    
    var allVariablesSet = false;
    var floating =true;
    // Calculate W and F
    var calculateFloating = function () {
    if (setVariablesSetFlagofFloating) {
    
    var W = variables.m * variables.g;
    var F = variables.R * variables.V * variables.g;
  
    // Or display the results in an alert box
    CustomAlert('W: ' + W + '\nF: ' + F);
    
    if (F < W) {
        var floating = false;
        alert('The ship will sink');
      
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

var calculateFrictionofwater = function() {
  if (setVariablesSetFlagofFrictionofwater) {
    var F1 = 0.5 * 0.04 * variables.A1 * variables.R1 * variables.v1;

    // Display the results in an alert box
    confirm('\nForce of water: ' + F1);
  }
}


var calculateFrictionofair = function () {
  if (setVariablesSetFlagofFrictionofwater) {
  
  var F2 = 0.5*0.04*variables.A2 * variables.R2 * variables.v2;

  // Or display the results in an alert box
  confirm('\nForce of air: ' + F2);
  
  }
}
    
     ///////////////////////////////////////////////////////////////////\
     /////////////////Floating//////////////////////////////////////////////\
     //////////////////////////////////////////////////////////////////\  
    var variablesFolder = gui.addFolder('Floating');
    
    // Add event listeners to trigger the calculation when inputs change
    variablesFolder.add(variables, 'm').name('Mass (Kg)').onChange(setVariablesSetFlagofFloating);
    variablesFolder.add(variables, 'g').name('Gravity (m.s-2)').onChange(setVariablesSetFlagofFloating);
    variablesFolder.add(variables, 'R').name('Radius (Kg.m-3)').onChange(setVariablesSetFlagofFloating);
    variablesFolder.add(variables, 'V').name('Velocity (m-3)').onChange(setVariablesSetFlagofFloating);
    
     // Create a button to initiate the calculation and display results
     var calculateButton = { calculate: calculateFloating };
     variablesFolder.add(calculateButton, 'calculate').name('Calculate W and F');

     ///////////////////////////////////////////////////////////////////\
     /////////////////Water//////////////////////////////////////////////\
     //////////////////////////////////////////////////////////////////\  

    var variablesFolder = gui.addFolder('Water Friction');
    
    // Add event listeners to trigger the calculation when inputs change
    variablesFolder.add(variables, 'A1').name('space (m-2)').onChange(setVariablesSetFlagofFrictionofwater);
    variablesFolder.add(variables, 'R1').name('Radius (Kg.m-3)').onChange(setVariablesSetFlagofFrictionofwater);
    variablesFolder.add(variables, 'v1').name('Water Speed (m.s-1)').onChange(setVariablesSetFlagofFrictionofwater)
    .onChange((v1) => {
      var speedofwater = water.material.uniforms['time'].value = v1 / 60.0;
      });
   
    setVariablesSetFlagofFrictionofwater
     // Create a button to initiate the calculation and display results
     var calculateButton = { calculate: calculateFrictionofwater };
     variablesFolder.add(calculateButton, 'calculate').name('Calculate force of Water Friction');

     ///////////////////////////////////////////////////////////////////\
     /////////////////Air//////////////////////////////////////////////\
     //////////////////////////////////////////////////////////////////\  
     var variablesFolder = gui.addFolder('Air Friction');
    
     // Add event listeners to trigger the calculation when inputs change
     variablesFolder.add(variables, 'A2').name('space (m-2)').onChange(setVariablesSetFlagofFrictionofair);
     variablesFolder.add(variables, 'R2').name('Radius (Kg.m-3)').onChange(setVariablesSetFlagofFrictionofair);
     variablesFolder.add(variables, 'v2').name('speed (m.s-1)').onChange(setVariablesSetFlagofFrictionofair);
     
      // Create a button to initiate the calculation and display results
      var calculateButton = { calculate: calculateFrictionofair };
      variablesFolder.add(calculateButton, 'calculate').name('Calculate force of Air Friction');

    function setVariablesSetFlagofFloating() {
    allVariablesSet = areAllVariablesSetofFloating(); 
  }
    
    function areAllVariablesSetofFloating() {
    return variables.m !== 0 && variables.g !== 0 && variables.R !== 0 && variables.V !== 0;
   }

    //set Variables Set Flag of Friction of water

   function setVariablesSetFlagofFrictionofwater() {
    allVariablesSet = areAllVariablesSetofFrictionofwater(); 
  }
    
    function areAllVariablesSetofFrictionofwater() {
    return variables.A1 !== 0 && variables.R1 !== 0 && variables.v1 !== 0;
   }

    //set Variables Set Flag of Friction of air

   function setVariablesSetFlagofFrictionofair() {
    allVariablesSet = areAllVariablesSetofFrictionofair(); 
  }
    
    function areAllVariablesSetofFrictionofair() {
    return variables.A2 !== 0 && variables.R2 !== 0 && variables.v2 !== 0;
   }
    // gui.add(timeParams, 'speed', -10.0, 10.0)
    // .name('Water Speed (m.s-1)')
    // .onChange((v1) => {
    // // Update the time speed when the GUI control changes
    // var speedofwater = water.material.uniforms['time'].v1 = v1 / 60.0;
    // });
    
    const distortionParams = {
    scale: 3.7,
    };
    
    gui.add(distortionParams, 'scale', 1.0, 1000.0) .name('Water Height (m)') .onChange((value) => {
    // Update the water height when the GUI control changes
    water.material.uniforms['distortionScale'].value = value; });
    
   
    
    return gui;
    
}