import * as dat from 'dat.gui';

export class WaterFriction {
  constructor() {
    this.variables = {
      A1: 0, // space
      R1: 0, // radius
      v1: 0, // speed
      F1: 0,
      total: 0,
    };
  }

  calculateFrictionofwater() {
    // if (this.variables.A1 && this.variables.R1 && this.variables.v1) {
      const F1 = 0.5 * 0.04 * this.variables.A1 * this.variables.R1 * (this.variables.v1 ** 2);
      window.totalforce += F1;

      confirm(`\nForce of water: ${F1}`);
    // }
  }

  }