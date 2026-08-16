"use strict";
class Clock {
    hourHand;
    minuteHand;
    minuteAngle = 0;
    hourAngle = 0;
    letterElements = [];
    letters = ["H", "A", "C", "K", "N", "O", "V", "A", "T", "E", "•", "8"];
    constructor() {
        this.hourHand = document.getElementById('hourHand');
        this.minuteHand = document.getElementById('minuteHand');
        this.generateTicks();
        this.tick();
    }
    generateTicks() {
        const ticksContainer = document.getElementById('ticksContainer');
        if (!ticksContainer)
            return;
        for (let i = 0; i < 60; i++) {
            if (i % 5 === 0) {
                const tick = document.createElement('div');
                tick.className = 'tick major';
                tick.style.transform = `rotate(${i * 6}deg)`;
                ticksContainer.appendChild(tick);
                const hourIndex = i / 5; // 0 to 11
                // Map hour indices to letters: 12 o'clock (index 0) maps to "8", 1 o'clock (index 1) to "H", etc.
                const letterIndex = hourIndex === 0 ? 11 : hourIndex - 1;
                const char = this.letters[letterIndex];
                const label = document.createElement('div');
                label.className = 'tick-letter';
                label.innerText = char;
                // Position labels upright using trigonometry (Radius: 200px, placing text at radius 120px)
                const angleRad = (i * 6 - 90) * Math.PI / 180;
                const r = 120;
                const x = 200 + r * Math.cos(angleRad);
                const y = 200 + r * Math.sin(angleRad);
                label.style.left = `${x}px`;
                label.style.top = `${y}px`;
                // Add negative animation delay to phase the rainbow colors around the clock dial
                label.style.animationDelay = `-${letterIndex * 0.5}s`;
                ticksContainer.appendChild(label);
                // Keep track of the letter element in order (1 o'clock first, up to 12 o'clock last)
                this.letterElements[letterIndex] = label;
            }
            else {
                const tick = document.createElement('div');
                tick.className = 'tick';
                tick.style.transform = `rotate(${i * 6}deg)`;
                ticksContainer.appendChild(tick);
            }
        }
    }
    tick() {
        // Slower animation: 360 degrees in 20 seconds (0.3 degrees per frame at 60fps)
        this.minuteAngle = (this.minuteAngle + 0.3) % 360;
        this.hourAngle = (this.hourAngle + 0.025) % 360;
        this.minuteHand.style.transform = `rotate(${this.minuteAngle}deg)`;
        this.hourHand.style.transform = `rotate(${this.hourAngle}deg)`;
        // Reveal letters before the minute hand sweeps over them
        // Each letter i (0 to 11) is located at targetAngle = (i + 1) * 30 degrees.
        // It reveals when the minute hand gets within 15 degrees of it (i.e. angle >= targetAngle - 15).
        for (let i = 0; i < 12; i++) {
            const targetAngle = (i + 1) * 30;
            const threshold = targetAngle - 15;
            const element = this.letterElements[i];
            if (element) {
                if (this.minuteAngle >= threshold) {
                    element.classList.add('revealed');
                }
                else {
                    element.classList.remove('revealed');
                }
            }
        }
        requestAnimationFrame(() => this.tick());
    }
}
const clock = new Clock();
