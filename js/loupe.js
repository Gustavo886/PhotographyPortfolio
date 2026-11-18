/**
 * Darkroom Optical Loupe Magnifier Module
 * Simulates a high-end 2.5x darkroom inspection loupe with knurled metal barrel
 * and optical glass distortion.
 */

import { sound } from './audio.js';

export class OpticalLoupe {
    constructor() {
        this.loupeEl = null;
        this.lensGlass = null;
        this.currentFrame = null;
        this.targetImg = null;
        this.active = false;
        this.enabled = true; // Global toggle
        
        // Coordinates & smooth lerp
        this.mouse = { x: 0, y: 0 };
        this.pos = { x: 0, y: 0 };
        this.lerpFactor = 0.22; // Snappy yet physical
        this.animId = null;

        this.initDOM();
        this.bindEvents();
    }

    initDOM() {
        this.loupeEl = document.createElement('div');
        this.loupeEl.className = 'darkroom-loupe';
        this.loupeEl.innerHTML = `
            <div class="loupe-barrel">
                <div class="loupe-knurl"></div>
                <div class="loupe-glass">
                    <div class="loupe-crosshair"></div>
                    <div class="loupe-reflection"></div>
                    <div class="loupe-reflection-secondary"></div>
                </div>
                <div class="loupe-badge">2.5× RETICLE</div>
            </div>
        `;
        document.body.appendChild(this.loupeEl);
        this.lensGlass = this.loupeEl.querySelector('.loupe-glass');
    }

    bindEvents() {
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            if (this.active) {
                this.updateMagnification(e);
            }
        });

        // Touch support for tablets/mobile
        window.addEventListener('touchmove', (e) => {
            if (e.touches && e.touches[0] && this.active) {
                this.mouse.x = e.touches[0].clientX;
                this.mouse.y = e.touches[0].clientY;
                this.updateMagnification(e.touches[0]);
            }
        }, { passive: true });

        this.startLoop();
    }

    startLoop() {
        const loop = () => {
            if (this.active) {
                // Smooth physical lag
                this.pos.x += (this.mouse.x - this.pos.x) * this.lerpFactor;
                this.pos.y += (this.mouse.y - this.pos.y) * this.lerpFactor;

                this.loupeEl.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, 0)`;
            }
            this.animId = requestAnimationFrame(loop);
        };
        loop();
    }

    attachToFrame(frameData, projectData, frameElement) {
        if (!this.enabled) return;

        if (!frameElement) {
            this.hide();
            return;
        }

        const img = frameElement.querySelector('.negative-image');
        if (!img) return;

        this.currentFrame = frameData;
        this.targetImg = img;
        this.active = true;
        this.loupeEl.classList.add('visible');

        // Set high-res background source
        const src = img.getAttribute('src');
        this.lensGlass.style.backgroundImage = `url("${src}")`;

        sound.playLoupeSnap();
    }

    updateMagnification(e) {
        if (!this.targetImg || !this.active) return;

        const rect = this.targetImg.getBoundingClientRect();
        
        // Check if cursor is still reasonably within or near the image
        const buffer = 40;
        if (
            e.clientX < rect.left - buffer ||
            e.clientX > rect.right + buffer ||
            e.clientY < rect.top - buffer ||
            e.clientY > rect.bottom + buffer
        ) {
            this.hide();
            return;
        }

        // Calculate percentage position inside the target image
        const xPercent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        const yPercent = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));

        this.lensGlass.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
        this.lensGlass.style.backgroundSize = `${rect.width * 2.8}px ${rect.height * 2.8}px`;
    }

    hide() {
        this.active = false;
        this.currentFrame = null;
        this.targetImg = null;
        if (this.loupeEl) {
            this.loupeEl.classList.remove('visible');
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        if (!this.enabled) {
            this.hide();
        }
        return this.enabled;
    }
}
