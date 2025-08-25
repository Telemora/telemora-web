import { generateBasePalettes, toHex } from '../utils/color';

export const lightThemeColors = {
  antiflashWhite: '#f1f1f1ff',
  battleshipGray: '#999999ff',
  black: '#000000ff',
  blueNcs: '#168acdff',
  indianRed: '#d14e4eff',
  pictonBlue: '#40a7e3ff',
  platinum: '#e7e7e7ff',
};

export const darkThemeColors = {
  argentinianBlue: '#6ab2f2ff',
  argentinianBlue2: '#6ab3f3ff',
  gunmetal: '#232e3cff',
  imperialRed: '#ec3942ff',
  richBlack: '#17212bff',
  richBlack2: '#111921ff',
  silverLakeBlue: '#5288c1ff',
  slateGray: '#708499ff',
  white: '#ffffffff',
  whiteSmoke: '#f5f5f5ff',
};

export const darkThemeShadeColors = {
  argentinianBlue: toHex(generateBasePalettes(darkThemeColors.argentinianBlue).base),
  argentinianBlue2: toHex(generateBasePalettes(darkThemeColors.argentinianBlue2).base),
  gunmetal: toHex(generateBasePalettes(darkThemeColors.gunmetal).base),
  imperialRed: toHex(generateBasePalettes(darkThemeColors.imperialRed).base),
  richBlack: toHex(generateBasePalettes(darkThemeColors.richBlack).base),
  richBlack2: toHex(generateBasePalettes(darkThemeColors.richBlack2).base),
  silverLakeBlue: toHex(generateBasePalettes(darkThemeColors.silverLakeBlue).base),
  slateGray: toHex(generateBasePalettes(darkThemeColors.slateGray).base),
  white: toHex(generateBasePalettes(darkThemeColors.white).base),
  whiteSmoke: toHex(generateBasePalettes(darkThemeColors.whiteSmoke).base),
};
