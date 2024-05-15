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

  setupGUI(gui) {
    const airFolder = gui.addFolder('Air Friction');
    airFolder.add(this.variables, 'A2').name('space (m-2)').onChange(this.calculateFrictionofair.bind(this));
    airFolder.add(this.variables, 'R2').name('Radius (Kg.m-3)').onChange(this.calculateFrictionofair.bind(this));
    airFolder.add(this.variables, 'v2').name('speed (m.s-1)').onChange(this.calculateFrictionofair.bind(this));
    airFolder.add({ calculate: this.calculateFrictionofair.bind(this) }, 'calculate').name('Calculate force of Air Friction');
  }
}