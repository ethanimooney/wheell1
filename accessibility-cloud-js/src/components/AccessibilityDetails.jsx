// @flow

import React from 'react';
import isPlainObject from 'lodash/isPlainObject';
import humanizeString from 'humanize-string';
import { t, useLocale } from 'c-3po';


function formatName(name: string, properties: {}): string {
  const string = properties[`${name}Localized`] || humanizeString(name);
  return string.replace(/^Rating /, '');
}


function formatValue(value: mixed): string {
  if (value === true) return t`Yes`;
  if (value === false) return t`No`;
  return String(value);
}


function FormatRating({ rating }: { rating: number }) {
  const between1and5 = Math.floor(Math.min(1, Math.max(0, rating)) * 5);
  const stars = '★★★★★'.slice(5 - between1and5);
  return (<span aria-label={`${between1and5} stars`}>
    <span className="stars" aria-hidden="true">{stars}</span>
    <span className="numeric" aria-hidden="true">{between1and5}/5</span>
  </span>);
}


function DetailsArray({ className, array }: { className: ?string, array: any[] }) {
  // eslint-disable-next-line react/no-array-index-key
  const items = array.map((e, i) => <li key={i}><AccessibilityDetails details={e} /></li>);
  return <ul className={`ac-list ${className || ''}`}>{items}</ul>;
}


function capitalizeFirstLetter(string): string {
  return string.charAt(0).toLocaleUpperCase() + string.slice(1);
}


function DetailsObject(props: { className: ?string, object: {} }) {
  const { className, object } = props;
  const properties = Object.keys(object).map((key) => {
    if (key.match(/Localized/)) { return null; }
    const value = object[key];
    const name = formatName(key, object);

    // Screen readers work better when the first letter is capitalized.
    // If the attribute starts with a lowercase letter, there is no spoken pause
    // between the previous attribute value and the attribute name.
    const capitalizedName = capitalizeFirstLetter(name);

    if (value && (value instanceof Array || isPlainObject(value))) {
      return [
        <dt data-key={key}>{capitalizedName}</dt>,
        <dd><AccessibilityDetails details={value} /></dd>,
      ];
    }
    if (key.startsWith('rating')) {
      return [
        <dt className="ac-rating">{capitalizedName}:</dt>,
        <dd><FormatRating rating={parseFloat(String(value))} /></dd>,
      ];
    }
    const generatedClassName = `ac-${typeof value}`;
    const formattedValue = formatValue(value);
    return [
      <dt className={generatedClassName}>{capitalizedName}:</dt>,
      <dd className={generatedClassName} aria-label={`${formattedValue}!`}>
        <em>{formattedValue}</em>
      </dd>,
    ];
  });
  return <dl className={`ac-group ${className || ''}`} role="treeitem" {...props}>{properties}</dl>;
}


type Props = {
  details: any,
  locale?: ?string,
  className?: ?string,
};


export default function AccessibilityDetails(props: Props) {
  if (props.locale) useLocale(props.locale);

  const details = props.details;
  if (details instanceof Array) {
    return <DetailsArray className={props.className} array={details} {...props} />;
  }
  if (isPlainObject(details)) {
    return <DetailsObject className={props.className} object={details} {...props} />;
  }
  return <div className={props.className} {...props}>{details}</div>;
}


AccessibilityDetails.defaultProps = { className: null, locale: null };
