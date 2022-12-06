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

const supportedLocales = [enLocale];
const unsupportedLocales = [frLocale, ptLocale];
const defaultLocale = enLocale;

module.exports = {
    supportedLocales,
    unsupportedLocales,
    defaultLocale,
    i18n: {
        locales: supportedLocales.map(locale => locale.id),
        defaultLocale: defaultLocale.id
    }
}
