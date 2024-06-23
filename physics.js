export class Physics {
    constructor(ship) {
      this.ship = ship;
      this.previousPosition = ship.getPosition().clone();
      this.previousTime = performance.now();
      this.instantaneousSpeed = 0;
      this.instantaneousAcceleration = 0;
      this.previousSpeed = 0;
  
      this.speedHistory = [];
      this.accelerationHistory = [];
      this.period = 3000; // 5 seconds
      this.lastAverageTime = performance.now();
    }
  
    update() {
      const currentPosition = this.ship.getPosition();
      if (!currentPosition) {
        return; // Exit if the ship's position is not available
      }
  
      const currentTime = performance.now();
      const timeDelta = (currentTime - this.previousTime) / 1000; // Convert ms to seconds
  
      if (timeDelta === 0) {
        return; // Avoid division by zero
      }
  
      const dx = currentPosition.x - this.previousPosition.x;
      const dy = currentPosition.y - this.previousPosition.y;
      const dz = currentPosition.z - this.previousPosition.z;
  
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
      this.instantaneousSpeed = distance / timeDelta;
  
      const speedDelta = this.instantaneousSpeed - this.previousSpeed;
      this.instantaneousAcceleration = speedDelta / timeDelta;
  
      // Store the instantaneous values
      this.speedHistory.push(this.instantaneousSpeed);
      this.accelerationHistory.push(this.instantaneousAcceleration);
  
      this.previousPosition.copy(currentPosition);
      this.previousTime = currentTime;
      this.previousSpeed = this.instantaneousSpeed;
  
      // Calculate and display averages every 5 seconds
      if (currentTime - this.lastAverageTime >= this.period) {
        this.calculateAndDisplayAverages();
        this.lastAverageTime = currentTime;
        // Clear the history after calculating the averages
        this.speedHistory = [];
        this.accelerationHistory = [];
      }
    }
  
    calculateAndDisplayAverages() {
      const averageSpeed = this.speedHistory.reduce((a, b) => a + b, 0) / this.speedHistory.length;
      const averageAcceleration = this.accelerationHistory.reduce((a, b) => a + b, 0) / this.accelerationHistory.length;
  
      const avgSpeedElement = document.getElementById('avg-speed-display');
      const avgAccelerationElement = document.getElementById('avg-acceleration-display');
  
      if (avgSpeedElement) {
        avgSpeedElement.textContent = `Avg Speed: ${averageSpeed.toFixed(2)} units/s`;
      }
      if (avgAccelerationElement) {
        avgAccelerationElement.textContent = `Avg Acceleration: ${averageAcceleration.toFixed(2)} units/s²`;
      }
    }
  }
  