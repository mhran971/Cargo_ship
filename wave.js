import * as dat from 'dat.gui';
import { Floating } from './floating';
import { ThrustForce } from './thrustForce';

export class Wave {
  constructor(ship) {
    this.ship = ship;
    this.variables = {
      Q: 0,
      F: 0,
      v: 0
    };
    this.sineWaveMovement = false;
    this.sineWaveSpeed = 1;
    this.initialShipPosition = { x: ship.getPosition().x, y: ship.getPosition().y, z: ship.getPosition().z };
    this.initialShipRotation = { x: ship.getRotation().x, y: ship.getRotation().y, z: ship.getRotation().z };
  }

  setVariable(name, value) {
    this.variables[name] = value;
  }

  calculateFrictionOfWave() {
    const { Q, F } = this.variables;
    const v = Q * F;
    console.log(`Force of wave: ${v.toFixed(5)}`);

    if (F > 10) {
      this.sineWaveMovement = true;
      this.sineWaveSpeed = Q > 10 ? 0.5 : 1;
    } else {
      this.sineWaveMovement = false;
    }

    this.updateWaveMovement();
  }

  updateWaveMovement() {
    if (this.sineWaveMovement && this.ship) {
        const waveAmplitude = 1; 
        const waveFrequency = 10;
        const startTime = new Date().getTime();
        const duration = 10000; 

        const updateShipPosition = () => {
            const elapsed = new Date().getTime() - startTime;
            const progress = elapsed / duration;
            const deltaPos = waveAmplitude * Math.cos(progress * waveFrequency * Math.PI * 2) * 0.002; 

            if (elapsed < duration) {
                this.ship.updatePositionY(-deltaPos);
                this.ship.rotateZ(-deltaPos);
                requestAnimationFrame(updateShipPosition);
            } else {
                this.resetShipPosition();
            }
        };

        updateShipPosition();
    }
}

  resetShipPosition() {
    this.ship.setPosition(this.initialShipPosition.x, this.initialShipPosition.y, this.initialShipPosition.z);
    this.ship.setRotation(this.initialShipRotation.x, this.initialShipRotation.y, this.initialShipRotation.z);
  }
}
