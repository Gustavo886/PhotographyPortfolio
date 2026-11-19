/**
 * Lightbox / Full-Bleed Frame Inspector Module
 * Museum-quality darkroom modal with EXIF & frame provenance metadata.
 */

import { projects } from './data.js';

export class Lightbox {
    constructor() {
        this.modalEl = null;
        this.currentFrame = null;
        this.currentProject = null;
        this.allFramesList = []; // Flattened list for sequential navigation
        this.currentIndex = -1;
        this.isOpen = false;

        this.initDOM();
        this.buildFramesIndex();
        this.bindEvents();
    }

    buildFramesIndex() {
        this.allFramesList = [];
        projects.forEach(project => {
            project.frames.forEach(frame => {
                this.allFramesList.push({ frame, project });
            });
        });
    }

    initDOM() {
        this.modalEl = document.createElement('div');
        this.modalEl.className = 'darkroom-lightbox';
        this.modalEl.setAttribute('role', 'dialog');
        this.modalEl.setAttribute('aria-modal', 'true');
        this.modalEl.innerHTML = `
            <div class="lightbox-backdrop"></div>
            <div class="lightbox-container">
                <!-- Top Utility Bar -->
                <header class="lightbox-header">
                    <div class="lightbox-breadcrumbs">
                        <span class="lb-roll" id="lb-roll-code">ROLL-00</span>
                        <span class="lb-sep">/</span>
                        <span class="lb-series" id="lb-series-title">PROJECT</span>
                        <span class="lb-sep">/</span>
                        <span class="lb-frame-tag" id="lb-frame-tag">FRAME 00</span>
                    </div>
                    <div class="lightbox-actions">
                        <span class="lightbox-counter" id="lb-counter">1 / 15</span>
                        <button class="lb-close-btn" id="lb-close-btn" title="Close (ESC)">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </header>

                <!-- Stage View -->
                <div class="lightbox-stage">
                    <button class="lb-nav-btn lb-prev-btn" id="lb-prev-btn" title="Previous frame (Left arrow)">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>

                    <div class="lightbox-image-wrap">
                        <img src="" alt="" id="lb-main-image" class="lightbox-main-img">
                        <div class="lightbox-grain-overlay"></div>
                    </div>

                    <button class="lb-nav-btn lb-next-btn" id="lb-next-btn" title="Next frame (Right arrow)">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>

                <!-- Bottom Metadata Drawer -->
                <footer class="lightbox-footer">
                    <div class="footer-meta-primary">
                        <h2 class="lb-title" id="lb-title">Frame Title</h2>
                        <p class="lb-caption" id="lb-caption">Frame caption description.</p>
                    </div>
                    <div class="footer-meta-technical">
                        <div class="tech-spec">
                            <span class="tech-label">CAMERA & OPTIC</span>
                            <span class="tech-val" id="lb-gear">35mm • 28mm f/2.8</span>
                        </div>
                        <div class="tech-spec">
                            <span class="tech-label">EXPOSURE</span>
                            <span class="tech-val" id="lb-exposure">1/500s @ f/8</span>
                        </div>
                        <div class="tech-spec">
                            <span class="tech-label">EMULSION / DEV</span>
                            <span class="tech-val" id="lb-emulsion">KODAK TRI-X 400</span>
                        </div>
                        <div class="tech-spec">
                            <span class="tech-label">LOCATION</span>
                            <span class="tech-val" id="lb-location">Mexico City • 2023</span>
                        </div>
                    </div>
                </footer>
            </div>
        `;
        document.body.appendChild(this.modalEl);
    }

    bindEvents() {
        const backdrop = this.modalEl.querySelector('.lightbox-backdrop');
        const closeBtn = this.modalEl.querySelector('#lb-close-btn');
        const prevBtn = this.modalEl.querySelector('#lb-prev-btn');
        const nextBtn = this.modalEl.querySelector('#lb-next-btn');

        backdrop.addEventListener('click', () => this.close());
        closeBtn.addEventListener('click', () => this.close());
        prevBtn.addEventListener('click', () => this.prev());
        nextBtn.addEventListener('click', () => this.next());

        window.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;

            if (e.key === 'Escape') {
                this.close();
            } else if (e.key === 'ArrowLeft') {
                this.prev();
            } else if (e.key === 'ArrowRight') {
                this.next();
            }
        });

        // Mobile Touch Swipe Support
        let touchStartX = 0;
        let touchStartY = 0;

        this.modalEl.addEventListener('touchstart', (e) => {
            if (e.touches && e.touches[0]) {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }
        }, { passive: true });

        this.modalEl.addEventListener('touchend', (e) => {
            if (e.changedTouches && e.changedTouches[0]) {
                const diffX = e.changedTouches[0].clientX - touchStartX;
                const diffY = e.changedTouches[0].clientY - touchStartY;

                // Detect horizontal swipe gesture
                if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
                    if (diffX < 0) {
                        this.next(); // Swipe left -> next frame
                    } else {
                        this.prev(); // Swipe right -> prev frame
                    }
                }
            }
        }, { passive: true });
    }

    open(frame, project) {
        this.currentFrame = frame;
        this.currentProject = project;
        this.currentIndex = this.allFramesList.findIndex(item => item.frame.id === frame.id);
        this.isOpen = true;
        this.modalEl.classList.add('is-open');
        document.body.classList.add('lightbox-locked');

        this.renderCurrent();
    }

    renderCurrent() {
        if (this.currentIndex < 0 || this.currentIndex >= this.allFramesList.length) return;

        const { frame, project } = this.allFramesList[this.currentIndex];
        this.currentFrame = frame;
        this.currentProject = project;

        // Elements
        const img = this.modalEl.querySelector('#lb-main-image');
        const rollCode = this.modalEl.querySelector('#lb-roll-code');
        const seriesTitle = this.modalEl.querySelector('#lb-series-title');
        const frameTag = this.modalEl.querySelector('#lb-frame-tag');
        const counter = this.modalEl.querySelector('#lb-counter');
        const title = this.modalEl.querySelector('#lb-title');
        const caption = this.modalEl.querySelector('#lb-caption');
        const gear = this.modalEl.querySelector('#lb-gear');
        const exposure = this.modalEl.querySelector('#lb-exposure');
        const emulsion = this.modalEl.querySelector('#lb-emulsion');
        const location = this.modalEl.querySelector('#lb-location');

        // Populate
        img.src = frame.src;
        img.alt = `${project.title} - ${frame.title}`;
        rollCode.textContent = project.rollCode;
        seriesTitle.textContent = project.title;
        frameTag.textContent = `FRAME #${frame.frameNum}`;
        counter.textContent = `${this.currentIndex + 1} / ${this.allFramesList.length}`;
        title.textContent = frame.title;
        caption.textContent = frame.caption || project.description;
        gear.textContent = `${frame.camera} • ${frame.lens}`;
        exposure.textContent = frame.exposure;
        emulsion.textContent = `${project.filmStock} (${project.iso}) • ${project.developer}`;
        location.textContent = `${project.location} • ${project.year}`;
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.allFramesList.length - 1; // Wrap
        }
        this.renderCurrent();
    }

    next() {
        if (this.currentIndex < this.allFramesList.length - 1) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0; // Wrap
        }
        this.renderCurrent();
    }

    close() {
        this.isOpen = false;
        this.modalEl.classList.remove('is-open');
        document.body.classList.remove('lightbox-locked');
    }
}
