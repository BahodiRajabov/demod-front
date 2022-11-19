import { PureLightTheme } from './schemes/PureLightTheme';

const themeMap = {
  PureLightTheme,
};

export function themeCreator(theme) {
  return themeMap[theme];
}
