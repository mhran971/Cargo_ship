import * as dat from 'dat.gui';

export class Floating {
    constructor() {
        this.variables = {
            m: 0,  
            g: 0,  
            R: 0,  // Water density
            V: 0   
        };
        this.floating = false;
        this.setVariablesSetFlagofFloating();
    }
    
    calculateFloating(ship) {
        if (this.setVariablesSetFlagofFloating()) {
            const W = this.variables.m * this.variables.g;  
            const F = this.variables.R * this.variables.V * this.variables.g;  // Buoyant force

            console.log(`Calculating floating with values: m=${this.variables.m}, g=${this.variables.g}, R=${this.variables.R}, V=${this.variables.V}`);
            console.log(`Calculated Weight (W): ${W}, Buoyant Force (F): ${F}`);

            this.adjustShipPositionBasedOnWeight(ship, W);

            if (F < W && (this.variables.g > 7 || this.variables.g > 15)) {
                this.sinkShip(ship);
            } else if (this.variables.g < 7) {
                this.flyShip(ship);
            }
        }
    }

    adjustShipPositionBasedOnWeight(ship, weight) {
        if (weight > 54000000 && weight <= 64000000) {
            ship.updatePositionY(6.7);
        } else if (weight > 44000000 && weight <= 54000000) {
            ship.updatePositionY(7.2);
        } else if (weight > 0 && weight <= 44000000) {
            ship.updatePositionY(7.5);
        } else {
            console.warn("Weight is out of expected range.");
        }
    }

    sinkShip(ship) {
        this.floating = false;
        confirm('The ship will sink');

        const startTime = Date.now();
        const duration = 5000; 

        const updateShipPosition = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            const deltaPos = 0.2 * progress;
            ship.speed.pos -= deltaPos;

            if (elapsed < duration) {
                setTimeout(updateShipPosition, 16); 
            }
        };

        updateShipPosition();
    }

    flyShip(ship) {
        confirm('There is not enough gravity');
        const startTime = Date.now();
        const duration = 5000; // Five seconds

        const flyShipPosition = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            const deltaPos = (10 - this.variables.g) * progress;
            ship.speed.pos += 1.5 * deltaPos;

            if (elapsed < duration) {
                setTimeout(flyShipPosition, 16); 
            }
        };

        flyShipPosition();
    }

    setVariablesSetFlagofFloating() {
        return this.areAllVariablesSetofFloating();
    }

    areAllVariablesSetofFloating() {
        return this.variables.m !== 0 && this.variables.R !== 0 && this.variables.V !== 0;
    }

    setVariable(name, value) {
        this.variables[name] = value;
    }
}
