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



// Change Playback Speed -------------------- //



// Fullscreen ------------------------------- //


// Event Listeners -------------------------- //
playButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);