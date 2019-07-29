import { setDefaultHeaders, addLocale, useLocale } from 'c-3po';
import { defaultLocale } from './translate';

setDefaultHeaders({
  'plural-forms': 'nplurals=2; plural=(n!=1);',
});

const locales = process.env.locales;
locales.forEach(locale => addLocale(locale, require(`./${locale}.po`))); // eslint-disable-line
// addLocale('en_US', enUSLocale);
// addLocale('de_DE', deDELocale);
// addLocale('de', deLocale);

useLocale(defaultLocale);
