import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { en } from 'make-plural/plurals';
import { messages } from '../locales/en/messages';

i18n.load({ en: messages })
i18n.loadLocaleData({ en: { plurals: en } });

i18n.activate('en');

export default function wrapper({ children }) {
    return (
        <I18nProvider i18n={i18n}>
            {children}
        </I18nProvider>
    )
} 