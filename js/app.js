/**
 * Master Application Controller
 * Gustavo Martinez — 35mm Contact Sheet Portfolio
 */

import { siteConfig } from './data.js';
import { renderContactSheet } from './contact-sheet.js?v=5';
import { OpticalLoupe } from './loupe.js?v=5';
import { Lightbox } from './lightbox.js?v=5';

class App {
    constructor() {
        this.mainContainer = document.getElementById('main-viewport');
        this.loupe = null;
        this.lightbox = null;

        this.init();
    }

    init() {
        // Initialize interactive darkroom modules
        this.loupe = new OpticalLoupe();
        this.lightbox = new Lightbox();

        this.bindGlobalEvents();
        this.render();
    }

    bindGlobalEvents() {
        // Global Keyboard Shortcuts
        window.addEventListener('keydown', (e) => {
            if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

            const key = e.key.toLowerCase();
            if (key === 'l') {
                const loupeState = this.loupe.toggle();
                const indicator = document.querySelector('.loupe-guide-pill');
                if (indicator) {
                    indicator.textContent = loupeState ? 'LOUPE [ACTIVE]' : 'LOUPE [DISABLED]';
                }
            }
        });
    }

    render() {
        if (!this.mainContainer) return;

        document.body.classList.add('view-contact-sheet');

        // Callback when user clicks a frame (opens museum lightbox)
        const onSelectFrame = (frame, project) => {
            this.loupe.hide();
            this.lightbox.open(frame, project);
        };

        // Callback for 2.5x loupe hover
        const onFrameHover = (frame, project, frameEl) => {
            if (frameEl) {
                this.loupe.attachToFrame(frame, project, frameEl);
            } else {
                this.loupe.hide();
            }
        };

        renderContactSheet(this.mainContainer, onSelectFrame, onFrameHover);
    }
}

// Boot on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
