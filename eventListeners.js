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
  const counterElement = document.getElementById("doubling-counter");

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      ship.speed.rot = -window.firstDigit*counter;
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
    ship.stop();
    if (e.key === "ArrowUp") {
      
      ship.speed.rot = -window.firstDigit;
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
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
        }, incrementTime);
      }
    }
  });
}
