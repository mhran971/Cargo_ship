// airFriction.js

export class AirFriction {
  constructor() {
    this.variables = {
      A2: 0, // space
      R2: 0, // radius
      v2: 0, // speed
      F2: 0,
      total: 0,
    };
  }

  setVariable(name, value) {
    if (this.variables.hasOwnProperty(name)) {
      this.variables[name] = value;
    } else {
      console.error(`Variable ${name} does not exist in AirFriction variables.`);
    }
  }

  calculateFrictionofair() {
    // if (this.variables.A2 && this.variables.R2 && this.variables.v2) {
    const F2 = 0.5 * 0.04 * this.variables.A2 * this.variables.R2 * (this.variables.v2 ** 2);
    window.totalforce += F2;
    confirm(`\nForce of air: ${F2}`);
    // }
  }
}
