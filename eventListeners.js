export function setupControls(controls) {
  controls.maxPolarAngle = Math.PI * 0.495;
  controls.target.set(0, 10, 0);
  controls.minDistance = 40.0;
  controls.maxDistance = 200.0;
  controls.update();
}

export function setupKeyEvents(ship) {
  let counter = 0;
  let intervalId;
  let decrementIntervalId;
  let speedDecrementIntervalId;
  const maxCounter = 6;
  const incrementTime = 3000; // 3 seconds
  const counterElement = document.getElementById("doubling-counter");

  const speedDecrementStep = 0.1; // Define how much the speed decreases each step
  const speedDecrementTime = 200; // Define the time interval for speed decrement

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && window.thr !== 0) {
      ship.speed.rot = -window.firstDigit * counter;
      if (!intervalId) {
        intervalId = setInterval(() => {
          if (counter < maxCounter) {
            counter++;
            counterElement.innerText = counter;
            counterElement.style.display = 'block';
          } else {
            clearInterval(intervalId);
            intervalId = null;
          }
        }, incrementTime);
      }
      if (decrementIntervalId) {
        clearInterval(decrementIntervalId);
        decrementIntervalId = null;
      }
    }
    if (e.key === "ArrowDown") {
      ship.speed.rot = 1;
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      if (decrementIntervalId) {
        clearInterval(decrementIntervalId);
        decrementIntervalId = null;
      }
    }
    if (e.key === "ArrowLeft") {
      ship.speed.vel = 0.01;
    }
    if (e.key === "ArrowRight") {
      ship.speed.vel = -0.01;
    }
  });

  window.addEventListener("keyup", (e) => {
    
    if (e.key === "ArrowUp" && window.thr !== 0) {
      // Clear any existing interval for decrementing counter
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }

      // Gradually decrease speed
      if (speedDecrementIntervalId) {
        clearInterval(speedDecrementIntervalId);
        speedDecrementIntervalId = null;
      }
      
      speedDecrementIntervalId = setInterval(() => {
        if (ship.speed.rot < 0) {
          ship.speed.rot += speedDecrementStep;
          if (ship.speed.rot > 0) {
            ship.speed.rot = 0; // Ensure the speed doesn't go positive
          }
        } else {
          clearInterval(speedDecrementIntervalId);
          speedDecrementIntervalId = null;
          ship.stop(); // Stop ship movement after speed is 0
        }
      }, speedDecrementTime);

      // Start decrementing counter every 2 seconds if not already started
      if (!decrementIntervalId) {
        decrementIntervalId = setInterval(() => {
          if (counter > 0) {
            counter--;
            counterElement.innerText = counter;
            counterElement.style.display = 'block';
          } else {
            clearInterval(decrementIntervalId);
            decrementIntervalId = null;
          }
        }, 2000);
      }
    }if (e.key === "ArrowDown") {
       
      ship.stop();
    }
    if (e.key === "ArrowLeft") {
      ship.stop();
    }
    if (e.key === "ArrowRight") {
      ship.stop();
    }
  });
}
