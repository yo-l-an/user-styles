const { c, o } = require('./palette');
const { alpha } = require('../../helpers');

// TextMate rules. Order matters: when two rules match equally, the later one wins.

module.exports = [
  // base (Tokyo Night Ported Nvim)
  {
    name: "Comment",
    scope: ["comment", "punctuation.definition.comment"],
    settings: {
      fontStyle: "italic",
      foreground: c.comment
    }
  },
  {
    name: "Variables",
    scope: ["string constant.other.placeholder"],
    settings: {
      foreground: c.magenta
    }
  },
  {
    name: "Colors",
    scope: ["constant.other.color"],
    settings: {
      foreground: c.fgDark
    }
  },
  {
    name: "Invalid",
    scope: ["invalid", "invalid.illegal"],
    settings: {
      foreground: c.magenta2
    }
  },
  {
    name: "Keyword, Storage",
    scope: ["keyword"],
    settings: {
      foreground: c.cyan
    }
  },
  {
    name: "Keyword Operator",
    scope: [
      "keyword.operator.comparison",
      "keyword.operator.logical",
      "storage.type.function.arrow",
      "keyword.operator.relational",
      "keyword.operator.increment",
      "keyword.operator.assignment"
    ],
    settings: {
      foreground: c.blue62
    }
  },
  {
    name: "Function",
    scope: ["storage.type.function", "meta.import"],
    settings: {
      fontStyle: "",
      foreground: c.magenta
    }
  },
  {
    name: "Definition Variable",
    scope: ["meta.definition.variable", "variable.other.constant.property"],
    settings: {
      fontStyle: "",
      foreground: c.blue75
    }
  },
  {
    name: "Object Literal",
    scope: ["meta.object-literal.key"],
    settings: {
      foreground: c.fgDark
    }
  },
  {
    name: "Operator, Misc",
    scope: [
      "constant.other.color",
      "punctuation",
      "meta.tag",
      "punctuation.definition.tag",
      "punctuation.separator.inheritance.php",
      "punctuation.definition.tag.html",
      "punctuation.definition.tag.begin.html",
      "punctuation.definition.tag.end.html",
      "punctuation.section.embedded",
      "keyword.other.template",
      "keyword.other.substitution"
    ],
    settings: {
      foreground: c.fgDark
    }
  },
  {
    name: "Export",
    scope: ["keyword.control.export", "storage.type"],
    settings: {
      fontStyle: "italic",
      foreground: c.purple
    }
  },
  {
    name: "Tag",
    scope: [
      "entity.name.tag",
      "meta.tag.sgml",
      "markup.deleted.git_gutter"
    ],
    settings: {
      foreground: c.magenta
    }
  },
  {
    name: "Function, Special Method",
    scope: [
      "entity.name.function",
      "meta.function-call",
      "variable.function",
      "support.function",
      "keyword.other.special-method"
    ],
    settings: {
      foreground: c.blue75
    }
  },
  {
    name: "Other Variable, String Link",
    scope: ["support.other.variable", "string.other.link"],
    settings: {
      foreground: c.red
    }
  },
  {
    name: "Number, Constant, Function Argument, Tag Attribute, Embedded",
    scope: [
      "constant.numeric",
      "constant.language",
      "support.constant",
      "constant.character",
      "constant.escape",
      "variable.parameter",
      "keyword.other.unit",
      "keyword.other"
    ],
    settings: {
      foreground: c.orange
    }
  },
  {
    name: "String, Symbols, Inherited Class, Markup Heading",
    scope: [
      "string",
      "constant.other.symbol",
      "constant.other.key",
      "entity.other.inherited-class",
      "markup.heading",
      "markup.inserted.git_gutter",
      "meta.group.braces.curly constant.other.object.key.js string.unquoted.label.js"
    ],
    settings: {
      foreground: c.comment
    }
  },
  {
    name: "Class, Support",
    scope: [
      "entity.name",
      "support.type",
      "support.class",
      "support.other.namespace.use.php",
      "meta.use.php",
      "support.other.namespace.php",
      "markup.changed.git_gutter",
      "support.type.sys-types"
    ],
    settings: {
      foreground: c.magenta
    }
  },
  {
    name: "Sub-methods",
    scope: [
      "entity.name.module.js",
      "variable.import.parameter.js",
      "variable.other.class.js"
    ],
    settings: {
      foreground: c.red
    }
  },
  {
    name: "Language methods",
    scope: ["variable.language"],
    settings: {
      fontStyle: "italic",
      foreground: c.red
    }
  },
  {
    name: "entity.name.method.js",
    scope: ["entity.name.method.js"],
    settings: {
      fontStyle: "italic",
      foreground: c.blue75
    }
  },
  {
    name: "meta.method.js",
    scope: [
      "meta.class-method.js entity.name.function.js",
      "variable.function.constructor"
    ],
    settings: {
      foreground: c.blue75
    }
  },
  {
    name: "Inserted",
    scope: ["markup.inserted"],
    settings: {
      foreground: c.lime73
    }
  },
  {
    name: "Deleted",
    scope: ["markup.deleted"],
    settings: {
      foreground: c.red1
    }
  },
  {
    name: "Changed",
    scope: ["markup.changed"],
    settings: {
      foreground: c.purple75
    }
  },
  {
    name: "Regular Expressions",
    scope: ["string.regexp"],
    settings: {
      foreground: c.blue5
    }
  },
  {
    name: "Escape Characters",
    scope: ["constant.character.escape"],
    settings: {
      foreground: c.blue5
    }
  },
  {
    name: "URL",
    scope: ["*url*", "*link*", "*uri*"],
    settings: {
      fontStyle: "underline"
    }
  },
  {
    name: "Decorators",
    scope: [
      "tag.decorator.js entity.name.tag.js",
      "tag.decorator.js punctuation.definition.tag.js"
    ],
    settings: {
      fontStyle: "italic",
      foreground: c.blue75
    }
  },
  {
    name: "ES7 Bind Operator",
    scope: [
      "source.js constant.other.object.key.js string.unquoted.label.js"
    ],
    settings: {
      fontStyle: "italic",
      foreground: c.rose66
    }
  },
  // JSON Syntax
  {
    name: "JSON Key - Level 0",
    scope: [
      "source.json meta.structure.dictionary.json support.type.property-name.json"
    ],
    settings: {
      foreground: c.purple75
    }
  },
  {
    name: "JSON Key - String Quote",
    scope: ["string.quoted.single.json", "string.quoted.double.json"],
    settings: {
      foreground: c.green
    }
  },
  {
    name: "JSON Key - Level 1",
    scope: [
      "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"
    ],
    settings: {
      foreground: c.fg
    }
  },
  {
    name: "JSON Key - Level 2",
    scope: [
      "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"
    ],
    settings: {
      foreground: c.fg
    }
  },
  {
    name: "JSON Key - Level 3",
    scope: [
      "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"
    ],
    settings: {
      foreground: c.fg
    }
  },
  {
    name: "JSON Key - Level 4",
    scope: [
      "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"
    ],
    settings: {
      foreground: c.fg
    }
  },
  {
    name: "JSON Key - Level 5",
    scope: [
      "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"
    ],
    settings: {
      foreground: c.fg
    }
  },
  {
    name: "JSON Key - Level 6",
    scope: [
      "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"
    ],
    settings: {
      foreground: c.fg
    }
  },
  {
    name: "JSON Key - Level 7",
    scope: [
      "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"
    ],
    settings: {
      foreground: c.fg
    }
  },
  {
    name: "JSON Key - Level 8",
    scope: [
      "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"
    ],
    settings: {
      foreground: c.fg
    }
  },
  // Markdown Syntax
  {
    name: "Markdown - Plain",
    scope: [
      "text.html.markdown",
      "punctuation.definition.list_item.markdown"
    ],
    settings: {
      foreground: c.fg
    }
  },
  {
    name: "Markdown - Markup Raw Inline",
    scope: ["text.html.markdown markup.inline.raw.markdown"],
    settings: {
      foreground: c.purple75
    }
  },
  {
    name: "Markdown - Markup Raw Inline Punctuation",
    scope: [
      "text.html.markdown markup.inline.raw.markdown punctuation.definition.raw.markdown"
    ],
    settings: {
      foreground: c.gray45
    }
  },
  {
    name: "Markdown - Heading",
    scope: [
      "markdown.heading",
      "markup.heading | markup.heading entity.name",
      "markup.heading.markdown punctuation.definition.heading.markdown"
    ],
    settings: {
      foreground: c.comment
    }
  },
  {
    name: "Markdown - Entity Section",
    scope: ["entity.name.section.markdown"],
    settings: {
      foreground: c.violet80
    }
  },
  {
    name: "Markdown - Quoted",
    scope: ["string.quoted.double.html", "string.quoted.single.html"],
    settings: {
      foreground: c.green
    }
  },
  {
    name: "Markup - Italic",
    scope: ["markup.italic"],
    settings: {
      fontStyle: "italic",
      foreground: c.green
    }
  },
  {
    name: "Markup - Bold",
    scope: ["markup.bold", "markup.bold string"],
    settings: {
      fontStyle: "bold",
      foreground: c.green
    }
  },
  {
    name: "Markup - Bold-Italic",
    scope: [
      "markup.bold markup.italic",
      "markup.italic markup.bold",
      "markup.quote markup.bold",
      "markup.bold markup.italic string",
      "markup.italic markup.bold string",
      "markup.quote markup.bold string"
    ],
    settings: {
      fontStyle: "bold",
      foreground: c.green
    }
  },
  {
    name: "Markup - Underline",
    scope: ["markup.underline"],
    settings: {
      fontStyle: "underline",
      foreground: c.yellow
    }
  },
  {
    name: "Markdown - Blockquote",
    scope: [
      "markup.quote punctuation.definition.blockquote.markdown",
      "markup.inline.raw.string.markdown"
    ],
    settings: {
      foreground: c.green
    }
  },
  {
    name: "Markup - Quote",
    scope: ["markup.quote"],
    settings: {
      fontStyle: "italic",
      foreground: c.green
    }
  },
  {
    name: "Markdown - Link",
    scope: ["string.other.link.title.markdown"],
    settings: {
      foreground: c.blue75
    }
  },
  {
    name: "Markdown - Link Description",
    scope: ["string.other.link.description.title.markdown"],
    settings: {
      foreground: c.magenta
    }
  },
  {
    name: "Markdown - Link Anchor",
    scope: ["constant.other.reference.link.markdown"],
    settings: {
      foreground: c.amber71
    }
  },
  {
    name: "Markup - Raw Block",
    scope: ["markup.raw.block"],
    settings: {
      foreground: c.magenta
    }
  },
  {
    name: "Markdown - Raw Block Fenced",
    scope: ["markup.raw.block.fenced.markdown"],
    settings: {
      foreground: c.codeFence
    }
  },
  {
    name: "Markdown - Fenced Bode Block",
    scope: ["punctuation.definition.fenced.markdown"],
    settings: {
      foreground: c.codeFence
    }
  },
  {
    name: "Markdown - Fenced Bode Block Variable",
    scope: [
      "markup.raw.block.fenced.markdown",
      "variable.language.fenced.markdown",
      "punctuation.section.class.end"
    ],
    settings: {
      foreground: c.cyan97
    }
  },
  {
    name: "Markdown - Fenced Language",
    scope: ["variable.language.fenced.markdown"],
    settings: {
      foreground: c.gray45
    }
  },
  {
    name: "Markdown - Block Language",
    scope: [
      "fenced_code.block.language.markdown",
      "punctuation.definition.markdown"
    ],
    settings: {
      foreground: c.comment
    }
  },
  {
    name: "Markdown - Separator",
    scope: ["meta.separator"],
    settings: {
      fontStyle: "bold",
      foreground: c.gray45
    }
  },
  {
    name: "Markup - Table",
    scope: ["markup.table"],
    settings: {
      foreground: c.cyan97
    }
  },
  // Typescript & TSX Syntax
  {
    name: "Keyword",
    scope: [
      "keyword.control.flow.tsx",
      "keyword.control.flow.ts",
      "storage.modifier.async.tsx",
      "storage.modifier.async.ts"
    ],
    settings: {
      fontStyle: "italic",
      foreground: c.red
    }
  },
  {
    name: "Keyword Operator TS",
    scope: [
      "keyword.operator.expression.delete.ts",
      "keyword.operator.new"
    ],
    settings: {
      foreground: c.purple
    }
  },
  {
    name: "Variable Other TS",
    scope: [
      "punctuation.definition.template-expression.begin",
      "variable.other.object.property.ts",
      "variable.object.property.ts",
      "variable.other.property.ts",
      "meta.object-literal.key.ts",
      "meta.object-literal.key.tsx",
      "variable.object.property.tsx",
      "support.variable.property.tsx",
      "entity.other.attribute-name.tsx"
    ],
    settings: {
      foreground: c.teal
    }
  },
  {
    name: "Meta Import TS",
    scope: ["meta.import.ts", "entity.other.inherited-class.ts"],
    settings: {
      foreground: c.purple
    }
  },
  {
    name: "Variable Read Write",
    scope: [
      "variable.other.readwrite.alias.ts",
      "variable.other.constant.ts",
      "meta.object.member.ts",
      "meta.embedded.line.ts",
      "meta.embedded.line.tsx",
      "meta.import.tsx",
      "meta.definition.variable.tsx",
      "meta.array.literal.tsx",
      "meta.arrow.tsx",
      "meta.array.literal.tsx",
      "meta.brace.square"
    ],
    settings: {
      foreground: c.fgDark
    }
  },
  {
    name: "Type State",
    scope: ["support.type.primitive"],
    settings: {
      foreground: c.green2
    }
  },
  {
    name: "TS JS - String Quoted",
    scope: [
      "string.quoted.single",
      "string.quoted.double",
      "string.template"
    ],
    settings: {
      foreground: c.green
    }
  },
  {
    name: "Document Javascript",
    scope: ["storage.modifier.async", "variable.other.object.js"],
    settings: {
      foreground: c.red
    }
  },
  {
    name: "TS JS - Variable",
    scope: [
      "variable.other.object",
      "meta.tag.attributes.tsx",
      "meta.function.expression.ts"
    ],
    settings: {
      foreground: c.fg
    }
  },
  {
    name: "Condition Typescript Javascript",
    scope: [
      "keyword.control.conditional",
      "keyword.control.loop",
      "keyword.control.trycatch",
      "keyword.control.default"
    ],
    settings: {
      fontStyle: "",
      foreground: c.magenta
    }
  },
  {
    name: "Object Property",
    scope: [
      "variable.other.object.property.tsx",
      "variable.other.object.property.js",
      "variable.other.property.tsx",
      "keyword.operator.logical"
    ],
    settings: {
      foreground: c.teal
    }
  },
  {
    name: "Entity Types",
    scope: ["support.type"],
    settings: {
      foreground: c.sky77
    }
  },
  {
    name: "Meta Export default",
    scope: ["meta.export.default"],
    settings: {
      foreground: c.blue75
    }
  },
  // Javascript & JSX Syntax
  {
    name: "Keyword",
    scope: ["keyword.control.flow.js"],
    settings: {
      fontStyle: "italic",
      foreground: c.red
    }
  },
  {
    name: "Variable Read Write",
    scope: [
      "meta.definition.variable.js",
      "variable.other.object.js",
      "meta.block.js",
      "meta.embedded.line.js"
    ],
    settings: {
      foreground: c.fgDark
    }
  },
  {
    name: "Meta tag",
    scope: ["meta.embedded.expression.js"],
    settings: {
      foreground: c.fgDark
    }
  },
  {
    name: "Import Javascript",
    scope: ["meta.import.js", "source.js"],
    settings: {
      foreground: c.magenta
    }
  },
  {
    name: "Object Property",
    scope: ["variable.other.property.js"],
    settings: {
      foreground: c.teal
    }
  },
  // HTML Syntax
  {
    name: "Text inside tag",
    scope: ["text.html.derivative", "meta.jsx.children"],
    settings: {
      foreground: c.fg
    }
  },
  {
    name: "HTML - Attributes",
    scope: [
      "text.html.basic entity.other.attribute-name.html",
      "text.html.basic entity.other.attribute-name"
    ],
    settings: {
      fontStyle: "italic",
      foreground: c.amber71
    }
  },
  {
    name: "HTML - Meta tag",
    scope: [
      "meta.tag.attributes",
      "meta.attribute.charset.html",
      "meta.attribute.class",
      "meta.attribute.event-handler.click.html",
      "meta.attribute.id.html",
      "meta.attribute.alt.html",
      "meta.attribute.style.html",
      "meta.attribute.src.html",
      "meta.attribute.type.html",
      "meta.attribute.href.html",
      "meta.attribute.rel.html",
      "meta.attribute.http-equiv.html",
      "meta.attribute.name.html",
      "meta.attribute.content.html"
    ],
    settings: {
      foreground: c.teal
    }
  },
  // CSS Syntax
  {
    name: "CSS - Variable Props",
    scope: ["variable.prop.css"],
    settings: {
      foreground: c.yellow
    }
  },
  {
    name: "CSS - Class and Support",
    scope: [
      "source.css support.type.property-name",
      "source.sass support.type.property-name",
      "source.scss support.type.property-name",
      "source.less support.type.property-name",
      "source.stylus support.type.property-name",
      "source.postcss support.type.property-name"
    ],
    settings: {
      foreground: c.teal
    }
  },
  {
    name: "CSS - Classes",
    scope: ["entity.other.attribute-name.id", "meta.selector.css"],
    settings: {
      foreground: c.magenta
    }
  },
  {
    name: "CSS - ID's",
    scope: ["source.sass keyword.control"],
    settings: {
      foreground: c.blue75
    }
  },
  {
    name: "CSS - @rule Tailwind",
    scope: [
      "keyword.control.at-rule.apply.tailwind",
      "keyword.control.at-rule.tailwind.tailwind",
      "keyword.control.at-rule.layer.tailwind",
      "keyword.control.at-rule.import.css",
      "keyword.control.at-rule.font-face",
      "keyword.control.at-rule.media"
    ],
    settings: {
      foreground: c.red
    }
  },
  {
    name: "CSS - @apply inside Tailwind",
    scope: ["meta.at-rule.apply.tailwind"],
    settings: {
      foreground: c.yellow
    }
  },
  // Golang Syntax
  {
    name: "Golang - Keyword",
    scope: [
      "keyword.package.go",
      "keyword.function.go",
      "keyword.control.go",
      "keyword.const.go",
      "keyword.interface.go",
      "keyword.type.go",
      "keyword.struct.go"
    ],
    settings: {
      foreground: c.magenta
    }
  },
  {
    name: "Golang - Type Name",
    scope: ["entity.name.type.go"],
    settings: {
      foreground: c.blue
    }
  },
  {
    name: "Golang - Keyword Import",
    scope: ["keyword.import.go"],
    settings: {
      foreground: c.cyan
    }
  },
  {
    name: "Golang - Package Name",
    scope: ["entity.name.package.go"],
    settings: {
      foreground: c.fg
    }
  },
  {
    name: "Golang - Import Name",
    scope: ["entity.name.import.go"],
    settings: {
      foreground: c.green
    }
  },
  {
    name: "Golang - Alias Import",
    scope: ["entity.alias.import.go"],
    settings: {
      foreground: c.fgDark
    }
  },
  {
    name: "Golang - Variable",
    scope: ["variable.other.assignment.go"],
    settings: {
      foreground: c.red
    }
  },
  {
    name: "Golang - Source",
    scope: ["source.go"],
    settings: {
      foreground: c.fgDark
    }
  },
  {
    name: "Golang - String Quoted",
    scope: [
      "string.quoted.raw.go",
      "string.quoted.single.go",
      "string.quoted.double.go"
    ],
    settings: {
      foreground: c.green
    }
  },
  // Makefile Syntax
  {
    name: "Makefile - Function Name",
    scope: ["entity.name.function.target.makefile"],
    settings: {
      foreground: c.magenta
    }
  },
  {
    name: "Makefile - Keyword Control",
    scope: ["keyword.control.@.makefile"],
    settings: {
      foreground: c.fgDark
    }
  },
  {
    name: "Makefile - Scope",
    scope: ["meta.scope.recipe.makefile"],
    settings: {
      foreground: c.green
    }
  },
  {
    name: "Makefile - Function Call",
    scope: ["meta.scope.function-call.makefile"],
    settings: {
      foreground: c.fgDark
    }
  },
  {
    name: "Makefile - Variable",
    scope: ["variable.other.makefile"],
    settings: {
      foreground: c.blue
    }
  },
  // Docker - Syntax
  {
    name: "Docker - Keyword",
    scope: ["keyword.other.special-method.dockerfile"],
    settings: {
      foreground: c.magenta
    }
  },
  {
    name: "Docker - Source",
    scope: ["source.dockerfile"],
    settings: {
      foreground: c.fgDark
    }
  },
  // YAML - Syntax
  {
    name: "YAML - Unquoted String",
    scope: ["string.unquoted.plain.out.yaml"],
    settings: {
      foreground: c.fgDark
    }
  },
  // Lua - Syntax
  {
    name: "Lua - Function",
    scope: ["support.function.lua"],
    settings: {
      foreground: c.magenta
    }
  },
  {
    name: "Lua - Keyword",
    scope: ["keyword.local.lua", "keyword.control.lua"],
    settings: {
      foreground: c.magenta
    }
  },
  {
    name: "Lua - Other Varible",
    scope: ["variable.other.lua", "keyword.operator.logical.shell"],
    settings: {
      foreground: c.fgDark
    }
  },
  {
    name: "Lua - Other Attribute",
    scope: ["entity.other.attribute.lua"],
    settings: {
      foreground: c.teal
    }
  },
  {
    name: "Lua - Keyword Operator",
    scope: ["keyword.operator.lua"],
    settings: {
      foreground: c.red
    }
  },
  // Shell - Syntax
  {
    name: "Shell - Function Name",
    scope: ["entity.name.function.shell"],
    settings: {
      foreground: c.magenta
    }
  },
  {
    name: "Shell - Function Builtin",
    scope: ["support.function.builtin.shell", "keyword.control.shell"],
    settings: {
      foreground: c.magenta
    }
  },
  {
    name: "Shell - Definition Variable",
    scope: ["variable.other.bracket.shell"],
    settings: {
      foreground: c.blue
    }
  },
  {
    name: "Shell - Source",
    scope: ["source.shell"],
    settings: {
      foreground: c.blue
    }
  },
  {
    name: "Shell - Scope Group",
    scope: ["meta.scope.group.shell"],
    settings: {
      foreground: c.magenta
    }
  },
  {
    name: "Shell - String",
    scope: ["string.interpolated.backtick.shell"],
    settings: {
      foreground: c.green
    }
  },

  // customizations
  {   name: "Comments",
      scope: ["comment"],
      settings: { foreground: c.blue46, fontStyle: "italic" }
  },
  {   name: "Comments punctuation",
      scope: ["punctuation.definition.comment"],
      settings: { foreground: c.blue46, fontStyle: "" }
  },

  {   name: "String, Symbols, Inherited Class, Markup Heading",
      scope: [
      "string",
      "constant.other.symbol",
      "constant.other.key",
      "entity.other.inherited-class",
      "markup.heading",
      "markup.inserted.git_gutter",
      "meta.group.braces.curly constant.other.object.key.js string.unquoted.label.js"
      ],
      settings: { foreground: c.slate67 }
  },
  {   name: "Strings",
      scope: ["punctuation.definition.string"],
      settings: { foreground: c.green }
  },
  {   name: "Number, Constant, Tag Attribute, Embedded",
      scope: [
          "constant.numeric",
          "constant.language",
          "support.constant",
          "constant.character",
          "constant.escape",
          "keyword.other.unit",
          "keyword.other"
      ],
      settings: { foreground: c.orange66 }
  },
  {   name: "Booleans & other constants",
      scope: [
          "constant.language"
      ],
      settings: { foreground: c.blue66, fontStyle: "bold" }
  },
  {   name: "Function parameters",
      scope: ["variable.parameter"],
      settings: { foreground: c.blue75, fontStyle: "italic" }
  },
  {   name: "Invalid",
      scope: ["invalid", "invalid.illegal"],
      settings: { foreground: c.red62 }
  },

  // html
  {   name: "HTML - Tags",
      scope: [
          "entity.name.tag.html",
          "entity.name.tag.block.any.html",
          "entity.name.tag.inline.any.html"
      ],
      settings: { foreground: c.red62Muted }
  },
  {   name: "HTML - Special Tags",
      scope: [
          "aura.html entity.name.tag.other.html"
      ],
      settings: { foreground: c.magenta }
  },
  {   name: "HTML - Attributes",
      scope: [
          "entity.other.attribute-name.html",
          "entity.other.attribute-name.id.html"
      ],
      settings: { foreground: c.teal }
  },
  {   name: "HTML - Attributes custom",
      scope: [
          "text.html meta.attribute.unrecognized entity.other.attribute-name.html"
      ],
      settings: { fontStyle: "italic" }
  },
  {   name: "HTML Unquoted Strings",
      scope: [
          "string.unquoted.html"
      ],
      settings: { fontStyle: "italic" }
  },

  // css
  {   name: "CSS - Tag",
      scope: [
          "meta.selector.css",
          "entity.name.tag.css"
      ],
      settings: { foreground: c.fgDark }
  },
  {   name: "CSS - ID",
      scope: [
          "entity.other.attribute-name.id.css"
      ],
      settings: { foreground: c.indigo74 }
  },
  {   name: "CSS - Classes",
      scope: [
          "meta.selector.css",
          "entity.other.attribute-name.class"
      ],
      settings: { foreground: c.magenta }
  },
  {   name: "CSS - Attribute key",
      scope: [
          "meta.attribute-selector.css",
          "entity.other.attribute-name.attribute.scss"
      ],
      settings: { foreground: c.teal }
  },
  {   name: "CSS - Attribute value",
      scope: [
          "meta.attribute-selector.scss",
          "string.unquoted.attribute-value.scss"
      ],
      settings: { foreground: c.green }
  },
  {
    name: "CSS - Class and Support",
    scope: [
      "source.css support.type.property-name",

      "support.type.property-name.css"
    ],
    settings: { foreground: c.amber69 }
  },
  {
    name: "CSS - Constant numeric values color",
    scope: [
      "punctuation.definition.constant.css",
      "constant.other.color.rgb-value.hex.css"
    ],
    settings: { foreground: c.orange66 }
  },
  {
    name: "CSS - Constant property values color",
    scope: [
      "support.constant.property-value.css",
      "source.css meta.property-value",
      "source.css meta.property-value support.type.property-name",

      "meta.property-value support.type.property-name.css"
    ],
    settings: { foreground: c.red65 }
  },
  {   name: "CSS - Vars",
      scope: [
          "source.css variable",

          "variable.css"
      ],
      settings: { foreground: c.blue75 }
  },
  {   name: "CSS - Called vars & mixins",
      scope: [
          "source.css meta.property-value variable",
          "source.css entity.name.function",

          "meta.property-value.css variable"
      ],
      settings: { foreground: c.blue72, fontStyle: "bold" }
  },
  {   name: "CSS - Functions",
      scope: [
          "source.css support.function",
          "source.css keyword.control.at-rule",

          "meta.property-value.css support.function",
          "source.css keyword.control.at-rule"
      ],
      settings: { foreground: c.fgDark }
  },
  {   name: "CSS - Important",
      scope: [
          "source.css keyword.other.important"
      ],
      settings: { foreground: c.red }
  },
  {   name: "CSS - Pseudo classes",
      scope: [
          "entity.other.attribute-name.pseudo-class.css"
      ],
      settings: { foreground: c.teal, fontStyle: "italic bold" }
  },
  {   name: "CSS - Pseudo elements",
      scope: [
          "entity.other.attribute-name.pseudo-element.css"
      ],
      settings: { foreground: c.teal60, fontStyle: "italic bold" }
  },
  {   name: "SCSS - Tag &",
      scope: [
          "entity.name.tag.reference.scss"
      ],
      settings: { foreground: c.red }
  },

  // js
  {   name: "JS - Import keywords",
      scope: [
          "keyword.control",
          "keyword.control.export"
      ],
      settings: { foreground: c.red }
  },
  {   name: "JS - Storage type",
      scope: [
          "storage.type"
      ],
      settings: { foreground: c.blue69 }
  },
  {   name: "JS - Logical operators",
      scope: ["keyword.operator.logical"],
      settings: { foreground: c.cyan }
  },
  {   name: "JS - Called functions",
      scope: ["meta.function-call entity.name.function"],
      settings: { foreground: c.amber69, fontStyle: "" }
  },
  {   name: "JS - Function definitions",
      scope: ["entity.name.function"],
      settings: { foreground: c.purple75Vivid, fontStyle: "bold italic" }
  },
  {   name: "JS - Function definitions keyword",
      scope: ["meta.function storage.type.function"],
      settings: { foreground: c.blue69, fontStyle: "italic" }
  },
  {   name: "JS - Variable definitions",
      scope: [
          "meta.definition.variable",
          "meta.object.member meta.object-literal.key"
      ],
      settings: { fontStyle: "italic" }
  },
  {   name: "JS - Object keys definitions no italic on punctuation",
      scope: ["meta.object.member punctuation.separator.key-value"],
      settings: { fontStyle: "" }
  },
  {   name: "JS - Object keys definitions",
      scope: [
          "meta.object.member meta.object-literal.key",
          "meta.field.declaration.ts variable.object.property.ts",
          "meta.method.declaration.ts meta.object-literal.key.ts"
      ],
      settings: { foreground: c.magenta }
  },
  {   name: "JS - Object property call",
      scope: [
          "variable.other.object.property.js",
          "variable.other.object.property.ts"
      ],
      settings: { foreground: c.teal60 }
  },
  {   name: "JS - Object property call (last highlighted)",
      scope: [
          "variable.other.property.js",
          "variable.other.property.ts"
      ],
      settings: { foreground: c.teal }
  },
  {   name: "JS - Conditional statements",
      scope: ["keyword.control.conditional"],
      settings: { foreground: c.magenta, fontStyle: "italic" }
  },
  {   name: "JS - Var on function call",
      scope: ["meta.function-call.js variable"],
      settings: { foreground: c.fgDark }
  },

  // ts
  {   name: "Type State",
      scope: ["support.type.primitive"],
      settings: { foreground: c.blue66 }
  },
  {   name: "Vars used",
      scope: [
          "variable.other.readwrite.ts",
          "variable.other.object"
      ],
      settings: { foreground: c.fgDark }
  },

  // markdown
  {   name: "Tables",
  scope: ["markup.table"],
  settings: { foreground: c.fgDark }
  },
  { name: "Markup - Underline",
      scope: ["markup.underline"],
      settings: { foreground: c.teal, fontStyle: "underline" }
  }
];
