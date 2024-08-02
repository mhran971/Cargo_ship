import { ThrustForce } from "./thrustForce";

export class Total {
    constructor() {
      if (!window.totalforce) {
        window.totalforce = 0;
      }
    }
  
    calculatetotal(force) {
      
      window.totalforce += force;
    }
  
    exposetotal() {
      console.log(`Total force of thrust: ${window.totalforce} N`);
    }
     
  }
  
  // Initialize Total once to ensure window.totalforce is set up
  new Total();
  