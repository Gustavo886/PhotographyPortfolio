/**
 * Portfolio Data Configuration
 * Gustavo Martinez Photography
 */

export const siteConfig = {
    photographer: "GUSTAVO MARTINEZ",
    tagline: "DOCUMENTARY & STREET PHOTOGRAPHY",
    location: "MEXICO CITY / GLOBAL",
    bio: "Focused on raw, direct street photography, human condition rituals, and social documentary.",
    instagram: "https://www.instagram.com/gstv.mtz/",
    website: "https://gustavomartinez.work"
};

export const editorialQuotes = [
    {
        quote: "I'm known for taking pictures very close, and the older I get, the closer I get.",
        author: "Bruce Gilden",
        afterProject: "japan"
    },
    {
        quote: "Photography is not about the things you see. It is about how things look when photographed.",
        author: "Garry Winogrand",
        afterProject: "lucha-libre"
    },
    {
        quote: "When people look at my photographs, I don't want to tell them what's in the picture. I want them to look at it and make up their own story.",
        author: "Bruce Gilden",
        afterProject: "orgullo"
    }
];

export const projects = [
    {
        id: "japan",
        title: "JAPAN",
        subtitle: "Tokyo & Kyoto Nocturnes",
        year: "2024",
        location: "Tokyo / Kyoto, Japan",
        rollCode: "ROLL-JP-01",
        filmStock: "KODAK TRI-X 400",
        iso: "800 (Pushed +1)",
        developer: "KODAK D-76 (1:1)",
        description: "High-contrast street photography exploring isolation, urban geometry, and the intense rhythm of Tokyo nights.",
        coverImage: "assets/thumbnails/Japan.jpg",
        monographAlignment: "left", // 'left' | 'center' | 'right' | 'wide'
        monographSpan: "col-span-12 md:col-span-7",
        monographOffset: "md:ml-4",
        frames: [
            {
                id: "jp-01",
                frameNum: "18",
                src: "assets/photos/japan/1.jpg",
                thumb: "assets/thumbnails/Japan.jpg",
                aspectRatio: "3/2",
                title: "Shinjuku Crosswalk",
                caption: "Late evening commuters swallowed in neon and heavy shadows.",
                camera: "35mm Rangefinder",
                lens: "28mm f/2.8",
                exposure: "1/250s @ f/4",
                selected: true,
                rating: 3,
                chinagraph: {
                    type: "crop",
                    color: "red",
                    annotation: "HERO",
                    cropBox: { top: 6, left: 10, width: 84, height: 88 }
                }
            },
            {
                id: "jp-02",
                frameNum: "18A",
                src: "assets/photos/japan/2.jpg",
                thumb: "assets/photos/japan/2.jpg",
                aspectRatio: "3/2",
                title: "Alleyway Encounter",
                caption: "Sudden flash illumination in Golden Gai's narrow corridors.",
                camera: "35mm Rangefinder",
                lens: "28mm f/2.8",
                exposure: "1/125s @ f/5.6",
                selected: false,
                rating: 2,
                chinagraph: {
                    type: "circle",
                    color: "yellow",
                    annotation: "KEEP",
                    circle: { cx: 50, cy: 50, r: 42 }
                }
            },
            {
                id: "jp-03",
                frameNum: "19",
                src: "assets/photos/japan/3.jpg",
                thumb: "assets/photos/japan/3.jpg",
                aspectRatio: "3/2",
                title: "Subway Silhouette",
                caption: "Framed against fluorescent glare inside the Yamanote line.",
                camera: "35mm Rangefinder",
                lens: "28mm f/2.8",
                exposure: "1/500s @ f/2.8",
                selected: true,
                rating: 3,
                chinagraph: {
                    type: "crop",
                    color: "red",
                    annotation: "+1 STOP",
                    cropBox: { top: 5, left: 5, width: 90, height: 90 }
                }
            }
        ]
    },
    {
        id: "lucha-libre",
        title: "LUCHA LIBRE",
        subtitle: "The Arena of Gods and Monsters",
        year: "2023",
        location: "Arena México, CDMX",
        rollCode: "ROLL-MX-04",
        filmStock: "ILFORD HP5 PLUS",
        iso: "1600",
        developer: "MICROPHEN",
        description: "The visceral theatre, theatrical sweat, and deep cultural mythology of Mexican professional wrestling.",
        coverImage: "assets/thumbnails/LuchaLibre.jpg",
        monographAlignment: "right",
        monographSpan: "col-span-12 md:col-span-8",
        monographOffset: "md:ml-auto md:mr-6",
        frames: [
            {
                id: "ll-01",
                frameNum: "23",
                src: "assets/photos/lucha-libre/1.jpg",
                thumb: "assets/thumbnails/LuchaLibre.jpg",
                aspectRatio: "3/2",
                title: "The Mask in Shadows",
                caption: "Backstage portrait minutes before entering the roaring arena.",
                camera: "35mm SLR",
                lens: "35mm f/2",
                exposure: "1/500s @ f/2.8",
                selected: true,
                rating: 3,
                chinagraph: {
                    type: "crop",
                    color: "red",
                    annotation: "PRINT 11x14",
                    cropBox: { top: 8, left: 12, width: 80, height: 84 }
                }
            },
            {
                id: "ll-02",
                frameNum: "23A",
                src: "assets/photos/lucha-libre/2.jpg",
                thumb: "assets/photos/lucha-libre/2.jpg",
                aspectRatio: "3/2",
                title: "Mid-Air Flight",
                caption: "High impact leap from the top turnbuckle frozen at 1/1000th of a second.",
                camera: "35mm SLR",
                lens: "35mm f/2",
                exposure: "1/1000s @ f/4",
                selected: true,
                rating: 2,
                chinagraph: {
                    type: "circle",
                    color: "red",
                    annotation: "STAR",
                    circle: { cx: 48, cy: 52, r: 40 }
                }
            },
            {
                id: "ll-03",
                frameNum: "24",
                src: "assets/photos/lucha-libre/3.jpg",
                thumb: "assets/photos/lucha-libre/3.jpg",
                aspectRatio: "3/2",
                title: "Ring Ropes Tension",
                caption: "Blood, sweat, and vinyl cords illuminated under harsh tungsten spotlights.",
                camera: "35mm SLR",
                lens: "35mm f/2",
                exposure: "1/250s @ f/2",
                selected: false,
                rating: 1,
                chinagraph: {
                    type: "annotation",
                    color: "yellow",
                    annotation: "DODGE"
                }
            }
        ]
    },
    {
        id: "2-de-octubre",
        title: "2 DE OCTUBRE",
        subtitle: "Memory, Protest & Defiance",
        year: "2023",
        location: "Tlatelolco / Zócalo, CDMX",
        rollCode: "ROLL-MX-09",
        filmStock: "KODAK TRI-X 400",
        iso: "400",
        developer: "RODINAL (1:50)",
        description: "Annual commemoration march of the 1968 Tlatelolco student massacre. A demonstration of historical memory, generational rage, and dignity.",
        coverImage: "assets/thumbnails/2DeOctubre.jpg",
        monographAlignment: "center",
        monographSpan: "col-span-12 md:col-span-9",
        monographOffset: "md:mx-auto",
        frames: [
            {
                id: "2o-01",
                frameNum: "07",
                src: "assets/photos/2-de-octubre/1.jpg",
                thumb: "assets/thumbnails/2DeOctubre.jpg",
                aspectRatio: "3/2",
                title: "The Frontline Contingent",
                caption: "Youth carrying banners through thick tear gas and chanting crowds.",
                camera: "35mm Rangefinder",
                lens: "28mm f/2.8",
                exposure: "1/500s @ f/8",
                selected: true,
                rating: 3,
                chinagraph: {
                    type: "crop",
                    color: "red",
                    annotation: "MASTER",
                    cropBox: { top: 4, left: 4, width: 92, height: 92 }
                }
            },
            {
                id: "2o-02",
                frameNum: "07A",
                src: "assets/photos/2-de-octubre/2.jpg",
                thumb: "assets/photos/2-de-octubre/2.jpg",
                aspectRatio: "3/2",
                title: "Faces in the Smoke",
                caption: "Intense flash portrait through the flare smoke on 5 de Mayo avenue.",
                camera: "35mm Rangefinder",
                lens: "28mm f/2.8",
                exposure: "1/250s @ f/5.6",
                selected: true,
                rating: 3,
                chinagraph: {
                    type: "circle",
                    color: "red",
                    annotation: "★ ★ ★",
                    circle: { cx: 52, cy: 48, r: 44 }
                }
            },
            {
                id: "2o-03",
                frameNum: "08",
                src: "assets/photos/2-de-octubre/3.jpg",
                thumb: "assets/photos/2-de-octubre/3.jpg",
                aspectRatio: "3/2",
                title: "Zócalo Gates",
                caption: "Standoff before the National Palace barricades at twilight.",
                camera: "35mm Rangefinder",
                lens: "28mm f/2.8",
                exposure: "1/125s @ f/2.8",
                selected: false,
                rating: 2,
                chinagraph: {
                    type: "crop",
                    color: "yellow",
                    annotation: "TIGHTEN",
                    cropBox: { top: 10, left: 8, width: 84, height: 80 }
                }
            }
        ]
    },
    {
        id: "posadas",
        title: "POSADAS",
        subtitle: "Nocturnal Neighborhood Rituals",
        year: "2022",
        location: "Barrio de San Lucas, Coyoacán",
        rollCode: "ROLL-MX-12",
        filmStock: "KODAK T-MAX 3200",
        iso: "3200",
        developer: "T-MAX DEV",
        description: "Intimate neighborhood Christmas pilgrimages. Candlelit alleyways, singing, seasonal ponche, and the shattering of clay piñatas.",
        coverImage: "assets/thumbnails/Posadas.jpg",
        monographAlignment: "left",
        monographSpan: "col-span-12 md:col-span-7",
        monographOffset: "md:ml-12",
        frames: [
            {
                id: "ps-01",
                frameNum: "31",
                src: "assets/photos/posadas/1.jpg",
                thumb: "assets/thumbnails/Posadas.jpg",
                aspectRatio: "3/2",
                title: "Candlelight Procession",
                caption: "Faces flickering under warm wax flames along cobblestone passages.",
                camera: "35mm Rangefinder",
                lens: "35mm f/1.4",
                exposure: "1/60s @ f/1.4",
                selected: true,
                rating: 3,
                chinagraph: {
                    type: "crop",
                    color: "red",
                    annotation: "HERO",
                    cropBox: { top: 5, left: 6, width: 88, height: 90 }
                }
            },
            {
                id: "ps-02",
                frameNum: "31A",
                src: "assets/photos/posadas/2.jpg",
                thumb: "assets/photos/posadas/2.jpg",
                aspectRatio: "3/2",
                title: "The Piñata Strike",
                caption: "Explosion of fruit and paper suspended in a single strobe flash.",
                camera: "35mm Rangefinder",
                lens: "35mm f/1.4",
                exposure: "1/250s @ f/5.6",
                selected: true,
                rating: 3,
                chinagraph: {
                    type: "circle",
                    color: "red",
                    annotation: "HOLD",
                    circle: { cx: 50, cy: 50, r: 42 }
                }
            },
            {
                id: "ps-03",
                frameNum: "32",
                src: "assets/photos/posadas/3.jpg",
                thumb: "assets/photos/posadas/3.jpg",
                aspectRatio: "3/2",
                title: "Elder's Song",
                caption: "Traditional verses recited at the courtyard threshold.",
                camera: "35mm Rangefinder",
                lens: "35mm f/1.4",
                exposure: "1/60s @ f/2",
                selected: false,
                rating: 2,
                chinagraph: {
                    type: "annotation",
                    color: "yellow",
                    annotation: "BURN BKGD"
                }
            }
        ]
    },
    {
        id: "orgullo",
        title: "ORGULLO",
        subtitle: "Freedom, Color & Excess",
        year: "2023",
        location: "Paseo de la Reforma, CDMX",
        rollCode: "ROLL-MX-15",
        filmStock: "KODAK TRI-X 400",
        iso: "800",
        developer: "XTOL",
        description: "Direct, confrontational portraits during Mexico City's monumental pride march. Unapologetic identity and radiant self-expression.",
        coverImage: "assets/thumbnails/Orgullo.jpg",
        monographAlignment: "right",
        monographSpan: "col-span-12 md:col-span-8",
        monographOffset: "md:ml-auto md:mr-10",
        frames: [
            {
                id: "og-01",
                frameNum: "12",
                src: "assets/photos/orgullo/1.jpg",
                thumb: "assets/thumbnails/Orgullo.jpg",
                aspectRatio: "3/2",
                title: "Crown of Feathers",
                caption: "Direct flash confrontation on Paseo de la Reforma.",
                camera: "35mm Rangefinder",
                lens: "28mm f/2.8",
                exposure: "1/500s @ f/8",
                selected: true,
                rating: 3,
                chinagraph: {
                    type: "crop",
                    color: "red",
                    annotation: "EXCELLENT",
                    cropBox: { top: 4, left: 8, width: 84, height: 92 }
                }
            },
            {
                id: "og-02",
                frameNum: "12A",
                src: "assets/photos/orgullo/2.jpg",
                thumb: "assets/photos/orgullo/2.jpg",
                aspectRatio: "3/2",
                title: "The Dance on Top",
                caption: "Dancers elevated on a flatbed sound truck under midday sun.",
                camera: "35mm Rangefinder",
                lens: "28mm f/2.8",
                exposure: "1/1000s @ f/5.6",
                selected: false,
                rating: 2,
                chinagraph: {
                    type: "annotation",
                    color: "yellow",
                    annotation: "+1/2 EV"
                }
            },
            {
                id: "og-03",
                frameNum: "13",
                src: "assets/photos/orgullo/3.jpg",
                thumb: "assets/photos/orgullo/3.jpg",
                aspectRatio: "3/2",
                title: "Angel of Independence Gaze",
                caption: "Intense eye contact through reflective silver sunglasses.",
                camera: "35mm Rangefinder",
                lens: "28mm f/2.8",
                exposure: "1/500s @ f/8",
                selected: true,
                rating: 3,
                chinagraph: {
                    type: "circle",
                    color: "red",
                    annotation: "★ ★ ★",
                    circle: { cx: 50, cy: 46, r: 40 }
                }
            }
        ]
    }
];
