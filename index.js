class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.targetDate = targetDate;
    this.refTimer = document.querySelector(selector);
    this.refDays = this.refTimer.querySelector('span[data-value="days"]');
    this.refHours = this.refTimer.querySelector('span[data-value="hours"]');
    this.refMins = this.refTimer.querySelector('span[data-value="mins"]');
    this.refSecs = this.refTimer.querySelector('span[data-value="secs"]');
    this.start();
  }

  start() {
    const targetTime = new Date(this.targetDate).getTime();
    this.intervalId = setInterval(() => {
      const timeNow = Date.now();
      const deltaTime = targetTime - timeNow;
      if (deltaTime <= 0) {
        this.stop();
        console.log('Counter stoped');
        return;
      }
      const time = this.getTimeComponents(deltaTime);
      this.updateTimer(time);
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    const time = this.getTimeComponents(0);
    this.updateTimer(time);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
  updateTimer({ days, hours, mins, secs }) {
    this.refDays.textContent = `${days}`;
    this.refHours.textContent = `${hours}`;
    this.refMins.textContent = `${mins}`;
    this.refSecs.textContent = `${secs}`;
  }
}

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Sep 17, 2021'),
  // targetDate: new Date(Date.now() + 5000),
});
