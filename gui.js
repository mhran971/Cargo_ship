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
    A1: 0, // space
    v1: 0, // speed
    A2: 0, // space
    v2: 0, // speed
    A: 0, // space
    v: 0, // speed
    R3: 0,
    PR3: 0,
    RPM: 0,
    LP3: 0,
    F1: 0,
    F2: 0,
    F3: 0,
    total: 0,
  };

  var allVariablesSet = false;
  var floating = true;
  window.firstDigit = 0;

      // Calculate W and F
      var calculateFloating = function () {
        if (setVariablesSetFlagofFloating) {
            var W = variables.m * variables.g;
            var F = variables.R * variables.V * variables.g;
    
            // Or display the results in an alert box
            confirm('W: ' + W + '\nF: ' + F);
    
            if (F < W) {
                floating = false;
                confirm('The ship will sink');
    
                var startTime = Date.now();
                var duration = 5000; // Five seconds
    
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
            else if (variables.g < 5){
              var startTime = Date.now();
              var duration = 5000; // Five seconds
    
              function flyShipPosition() {
                var elapsed = Date.now() - startTime;
                var progress = elapsed / duration;
                var deltaPos = 2 * progress;
                ship.speed.pos += deltaPos;
            
                if (elapsed < duration) {
                  setTimeout(flyShipPosition, 16); // Run the update function approximately every 16 milliseconds for smooth animation
                }
              }
            
              flyShipPosition();
            }

        }
    };

  var calculateFrictionofwater = function (v1) {
    if (setVariablesSetFlagofFrictionofwater) {
      //var speedofwater = water.material.uniforms['time'].value = v1 / 60.0;

      var F1 = 0.5 * 0.04 * variables.A1 * variables.R1 * (variables.v1*variables.v1);
      water.material.uniforms['time'].value = F1 / 60.0;
      variables.total += F1;
      // Display the results in an alert box
      confirm('\nForce of water: ' + F1);
    }
  };

  var calculateFrictionofair = function () {
    if (setVariablesSetFlagofFrictionofair) {
      var F2 = 0.5 * 0.04 * variables.A2 * variables.R2 * (variables.v2*variables.v2);
      variables.total += F2;

      // Or display the results in an alert box
      confirm('\nForce of air: ' + F2);
    }
  };

  var calculateFrictionofThrustForce = function () {
    if (setVariablesSetFlagofFrictionofThrustForce) {
      var  w = 2*3.14*(variables.RPM/60);
      var  long_prop= variables.LP3* variables.LP3* variables.LP3* variables.LP3;
      var F3 = variables.R3 * variables.PR3 * w *long_prop;
      variables.total += F3;

      // Or display the results in an alert box
      confirm('\nForce of thrust: ' + F3);
    }
  };

  var calculateFrictionofThrustForceTotally = function () {
    if (setVariablesSetFlagofFrictionofThrustForceTotally) {
      
      // Display the result
      confirm('\nTotal force: ' + variables.total);
    }
  };

  var calculate = function () {
    const num = variables.total; // Assuming variables.total is the number (e.g., x.3133124)
    const digitsBeforeDecimal = parseInt(num.toString().charAt(0)); // Extract the first digit before the decimal point
    const digitsAfterDecimal = parseFloat(num.toString().slice(1, 7)); // Extract the 6 digits after the decimal point
    
    window.firstDigit = parseFloat(`${digitsBeforeDecimal}.${digitsAfterDecimal}`);
    window.firstDigit =window.firstDigit*0.5;
      confirm('\nTotal force simulation: ' + window.firstDigit);
    
  };


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
    variablesFolder.add(variables, 'v1').name('Water Speed (m.s-1)').onChange(setVariablesSetFlagofFrictionofwater);    
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
      //////////////////////////////////////////////////////////////////\
      ///////////////////Thrust////////////////////////////////////////\
      //////////////////////////////////////////////////////////////////\
      var variablesFolder = gui.addFolder('Thrust Force');
    
     // Add event listeners to trigger the calculation when inputs change
     variablesFolder.add(variables, 'R3').name('Radius (Kg.m-3)').onChange(setVariablesSetFlagofFrictionofThrustForce);
     variablesFolder.add(variables, 'RPM').name('RPM (Rolls per Min)').onChange(setVariablesSetFlagofFrictionofThrustForce);
     variablesFolder.add(variables, 'PR3').name('Prop Pitch (inch)').onChange(setVariablesSetFlagofFrictionofThrustForce);
     variablesFolder.add(variables, 'LP3').name('Prop diameter (m)').onChange(setVariablesSetFlagofFrictionofThrustForce);

      // Create a button to initiate the calculation and display results
      var calculateButton = { calculate: calculateFrictionofThrustForce };
      variablesFolder.add(calculateButton, 'calculate').name('Calculate force of Thrust Force');

      var calculateButton = { calculate: calculateFrictionofThrustForceTotally };
      gui.add(calculateButton, 'calculate').name('Calculate force of Thrust Force totally');
     ///////////////////////////////////////////////////////////////////////////
      var calculateButton = { calculate: calculate };
      gui.add(calculateButton, 'calculate').name('Calculate speed of cargo ship');

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

    //set Variables Set Flag of Thrust Force

    function setVariablesSetFlagofFrictionofThrustForce() {
      allVariablesSet = areAllVariablesSetofThrustForce(); 
    }
      
      function areAllVariablesSetofThrustForce() {
      return variables.R3 !== 0 && variables.RPM !== 0 && variables.PR3 !== 0 && variables.LP3 !== 0;
     }
     
     
   function setVariablesSetFlagofFrictionofThrustForceTotally() {
    allVariablesSet = setVariablesSetFlagofFrictionofThrustForceTotally(); 
  }
    
    function setVariablesSetFlagofFrictionofThrustForceTotally() {
    return F1 !== 0 && F2 !== 0 && F3 !== 0;
   }
     

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