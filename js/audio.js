/**
 * Tactile Darkroom Sound Controller (Web Audio API)
 * Zero external audio files required; pure synthesized acoustic feedback.
 */

class SoundController {
    constructor() {
        this.ctx = null;
        this.enabled = false; // Muted by default, user can toggle
    }

    init() {
        if (!this.ctx && typeof window !== 'undefined') {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
    }

    toggle() {
        this.init();
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        this.enabled = !this.enabled;
        return this.enabled;
    }

    // Shutter click / mode toggle click sound
    playClick() {
        if (!this.enabled || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            
            // Mechanical transient click
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(1400, now);
            osc.frequency.exponentialRampToValueAtTime(80, now + 0.04);
            
            gain.gain.setValueAtTime(0.18, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start(now);
            osc.stop(now + 0.05);

            // Subtle body resonance
            const sub = this.ctx.createOscillator();
            const subGain = this.ctx.createGain();
            sub.type = 'sine';
            sub.frequency.setValueAtTime(180, now);
            sub.frequency.exponentialRampToValueAtTime(40, now + 0.08);
            subGain.gain.setValueAtTime(0.12, now);
            subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            sub.connect(subGain);
            subGain.connect(this.ctx.destination);
            sub.start(now);
            sub.stop(now + 0.09);
        } catch (e) {
            console.debug('Audio error', e);
        }
    }

    // Light table click / loupe snap
    playLoupeSnap() {
        if (!this.enabled || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(2200, now);
            osc.frequency.exponentialRampToValueAtTime(600, now + 0.02);
            
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start(now);
            osc.stop(now + 0.03);
        } catch (e) {
            console.debug('Audio error', e);
        }
    }
}

export const sound = new SoundController();
