import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class Ice {
    constructor(scene, onLoadCallback) {
        this.scene = scene;
        const loader = new GLTFLoader();
        this.iceModel = null;

        const y = 17.5;
        // loader.load(
        //     "assets/Ice/scene.gltf",
        //     (gltf) => {
        //         scene.add(gltf.scene);
        //         gltf.scene.scale.set(25, 25, 25);
        //         gltf.scene.position.set(0, y, 0);
        //         this.iceModel = gltf.scene;
        //         this.iceModel.boundingBox = new THREE.Box3().setFromObject(gltf.scene);
        //         if (onLoadCallback) {
        //             onLoadCallback(this);
        //         }
        //     },
        //     undefined, 
        //     (error) => {
        //         console.error('An error occurred while loading the GLTF model:', error);
        //     }
        // );
    }

    updateBoundingBox() {
        if (this.iceModel && this.iceModel.boundingBox) {
            this.iceModel.boundingBox.setFromObject(this.iceModel);
        }
    }
}
