
export class ThrustForce {
    constructor() {
      this.variables = {
        R3: 0,
        RPM: 0,
        PR3: 0,
        LP3: 0,
        F3: 0,
        total: 0,
      };
    }
  
    calculateThrustForce() {
      if (this.variables.R3 && this.variables.RPM && this.variables.PR3 && this.variables.LP3) {
        const w = 2 * Math.PI * (this.variables.RPM / 60);
        const long_prop = this.variables.LP3 ** 4;
        const F3 = this.variables.R3 * this.variables.PR3 * w * long_prop;
        this.variables.total += F3;
        confirm(`\nForce of thrust: ${F3}`);
      }
    }

  setupGUI(gui) {
    const thrustFolder = gui.addFolder('Thrust Force');
    thrustFolder.add(this.variables, 'R3').name('Radius (Kg.m-3)').onChange(this.calculateFrictionofThrustForce.bind(this));
    thrustFolder.add(this.variables, 'RPM').name('RPM (Rolls per Min)').onChange(this.calculateFrictionofThrustForce.bind(this));
    thrustFolder.add(this.variables, 'PR3').name('Propeller Radius').onChange(this.calculateFrictionofThrustForce.bind(this));
    thrustFolder.add(this.variables, 'LP3').name('Long Propeller').onChange(this.calculateFrictionofThrustForce.bind(this));
    thrustFolder.add({ calculate: this.calculateFrictionofThrustForce.bind(this) }, 'calculate').name('Calculate force of Thrust Force');
  }
}