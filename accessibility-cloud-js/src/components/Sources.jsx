// @flow

import React from 'react';
import type { PlaceInfoRelated } from '../model/PlaceInfo';

type Props = {
  apiBaseUrl: string,
  title: string,
  related: PlaceInfoRelated
};

export default function Sources(props: Props) {
  return (
    <footer className="ac-licenses">
      <header>{props.title}</header>
      <ul>
        {Object.keys(props.related.sources).map((sourceId) => {
          const source = props.related.sources[sourceId];
          const license = props.related.licenses[source.licenseId];
          const licenseURL = `${props.apiBaseUrl}/licenses/${license._id}`;
          const sourceURL = source.originWebsiteURL ||
            `${props.apiBaseUrl}/sources/${source._id}`;
          return (<li className="ac-source" key={source._id}>
            <a className="ac-source-name" href={sourceURL}>{source.shortName || source.name}</a>&nbsp;
            (<a className="ac-source-license" href={licenseURL}>{license.shortName || license.name}</a>)
          </li>);
        })}
      </ul>
    </footer>);
}
