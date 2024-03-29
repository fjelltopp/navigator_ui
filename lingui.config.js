const { i18n } = require('./locales/config');

module.exports = {
    sourceLocale: i18n.sourceLocale,
    locales: i18n.locales,
    catalogs: [
        {
            path: 'locales/{locale}/messages',
            include: ['pages', 'components', 'lib']
        }
    ],
    format: 'po'
}
