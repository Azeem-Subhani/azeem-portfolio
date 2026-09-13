// Sonoma Raceway geometry, carried over from the corner sequence used in
// src/components/projects/mockups/venue-track-map.tsx and redrawn here as
// plain data so it can be imported from server-rendered capture pages
// (that file is a "use client" module and can't be imported for its data
// exports across the server/client boundary during static prerendering).
// Tight crop around the actual path + corner labels (not the padded
// viewBox the small embedded widget uses) so the map reads as a bold
// hero graphic instead of a small mark floating in empty space.
export const TRACK_VIEW_BOX = "6 12 194 144";

export const SONOMA_TRACK = {
  trackPath:
    "M 170 120 C 180 108 188 84 186 54 C 184 34 166 24 144 30 C 128 34 122 50 106 54 C 92 58 86 40 70 34 C 50 26 30 36 28 56 C 26 76 46 88 64 98 C 84 110 94 126 78 136 C 62 146 40 142 34 126 C 28 110 46 100 66 106 C 94 114 130 134 158 130 C 164 128 168 124 170 120 Z",
  featurePath:
    "M 78 78 C 96 70 112 86 108 106 C 104 124 80 128 68 114 C 56 100 60 86 78 78 Z",
  corners: [
    { name: "Hairpin", x: 22, y: 42 },
    { name: "Carousel", x: 18, y: 92 },
    { name: "T11", x: 22, y: 132 },
  ] as { name: string; x: number; y: number; anchor?: "end" }[],
  startFinish: { cx: 170, cy: 120, angleDeg: -35 },
};
