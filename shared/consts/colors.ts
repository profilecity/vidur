export const primaryColorPallete = {
  primary: '#818CF8',
  'primary-dark': '#5969f7',
  'primary-bg': '#EBECFF',
  'primary-content': '#FFFFFF',
} as const;

export const whitlistedColorsForDynamicContent = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
] as const;

export const whitelistedBgClasses = whitlistedColorsForDynamicContent.map((c) => `bg-${c}-200`);
