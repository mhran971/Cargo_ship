// import { firstDigit } from './inputs.js';


export class Rotational {
    constructor() {
      this.variables = {
        V: 0,
        deg: 0,
        s: 0,
        Sxz: 0,
      };
    }
    
    setVariable(name, value) {
      if (this.variables.hasOwnProperty(name)) {
        this.variables[name] = value;
      } else {
        console.error(`Variable ${name} does not exist in Rotational variables.`);
      }
    }
    
    calculaterotational() {
        const { V,deg, s, Sxz } = this.variables;
        const result = V*(1 - ((deg / 0.684) * (s / 2640)));
        const v_rot = Math.abs(Math.floor(result)); // Gets the integer part
        console.log(`Rotational movement: ${v_rot} rad/s`);
      }
      
  
  }