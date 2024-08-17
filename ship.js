import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class Ship {
    constructor(scene, onLoadCallback) {
        this.scene = scene;
        const loader = new GLTFLoader();
        this.ship = null;
        this.speed = {
            vel: 0,
            rot: 0,
            pos: 7.5,
            z: 0,
        };
        const y = 7.5;
        loader.load("assets/Ship/scene.gltf", (gltf) => {
            this.ship = gltf.scene;
            this.ship.scale.set(5, 5, 5);
            this.ship.position.set(0, y, 0);
            this.ship.boundingBox = new THREE.Box3().setFromObject(gltf.scene);
            this.scene.add(this.ship);

            if (onLoadCallback) {
                onLoadCallback(this);
            }
        });
    }

    updateBoundingBox() {
        if (this.ship && this.ship.boundingBox) {
            this.ship.boundingBox.setFromObject(this.ship);
        }
    }

    getPosition() {
        if (this.ship) {
            return this.ship.position;
        } else {
            console.warn("Ship not loaded yet.");
            return null;
        }
    }

    rotateX(angleInRadians) {
        if (this.ship) {
            this.ship.rotateX(angleInRadians);
        }
    }

    rotateZ(angleInRadians) {
        if (this.ship) {
            this.ship.rotateZ(angleInRadians);
        }
    }

    getRotation() {
        return this.ship ? this.ship.rotation : null;
    }

    setPosition(x, y, z) {
        if (this.ship) {
            this.ship.position.set(x, y, z);
            this.speed.pos = y; 
        }
    }

    setRotation(x, y, z) {
        if (this.ship) {
            this.ship.rotation.set(x, y, z);
        }
    }

    updatePositionY(y) {
        if (this.ship) {
            console.log(`Updating ship Y position from ${this.ship.position.y} to ${y}`);
            this.ship.position.y = y;
            this.speed.pos = y; 
            console.log(`Ship Y position is now ${this.ship.position.y}`);
        } else {
            console.warn("Ship not loaded, cannot update Y position.");
        }
    }
    
    stop() {
        this.speed.vel = 0;
        this.speed.rot = 0;
        this.speed.pos = 7.5;
        this.speed.z = 0;
    }

    update() {
        if (this.ship) {
            this.ship.rotateY(this.speed.vel);
            this.ship.translateX(this.speed.rot);
            this.ship.position.y = this.speed.pos; 
            this.ship.rotateX(this.speed.z);
        }
    }
}
