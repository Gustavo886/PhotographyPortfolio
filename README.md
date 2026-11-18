# Gustavo Martinez — 35mm Contact Sheet Portfolio & Monograph About

A museum-grade static photography portfolio featuring an interactive **35mm darkroom contact sheet light table** for your work, paired with a Bruce Gilden-inspired **monograph About section** with alternating editorial layouts.

Built with modern web standards (pure zero-dependency ES6 modules, CSS Custom Properties, SVG chinagraph filters, and Web Audio API). 100% static and ready to host immediately on **GitHub Pages**.

---

## Architecture & Pages

```
contact-sheet-portfolio/
├── index.html                    # 35mm Contact Sheet Darkroom Light Table (Primary Work Page)
├── about.html                    # Dedicated About Page (3-Photo Alternating Monograph Layout)
├── about/index.html              # Clean URL support (/about)
├── css/
│   ├── style.css                 # Darkroom tokens, grain canvas, header & layout styling
│   ├── contact-sheet.css         # 35mm film strips, sprocket holes, chinagraph grease marks
│   ├── about.css                 # 3-Photo alternating layout (left/right opposite text)
│   └── loupe.css                 # 2.5x optical loupe magnifier & full-bleed EXIF lightbox
├── js/
│   ├── data.js                   # Structured photography data, quotes, EXIF & crops
│   ├── app.js                    # Light table initialization, loupe, lightbox & shortcuts
│   ├── contact-sheet.js          # Backlit 35mm film strip renderer
│   ├── loupe.js                  # 2.5x optical inspection loupe with smooth physics
│   ├── lightbox.js               # Fullscreen darkroom lightbox modal with EXIF drawer
│   └── audio.js                  # Synthesized darkroom tactile acoustic clicks (Web Audio API)
├── assets/
│   ├── photos/                   # Your documentary & street series
│   └── thumbnails/
├── .github/workflows/deploy.yml  # Zero-config 1-click GitHub Pages deployment
└── README.md
```

---

## Key Features

### 1. Main Page: 35mm Contact Sheet Light Table (`index.html`)
- **Uncut Film Rolls**: Staged across 5 rolls (*Japan*, *Lucha Libre*, *2 De Octubre*, *Posadas*, *Orgullo*).
- **Authentic Film Rebates**: Complete with continuous sprocket perforations, frame numbers (`▶ 18`, `18A`), and Kodak Tri-X 400 / Ilford HP5 Plus edge marks.
- **Chinagraph (Grease Pencil) Markings**: Hand-drawn red and yellow wax crop boxes (*"HERO"*, *"PRINT 11x14"*, *"MASTER"*, *"KEEP"*), circled hero selections, and star ratings. Toggle them on/off with the **GREASE PENCIL MARKS** button.
- **Interactive 2.5x Optical Loupe**: Hovering over any negative activates a circular optical loupe with a knurled metal barrel and crosshair reticle.
- **Full-Bleed Lightbox Modal**: Clicking any frame opens a high-contrast inspection stage with an EXIF drawer (Camera, Lens, Exposure, Emulsion / Dev, Location, Year).

### 2. About Page: 3 Alternating Monograph Plates (`about.html` / `/about`)
- **Monumental Watermark**: Giant `GUSTAVO MARTINEZ` watermark and Bruce Gilden editorial quotes.
- **Three Alternating Plates with Text on Opposite Sides**:
  - **Plate 01**: Photo on the **Left**, Text on the **Right** (*01 / Philosophy — The Raw Gaze*).
  - **Plate 02**: Text on the **Left**, Photo on the **Right** (*02 / Method — 35mm & The Darkroom*).
  - **Plate 03**: Photo on the **Left**, Text on the **Right** (*03 / Archive — Contact Sheets & Prints* + Inquire Button).

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `[L]` | Toggle **Optical Loupe Magnifier** on/off |
| `[S]` | Toggle **Darkroom Acoustic Feedback** (Web Audio synthesized clicks) |
| `[←]` / `[→]` | Previous / Next frame in Lightbox |
| `[ESC]` | Close Lightbox modal |

---

## Deploying to GitHub Pages

1. Push to your repository:
   ```bash
   cd contact-sheet-portfolio
   git init
   git add .
   git commit -m "35mm Contact Sheet & Monograph About Portfolio"
   git remote add origin https://github.com/Gustavo886/<YOUR-REPO-NAME>.git
   git branch -M main
   git push -u origin main
   ```
2. In GitHub under **Settings > Pages > Build and deployment > Source**, select **GitHub Actions**.
3. To use your custom domain `gustavomartinez.work`, add a `CNAME` file containing `gustavomartinez.work`.
