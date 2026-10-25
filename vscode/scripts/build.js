// Builds every theme in src/themes/<id>/ into themes/<id>-color-theme.json,
// and keeps "contributes.themes" in package.json in sync.
//   node scripts/build.js                 build once
//   node scripts/build.js --watch         rebuild on every save in src/
//   node scripts/build.js --report [id]   list duplicate, near-duplicate and one-off colors
//                                         (--near=3 to widen the near-duplicate search, default 2)

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const THEMES_SRC = path.join(SRC, 'themes');
const OUT = path.join(ROOT, 'themes');
const PKG = path.join(ROOT, 'package.json');
const HEX = /^#[0-9a-f]{6}([0-9a-f]{2})?$/i;
const UI_THEME = { dark: 'vs-dark', light: 'vs', hcDark: 'hc-black', hcLight: 'hc-light' };

const outFile = (id) => path.join(OUT, `${id}-color-theme.json`);

function themeIds() {
  return fs.readdirSync(THEMES_SRC, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort();
}

function load(id) {
  const dir = path.join(THEMES_SRC, id);
  const req = (file) => require(path.join(dir, file));
  return { id, meta: req('theme.js'), palette: req('palette.js'), ui: req('ui.js'), syntax: req('syntax.js') };
}

function validate({ id, meta, palette, ui, syntax }) {
  const errors = [];
  for (const name of Object.keys(palette.tokens || {})) {
    if (name in palette.colors) errors.push(`palette.js: "${name}" is both a color and a token`);
  }
  if (!meta.name) errors.push('theme.js: missing name');
  if (!UI_THEME[meta.type]) errors.push(`theme.js: type must be one of ${Object.keys(UI_THEME).join(', ')}, got ${meta.type}`);
  for (const [key, value] of Object.entries(ui)) {
    if (!HEX.test(value)) errors.push(`ui.js  "${key}": ${value}`);
  }
  syntax.forEach((rule, i) => {
    const { foreground, background } = rule.settings || {};
    for (const [prop, value] of Object.entries({ foreground, background })) {
      if (value !== undefined && !HEX.test(value)) errors.push(`syntax.js  rule #${i + 1} "${rule.name || ''}" ${prop}: ${value}`);
    }
  });
  if (errors.length) throw new Error(`${id}: invalid theme (typo in a palette name?):\n  ` + errors.join('\n  '));
}

// a repeated key in ui.js is lost before the build sees it (the last one wins), so read the source text
function warnDuplicateKeys(id) {
  const file = path.join(THEMES_SRC, id, 'ui.js');
  const lines = fs.readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, m => m.replace(/[^\n]/g, '')).split('\n');
  const seen = {};
  lines.forEach((line, i) => {
    const m = line.match(/^\s*(?:(["'])(.+?)\1|([A-Za-z_$][\w$]*))\s*:/);
    if (m) (seen[m[2] ?? m[3]] ??= []).push(i + 1);
  });
  for (const [key, at] of Object.entries(seen)) {
    if (at.length > 1) console.warn(`warning: ${id}/ui.js "${key}" is set on lines ${at.join(', ')}, only line ${at.at(-1)} is used`);
  }
}

function writeTheme({ id, meta, ui, syntax }, author) {
  const theme = {
    $schema: 'vscode://schemas/color-theme',
    name: meta.name,
    type: meta.type,
    author,
    colors: ui,
    tokenColors: syntax,
  };
  fs.writeFileSync(outFile(id), JSON.stringify(theme, null, 2) + '\n');
}

function syncPackage(pkg, themes) {
  const contributed = themes.map(({ id, meta }) => ({
    label: meta.name,
    uiTheme: UI_THEME[meta.type],
    path: `./themes/${id}-color-theme.json`,
  }));
  if (JSON.stringify(pkg.contributes?.themes) === JSON.stringify(contributed)) return;
  pkg.contributes = { ...pkg.contributes, themes: contributed };
  fs.writeFileSync(PKG, JSON.stringify(pkg, null, 2) + '\n');
  console.log('updated contributes.themes in package.json');
}

// removes generated files whose theme folder no longer exists
function removeStale(ids) {
  const keep = new Set(ids.map(id => path.basename(outFile(id))));
  for (const file of fs.readdirSync(OUT)) {
    if (file.endsWith('-color-theme.json') && !keep.has(file)) {
      fs.unlinkSync(path.join(OUT, file));
      console.log(`removed stale themes/${file}`);
    }
  }
}

function build() {
  for (const id of Object.keys(require.cache)) if (id.startsWith(SRC)) delete require.cache[id];
  const pkg = JSON.parse(fs.readFileSync(PKG, 'utf8'));
  const author = pkg.author?.name || pkg.publisher;

  const themes = themeIds().map(load);
  themes.forEach(validate);
  themes.forEach(t => warnDuplicateKeys(t.id));
  const names = themes.map(t => t.meta.name);
  const dupe = names.find((n, i) => names.indexOf(n) !== i);
  if (dupe) throw new Error(`two themes are named "${dupe}"`);

  fs.mkdirSync(OUT, { recursive: true });
  for (const theme of themes) writeTheme(theme, author);
  syncPackage(pkg, themes);
  removeStale(themes.map(t => t.id));
  return themes;
}

const outputValues = ({ ui, syntax }) =>
  [...Object.values(ui), ...syntax.flatMap(r => [r.settings?.foreground, r.settings?.background])]
    .filter(Boolean)
    .map(v => v.toLowerCase());

// how often each palette entry ends up in the built theme
// (a solid color counts every use, including through tokens and alpha())
function usage(theme) {
  const { colors, tokens = {}, o = {} } = theme.palette;
  const values = outputValues(theme);
  const count = (match) => values.filter(match).length;
  const alphaByte = (pct) => Math.round((pct / 100) * 255).toString(16).padStart(2, '0');
  return {
    colors: Object.fromEntries(Object.entries(colors).map(([n, h]) => [n, count(v => v.slice(0, 7) === h.toLowerCase())])),
    tokens: Object.fromEntries(Object.entries(tokens).map(([n, h]) => [n, count(v => v === h.toLowerCase())])),
    opacity: Object.fromEntries(Object.entries(o).map(([n, pct]) => [n, count(v => v.length === 9 && v.slice(7) === alphaByte(pct))])),
  };
}

// transparent values used 2+ times that have no token yet
function tokenCandidates(theme) {
  const { colors, tokens = {}, o = {} } = theme.palette;
  const tokenHex = new Set(Object.values(tokens).map(h => h.toLowerCase()));
  const colorName = Object.fromEntries(Object.entries(colors).map(([n, h]) => [h.toLowerCase(), n]));
  const levelName = Object.fromEntries(Object.entries(o).map(([n, pct]) => [Math.round((pct / 100) * 255).toString(16).padStart(2, '0'), n]));
  const seen = {};
  for (const v of outputValues(theme)) {
    if (v.length === 9 && !v.endsWith('00') && !tokenHex.has(v)) seen[v] = (seen[v] || 0) + 1;
  }
  return Object.entries(seen)
    .filter(([, n]) => n > 1)
    .map(([v, n]) => `alpha(c.${colorName[v.slice(0, 7)] || v.slice(0, 7)}, ${levelName[v.slice(7)] ? 'o.' + levelName[v.slice(7)] : `'0x${v.slice(7)}'`})  ${v}  x${n}`);
}

function lab(hex) {
  const lin = (v) => (v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  const [r, g, b] = [1, 3, 5].map(i => lin(parseInt(hex.slice(i, i + 2), 16)));
  const f = (t) => t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116;
  const x = f((r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047);
  const y = f(r * 0.2126 + g * 0.7152 + b * 0.0722);
  const z = f((r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883);
  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}

// threshold: CIE76 distance under which two colors count as near-duplicates (~2.3 is barely noticeable)
function report(theme, threshold) {
  const counts = usage(theme);
  const entries = Object.entries(theme.palette.colors).filter(([n]) => n !== 'none');

  const byHex = {};
  for (const [name, hex] of entries) (byHex[hex.toLowerCase()] ??= []).push(name);
  const dupes = Object.values(byHex).filter(names => names.length > 1);
  const once = entries.filter(([n]) => counts.colors[n] === 1).map(([n, h]) => `${n} ${h}`);
  const unused = [
    ...entries.filter(([n]) => !counts.colors[n]).map(([n]) => `c.${n}`),
    ...Object.keys(counts.tokens).filter(n => !counts.tokens[n]).map(n => `c.${n} (token)`),
    ...Object.keys(counts.opacity).filter(n => !counts.opacity[n]).map(n => `o.${n}`),
  ];
  const candidates = tokenCandidates(theme);

  const near = [];
  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      const [a, b] = [lab(entries[i][1]), lab(entries[j][1])];
      const d = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
      if (d < threshold) near.push([d, entries[i], entries[j]]);
    }
  }

  console.log(`\n== ${theme.meta.name} (${theme.id}) ==`);
  const nTokens = Object.keys(counts.tokens).length, nLevels = Object.keys(counts.opacity).length;
  console.log(`\npalette: ${entries.length} colors, ${nTokens} tokens, ${nLevels} opacity levels\n`);
  console.log('opacity levels (uses):\n  ' + Object.entries(theme.palette.o || {}).map(([n, p]) => `${n} ${p}% x${counts.opacity[n]}`).join('\n  '));
  console.log('\ntokens (uses):\n  ' + Object.entries(counts.tokens).map(([n, k]) => `${n} x${k}`).join('\n  '));
  console.log(`\nrepeated transparent colors without a token (${candidates.length}):\n  ` + (candidates.join('\n  ') || '-'));
  console.log('');
  console.log(`same value, different names (${dupes.length}):`);
  for (const names of dupes) console.log('  ' + names.join(' = '));
  console.log(`\nnear-duplicates, hard to tell apart (${near.length}):`);
  for (const [d, [an, ah], [bn, bh]] of near.sort((x, y) => x[0] - y[0])) {
    console.log(`  ${an} ${ah}  ~  ${bn} ${bh}   (distance ${d.toFixed(1)})`);
  }
  console.log(`\nused once (${once.length}):\n  ` + once.join('\n  '));
  console.log(`\nunused (${unused.length}):\n  ` + (unused.join('\n  ') || '-'));
}

function run() {
  const started = Date.now();
  try {
    const themes = build();
    console.log(`[${new Date().toLocaleTimeString()}] built ${themes.map(t => t.id).join(', ')} in ${Date.now() - started}ms`);
    return true;
  } catch (err) {
    console.error(`[${new Date().toLocaleTimeString()}] build failed: ${err.message}`);
    return false;
  }
}

const args = process.argv.slice(2);
const near = args.find(a => a.startsWith('--near='));
const only = args.filter(a => !a.startsWith('--'));

if (args.includes('--report')) {
  const themes = build();
  const unknown = only.filter(id => !themes.some(t => t.id === id));
  if (unknown.length) {
    console.error(`unknown theme: ${unknown.join(', ')} (available: ${themes.map(t => t.id).join(', ')})`);
    process.exit(1);
  }
  for (const theme of themes) {
    if (!only.length || only.includes(theme.id)) report(theme, near ? Number(near.slice(7)) : 2);
  }
} else if (args.includes('--watch')) {
  run();
  let timer;
  fs.watch(SRC, { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(run, 50);
  });
  console.log('watching src/ for changes...');
} else if (!run()) {
  process.exit(1);
}
