import * as dat from 'dat.gui';
import { Floating } from './floating';
import { ThrustForce } from './thrustForce';
import { AirFriction } from './airFriction';
import { WaterFriction } from './waterFriction';

export class Wave {
  constructor() {
    this.variables = {
      Q: 0,
      F: 0,
      v: 0,
    };
    this.sineWaveMovement = false;
    this.sineWaveSpeed = 1;
  }

  setVariable(name, value) {
    this.variables[name] = value;
  }

  calculateFrictionofwave(ship) {
    const { Q, F } = this.variables;
    const v = Q * F;
    this.variables.v = v;
    confirm(`\nForce of wave: ${v.toFixed(5)}`);

    if (F > 10) {
      this.sineWaveMovement = true;
      this.sineWaveSpeed = Q > 10 ? 0.5 : 1;
    } else {
      this.sineWaveMovement = false;
    }
  }

  updateWaveMovement(ship, currentTime) {
    if (this.sineWaveMovement) {
      const { Q, F } = this.variables;
      const waveAmplitude = Q;
      const waveFrequency = F / 10; // Adjust frequency to be more manageable
      const time = currentTime / 1000;

      // Calculate sine wave positions for x and z axes
      const sineWavePositionX = Math.sin(time * waveFrequency) * waveAmplitude;
      const sineWavePositionZ = Math.cos(time * waveFrequency) * waveAmplitude;
      console.log(`sineWavePositionX`.sineWavePositionX`\n` `sineWavePositionZ`.sineWavePositionZ)
      const currentPosition = ship.getPosition();
      currentPosition.x += sineWavePositionX;
      currentPosition.z += sineWavePositionZ;

      ship.setPosition(currentPosition);
    }
  }
}