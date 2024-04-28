import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


export class Ship {
  constructor(scene) {
    const loader = new GLTFLoader();

    loader.load("assets/Ship/scene.gltf", (gltf) => {
      scene.add(gltf.scene);
      gltf.scene.scale.set(5, 5, 5);
      gltf.scene.position.set(0, 7.5, 0);

      this.ship = gltf.scene;
      this.speed = {
        vel: 0,
        rot: 0,
      };
    });
  }

  stop() {
    this.speed.vel = 0;
    this.speed.rot = 0;
  }

  update() {
    if (this.ship) {
      this.ship.rotateY(this.speed.vel);
      this.ship.translateX(this.speed.rot);
    }
  }
}
