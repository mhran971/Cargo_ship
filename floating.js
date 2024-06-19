import * as dat from 'dat.gui';

export class Floating {
    constructor() {
        this.variables = {
            m: 0,
            g: 0,
            R: 0,
            V: 0
        };
        this.floating = false;
        this.setVariablesSetFlagofFloating();
    }

    calculateFloating(ship) {
        
        if (this.setVariablesSetFlagofFloating()) {
            const W = this.variables.m * this.variables.g;
            const F = this.variables.R * this.variables.V * this.variables.g;

            confirm('W: ' + W + '\nF: ' + F);

            if ((F < W &&(this.variables.g > 7)||this.variables.g > 15) ) {
                this.floating = false;
                confirm('The ship will sink');

                const startTime = Date.now();
                const duration = 5000; // Five seconds

                const updateShipPosition = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = elapsed / duration;
                    const deltaPos = 0.2 * progress;
                    ship.speed.pos -= deltaPos;

                    if (elapsed < duration) {
                        setTimeout(updateShipPosition, 16); // Run the update function approximately every 16 milliseconds for smooth animation
                    }
                };

                updateShipPosition();
            } 
            if (this.variables.g < 7) {
                confirm('There is not enought gravity');
                const startTime = Date.now();
                const duration = 5000; // Five seconds

                const flyShipPosition = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = elapsed / duration;
                    const deltaPos = (10 - this.variables.g ) * progress;
                   ship.speed.pos += 1.5*deltaPos;
                  //  ship.speed.vel += 0.006*deltaPos;
                    ship.speed.z += 0.04*deltaPos;
                    if (elapsed < duration) {
                        setTimeout(flyShipPosition, 16); // Run the update function approximately every 16 milliseconds for smooth animation
                    }
                };

                flyShipPosition();
            }
        }
    }

    setVariablesSetFlagofFloating() {
        return this.areAllVariablesSetofFloating();
    }

    areAllVariablesSetofFloating() {
        return this.variables.m !== 0  && this.variables.R !== 0 && this.variables.V !== 0;
    }

    setVariable(name, value) {
        this.variables[name] = value;
    }
}

