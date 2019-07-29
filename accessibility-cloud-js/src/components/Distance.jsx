// @flow

import React from 'react';
import type { GeometryObject, Point } from 'geojson-flow';
import { t } from 'c-3po';

function mapsHref(geometry: ?GeometryObject): ?string {
  if (!geometry) return null;
  if (!geometry.coordinates) return null;
  if (geometry.type !== 'Point') return null;
  const point: Point = geometry;
  const [longitude, latitude] = point.coordinates;
  if (latitude && longitude) {
    return `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}&zoom=20`;
  }
  return null;
}

function DistanceIcon(props) {
  return (<svg viewBox="492 250 14 16" version="1.1" className="ac-result-distance-icon" {...props}>
    <polygon id="Triangle" stroke="none" fill="#000000" fillRule="nonzero" transform="translate(499.177620, 258.059017) rotate(34.000000) translate(-499.177620, -258.059017) " points="502.35524 265.118034 499.248838 262.696612 496 265.118034 499.17762 251" />
  </svg>);
}

type Props = {
  locale: string,
  distance?: number,
  geometry?: GeometryObject,
}

export default function Distance(props: Props) {
  const distance = props.distance;
  if (!distance) { return null; }
  const locale = props.locale;
  const isImperial = locale === 'en' || locale === 'en_UK' || locale === 'en_US';
  let value = Math.round(distance);
  let unit = t`meters`;
  let unitAbbreviation = 'm';
  if (isImperial) {
    const distanceInMiles = 0.00062137 * distance;
    if (distanceInMiles < 0.1) {
      const distanceInYards = 1.0936 * distance;
      value = Math.round(distanceInYards);
      unit = t`yards`;
      unitAbbreviation = 'yd';
    } else {
      value = String(0.1 * Math.round(distanceInMiles * 10)).replace(/(\.\d)\d+/, '$1');
      unit = t`miles`;
      unitAbbreviation = 'mi';
    }
  }

  const href = mapsHref(props.geometry);
  const showLabel = t`Show on OpenStreetMap`;
  const distanceLabel = t`${value} ${unit} from here.`;
  const label = `${distanceLabel} ${showLabel}`;
  return (<a
    href={href}
    className="ac-result-distance"
    aria-label={label}
    title={label}
  >
    <DistanceIcon role="presentation" aria-hidden />
    <span className="ac-result-distance-value" role="presentation" aria-hidden>{value}</span>
    <span className="ac-result-distance-unit" role="presentation" aria-hidden>{unitAbbreviation}</span>
  </a>);
}

Distance.defaultProps = {
  distance: null,
  geometry: null,
};
