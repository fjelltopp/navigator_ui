const enLocale = {
    id: 'en',
    name: 'English',
    emoji: '🇬🇧'
}

const frLocale = {
    id: 'fr',
    name: 'Français',
    emoji: '🇫🇷'
}

const ptLocale = {
    id: 'pt',
    name: 'Português',
    emoji: '🇵🇹'
}

const supportedLocales = [enLocale, frLocale, ptLocale];
const unsupportedLocales = [];
const defaultLocale = supportedLocales[0];

module.exports = {
    supportedLocales,
    unsupportedLocales,
    defaultLocale,
    i18n: {
        locales: supportedLocales.map(locale => locale.id),
        defaultLocale: defaultLocale.id
    }
}
