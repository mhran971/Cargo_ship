import * as THREE from 'three';

class SoundPlayer {
  constructor() {
    this.listener = new THREE.AudioListener();
    this.audioLoader = new THREE.AudioLoader();
    this.audio = new THREE.Audio(this.listener);
    this.secondAudio = null; // Store the second audio instance
    this.isSoundPlaying = false;
    this.volume = 0.2;
    this.volumeChangeRate = 1.5 // smaller increments
    this.volumeChangeInterval = 2000; // shorter interval for smoother changes
    this.increaseVolumeInterval = null;
    this.decreaseVolumeInterval = null;
  }

  loadSound(audioFilePath) {
    this.audioLoader.load(audioFilePath, (buffer) => {
      this.audio.setBuffer(buffer);
      this.audio.setLoop(false);
      this.audio.setVolume(this.volume); // Use the initial volume

      console.log("Sound loaded with initial volume:", this.volume);

      document.addEventListener('keydown', this.handleKeyDown.bind(this));
      document.addEventListener('keyup', this.handleKeyUp.bind(this));

      this.audio.onEnded = () => {
        this.isSoundPlaying = false;
        this.loadSecondSound();
      };
    });
  }

  handleKeyDown(event) {
    if (event.key === 't' || event.key === 'T') {
      if (!this.isSoundPlaying) {
        this.playSound();
      }
    } else if (event.key === 'ArrowUp') {
      console.log("ArrowUp pressed - Starting to increase volume");
      this.startIncreasingVolume();
    }
  }

  handleKeyUp(event) {
    if (event.key === 'ArrowUp') {
      console.log("ArrowUp released - Starting to decrease volume");
      this.stopIncreasingVolume();
      this.startDecreasingVolume();
    }
  }

  loadSecondSound() {
    const secondAudioFilePath = 'sound/rest.mp3';
    this.audioLoader.load(secondAudioFilePath, (buffer) => {
      this.secondAudio = new THREE.Audio(this.listener);
      this.secondAudio.setBuffer(buffer);
      this.secondAudio.setLoop(true);
      this.secondAudio.setVolume(this.volume); // Set initial volume
      this.secondAudio.play();
      this.isSoundPlaying = true;
    });
  }

  playSound() {
    console.log("Playing sound");
    this.audio.play();
    this.isSoundPlaying = true;
  }

  startIncreasingVolume() {
    this.clearVolumeIntervals();
    this.increaseVolumeInterval = setInterval(() => {
      if (this.volume < 1.0) {
        this.volume = Math.min(1.0, this.volume + this.volumeChangeRate);
        console.log("Increasing volume:", this.volume);
        this.audio.setVolume(this.volume);
        if (this.secondAudio) {
          this.secondAudio.setVolume(this.volume);
        }
      }
    }, this.volumeChangeInterval);
  }

  stopIncreasingVolume() {
    if (this.increaseVolumeInterval) {
      clearInterval(this.increaseVolumeInterval);
      this.increaseVolumeInterval = null;
    }
  }

  startDecreasingVolume() {
    this.clearVolumeIntervals();
    this.decreaseVolumeInterval = setInterval(() => {
      if (this.volume > 0.0) {
        this.volume = Math.max(0.0, this.volume - this.volumeChangeRate);
        console.log("Decreasing volume:", this.volume);
        this.audio.setVolume(this.volume);
        if (this.secondAudio&&this.volume >0.2) {
          this.secondAudio.setVolume(this.volume);
        }
      }
    }, this.volumeChangeInterval);
  }

  clearVolumeIntervals() {
    if (this.increaseVolumeInterval) {
      clearInterval(this.increaseVolumeInterval);
      this.increaseVolumeInterval = null;
    }
    if (this.decreaseVolumeInterval) {
      clearInterval(this.decreaseVolumeInterval);
      this.decreaseVolumeInterval = null;
    }
  }

  cruchingsound(audioFilePath ,turnon) {
    if(turnon){
    this.audioLoader.load(audioFilePath, (buffer) => {
      this.audio.setBuffer(buffer);
      this.audio.setLoop(false);
      this.audio.setVolume(this.volume); })
}}
loadSoundcrush(filePath) {
  this.audio = new Audio(filePath);
}
playSoundcrush() {
  if (this.audio) {
      this.audio.play();
  }
}

}
export default SoundPlayer;
