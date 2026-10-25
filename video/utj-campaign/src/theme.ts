import { continueRender, delayRender, staticFile, useVideoConfig } from "remotion";

// Sizes are authored for 1080x1920; landscape renders shrink them to fit 1080px of height.
export const useK = () => {
  const { width, height } = useVideoConfig();
  return width > height ? 0.8 : 1;
};

// Fonts are bundled in public/fonts (variable woff2, Hebrew + Latin subsets)
// so rendering does not depend on reaching Google Fonts.
const HEBREW = "U+0307-0308, U+0590-05FF, U+200C-2010, U+20AA, U+25CC, U+FB1D-FB4F";
const LATIN = "U+0000-00FF, U+2000-206F";

const FACES: [string, string, string][] = [
  ["Frank Ruhl Libre", "FrankRuhlLibre-hebrew.woff2", HEBREW],
  ["Frank Ruhl Libre", "FrankRuhlLibre-latin.woff2", LATIN],
  ["Heebo", "Heebo-hebrew.woff2", HEBREW],
  ["Heebo", "Heebo-latin.woff2", LATIN],
];

const handle = delayRender("Loading local fonts");
Promise.all(
  FACES.map(([family, file, unicodeRange]) => {
    const face = new FontFace(family, `url(${staticFile(`fonts/${file}`)}) format("woff2")`, {
      weight: "100 900",
      unicodeRange,
    });
    document.fonts.add(face);
    return face.load();
  }),
)
  .then(() => continueRender(handle))
  .catch((err) => {
    console.error(err);
    continueRender(handle);
  });

export const serif = "'Frank Ruhl Libre', serif";
export const sans = "'Heebo', sans-serif";

export const NAVY = "#0b1d3a";
export const NAVY_LIGHT = "#1d4a80";
export const GOLD = "#f5c542";
export const GOLD_DEEP = "#c8961e";
export const WHITE = "#ffffff";
