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

const supportedLocales = [
    enLocale, frLocale, ptLocale
]

// TODO: remove if statement once all locales are supported
const enableAllLocales = false;

if (enableAllLocales) {
    module.exports = {
        supportedLocales,
        i18n: {
            locales: supportedLocales.map(locale => locale.id),
            defaultLocale: enLocale.id
        }
    }
} else {
    module.exports = {
        supportedLocales: [enLocale],
        i18n: {
            locales: supportedLocales.map(locale => locale.id),
            defaultLocale: enLocale.id,
            localeDetection: false
        }
    }
}
