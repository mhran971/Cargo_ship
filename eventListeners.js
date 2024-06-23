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
  const maxCounter = 6;
  const incrementTime = 3000; // 3 seconds
  const stopDuration = 7000; // 7 seconds
  const counterElement = document.getElementById("doubling-counter");
  const keysPressed = new Set();

  window.addEventListener("keydown", (e) => {
    keysPressed.add(e.key);

    if (e.key === "ArrowUp") {
      if (window.thr === 0) {
        counter = 0;
        counterElement.innerText = counter;
        counterElement.style.display = 'none'; // Hide the counter element when thr is 0
        return; // If the thrust force is 0, do nothing
      } else {
        ship.speed.rot = -window.firstDigit * counter;
        counterElement.style.display = 'block'; // Show the counter element when thr is not 0
        if (!intervalId && window.thr !== 0) {
          intervalId = setInterval(() => {
            if (counter < maxCounter) {
              counter++;
              window.congear = counter;
              counterElement.innerText = counter;
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
    }

    if (keysPressed.has("ArrowLeft")) {
      ship.speed.vel = 0.01;
    }

    if (keysPressed.has("ArrowRight")) {
      ship.speed.vel = -0.01;
    }

    if (keysPressed.has("ArrowDown")) {
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
  });

  window.addEventListener("keyup", (e) => {
    keysPressed.delete(e.key);

    if (e.key === "ArrowUp") {
      if (window.thr === 0) {
        return; // If the thrust force is 0, do nothing
      } else {
        ship.speed.rot = -window.firstDigit;
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
        if (!decrementIntervalId) {
          let startTime = performance.now();
          const initialSpeed = ship.speed.rot;

          decrementIntervalId = setInterval(() => {
            const elapsed = performance.now() - startTime;
            const progress = elapsed / stopDuration;

            if (progress >= 1) {
              clearInterval(decrementIntervalId);
              decrementIntervalId = null;
              ship.stop(); // Stop the ship after 7 seconds
              counter = 0;
              counterElement.innerText = counter;
              counterElement.style.display = 'none'; // Hide the counter element when the ship stops
            } else {
              ship.speed.rot = initialSpeed * (1 - progress);
            }
          }, 16); // Update every 16 ms (~60 FPS)

          // Decrement the counter
          decrementIntervalId = setInterval(() => {
            if (counter > 0) {
              counter--;
              counterElement.innerText = counter;
              counterElement.style.display = 'block';
            } else {
              clearInterval(decrementIntervalId);
              decrementIntervalId = null;
            }
          }, 2000); // Decrement counter every 2 seconds
        }
      }
    }

    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      ship.speed.vel = 0;
    }

    if (e.key === "ArrowDown") {
      ship.stop();
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      if (decrementIntervalId) {
        clearInterval(decrementIntervalId);
        decrementIntervalId = null;
      }
    }
  });
}
