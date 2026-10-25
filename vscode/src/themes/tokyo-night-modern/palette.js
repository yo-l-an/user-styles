const { alpha } = require('../../helpers');

// Every color the theme uses. In ui.js and syntax.js:
//   c.<name>                     a solid color, or a color + opacity token below
//   alpha(c.<name>, o.<level>)   a one-off transparent color
// Families are sorted dark to light, so near-duplicates sit next to each other.
// Run `npm run report` to list duplicates, one-off colors and pairs worth a token.

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
  slate21: '#282d42',
  bgLine: '#292e42',
  slate23: '#2a3049',
  slate23b: '#2c3147',
  slate25: '#2e344f',
  slate26: '#29355a',
  fgGutter: '#3b4261',
  slate31: '#3a4162',
  terminalBlack: '#414868',
  slate34: '#41496b',
  slate36: '#3d547a',
  dark3: '#545c7e',
  comment: '#565f89',
  slate45: '#5e7189',
  slate46: '#596390',
  slate47: '#536c9e',
  slate50: '#6f7492',
  slate51: '#5b6ba9',
  slate51b: '#606ba6',
  slate54: '#6a8aaa',
  dark5: '#737aa2',
  slate56: '#6183bb',
  slate57: '#7982a9',
  slate57b: '#6f7bb6',
  slate58: '#7688b4',
  slate59: '#8689a5',
  slate59b: '#7582ba',
  slate60: '#7e83b2',
  slate62: '#828bb8',
  slate63: '#8c96b4',
  slate67: '#939ec3',
  slate71: '#9aa5ce',
  fgDark: '#a9b1d6',
  slate81: '#bbc2e0',
  slate83: '#c2c9e4',

  // blue
  blue24: '#20245b',
  accent: '#254385',
  blue34: '#2f4880',
  selection: '#21489b',
  blue38: '#2a4c96',
  blue40: '#2b4ca1',
  blue0: '#3d59a1',
  blue48: '#4661ad',
  blue51: '#3767cf',
  blue58b: '#677fc3',
  blue58: '#668ac4',
  blue63b: '#698cd6',
  blue63: '#618ce0',
  blue66: '#5990f6',
  blue68: '#759ee4',
  blue69: '#769beb',
  blue71: '#96a0d5',
  blue72: '#7192ff',
  blue: '#7aa2f7',
  blue73: '#9fa8d6',
  blue74: '#8185f6',
  blue75: '#82aaff',
  blue76: '#9eb3e8',
  blue80: '#a3b1f3',
  blue81: '#9cacff',
  fg: '#c0caf5',
  blue87: '#c8d3f5',
  blue91: '#d1eaff',

  // cyan
  cyan39: '#0da0ba',
  blue2: '#0db9d7',
  cyan45: '#25aac2',
  cyan47: '#449dab',
  green2: '#41a6b5',
  cyan64: '#6eb1d7',
  cyan64b: '#68b3de',
  cyan68: '#7cbbe0',
  cyan74: '#8cc6ed',
  cyan: '#7dcfff',
  blue5: '#89ddff',
  cyan77: '#b2ccd6',

  // teal
  teal18: '#164846',
  teal24: '#007a75',
  teal29: '#266d6a',
  teal: '#1abc9c',
  teal43: '#3d9c8d',
  teal60: '#67cdba',
  green1: '#73daca',
  teal97: '#eeffff',

  // green
  green27: '#0d7c4e',
  green50: '#80a856',
  green57: '#67bc9b',
  green: '#9ece6a',
  green73: '#c3e88d',

  // yellow
  yellow56: '#e2bd3a',
  yellow56b: '#bba461',
  yellow69: '#d6c489',

  // orange
  orange37: '#94532b',
  orange43: '#a97a33',
  orange44: '#c97018',
  orange49: '#b76c41',
  orange56b: '#c2985b',
  orange56: '#c49a5a',
  orange59: '#cca25f',
  orange59b: '#cfa25f',
  yellow: '#e0af68',
  orange66: '#ea9a65',
  orange66b: '#d7b27a',
  orange: '#ff9e64',
  orange71: '#ffcb6b',
  orange73: '#ffcc73',
  orange79: '#fcd297',

  // red
  red27: '#7c0d1c',
  red32: '#703438',
  red36: '#85353e',
  red41: '#963c47',
  red43b: '#a6333f',
  red43: '#914c54',
  red51: '#ba485d',
  red51b: '#c24242',
  red56: '#bb616b',
  red1: '#db4b4b',
  red58: '#dc4e5f',
  red59: '#db546d',
  red62: '#e55858',
  red62b: '#dd6161',
  red65: '#dc7e6f',
  red66: '#ff5370',
  red: '#f7768e',

  // pink
  magenta2: '#ff007c',
  pink73: '#e88bad',

  // purple
  purple53: '#7c5eaf',
  purple65: '#9a7ecc',
  purple: '#9d7cd8',
  purple74: '#aa83f4',
  purple75: '#c792ea',
  purple75b: '#de90f1',
  magenta: '#bb9af7',
  purple80: '#c099ff',
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
  hoverBg:          alpha(colors.blue58b, o.subtle),    // toolbar and toggle hover
  findMatchBg:      alpha(colors.orange37, o.strong),  // other find / peek matches
  rangeBg:          alpha(colors.slate57b, o.soft),    // highlighted ranges
  wordHighlightBg:  alpha(colors.slate57b, o.light),   // same word / same selection
  rulerMark:        alpha(colors.fgDark, o.medium),    // overview ruler marks
  diffInsertedLine: alpha(colors.green27, o.soft),     // diff: inserted lines
  diffRemovedLine:  alpha(colors.red27, o.medium),     // diff: removed lines
  mergeCurrent:     alpha(colors.green2, o.soft),      // merge: current change
  conflict:         alpha(colors.yellow, o.dense),     // merge conflicts
  codeFence:        alpha(colors.black, o.moderate),   // markdown fenced code
};

module.exports = { c: { ...colors, ...tokens }, o, colors, tokens };
