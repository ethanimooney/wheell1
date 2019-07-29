// @flow

import { t } from 'c-3po';
import get from 'lodash/get';
import set from 'lodash/set';
import isArray from 'lodash/isArray';
import cloneDeep from 'lodash/cloneDeep';
import isPlainObject from 'lodash/isPlainObject';
import humanizeString from 'humanize-string';

import type { GeometryObject } from 'geojson-flow';
import type { Accessibility } from './Accessibility';
import type { License } from './License';
import type { Source } from './Source';


export type PlaceInfoProperties = {
  _id: string,
  accessibility: Accessibility,
  category?: string,
  distance?: number,
  infoPageUrl?: string,
  localizedCategory?: string,
  name?: string,
  originalData: {},
  originalId: string,
  sourceId: string,
  sourceImportId: string,
};

export type PlaceInfo = {
  type: 'Feature',
  geometry: ?GeometryObject,
  properties: PlaceInfoProperties,
};

export type PlaceInfoRelated = {
  sources: { [string]: Source },
  licenses: { [string]: License },
};

export type PlaceInfoCollection = {
  type: 'FeatureCollection',
  features: PlaceInfo[],
  related: PlaceInfoRelated,
};


export function humanizedCategory(properties: PlaceInfoProperties): ?string {
  if (!properties) { return null; }
  return properties.localizedCategory || humanizeString(properties.category);
}


export function isAccessible(properties: PlaceInfoProperties): boolean {
  return Boolean(get(properties, 'accessibility.accessibleWith.wheelchair'));
}


export function isPartiallyAccessible(properties: PlaceInfoProperties): boolean {
  return Boolean(get(properties, 'accessibility.isPartiallyAccessible.wheelchair'));
}


export function accessibilitySummary(properties: PlaceInfoProperties) {
  if (isAccessible(properties)) { return t`Accessible with wheelchair`; }
  if (isPartiallyAccessible(properties)) { return t`Partially accessible with wheelchair`; }
  return t`Not accessible with wheelchair`;
}

function isDefined(x): boolean {
  return typeof x !== 'undefined' &&
    x !== null &&
    !(isArray(x) && x.length === 0) &&
    !(isPlainObject(x) && Object.keys(x).length === 0);
}

function removeNullAndUndefinedFields(something: any): ?any {
  if (isPlainObject(something) && something instanceof Object) {
    const result = {};
    Object.keys(something)
      .filter(key => isDefined(something[key]) && !key.match(/Localized$/))
      .forEach((key) => {
        const value = removeNullAndUndefinedFields(something[key]);
        if (isDefined(value)) result[key] = value;
      });
    return Object.keys(result).length > 0 ? result : undefined;
  } else if (something instanceof Array) {
    const result = something.filter(isDefined).map(removeNullAndUndefinedFields);
    return result.length ? result : undefined; // filter out empty arrays
  }
  return something;
}


export function hasAdditionalAccessibilityProperties(properties: PlaceInfoProperties): boolean {
  const clonedProperties = cloneDeep(properties);
  set(clonedProperties, 'accessibility.accessibleWith.wheelchair', null);
  set(clonedProperties, 'accessibility.partiallyAccessibleWith.wheelchair', null);
  const propertiesAfterRemoval = removeNullAndUndefinedFields(clonedProperties);
  return Boolean(propertiesAfterRemoval && propertiesAfterRemoval.accessibility);
}
