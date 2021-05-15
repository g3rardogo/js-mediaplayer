import MediaPlayer from './mediaPlayer.js';
import AutoPause from './AutoPause.js';

function getElement(id) {
    return document.querySelector(id);
}

const video = getElement('.main-video');

const btnState = getElement('.play-pause');
const btnSound = getElement('.btn-sound');
const btnStateIcon = getElement('.fa-play')
const btnSoundIcon = getElement('.fa-volume-up')

const timePlayed = getElement('#time-played');
const timeDuration = getElement('#time-duration');

const barProgress = getElement('.bar-progress');
const soundBar = getElement('.slider-volume');

const player = new MediaPlayer({
    el: video,
    plugins: [new AutoPause(btnStateIcon)],
});

//Pause and play
btnState.onclick = () => player.togglePlay(btnStateIcon);
video.onclick = () => player.togglePlay(btnStateIcon);

//Video duration
video.onloadeddata = () => player.showDuration(timeDuration);

//Current time video
video.addEventListener('timeupdate', () => {
    player.showCurrentTime(barSeeker, barProgress, timePlayed)
});

//Allow click on seeker to change video position
barSeeker.addEventListener("change", () => {
    player.changeTimeWithSeeker(barSeeker);
});

//Mute and unmute
btnSound.onclick = () => player.toggleSound(btnSoundIcon, soundBar);

//Volume bar
soundBar.addEventListener("change", () => {
    player.changeVolumeWithBar(soundBar, btnSound);
});