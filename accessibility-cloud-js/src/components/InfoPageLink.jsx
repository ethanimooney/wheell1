// @flow

import React from 'react';
import { t } from 'c-3po';
import get from 'lodash/get';
import type { PlaceInfoProperties } from '../model/PlaceInfo';

type Props = {
  related: {},
  properties: PlaceInfoProperties
}

export default function InfoPageLink(props: Props) {
  const related = props.related;
  const source = get(related, `sources.${props.properties.sourceId}`);
  const sourceName = source && (source.shortName || source.name);
  if (!props.properties.infoPageUrl || !sourceName) { return null; }
  const label = t`Show ‘${props.properties.name}’ on ${sourceName}`;
  return (<a
    href={props.properties.infoPageUrl}
    aria-label={label}
    title={label}
    className="ac-result-link"
  >
    {sourceName}
  </a>);
}
