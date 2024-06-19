import { Total } from './total'; // Remove the duplicate import statement

export class ThrustForce {
  constructor() {
    this.variables = {
      R3: 0,
      RPM: 0,
      PR3: 0,
      LP3: 0,
    };
  }

  calculateThrustForce() {
    if (this.variables.R3 && this.variables.RPM && this.variables.PR3 && this.variables.LP3) {
      const w = 2 * Math.PI * (this.variables.RPM / 60);
      const long_prop = this.variables.LP3 ** 4;
      const F3 = this.variables.R3 * this.variables.PR3 * w * long_prop;

      // Extract the 5 digits after the decimal point
      const F3String = F3.toFixed(5); // Convert F3 to a string with 5 decimal places
      //const decimalPart = F3String.split('.')[1]; // Extract the decimal part

      window.totalforce += parseFloat(F3String); // Update window.totalforce with the corrected F3 value
      confirm(`\nForce of thrust: ${F3String}`);
    }
  }
}