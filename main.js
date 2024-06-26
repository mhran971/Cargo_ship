import './style.css';
import * as THREE from 'three';
import { timeParams, setupGUI as setupTimeGUI } from './gui.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { initWaterAndSky } from './waterAndSky';
import { Ship } from './ship';
import { setupControls, setupKeyEvents } from './eventListeners';
import SoundPlayer from './sound';
import { Floating } from './floating';
import { ThrustForce } from './thrustForce';
import { setupGUI as setupinputGUI } from './inputs';
import { Physics } from './physics.js';
import { Wave } from './wave.js'; // Import the Wave class

const audioFilePath = 'sound/turning_on.mp3';
const secondAudioFilePath = 'sound/rest.mp3';
const firstAudioFilePath = 'sound/beganing.mp3';

const soundPlayer = new SoundPlayer();
soundPlayer.loadSound(audioFilePath);

let mainCamera, smallCamera, scene, mainRenderer, smallRenderer;
let ship;
let water;
let physics;
let wave; // Declare the wave variable outside the init() function

function init() {
  // Main renderer setup
  mainRenderer = new THREE.WebGLRenderer();
  mainRenderer.setPixelRatio(window.devicePixelRatio);
  mainRenderer.setSize(window.innerWidth, window.innerHeight);
  mainRenderer.toneMapping = THREE.ACESFilmicToneMapping;
  mainRenderer.toneMappingExposure = 0.5;
  document.body.appendChild(mainRenderer.domElement);

  // Small renderer setup
  smallRenderer = new THREE.WebGLRenderer();
  smallRenderer.setPixelRatio(window.devicePixelRatio);
  smallRenderer.setSize(window.innerWidth / 4, window.innerHeight / 4);
  smallRenderer.domElement.style.position = 'absolute';
  smallRenderer.domElement.style.bottom = '0';
  smallRenderer.domElement.style.left = '0';
  smallRenderer.domElement.style.borderRadius = '10%';
  document.body.appendChild(smallRenderer.domElement);

  // Scene setup
  scene = new THREE.Scene();

  // Main camera setup
  mainCamera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000);
  mainCamera.position.set(30, 30, 100);

  // Small camera setup
  smallCamera = new THREE.PerspectiveCamera(55, (window.innerWidth / 4) / (window.innerHeight / 4), 1, 20000);
  smallCamera.position.set(0, 10, 30); // Initial position relative to the ship

  // Initialize water and sky
  const { water: waterObj, sky } = initWaterAndSky(scene, mainRenderer);
  water = waterObj;

  // Ship setup with a callback to create the Wave instance after loading
  ship = new Ship(scene, (loadedShip) => {
    wave = new Wave(loadedShip);
    physics = new Physics(loadedShip); // Initialize physics after the ship is ready

    // Setup Time GUI
    setupinputGUI(water, loadedShip);
    const gui = setupTimeGUI(water, loadedShip);
    gui.open();

    // Floating instance setup
    const floatingInstance = new Floating();
    floatingInstance.calculateFloating(loadedShip);

    // ThrustForce instance setup
    const thrustforceInstance = new ThrustForce();
    thrustforceInstance.calculateThrustForce(loadedShip);

    // Start the animation loop
    animate();
  });

  // Controls setup
  const controls = new OrbitControls(mainCamera, mainRenderer.domElement);
  setupControls(controls);

  // Event listeners setup
  setupKeyEvents(ship);

  // Window resize event
  window.addEventListener('resize', onWindowResize);

  // Add speed and acceleration display elements
  addMetricsDisplay();
}

function onWindowResize() {
  mainRenderer.setSize(window.innerWidth, window.innerHeight);
  mainCamera.aspect = window.innerWidth / window.innerHeight;
  mainCamera.updateProjectionMatrix();

  smallRenderer.setSize(window.innerWidth / 4, window.innerHeight / 4);
  smallCamera.aspect = (window.innerWidth / 4) / (window.innerHeight / 4);
  smallCamera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);

  // Ensure the ship's update method is called
  if (ship && typeof ship.update === 'function') {
    ship.update();
    if (physics) {
      physics.update();
    }
  }

  // Update the small camera position to follow the ship
  const shipPosition = ship.getPosition();
  if (shipPosition) {
    smallCamera.position.set(shipPosition.x + 90, shipPosition.y + 10, shipPosition.z + 1);
    smallCamera.lookAt(shipPosition);
  }

  // Update water material uniforms
  if (water) {
    water.material.uniforms['time'].value += timeParams.speed / 60.0;
  }
  render();
}

function render() {
  // Render the main scene with the main camera
  mainRenderer.render(scene, mainCamera);
  // Render the small scene with the small camera
  smallRenderer.render(scene, smallCamera);
}

function addMetricsDisplay() {
  const avgSpeedDisplay = document.createElement('div');
  avgSpeedDisplay.id = 'avg-speed-display';
  avgSpeedDisplay.style.position = 'fixed';
  avgSpeedDisplay.style.bottom = '10px';
  avgSpeedDisplay.style.left = '10px';
  avgSpeedDisplay.style.color = 'white';
  avgSpeedDisplay.style.fontSize = '20px';
  avgSpeedDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  avgSpeedDisplay.style.padding = '10px';
  avgSpeedDisplay.style.borderRadius = '5px';
  document.body.appendChild(avgSpeedDisplay);

  const avgAccelerationDisplay = document.createElement('div');
  avgAccelerationDisplay.id = 'avg-acceleration-display';
  avgAccelerationDisplay.style.position = 'fixed';
  avgAccelerationDisplay.style.bottom = '40px';
  avgAccelerationDisplay.style.left = '10px';
  avgAccelerationDisplay.style.color = 'white';
  avgAccelerationDisplay.style.fontSize = '20px';
  avgAccelerationDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  avgAccelerationDisplay.style.padding = '10px';
  avgAccelerationDisplay.style.borderRadius = '5px';
  document.body.appendChild(avgAccelerationDisplay);
}

init();
