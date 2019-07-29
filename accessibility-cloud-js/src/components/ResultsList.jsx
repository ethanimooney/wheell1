// @flow

import React from 'react';
import { t } from 'c-3po';
import Result from './Result';
import type { PlaceInfoCollection } from '../model/PlaceInfo';
import createXHRComponent from './XHRComponent';
import type { XHRProps, XHRState } from './XHRComponent';
import Sources from './Sources';

type Props = XHRProps & XHRState & {
  response: PlaceInfoCollection,
  isLoadingText: string,
  noResultsText: string,
  locale: string,
  apiBaseUrl: string,
}

// eslint-disable-next-line react/prefer-stateless-function
class ResultsList extends React.Component<any, Props, any> {
  props: Props;

  render() {
    if (this.props.isLoading) {
      return <div className="ac-is-loading">{this.props.isLoadingText}</div>;
    }
    const features = this.props.response && this.props.response.features;
    if (features && features.length) {
      const locale = this.props.locale;
      return (<section className="ac-result-list" role="list">
        {features.map(placeInfo => <Result
          apiBaseUrl={this.props.apiBaseUrl}
          key={placeInfo.properties._id}
          placeInfo={placeInfo}
          locale={locale}
          related={this.props.response.related}
        />)}
        <Sources
          related={this.props.response.related}
          apiBaseUrl={this.props.apiBaseUrl}
          title={t`Sources:`}
        />
      </section>);
    }
    return (<div className="ac-no-results">{this.props.noResultsText}</div>);
  }
}

export default createXHRComponent(ResultsList);
