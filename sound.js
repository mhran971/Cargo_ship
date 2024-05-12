import * as THREE from 'three';

const listener = new THREE.AudioListener();
const audioLoader = new THREE.AudioLoader();
const audio = new THREE.Audio(listener);
let isSoundPlaying = false;

function loadSound(audioFilePath) {
  audioLoader.load(audioFilePath, function (buffer) {
    audio.setBuffer(buffer);
    audio.setLoop(false);
    audio.setVolume(0.5);

    document.addEventListener('keydown', function (event) {
      if (event.key === 't' || event.key === 'T') {
        if (!isSoundPlaying) {
          audio.play();
          isSoundPlaying = true;
        }
      }
    });

    audio.onEnded = function () {
      isSoundPlaying = false;
      loadSecondSound();
    };
  });
}

function loadSecondSound() {
  const secondAudioFilePath = 'sound/rest.mp3';
  audioLoader.load(secondAudioFilePath, function (buffer) {
    const secondAudio = new THREE.Audio(listener);
    secondAudio.setBuffer(buffer);
    secondAudio.setLoop(true);
    secondAudio.setVolume(0.5);
    secondAudio.play();
    isSoundPlaying = true;
  });
}

export { listener, loadSound };