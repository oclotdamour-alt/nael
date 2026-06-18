export type Project = {
  slug: string;
  name: string;
  type: string;
  year: string;
  summary: string;
  description: string;
  video: string;
  thumbnail: string;
  images: string[];
};

export const projects: Project[] = [
  {
    slug: "branding-explanation",
    name: "Branding Explanation",
    type: "Motion Design",
    year: "2024",
    summary: "An educational showreel that doubles as a sales pitch — perfect for founders who finally 'get it' and want that same energy for their brand.",
    description: "A school project built around one idea: branding isn't optional, it's a competitive advantage. Visual hierarchy, color psychology, and market positioning — compressed into 60 seconds of kinetic typography and dynamic transitions. Seamless transitions and strategic color shifts transform abstract branding theory into a tangible visual demonstration. It works as educational content and as a marketing piece at the same time.",
    video: "/projects/branding-explanation/Motiontexte.mp4",
    thumbnail: "/projects/branding-explanation/Portada Web.png",
    images: [
      "/projects/branding-explanation/Portada Web.png",
      "/projects/branding-explanation/Cy1UM4hlMKXq99Ln2A8TTtFA4.png",
      "/projects/branding-explanation/g3qBQZEjhBVqpWYp7ygNC2mJpQ.png",
      "/projects/branding-explanation/l1PdUYp9SynMBiQFXrqRtDXK3ls.png",
      "/projects/branding-explanation/UhXhvrvC9apWRHoI2Z5qQW8ONEE.png",
      "/projects/branding-explanation/w4x69fmp3pMMsFFxwqEHYaZnuk.png",
      "/projects/branding-explanation/z2Z0u5wVuKBO6z1la8dB3KfcX34.png",
    ],
  },
  {
    slug: "metahuman",
    name: "MetaHuman",
    type: "3D",
    year: "2025",
    summary: "Hyper-realistic 3D avatar designed for a hip-hop/trap DJ — cyberpunk Akira vibes meets American trap energy.",
    description: "Built with MetaHuman Creator and Unreal Engine, this avatar was designed for luisbernat_lxp, a trap DJ looking for a stage presence that hits as hard as his music. Facial tracking, neon glitch effects, and real-time music synchronization via Live Link were all on the table. What came out was a polished intro sequence and animated visual backdrop — something that transforms a live set into an experience.",
    video: "/projects/metahuman/Metahuman.MP4",
    thumbnail: "/projects/metahuman/AuPHaBb5mnkJhRkIhTBKTXjKjpI.png",
    images: [
      "/projects/metahuman/AuPHaBb5mnkJhRkIhTBKTXjKjpI.png",
      "/projects/metahuman/FqjkTG4HHGY4rwD4qzEoxGdPfw.png",
      "/projects/metahuman/jRjLV0QM5vGyZoyAXUyFonGn4c.png",
      "/projects/metahuman/rbkf5phoYjNVo3TiCzdB5TRcuQ.png",
      "/projects/metahuman/RkCADLllNIo9ZQDFcIXG9mg69sU.png",
      "/projects/metahuman/xVwOgwvK0dKk3HdEw3qoLYVGko.png",
    ],
  },
  {
    slug: "expat-child",
    name: "Expat' Child",
    type: "3D",
    year: "2025",
    summary: "A personal exploration of Third Culture Kid identity — growing up between cultures, never fully belonging to one.",
    description: "Built in Unreal Engine 5 and Blender, Expat' Child turns abstract emotional experiences into 3D environments. Fragmented geometric structures that reassemble. Spaces caught between worlds. Compositions that feel like memories. The project explores cultural fragmentation, reverse culture shock, and the idea that identity is never finished — it's architecture that keeps rebuilding itself.",
    video: "/projects/expat-child/ExpatChild.mp4",
    thumbnail: "/projects/expat-child/9toni6s13mcrrFkGogQVgijzA.png",
    images: [
      "/projects/expat-child/9toni6s13mcrrFkGogQVgijzA.png",
      "/projects/expat-child/9X0fD7LNfmSor6q6g2WC7WrCBTo.png",
      "/projects/expat-child/aO7qmq8CI5EHGkydrOsHR1SG7aA.png",
      "/projects/expat-child/DM8okcei7ILPtwv6h77KVHQ0Ok.png",
      "/projects/expat-child/Dna8xyhSLofDmLdTs09JOSDgaOc.png",
      "/projects/expat-child/jNvb8o4cRodAOkgjmCJ54U1lik.png",
      "/projects/expat-child/ydSLBaUU4TcQeholhWYwPsXpa9g.png",
    ],
  },
  {
    slug: "sonestesia",
    name: "Sonestesia",
    type: "3D",
    year: "2024",
    summary: "An interactive 3D journey inside the brain — visualizing how sound frequencies trigger physical reactions.",
    description: "What if you were the sound? In Sonestesia, your controller inputs generate frequencies that physically reshape the digital landscape in real-time. Built in Unreal Engine, the project puts users inside a neural environment where organic shapes pulse and morph in response to audio. Synesthesia-inspired visuals, neuroscience, and human-computer interaction collapsed into one immersive experience. Made with Pol Tarrés, Paula Palacio, and Carla Mártinez.",
    video: "/projects/sonestesia/Sonestesia.mp4",
    thumbnail: "/projects/sonestesia/ysleAhEOoYMNDIAEv62GG3NtQSU.png",
    images: [
      "/projects/sonestesia/ysleAhEOoYMNDIAEv62GG3NtQSU.png",
    ],
  },
];

export type ArchiveMedia =
  | { kind: "video"; src: string }
  | { kind: "image"; src: string };

export type Archive = {
  slug: string;
  name: string;
  year: string;
  type: string;
  description: string;
  media: ArchiveMedia[];
};

export const archives: Archive[] = [
  {
    slug: "final-final-final",
    name: "Final Final Final",
    year: "2024",
    type: "Motion Design",
    description: "A motion piece pushing the boundaries of iteration — every version a final, until it wasn't.",
    media: [{ kind: "video", src: "/archives/final-final-final.mp4" }],
  },
  {
    slug: "prueba-2",
    name: "Prueba 2",
    year: "2024",
    type: "3D / Experiment",
    description: "A raw test — no brief, no client. Just exploring what happens when you let the tool lead.",
    media: [{ kind: "video", src: "/archives/prueba-2.mp4" }],
  },
  {
    slug: "toiles",
    name: "Toiles",
    year: "2023",
    type: "Digital Painting",
    description: "A series of digital canvas experiments — textures, light, and form without constraints.",
    media: [
      { kind: "image", src: "/archives/toiles/test--dos-telas.png" },
      { kind: "image", src: "/archives/toiles/test--dos-telas-2.png" },
      { kind: "image", src: "/archives/toiles/test-4.png" },
      { kind: "image", src: "/archives/toiles/test-5.png" },
      { kind: "image", src: "/archives/toiles/test-6.png" },
      { kind: "image", src: "/archives/toiles/test-7.png" },
      { kind: "image", src: "/archives/toiles/test-8.png" },
      { kind: "image", src: "/archives/toiles/test-9.png" },
      { kind: "image", src: "/archives/toiles/test-zoom.png" },
      { kind: "image", src: "/archives/toiles/test-zoom-2.png" },
      { kind: "image", src: "/archives/toiles/test-zoom-3.png" },
      { kind: "image", src: "/archives/toiles/test-zoom-4.png" },
      { kind: "image", src: "/archives/toiles/test-zoom-5.png" },
    ],
  },
];
