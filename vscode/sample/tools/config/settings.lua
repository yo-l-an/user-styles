-- Editor settings, loaded at startup
local M = {}

M.options = {
  tab_width = 2,
  wrap = true,
  theme = "tokyo-night-modern",
  plugins = { "telescope", "treesitter", "lualine" },
}

local function merge(target, source)
  for key, value in pairs(source) do
    if type(value) == "table" and type(target[key]) == "table" then
      merge(target[key], value)
    else
      target[key] = value
    end
  end
  return target
end

function M.setup(user_options)
  M.options = merge(M.options, user_options or {})
  if not M.options.wrap then
    print(string.format("wrap disabled, tab width %d", M.options.tab_width))
  end
  return M
end

return M
