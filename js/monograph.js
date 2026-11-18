/**
 * Monograph View Module
 * Renders the Bruce Gilden-inspired monograph editorial layout.
 */

import { projects, editorialQuotes } from './data.js';

export function renderMonograph(container, onSelectFrame) {
    container.innerHTML = '';

    // 1. Hero Showcase Unit
    const heroSection = document.createElement('section');
    heroSection.className = 'monograph-hero';
    heroSection.innerHTML = `
        <div class="hero-watermark">GUSTAVO MARTINEZ</div>
        <div class="hero-slideshow-container">
            <div class="hero-slide active">
                <img src="assets/photos/splash.jpg" alt="Hero Portrait" class="hero-img">
            </div>
            <div class="hero-caption-wrap">
                <span class="hero-label">CURRENT EXHIBITION / MONOGRAPH</span>
                <h1 class="hero-headline">THE CLOSER YOU GET</h1>
                <p class="hero-subtext">DOCUMENTARY ESSAYS & STREET ENCOUNTERS (2022–2024)</p>
            </div>
        </div>
    `;
    container.appendChild(heroSection);

    // 2. Editorial Stream of Projects & Pull Quotes
    const streamContainer = document.createElement('div');
    streamContainer.className = 'monograph-stream';

    projects.forEach((project, index) => {
        const projectBlock = document.createElement('article');
        projectBlock.className = `monograph-project monograph-${project.monographAlignment || 'left'}`;
        projectBlock.dataset.projectId = project.id;

        // Choose hero frame for the monograph presentation
        const heroFrame = project.frames.find(f => f.selected) || project.frames[0];

        projectBlock.innerHTML = `
            <div class="project-plate-wrap">
                <div class="project-img-container" data-frame-id="${heroFrame.id}">
                    <img 
                        src="${heroFrame.src}" 
                        alt="${project.title} - ${heroFrame.title}" 
                        class="project-img" 
                        loading="${index === 0 ? 'eager' : 'lazy'}"
                    />
                    <div class="project-img-overlay">
                        <span class="overlay-badge">${project.filmStock}</span>
                        <span class="overlay-loupe-hint">CLICK TO INSPECT FRAME</span>
                    </div>
                </div>
                <div class="project-meta-row">
                    <div class="meta-left">
                        <h2 class="project-title" data-frame-id="${heroFrame.id}">
                            ${project.title}
                        </h2>
                        <span class="project-subtitle">${project.subtitle}</span>
                    </div>
                    <div class="meta-right">
                        <span class="meta-roll">${project.rollCode}</span>
                        <span class="meta-location">${project.location} • ${project.year}</span>
                    </div>
                </div>
                <p class="project-desc">${project.description}</p>
                <div class="project-secondary-frames">
                    ${project.frames.filter(f => f.id !== heroFrame.id).map(frame => `
                        <div class="mini-frame" data-frame-id="${frame.id}" title="${frame.title} (${frame.frameNum})">
                            <img src="${frame.src}" alt="${frame.title}" loading="lazy">
                            <span class="mini-frame-num">#${frame.frameNum}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Wire click events
        projectBlock.querySelectorAll('[data-frame-id]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                const frameId = el.dataset.frameId;
                const foundFrame = project.frames.find(f => f.id === frameId);
                if (foundFrame && onSelectFrame) {
                    onSelectFrame(foundFrame, project);
                }
            });
        });

        streamContainer.appendChild(projectBlock);

        // Check if an editorial pull-quote should be rendered after this project
        const matchingQuote = editorialQuotes.find(q => q.afterProject === project.id);
        if (matchingQuote) {
            const quoteSection = document.createElement('aside');
            quoteSection.className = 'monograph-quote-divider';
            quoteSection.innerHTML = `
                <div class="quote-content">
                    <blockquote class="quote-text">“${matchingQuote.quote}”</blockquote>
                    <cite class="quote-author">— ${matchingQuote.author.toUpperCase()}</cite>
                </div>
            `;
            streamContainer.appendChild(quoteSection);
        }
    });

    container.appendChild(streamContainer);

    // Initialize subtle scroll reveal animations
    initIntersectionObserver(streamContainer);
}

function initIntersectionObserver(container) {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    });

    container.querySelectorAll('.monograph-project, .monograph-quote-divider').forEach(el => {
        observer.observe(el);
    });
}
