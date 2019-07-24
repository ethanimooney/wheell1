import { t as translateUsingC3PO } from 'c-3po';

// import translations from './translations/accessibility-cloud.js-widget/translations';

const allTranslations = {};

export const defaultLocale = 'en_US';

function findLocaleWithCountry(localeWithoutCountry, translations) {
  const regexp = new RegExp(`^${localeWithoutCountry}_`);
  return Object.keys(translations).find(locale => locale.match(regexp));
}

export function translateWithObject(object, locale) {
  const localeWithoutCountry = locale.replace(/_[A-Z][A-Z]$/);
  const localeHasCountry = locale !== localeWithoutCountry;
  const localeWithDefaultCountry =
    localeHasCountry ? locale : findLocaleWithCountry(locale, object);

  const result = object[locale] ||
    object[localeWithoutCountry] ||
    object[localeWithDefaultCountry] ||
    object[defaultLocale] ||
    `(No translation for ${locale})`;

  return result;
}

export function translate(string, locale) {
  const localeWithoutCountry = locale.replace(/_[A-Z][A-Z]$/);
  const localeHasCountry = locale !== localeWithoutCountry;
  const localeWithDefaultCountry =
    localeHasCountry ? locale : findLocaleWithCountry(locale, allTranslations);

  const translation = allTranslations[locale] || {};
  const translationWithoutCountry = allTranslations[localeWithoutCountry] || {};
  const translationWithDefaultCountry = allTranslations[localeWithDefaultCountry] || {};
  const translationWithDefaultLocale = allTranslations[defaultLocale] || {};

  const result = translation[string] ||
    translationWithoutCountry[string] ||
    translationWithDefaultCountry[string] ||
    translationWithDefaultLocale[string] ||
    string;

  return result;
}

// Note that we don't support template strings for now.

// let locale = defaultLocale;
// export function setGlobalLocale(newLocale) {
//   locale = newLocale;
// }

// // eslint-disable-next-line import/prefer-default-export
// function translateUsingGeneratedTranslations(arg) {
//   // eslint-disable-next-line no-undef
//   return translate(arg, locale);
// }


// If the `WP_LOCALE` environment variable is set, C3PO gets all strings from the source code
// in the build process.
// export const t = process.env.locale ? translateUsingC3PO : translateUsingGeneratedTranslations;
export const t = translateUsingC3PO;
