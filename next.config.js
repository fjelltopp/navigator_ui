
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

module.exports = {
  reactStrictMode: true,
  supportedLocales,
  i18n: {
    locales: supportedLocales.map(locale => locale.id),
    defaultLocale: enLocale.id
  }
}
