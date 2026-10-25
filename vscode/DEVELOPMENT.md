# Development

The files in `themes/` are generated, so don't edit them by hand. Edit `src/`, then build.

Each theme is a folder in `src/themes/<id>/`:

| file | what it holds |
| --- | --- |
| `theme.js` | name (shown in the theme picker) and type (`dark`, `light`, `hcDark`, `hcLight`) |
| `palette.js` | every color, by name |
| `ui.js` | workbench colors → palette names |
| `syntax.js` | TextMate rules → palette names (order matters, later rules win) |

`src/helpers.js` is shared by all themes. `alpha()` adds transparency, as a percent (`alpha(c.accent, 38.4)`) or as a hex byte written as a string (`alpha(c.accent, '0x62')`).

Each theme is built to `themes/<id>-color-theme.json`. The build also keeps `contributes.themes` in `package.json` up to date, so never edit that list by hand.

## Commands

Requires Node.js. There are no dependencies to install.

| command | |
| --- | --- |
| `npm run build` | builds all themes once |
| `npm run watch` | rebuilds on every save in `src/` |
| `npm run report` | for each theme, lists colors with the same value, near-duplicates and one-off colors |
| `npm run report -- <id>` | the same, for one theme (add `--near=3` to widen the near-duplicate search) |

`vsce package` and `vsce publish` run the build first (`vscode:prepublish`).

## Adding a theme

1. Copy an existing folder in `src/themes/` and rename it. The folder name becomes the theme's ID.
2. Change `name` (and `type` if needed) in its `theme.js`.
3. Run `npm run build`.

A variant can reuse another theme's files with `require`. For example, `ui.js` in a variant could start from `require('../tokyo-night-modern/ui')` and override a few keys.

Deleting a folder removes its theme from `themes/` and `package.json` on the next build.

## Previewing

Run `npm run watch`, press F5 to open an Extension Development Host window, and select the theme there. If a save doesn't show up, run **Developer: Reload Window** in that window.

## Cleaning up colors

To merge two near-identical colors, point one name at the other in `palette.js` (or replace its uses), then run the report again.
