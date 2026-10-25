// Opens sample/ in a VS Code window with the themes loaded from this folder, without a debugger
// (with F5's debugger attached, the extension host crashes and the window closes).
// It uses its own profile in .preview/, so your settings and extensions stay out of it,
// and the theme you pick there is remembered.

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.join(__dirname, '..');
const PROFILE = path.join(ROOT, '.preview');
const SAMPLE = path.join(ROOT, 'sample'); // fake project with one file per language
const settingsFile = path.join(PROFILE, 'User', 'settings.json');

if (!fs.existsSync(settingsFile)) {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  const first = pkg.contributes?.themes?.[0]?.label;
  fs.mkdirSync(path.dirname(settingsFile), { recursive: true });
  fs.writeFileSync(settingsFile, JSON.stringify({ 'workbench.colorTheme': first, 'workbench.startupEditor': 'none' }, null, 2) + '\n');
}

const env = { ...process.env };
delete env.ELECTRON_RUN_AS_NODE; // set when run from inside VS Code; it would start Code as plain Node

// only the folder: with files added (or --new-window), the development window opens without the folder.
// The editors you open in sample/ are restored on the next launch anyway.
const args = [
  `--user-data-dir=${PROFILE}`,
  `--extensions-dir=${path.join(PROFILE, 'extensions')}`,
  `--extensionDevelopmentPath=${ROOT}`,
  SAMPLE,
];
// "code" is a .cmd script on Windows, which needs a shell: pass one command line,
// quoting the arguments but not "code" itself (code.cmd breaks when its own name is quoted)
const child = process.platform === 'win32'
  ? spawn(['code', ...args.map(a => `"${a}"`)].join(' '), { env, shell: true, detached: true, stdio: 'ignore' })
  : spawn('code', args, { env, detached: true, stdio: 'ignore' });

child.on('error', (err) => {
  console.error(`could not start VS Code (is the "code" command on your PATH?): ${err.message}`);
  process.exit(1);
});
child.unref();
console.log('opened the preview window (profile in .preview/)');
