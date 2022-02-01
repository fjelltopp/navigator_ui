const { i18n } = require('./next.config');

module.exports = {
    locales: i18n.locales,
    catalogs: [
        {
            path: 'locales/{locale}/messages',
            include: ['pages', 'components']
        }
    ],
    format: 'po'
}
