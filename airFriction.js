import * as dat from 'dat.gui';

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

  calculateFrictionofair() {
    if (this.variables.A2 && this.variables.R2 && this.variables.v2) {
      const F2 = 0.5 * 0.04 * this.variables.A2 * this.variables.R2 * (this.variables.v2 ** 2);
      this.variables.total += F2;
      confirm(`\nForce of air: ${F2}`);
    }
  }

  
}