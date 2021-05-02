function mediaPlayer(config) {
    this.media = config.el;
    this.plugins = config.plugins || [];
    this._initPlugins();
}

var thePosition,
theMinutes,
theSeconds,
theTime;

var readableTime = function(t) {
    theMinutes = "0" + Math.floor(t / 60); // Divide seconds to get minutes, add leading zero
    theSeconds = "0" + parseInt(t % 60); // Get remainder seconds
    theTime = theMinutes.slice(-2) + ":" + theSeconds.slice(-2); // Slice to two spots to remove excess zeros
    return theTime;
};

mediaPlayer.prototype.play = function() {
    this.media.play();
}

mediaPlayer.prototype.pause = function() {
    this.media.pause();
}

mediaPlayer.prototype.togglePlay = function(btnStateIcon) {
    if (this.media.paused) {
        this.play();
        btnStateIcon.className = "fas fa-pause";
    } else {
        this.pause()
        btnStateIcon.className = "fas fa-play"
    }
};

mediaPlayer.prototype.mute = function() {
    this.media.muted = true;
};

mediaPlayer.prototype.unmute = function() {
    this.media.muted = false;
};

mediaPlayer.prototype.toggleSound = function(btnSoundIcon, soundBar) {
    this.media.muted = !this.media.muted;
    if (this.media.muted == true) {
        btnSoundIcon.className = "fas fa-volume-mute";
        soundBar.value = 0;
    } else {
        btnSoundIcon.className = "fas fa-volume-up";
        soundBar.value = 10;
    }
};

mediaPlayer.prototype.showDuration = function(timeDuration) {
    timeDuration.innerHTML = readableTime(this.media.duration);
}

mediaPlayer.prototype.showCurrentTime = function(barSeeker, barProgress, timePlayed) {
    const currentTime = this.media.currentTime;
    const timeDuration = this.media.duration;
    barSeeker.value = currentTime;
    barProgress.value = currentTime;
    barSeeker.max = timeDuration;
    barProgress.max = timeDuration;
    timePlayed.innerHTML = readableTime(this.media.currentTime);
}

mediaPlayer.prototype.changeTimeWithSeeker = function(barSeeker) {
    thePosition = barSeeker.value;
    this.media.currentTime = thePosition;
}

mediaPlayer.prototype.changeVolumeWithBar = function(soundBar, btnSound) {
    const theVolume = soundBar.value / 10;
    this.media.volume = theVolume;

    if(theVolume === 0) {
        btnSound.firstElementChild.className = "fas fa-volume-mute";
    } else if (theVolume >= 0.5) {
        btnSound.firstElementChild.className = "fas fa-volume-up";
    } else {
        btnSound.firstElementChild.className = "fas fa-volume-down"
    }
}

mediaPlayer.prototype._initPlugins = function() {
    const player = {
        play: () => this.play(),
        pause: () => this.pause(),
        media: this.media,
    };
    this.plugins.forEach(plugin => {
        plugin.run(player);
    })
}

export default mediaPlayer;