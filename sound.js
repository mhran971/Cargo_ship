import * as THREE from 'three';

class SoundPlayer {
  constructor() {
    this.listener = new THREE.AudioListener();
    this.audioLoader = new THREE.AudioLoader();
    this.audio = new THREE.Audio(this.listener);
    this.isSoundPlaying = false;
  }

  loadSound(audioFilePath) {
    this.audioLoader.load(audioFilePath, (buffer) => {
      this.audio.setBuffer(buffer);
      this.audio.setLoop(false);
      this.audio.setVolume(0.5);

      document.addEventListener('keydown', (event) => {
        if (event.key === 't' || event.key === 'T') {
          if (!this.isSoundPlaying) {
            this.playSound();
          }
        }
      });

      this.audio.onEnded = () => {
        this.isSoundPlaying = false;
        this.loadSecondSound();
      };
    });
  }

  loadSecondSound() {
    const secondAudioFilePath = 'sound/rest.mp3';//C:\three.js_projects\Cargo_Ship\Cargo_ship\sound\turning_on.mp3
    this.audioLoader.load(secondAudioFilePath, (buffer) => {
      const secondAudio = new THREE.Audio(this.listener);
      secondAudio.setBuffer(buffer);
      secondAudio.setLoop(true);
      secondAudio.setVolume(0.5);
      secondAudio.play();
      this.isSoundPlaying = true;
    });
  }

  playSound() {
    this.audio.play();
    this.isSoundPlaying = true;
  }
}

export default SoundPlayer;