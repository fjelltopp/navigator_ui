const enLocale = {
    id: 'en',
    name: 'English',
    emoji: '🇬🇧',
};

const frLocale = {
    id: 'fr',
    name: 'Français',
    emoji: '🇫🇷',
};

const ptLocale = {
    id: 'pt',
    name: 'Português',
    emoji: '🇵🇹',
};

const supportedLocales = [enLocale, frLocale];
const unsupportedLocales = [ptLocale];
const defaultLocale = enLocale;

module.exports = {
    supportedLocales,
    unsupportedLocales,
    defaultLocale,
    i18n: {
        locales: supportedLocales.map((locale) => locale.id),
        defaultLocale: defaultLocale.id,
    },
};
