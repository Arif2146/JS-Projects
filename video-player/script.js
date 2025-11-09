const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playButton = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenButton = document.querySelector('.fullscreen');
const speed = document.querySelector('.player-speed');



// Play & Pause ----------------------------------- //
function togglePlay() {
    if (video.paused) {
    video.play();
    playButton.classList.replace('fa-play', 'fa-pause');
    playButton.setAttribute('title', 'Pause');
  } else {
    video.pause();
    playButton.classList.replace('fa-pause', 'fa-play');
    playButton.setAttribute('title', 'Play');
  }
}

video.addEventListener('ended', () => {
  playButton.classList.replace('fa-pause', 'fa-play');
  playButton.setAttribute('title', 'Play');
});
// Progress Bar ---------------------------------- //
function updateProgress() { 
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
    let minutes = Math.floor(video.currentTime / 60);
    let seconds = Math.floor(video.currentTime % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    currentTime.textContent = `${minutes}:${seconds}`;

}

function setProgress(e) {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
}


// Volume Controls --------------------------- //
let lastVolume = 1;

function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  if (volume < 0.1) {
    volume = 0;
  }
  else if (volume > 0.9) {
    volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;
  volumeIcon.className = '';
  if (volume > 0.7) {
    volumeIcon.classList.add('fas', 'fa-volume-up');
  } else if (volume <= 0.7 && volume > 0) {
    volumeIcon.classList.add('fas', 'fa-volume-down');
  } else if (volume === 0) {
    volumeIcon.classList.add('fas', 'fa-volume-mute');
  }
  lastVolume = volume;
}


function toggleMute() {
  if (video.volume) {
    lastVolume = video.volume
    video.volume = 0;
    volumeBar.style.width = 0;
    volumeIcon.className = '';
    volumeIcon.classList.add('fas', 'fa-volume-mute'); 
    volumeIcon.setAttribute('title', 'Unmute');
  }
  else {
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    volumeIcon.className = '';
    volumeIcon.classList.add('fas', 'fa-volume-up');
    volumeIcon.setAttribute('title', 'Mute');
  }
}

// Change Playback Speed -------------------- //

function changeSpeed() {
  video.playbackRate = speed.value;
}


// Fullscreen ------------------------------- //
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    video.parentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}


// Event Listeners -------------------------- //
playButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenButton.addEventListener('click', toggleFullScreen);