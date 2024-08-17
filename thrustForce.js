export class ThrustForce {
  constructor() {
    this.variables = {
      R3: 0,
      RPM: 0,
      PR3: 0,
      LP3: 0,
    };
  }
  
  setVariable(name, value) {
    if (this.variables.hasOwnProperty(name)) {
      this.variables[name] = value;
    } else {
      console.error(`Variable ${name} does not exist in ThrustForce variables.`);
    }
  }
  
  calculateThrustForce() {
    if (this.variables.R3 && this.variables.RPM && this.variables.PR3 && this.variables.LP3) {
      const w = 2 * Math.PI * (this.variables.RPM / 60);
      const long_prop = this.variables.LP3 ** 4;
      const F3 = this.variables.R3 * this.variables.PR3 * w * long_prop;
      window.thr = F3;
      const F3String = F3.toFixed(5); // Convert F3 to a string with 5 decimal places
      window.totalforce += parseFloat(F3String); // Update window.totalforce with the corrected F3 value
      console.log(`\nForce of thrust: ${F3String}`);
    } else {
      console.log('Some variables are not set. Cannot calculate thrust force.');
    }
  }

  getThrustForce() {
    if (window.thr !== 0) {
      return window.thr;
    } else {
      console.log('Thrust force is not calculated yet.');
      return 0;
    }
  }
}
