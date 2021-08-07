class AutoPause {
    constructor(btnStateIcon) {
      this.btnStateIcon = btnStateIcon;
      this.threshold = 0.25;
      this.handleIntersection = this.handleIntersection.bind(this);
      this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    }
  
    run(player) {
        this.player = player;

        const observer = new IntersectionObserver(this.handleIntersection, {
            threshold: this.threshold,
        });

        observer.observe(player.media);

        document.addEventListener('visibilitychange', this.handleVisibilityChange);
    }
  
    handleIntersection(entries) {
        const entry = entries[0];

        const isVisible = entry.intersectionRatio >= this.threshold;

        if (isVisible) {
            this.player.play();
            this.btnStateIcon.className = "fas fa-pause";
        } else {
            this.player.pause();
            this.btnStateIcon.className = "fas fa-play";
        }
    }
  
    handleVisibilityChange() {
        const isVisible = document.visibilityState === 'visible';
        if (isVisible) {
            this.player.play();
            this.btnStateIcon.className = "fas fa-pause";
        } else {
            this.player.pause();
            this.btnStateIcon.className = "fas fa-play";
        }
    }
}
  
export default AutoPause;