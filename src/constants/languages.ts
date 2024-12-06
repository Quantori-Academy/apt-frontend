export const LANGUAGES = {
  ENG: "ENG",
  RUS: "РУС",
  KA: "ქარ",
} as const;

export type LanguageKey = keyof typeof LANGUAGES;
export type LanguageValue = (typeof LANGUAGES)[LanguageKey];
