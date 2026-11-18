// Logos of projects already shown in the portfolio. Each file in public/logos is
// a monochrome transparent derivative of the project's own header logo, taken
// from its screenshot in public/. The screenshots are not modified.
// `h` is the display height in px, chosen so wide wordmarks and compact marks
// have a similar perceived size. `w` and `h` reserve space before loading.
export type ProjectLogo = { name: string; src: string; ratio: number; h: number; row: 1 | 2 };

const logo = (name: string, file: string, w: number, h: number, display: number, row: 1 | 2): ProjectLogo => ({
  name,
  src: `/logos/${file}.png`,
  ratio: w / h,
  h: display,
  row,
});

// Sources: Lydia Esenam, TCG Telegraph, CardMarketCap and Nokless come from the
// brands' own logo files. Attune, Peace Nwankpa, Kingdom, CL Tokens and Horizon
// are cut from their screenshots because no source files were found.
export const projectLogos: ProjectLogo[] = [
  logo("Attune", "attune", 227, 36, 24, 1),
  logo("CardMarketCap", "cardmarketcap", 654, 166, 27, 1),
  logo("Kingdom", "kingdom", 280, 85, 31, 1),
  logo("Nokless", "nokless", 700, 162, 26, 1),
  logo("TCG Telegraph", "tcg-telegraph", 888, 237, 28, 1),
  logo("AlphaForceMD", "alphaforcemd", 583, 57, 24, 1),
  logo("GraBoqs", "graboqs", 324, 92, 32, 1),
  logo("Valyx Peptides", "valyx", 148, 29, 22, 2),
  logo("Lydia Esenam", "lydia-esenam", 516, 186, 34, 2),
  logo("CL Tokens", "cl-tokens", 283, 87, 31, 2),
  logo("Horizon", "horizon", 300, 70, 27, 2),
  logo("Peace Nwankpa", "peace-nwankpa", 486, 76, 24, 2),
  logo("USA Peptides", "usa-peptides", 77, 53, 38, 2),
  logo("Eastern Housing Agency", "eastern-housing", 608, 58, 23, 2),
];
