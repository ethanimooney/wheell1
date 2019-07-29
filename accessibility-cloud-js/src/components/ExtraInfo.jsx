// @flow

import React from 'react';
import get from 'lodash/get';
import { translateWithObject } from '../i18n/translate';
import type { PlaceInfoRelated } from '../model/PlaceInfo';

type Props = {
  related: PlaceInfoRelated,
  sourceId: string,
  locale: string,
};

export default function ExtraInfo(props: Props) {
  const key = `sources.${props.sourceId}.translations.additionalAccessibilityInformation`;
  const translations = get(props.related, key);

  if (translations) {
    return (<header className="ac-result-extra-info" aria-hidden>
      {translateWithObject(translations, props.locale)}
    </header>);
  }
  return null;
}

