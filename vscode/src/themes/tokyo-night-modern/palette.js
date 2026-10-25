const { alpha } = require('../../helpers');

// Every color the theme uses. In ui.js and syntax.js:
//   c.<name>                     a solid color, or a color + opacity token below
//   alpha(c.<name>, o.<level>)   a one-off transparent color
// Run `npm run report` to list duplicates, one-off colors and pairs worth a token.
//
// Naming: <family><lightness %>, e.g. rose43 is a rose at 43% lightness.
//   families around the hue wheel: red, orange, amber, yellow, lime, green, emerald, teal,
//   cyan, sky, blue, indigo, violet, purple, pink, rose
//   gray and slate are the near-neutral tones (slate leans blue)
//   when two colors share a name, the most used one keeps it and the other says how it differs:
//   Muted / Vivid (saturation), a neighbouring hue (blue58Indigo), or Light / Dark
// Hand-picked names (bg, accent, selection...) and tokyonight's own (fg, blue, magenta, comment...)
// are kept as is. Each family is sorted dark to light.

const colors = {
  none: '#00000000',

  // gray
  black: '#000000',
  gray45: '#65737e',
  gray50: '#73778c',
  gray56: '#81899b',
  white: '#ffffff',

  // slate
  slate7: '#0d0f17',
  bgDark: '#18181f',
  bg: '#1b1b25',
  slate14: '#1b1e2e',
  bgHighlight: '#1f2335',
  bgStorm: '#24283b',
  bgLine: '#292e42',
  slate21: '#282d42',
  slate23: '#2a3049',
  slate23Light: '#2c3147',
  slate25: '#2e344f',
  slate26: '#29355a',
  fgGutter: '#3b4261',
  slate31: '#3a4162',
  terminalBlack: '#414868',
  slate34: '#41496b',
  dark3: '#545c7e',
  comment: '#565f89',
  slate45: '#5e7189',
  slate50: '#6f7492',
  dark5: '#737aa2',
  slate57: '#7982a9',
  slate59: '#8689a5',
  slate63: '#8c96b4',
  slate67: '#939ec3',
  fgDark: '#a9b1d6',
  slate81: '#bbc2e0',
  slate83: '#c2c9e4',
  slate87: '#c8d3f5',
  slate91: '#d1eaff',

  // red
  red32: '#703438',
  red51: '#c24242',
  red1: '#db4b4b',
  red62: '#e55858',
  red62Muted: '#dd6161',
  red65: '#dc7e6f',

  // orange
  orange37: '#94532b',
  orange44: '#c97018',
  orange49: '#b76c41',
  orange56: '#c2985b',
  orange59: '#cfa25f',
  yellow: '#e0af68',
  orange66: '#ea9a65',
  orange: '#ff9e64',
  orange79: '#fcd297',

  // amber
  amber43: '#a97a33',
  amber56: '#c49a5a',
  amber56Vivid: '#e2bd3a',
  amber56Yellow: '#bba461',
  amber59: '#cca25f',
  amber66: '#d7b27a',
  amber69: '#d6c489',
  amber71: '#ffcb6b',
  amber73: '#ffcc73',

  // lime
  lime50: '#80a856',
  green: '#9ece6a',
  lime73: '#c3e88d',

  // emerald
  emerald27: '#0d7c4e',
  emerald57: '#67bc9b',

  // teal
  teal18: '#164846',
  teal24: '#007a75',
  teal29: '#266d6a',
  teal: '#1abc9c',
  teal43: '#3d9c8d',
  teal60: '#67cdba',
  green1: '#73daca',

  // cyan
  cyan39: '#0da0ba',
  blue2: '#0db9d7',
  cyan45: '#25aac2',
  cyan47: '#449dab',
  green2: '#41a6b5',
  cyan97: '#eeffff',

  // sky
  sky54: '#6a8aaa',
  sky64: '#6eb1d7',
  sky64Light: '#68b3de',
  sky68: '#7cbbe0',
  sky74: '#8cc6ed',
  cyan: '#7dcfff',
  blue5: '#89ddff',
  sky77: '#b2ccd6',

  // blue
  accent: '#254385',
  blue34: '#2f4880',
  blue36: '#3d547a',
  selection: '#21489b',
  blue38: '#2a4c96',
  blue40: '#2b4ca1',
  blue0: '#3d59a1',
  blue46: '#596390',
  blue47: '#536c9e',
  blue48: '#4661ad',
  blue51: '#5b6ba9',
  blue51Light: '#606ba6',
  blue51Vivid: '#3767cf',
  blue56: '#6183bb',
  blue57: '#6f7bb6',
  blue58: '#668ac4',
  blue58Indigo: '#677fc3',
  blue58Muted: '#7688b4',
  blue59: '#7582ba',
  blue60: '#7e83b2',
  blue62: '#828bb8',
  blue63: '#618ce0',
  blue63Muted: '#698cd6',
  blue66: '#5990f6',
  blue68: '#759ee4',
  blue69: '#769beb',
  blue71: '#9aa5ce',
  blue71Vivid: '#96a0d5',
  blue: '#7aa2f7',
  blue72: '#7192ff',
  blue73: '#9fa8d6',
  blue75: '#82aaff',
  blue76: '#9eb3e8',
  blue80: '#a3b1f3',
  blue81: '#9cacff',
  fg: '#c0caf5',

  // indigo
  indigo24: '#20245b',
  indigo74: '#8185f6',

  // violet
  violet53: '#7c5eaf',
  violet65: '#9a7ecc',
  purple: '#9d7cd8',
  violet74: '#aa83f4',
  magenta: '#bb9af7',
  violet80: '#c099ff',

  // purple
  purple75: '#c792ea',
  purple75Vivid: '#de90f1',

  // rose
  rose27: '#7c0d1c',
  rose36: '#85353e',
  rose41: '#963c47',
  rose43: '#914c54',
  rose43Vivid: '#a6333f',
  magenta2: '#ff007c',
  rose51: '#ba485d',
  rose56: '#bb616b',
  rose58: '#dc4e5f',
  rose59: '#db546d',
  rose66: '#ff5370',
  red: '#f7768e',
  rose73: '#e88bad',
};

// opacity scale, in percent
const o = {
  faint:    6,
  subtle:   10,
  soft:     14,
  light:    20,
  medium:   26,
  moderate: 33,
  strong:   40,
  bold:     55,
  heavy:    67,
  dense:    80,
};

// colors with opacity, reused in several places
const tokens = {
  border:           alpha(colors.dark3, o.medium),     // borders on inputs, checkboxes, key labels
  borderFocus:      alpha(colors.dark3, o.light),      // focus ring, resize handles
  selectionBg:      alpha(colors.selection, o.strong), // text selection, editor and terminal
  hoverBg:          alpha(colors.blue58Indigo, o.subtle),    // toolbar and toggle hover
  findMatchBg:      alpha(colors.orange37, o.strong),  // other find / peek matches
  rangeBg:          alpha(colors.blue57, o.soft),    // highlighted ranges
  wordHighlightBg:  alpha(colors.blue57, o.light),   // same word / same selection
  rulerMark:        alpha(colors.fgDark, o.medium),    // overview ruler marks
  diffInsertedLine: alpha(colors.emerald27, o.soft),     // diff: inserted lines
  diffRemovedLine:  alpha(colors.rose27, o.medium),     // diff: removed lines
  mergeCurrent:     alpha(colors.green2, o.soft),      // merge: current change
  conflict:         alpha(colors.yellow, o.dense),     // merge conflicts
  codeFence:        alpha(colors.black, o.moderate),   // markdown fenced code
};

module.exports = { c: { ...colors, ...tokens }, o, colors, tokens };
