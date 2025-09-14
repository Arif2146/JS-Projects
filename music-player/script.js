const title = document.getElementById("title");
const artist = document.getElementById("artist");
const img = document.querySelector("img");
const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const songs = [
    {
        name: "jacinto-1",
        displayName: "Nadaaniyan",
        artist: "Akshath",
    },
        {
        name: "jacinto-2",
        displayName: "I Think They Call This Love",
        artist: "Elliot James Reay",
    },
        {
        name: "jacinto-3",
        displayName: "O MERE SAJNA VE DOLA MERE KO",
        artist: "Aditya Rikhari",
    },
        {
        name: "metric-1",
        displayName: "Blinding-Lights",
        artist: "The Weeknd",
    },
]
let isPlaying = false;

function playsong(){
    playBtn.classList.replace("fa-play","fa-pause");
    playBtn.setAttribute("tittle","Pause");
    music.play();
    isPlaying = true;
}

function pausesong(){
    playBtn.classList.replace("fa-pause","fa-play");
    music.pause();
    playBtn.setAttribute("tittle","Play"); 
    isPlaying = false;
}
playBtn.addEventListener('click', ()=>(isPlaying ? pausesong() : playsong()));

function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    img.src = `img/${song.name}.jpg`;
}
let songIndex = 0;
loadSong(songs[songIndex]);

function nextSong(){
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    songIndex++;
    loadSong(songs[songIndex]);
    playsong();
}
function prevSong(){
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    songIndex--;
    loadSong(songs[songIndex]);
    playsong();
}

function updateProgressBar(e){
    if(isPlaying){
        const {duration,currentTime} = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Duration calculation
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        }
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10){ 
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

function setProgressBar(e){
    const width = this.clientWidth;
    console.log('width',width);
    const clickX = e.offsetX;
    console.log('clickX',clickX);
    const {duration} = music;
    console.log(clickX/width);
    console.log((clickX/width)*duration);
    music.currentTime = (clickX / width) * duration;
}

prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
progressContainer.addEventListener('click',setProgressBar);    
music.addEventListener('timeupdate',updateProgressBar);
music.addEventListener('ended',nextSong);