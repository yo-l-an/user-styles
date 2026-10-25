# Development

The files in `themes/` are generated, so don't edit them by hand. Edit `src/`, then build.

Each theme is a folder in `src/themes/<id>/`:

| file | what it holds |
| --- | --- |
| `theme.js` | name (shown in the theme picker) and type (`dark`, `light`, `hcDark`, `hcLight`) |
| `palette.js` | every color by name (`colors`), the opacity scale (`o`), and colors with opacity reused in several places (`tokens`) |
| `ui.js` | workbench colors → palette names |
| `syntax.js` | TextMate rules → palette names (order matters, later rules win) |

In `ui.js` and `syntax.js`:

- `c.bg` is a solid color.
- `c.selectionBg` is a token: a color with opacity, defined once in `palette.js`.
- `alpha(c.slate45, o.soft)` is a one-off transparent color, on the opacity scale.

`alpha()` is in `src/helpers.js`, shared by all themes. It takes a percent (`o.soft`, or a number like `38.4`) or a hex byte written as a string (`'0x62'`). Stick to the `o` scale where you can.

Each theme is built to `themes/<id>-color-theme.json`. The build also keeps `contributes.themes` in `package.json` up to date, so never edit that list by hand.

## Commands

Requires Node.js. There are no dependencies to install.

| command | |
| --- | --- |
| `npm run build` | builds all themes once |
| `npm run watch` | rebuilds on every save in `src/` |
| `npm run preview` | builds, opens a preview window, then watches (see [Previewing](#previewing)) |
| `npm run report` | for each theme: usage of each opacity level and token, repeated transparent colors that could become a token, colors with the same value, near-duplicates, one-off colors, and anything unused |
| `npm run report -- <id>` | the same, for one theme (add `--near=3` to widen the near-duplicate search) |

`vsce package` and `vsce publish` run the build first (`vscode:prepublish`).

## Adding a theme

1. Copy an existing folder in `src/themes/` and rename it. The folder name becomes the theme's ID.
2. Change `name` (and `type` if needed) in its `theme.js`.
3. Run `npm run build`.

A variant can reuse another theme's files with `require`. For example, `ui.js` in a variant could start from `require('../tokyo-night-modern/ui')` and override a few keys.

Deleting a folder removes its theme from `themes/` and `package.json` on the next build.

## Previewing

Run `npm run preview` from `vscode/`. It builds the themes, opens the `sample/` folder in a preview window with the themes loaded, and then keeps watching `src/`. Stop the watcher with `Ctrl+C`. The window stays open.

The preview window has its own profile in `.preview/` (ignored by git and left out of the package), with no other extensions. The first time, it opens on the first theme. After that it remembers whichever theme you pick with **Preferences: Color Theme**. To start over, delete `.preview/`.

If a save doesn't show up, run **Developer: Reload Window** in the preview window.

`sample/` is a fake project for checking syntax colors. It has one file or more per language the theme colors, in nested folders so the explorer has a real tree. It isn't part of the published package. Add a file there when you work on a new language.

| folder | languages |
| --- | --- |
| `sample/` | Markdown, JSON, JSON with comments, YAML, Dockerfile, Makefile |
| `sample/web/` | HTML, CSS, SCSS, JavaScript, TypeScript, TSX |
| `sample/server/` | Go |
| `sample/tools/` | shell, Lua, Python |
| `sample/site/` | PHP (templates mixed with HTML, and classes) |

## Cleaning up colors

To merge two near-identical colors, point one name at the other in `palette.js` (or replace its uses), then run the report again.
