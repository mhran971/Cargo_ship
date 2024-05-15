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
    if (this.variables.A1 && this.variables.R1 && this.variables.v1) {
      const F1 = 0.5 * 0.04 * this.variables.A1 * this.variables.R1 * (this.variables.v1 ** 2);
      this.variables.total += F1;
      confirm(`\nForce of water: ${F1}`);
    }
  }

  setupGUI(gui) {
    const waterFolder = gui.addFolder('Water Friction');
    waterFolder.add(this.variables, 'A1').name('space (m-2)').onChange(this.calculateFrictionofwater.bind(this));
    waterFolder.add(this.variables, 'R1').name('Radius (Kg.m-3)').onChange(this.calculateFrictionofwater.bind(this));
    waterFolder.add(this.variables, 'v1').name('Water Speed (m.s-1)').onChange(this.calculateFrictionofwater.bind(this));
    waterFolder.add({ calculate: this.calculateFrictionofwater.bind(this) }, 'calculatee').name('Calculate force of Water Friction');
  }}