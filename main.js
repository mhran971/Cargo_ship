import './style.css';
import * as THREE from 'three';
import { timeParams, setupGUI as setupTimeGUI } from './gui.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { initWaterAndSky } from './waterAndSky';
import { Ship } from './ship';
import { Ice } from './ice';
import { setupControls, setupKeyEvents } from './eventListeners';
import SoundPlayer from './sound';
import { Floating } from './floating';
import { ThrustForce } from './thrustForce';
import { setupGUI as setupinputGUI } from './inputs';
import { Physics } from './physics.js';
import { Wave } from './wave.js';

const audioFilePath = 'sound/turning_on.mp3';
const secondAudioFilePath = 'sound/rest.mp3';
const crushingsound = 'sound/crashing.mp3';
const turnon= false;
const soundPlayer = new SoundPlayer();
soundPlayer.loadSound(audioFilePath);

const crushing = new SoundPlayer();
crushing.loadSoundcrush(crushingsound); // Load the sound once


let mainCamera, smallCamera, scene, mainRenderer, smallRenderer;
let ship;
let ice;
let water;
let physics;
let wave;

function init() {
    mainRenderer = new THREE.WebGLRenderer();
    mainRenderer.setPixelRatio(window.devicePixelRatio);
    mainRenderer.setSize(window.innerWidth, window.innerHeight);
    mainRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    mainRenderer.toneMappingExposure = 0.5;
    document.body.appendChild(mainRenderer.domElement);

    smallRenderer = new THREE.WebGLRenderer();
    smallRenderer.setPixelRatio(window.devicePixelRatio);
    smallRenderer.setSize(window.innerWidth / 4, window.innerHeight / 4);
    smallRenderer.domElement.style.position = 'absolute';
    smallRenderer.domElement.style.bottom = '0';
    smallRenderer.domElement.style.left = '0';
    smallRenderer.domElement.style.borderRadius = '10%';
    document.body.appendChild(smallRenderer.domElement);

    scene = new THREE.Scene();

    mainCamera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000);
    mainCamera.position.set(30, 30, 100);

    smallCamera = new THREE.PerspectiveCamera(55, (window.innerWidth / 4) / (window.innerHeight / 4), 1, 20000);
    smallCamera.position.set(0, 10, 30);

    const { water: waterObj, sky } = initWaterAndSky(scene, mainRenderer);
    water = waterObj;

    ship = new Ship(scene, (loadedShip) => {
        wave = new Wave(loadedShip);
        physics = new Physics(loadedShip);

        setupinputGUI(water, loadedShip);
        const gui = setupTimeGUI(water, loadedShip);
        gui.open();

        const floatingInstance = new Floating();
        floatingInstance.calculateFloating(loadedShip);

        const thrustforceInstance = new ThrustForce();
        thrustforceInstance.calculateThrustForce(loadedShip);

        animate();
    });

    ice = new Ice(scene, (loadedIce) => {
        console.log('Ice model loaded:', loadedIce.iceModel);
    });

    const controls = new OrbitControls(mainCamera, mainRenderer.domElement);
    setupControls(controls);

    setupKeyEvents(ship);

    window.addEventListener('resize', onWindowResize);

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




function detectIceCollision() {
    // Implement your collision detection logic here
    // Return true if the ship collides with ice, otherwise false
    // For now, we assume a collision for testing
    return false; // Placeholder
}

function updateShipPosition() {
    const startTime = Date.now();
    const duration = 10000; // Total duration for the animation (10 seconds)
    let angle = 0;
    const targetAngle = 80 * Math.PI / 180; // Target angle in radians (80 degrees)

    const update = () => {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;

        // Detect collision with ice
        if (detectIceCollision()) {
            ship.speed.pos = 0;
            ship.speed.rot = 0;
            disableArrowControls(); // Disable arrow controls
            console.log('Collision detected, playing sound...');
            
            return; // Exit the update function
        }

        // Rotate the ship
        if (angle <targetAngle) { 
            angle = 0.0009 * progress * Math.PI / 50;
            ship.rotateZ(-angle);
        }

        // Update the position over time
        if (elapsed >= 2000) { // Start slowing down after 2 seconds
            const deltaPos = 0.000009 * (elapsed - 2000) / duration; // Progress after the initial delay
            ship.speed.pos -= deltaPos * 100;
            ship.speed.rot += deltaPos;
        }

        if (elapsed < duration) {
            requestAnimationFrame(update); 
        }
    };

    update();
}


function disableArrowControls() {
    window.removeEventListener('keydown', handleArrowKeys);
}

function handleArrowKeys(event) {
    switch (event.key) {
        case 'ArrowUp':
            // Move ship up
            break;
        case 'ArrowDown':
            // Move ship down
            break;
        case 'ArrowLeft':
            // Rotate ship left
            break;
        case 'ArrowRight':
            // Rotate ship right
            break;
        default:
            break;
    }
}

window.addEventListener('keydown', handleArrowKeys);


function checkCollision() {
    window.crush = true;
    if (ship && ship.ship && ship.ship.boundingBox && ice && ice.iceModel && ice.iceModel.boundingBox) {
        ship.updateBoundingBox();
        ice.updateBoundingBox();
        if (ship.ship.boundingBox.intersectsBox(ice.iceModel.boundingBox)) {
            console.log("warning !!!  Collision detected ");
            crushing.playSoundcrush(); // Play crashing sound
            updateShipPosition();
        }
    }
}

function animate() {
    requestAnimationFrame(animate);

    if (ship && typeof ship.update === 'function') {
        ship.update();
        if (physics) {
            physics.update();
        }
    }

    const shipPosition = ship.getPosition();
    if (shipPosition) {
        smallCamera.position.set(shipPosition.x + 90, shipPosition.y + 10, shipPosition.z + 1);
        smallCamera.lookAt(shipPosition);
    }

    if (water) {
        water.material.uniforms['time'].value += timeParams.speed / 60.0;
    }

    checkCollision();
    render();
}

function render() {
    mainRenderer.render(scene, mainCamera);
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
