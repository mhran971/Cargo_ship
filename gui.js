import * as dat from 'dat.gui';

export const timeParams = {
  speed: 1.0,
};

export function setupGUI(water, ship) {
  const gui = new dat.GUI();

  gui.add(timeParams, 'speed', 0.1, 10.0)
    .name('Water Speed')
    .onChange((value) => {
      // Update the time speed when the GUI control changes
      water.material.uniforms['time'].value = value / 60.0;
    });

  const distortionParams = {
    scale: 3.7,
  };
  gui.add(distortionParams, 'scale', 1.0, 1000.0)
    .name('Water Height')
    .onChange((value) => {
      // Update the water height when the GUI control changes
      water.material.uniforms['distortionScale'].value = value;
    });

  return gui;
}