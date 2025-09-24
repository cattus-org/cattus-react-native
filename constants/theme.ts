/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
  defaultColors: {
    white100: "#FCFCFC",
    white200: "#F1F1F1",
    black100: "#3c3c3c",
    black200: "#323232",
    black300: "#1e1e1e",
    black400: "#141313",
    gray100: "#C0C0C0",
    gray200: "#A9A9A9",
    gray300: "#808080",
    gray400: "#696969",
    green100: "#25DC21",
    green200: "#55DA53",
    green300: "#5FC75D",
    green400: "#62A061",
    green500: "#315031",
    purple100: "#CC4FEB",
    purple200: "#B259C8",
    purple300: "#8A2EA0",
    purple400: "#6D1484",
    background: "#141313",
    text: "#fcfcfc",
    font: "Montserrat_400Regular",
    fontBold: "Montserrat_700Bold",
    alert: "#ffd500",
    ok: "#42ab49",
    danger: "#c63637",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
