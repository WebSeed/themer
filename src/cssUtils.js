const prefix = name => `--${name}`

export const getCssVar = name => window
  .getComputedStyle(document.documentElement)
  .getPropertyValue(prefix(name))

export const setCssVar = (name, value) => document
  .documentElement
  .style
  .setProperty(prefix(name), value)
