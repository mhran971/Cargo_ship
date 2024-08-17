export class WaterFriction {
  constructor() {
    this.variables = {
      A1: 0, // space
      R1: 0,  
      v1: 0,    
      F1: 0,
      total: 0,
    };
  }

  setVariable(name, value) {
    if (this.variables.hasOwnProperty(name)) {
      this.variables[name] = value;
    } else {
      console.error(`Variable ${name} does not exist in WaterFriction variables.`);
    }
  }

  calculateFrictionofwater() {
     const F1 = 0.5 * 0.04 * this.variables.A1 * this.variables.R1 * (this.variables.v1 ** 2);
    if(this.variables.v1 < 0)
      window.totalforce -= F1;
    else
    window.totalforce += F1;
    console.log(`\nForce of water: ${F1}`);
    // }
  }
}
