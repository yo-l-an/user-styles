# Sample project

Fake files for previewing the theme. Nothing here runs, it only has to *look* like real code.

## Layout

- `web/` HTML, CSS, SCSS, JavaScript, TypeScript and TSX
- `server/` Go, with nested packages
- `tools/` shell, Lua and Python scripts
- `site/` PHP
- root: JSON, YAML, Dockerfile and Makefile

## Markdown checks

Some **bold text**, some *italic text*, some ***both***, `inline code` and ~~struck out~~ text.
A [link to the docs](https://example.com/docs) and an autolink: <https://example.com>.

> A quote, with **bold** inside.
>
> > A nested quote.

1. First step
2. Second step
   - nested bullet
   - [ ] unchecked task
   - [x] checked task

| Column      | Type    | Default |
| ----------- | ------- | ------- |
| `name`      | string  | `""`    |
| `retries`   | number  | `3`     |
| `enabled`   | boolean | `true`  |

```ts
const greet = (name: string): string => `Hello, ${name}!`;
```

```bash
npm run build && npm run preview
```

<u>Underlined with HTML</u>

---

### Third level heading

#### Fourth level heading

![An image](./web/assets/logo.png "Logo")
