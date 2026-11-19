/**
 * Contact Sheet View Module
 * Renders authentic 35mm film negative strips on a darkroom light table.
 */

import { projects } from './data.js?v=6';

export function renderContactSheet(container, onSelectFrame, onFrameHover) {
    container.innerHTML = '';

    // Contact Sheet Control & Info Header
    const lightTableHeader = document.createElement('div');
    lightTableHeader.className = 'light-table-header';
    lightTableHeader.innerHTML = `
        <div class="light-table-brand">
            <span class="light-dot"></span>
            <span class="light-title">DARKROOM LIGHT TABLE • 35MM ARCHIVE</span>
        </div>
        <div class="light-table-stats">
            <span>5 ROLLS</span>
            <span>•</span>
            <span>15 FRAMES</span>
        </div>
        <div class="light-table-actions">
            <span class="loupe-guide-pill">HOVER FOR 2.5X LOUPE</span>
        </div>
    `;
    container.appendChild(lightTableHeader);

    // Light Table Grid of Film Rolls
    const lightTableSurface = document.createElement('div');
    lightTableSurface.className = 'light-table-surface';

    projects.forEach((project) => {
        const rollSection = document.createElement('section');
        rollSection.className = 'film-roll-section';
        rollSection.dataset.rollId = project.id;

        // Clean series header (removed roll codes and technical emulsion specs)
        rollSection.innerHTML = `
            <div class="film-roll-header">
                <span class="roll-series">${project.title}</span>
            </div>
            <div class="film-strip-wrapper">
                <div class="film-strip" data-film-stock="${project.filmStock}">
                    <!-- Top Sprocket Edge -->
                    <div class="film-edge film-edge-top">
                        <div class="sprocket-track">
                            ${generateSprocketTrack(project.filmStock, project.frames.length)}
                        </div>
                    </div>

                    <!-- Frames Track -->
                    <div class="film-frames-track">
                        ${project.frames.map((frame) => renderFilmFrame(frame, project)).join('')}
                    </div>

                    <!-- Bottom Sprocket Edge -->
                    <div class="film-edge film-edge-bottom">
                        <div class="sprocket-track">
                            ${generateBottomSprocketTrack(project.filmStock, project.frames)}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Wire event listeners on frames
        rollSection.querySelectorAll('.film-frame').forEach(frameEl => {
            const frameId = frameEl.dataset.frameId;
            const foundFrame = project.frames.find(f => f.id === frameId);

            frameEl.addEventListener('click', (e) => {
                e.preventDefault();
                if (foundFrame && onSelectFrame) {
                    onSelectFrame(foundFrame, project);
                }
            });

            if (onFrameHover) {
                frameEl.addEventListener('mouseenter', () => onFrameHover(foundFrame, project, frameEl));
                frameEl.addEventListener('mouseleave', () => onFrameHover(null, null, null));
            }
        });

        lightTableSurface.appendChild(rollSection);
    });

    container.appendChild(lightTableSurface);
}

function renderFilmFrame(frame, project) {
    return `
        <div class="film-frame" data-frame-id="${frame.id}" data-frame-num="${frame.frameNum}">
            <div class="frame-negative-window">
                <img 
                    src="${frame.src}" 
                    alt="${frame.title}" 
                    class="negative-image" 
                    loading="lazy"
                    data-zoom-src="${frame.src}"
                />

                <div class="frame-hover-hud">
                    <span class="hud-frame-num">FRAME ${frame.frameNum}</span>
                    <span class="hud-title">${frame.title}</span>
                    <span class="hud-exif">${frame.lens} • ${frame.exposure}</span>
                </div>
            </div>
            <div class="frame-footer-rebate">
                <span class="rebate-arrow">▶</span>
                <span class="rebate-num">${frame.frameNum}</span>
                <span class="rebate-brand">${project.filmStock.includes('TRI-X') ? 'TX-400' : 'HP5+'}</span>
                <span class="rebate-arrow-a">▶</span>
                <span class="rebate-num-a">${frame.frameNum}A</span>
            </div>
        </div>
    `;
}

function generateSprocketTrack(filmStock, count) {
    const totalSprockets = count * 8; // ~8 sprockets per 35mm frame
    let html = '';
    const brandName = filmStock.includes('TRI-X') ? 'KODAK SAFETY FILM 5063' : 'ILFORD HP5 PLUS SAFETY';
    
    for (let i = 0; i < totalSprockets; i++) {
        html += `<div class="sprocket-hole"></div>`;
        if (i % 6 === 2) {
            html += `<span class="film-edge-text">${brandName}</span>`;
        }
        if (i % 8 === 4) {
            html += `<span class="film-dx-code">|||| | | |||</span>`;
        }
    }
    return html;
}

function generateBottomSprocketTrack(filmStock, frames) {
    const totalSprockets = frames.length * 8;
    let html = '';

    for (let i = 0; i < totalSprockets; i++) {
        html += `<div class="sprocket-hole"></div>`;
        const frameIndex = Math.floor(i / 8);
        const subIndex = i % 8;
        if (frames[frameIndex] && subIndex === 3) {
            html += `<span class="film-edge-counter">▶ ${frames[frameIndex].frameNum}</span>`;
        } else if (frames[frameIndex] && subIndex === 7) {
            html += `<span class="film-edge-counter">▶ ${frames[frameIndex].frameNum}A</span>`;
        }
    }
    return html;
}
