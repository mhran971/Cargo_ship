export function setupControls(controls) {
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.target.set(0, 10, 0);
    controls.minDistance = 40.0;
    controls.maxDistance = 200.0;
    controls.update();
  }
  
  
  export function setupKeyEvents(ship) {
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") {
        ship.speed.rot = -1;
      }
      if (e.key === "ArrowDown") {
        ship.speed.rot = 1;
      }
      if (e.key === "ArrowLeft") {
        ship.speed.vel = 0.01;
      }
      if (e.key === "ArrowRight") {
        ship.speed.vel = -0.01;
      }});
      window.addEventListener("keydown", (e) => {
      if (e.key === "e") {
        ship.speed.pos -= 0.1;
      }
    });
  
    window.addEventListener("keyup", () => {
      ship.stop();
    });
  }
  