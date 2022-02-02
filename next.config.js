const supportedLocales = [
  {
    id: 'en',
    name: 'English',
    emoji: '🇬🇧'
  },
  {
    id: 'fr',
    name: 'Français',
    emoji: '🇫🇷'
  }
]

module.exports = {
  reactStrictMode: true,
  supportedLocales,
  i18n: {
    locales: supportedLocales.map(locale => locale.id),
    defaultLocale: supportedLocales[0].id
  }
}
