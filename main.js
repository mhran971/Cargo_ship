import './style.css';
import * as THREE from 'three';
import { timeParams ,setupGUI } from './gui.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { initWaterAndSky } from './waterAndSky';
import { Ship } from './ship';
import { setupControls, setupKeyEvents } from './eventListeners';

let camera, scene, renderer;
let ship;
let water; // Declare the 'water' variable outside the init() function

function init() {
  // Renderer setup
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.5;
  document.body.appendChild(renderer.domElement);

  // Scene setup
  scene = new THREE.Scene();

  // Camera setup
  camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000);
  camera.position.set(30, 30, 100);

  // Initialize water and sky
  const { water: waterObj, sky } = initWaterAndSky(scene, renderer);
  water = waterObj;

// Ship setup
  ship = new Ship(scene);

// Setup GUI
  const gui = setupGUI(water, ship);
  gui.open();

  // Controls setup
  const controls = new OrbitControls(camera, renderer.domElement);
  setupControls(controls);

  // Event listeners setup
  setupKeyEvents(ship);

  // Window resize event
  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  ship.update();
  water.material.uniforms['time'].value += timeParams.speed / 60.0;
  render();
}

function render() {
  renderer.render(scene, camera);
}

init();
animate();