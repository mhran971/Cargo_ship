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
      scene.add(gltf.scene);
      gltf.scene.scale.set(5, 5, 5);
      gltf.scene.position.set(0, y, 0);
      this.ship = gltf.scene;
      if (onLoadCallback) {
        onLoadCallback(this);
      }
    });
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

  getPosition() {
    return this.ship ? this.ship.position : null;
  }

  getRotation() {
    return this.ship ? this.ship.rotation : null;
  }

  setPosition(x, y, z) {
    if (this.ship) {
      this.ship.position.set(x, y, z);
    }
  }

  setRotation(x, y, z) {
    if (this.ship) {
      this.ship.rotation.set(x, y, z);
    }
  }

  updatePositionY(y) {
    if (this.ship) {
      this.ship.position.y += y;
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
