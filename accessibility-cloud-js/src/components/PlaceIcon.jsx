// @flow

import React from 'react';

type Props = {
  apiBaseUrl: string,
  category: string,
};

export default function PlaceIcon(props: Props) {
  const src = `${props.apiBaseUrl}/icons/categories/${props.category}.svg`;
  return (<img
    className="ac-result-icon"
    src={src}
    alt=""
    role="presentation"
  />);
}
