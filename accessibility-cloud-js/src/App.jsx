// @flow

import React, { Component } from 'react';

import { t, useLocale } from 'c-3po';
import './i18n/localeSetup';
import { defaultLocale } from './i18n/translate';
import ResultsList from './components/ResultsList';
import type { XHRSuccessCallback, XHRErrorCallback } from './components/XHRComponent';
import './app.css';


export type Props = {
  requestParameters?: {},
  apiBaseUrl: string,
  locale: string,
  token: string,
  onSuccess?: ?XHRSuccessCallback,
  onError?: ?XHRErrorCallback,
};


export type DefaultProps = {
  requestParameters: {},
  apiBaseUrl: string,
  locale: string,
  onSuccess: ?XHRSuccessCallback,
  onError: ?XHRErrorCallback,
};


export default class App extends Component<DefaultProps, Props, *> {
  static defaultProps = {
    requestParameters: {},
    apiBaseUrl: 'https://www.accessibility.cloud',
    locale: defaultLocale,
    onSuccess: null,
    onError: null,
  };

  resultsList: ResultsList; // eslint-disable-line react/sort-comp


  constructor(props: Props) {
    super(props);
    if (!props.apiBaseUrl.match(/^https?:\/\//)) {
      throw new Error('Please supply a valid API domain.');
    }
    if (!props.locale.match(/[a-z]{2}(_[A-Z]{2})?/)) {
      throw new Error('Please supply a valid locale.');
    }
    useLocale(props.locale);
  }


  componentDidMount() {
    const resultsList: ResultsList = this.resultsList;
    resultsList.sendRequest();
  }


  getLocale(): string {
    return this.props.locale || defaultLocale;
  }

  /**
   * Calls the accessibility.cloud JSON API to get available PoIs. The PoIs are rendered as a
   * list in the given HTML element (this also accepts a jQuery selector).
   *
   * The given parameters are passed to the API's GET /place-infos endpoint.
   * More documentation is here:
   * https://github.com/sozialhelden/accessibility-cloud/blob/master/docs/json-api.md#get-place-infos
   *
   * The function returns the XHR request. You can optionally pass a callback in NodeJS-style.
   */

  // loadAndRenderPlaces(
  //   element: HTMLElement,
  //   options: {
  //     parameters: {},
  //     onSuccess: ((result: {}) => void),
  //     onError: ErrorCallback,
  //   },
  // ) {
  //   return this.getPlacesAround({
  //     parameters: options.parameters,
  //     onSuccess: (response) => {
  //       this.renderPlaces(element, response.features, response.related);
  //       options.onSuccess(response);
  //     },
  //     onError: (xhr) => {
  //       let message = t`Unknown error.`;
  //       try {
  //         message = JSON.parse(xhr.responseText).error.reason;
  //       } catch (e) {
  //         message = `${xhr.statusText}<br>${xhr.responseText}`;
  //       }
  //       element.innerHTML = `<div class="ac-error">${t`Could not load data`}:${message}</div>`;
  //       options.onError(new Error(message));
  //     },
  //   });
  // }
  props: Props;

  render() {
    const baseUrl = this.props.apiBaseUrl.replace(/\/$/, '');
    const url = `${baseUrl}/place-infos`;
    const defaultQuery = {
      locale: this.props.locale,
      includeRelated: 'source',
    };
    const query = Object.assign(defaultQuery, this.props.requestParameters);
    const headers = { 'X-Token': this.props.token };
    return (<ResultsList
      ref={(ref) => { this.resultsList = ref; }}
      {...{ url, query, headers }}
      noResultsText={t`No results.`}
      isLoadingText={t`Loading...`}
      locale={this.props.locale}
      apiBaseUrl={this.props.apiBaseUrl}
      onError={this.props.onError}
      onSuccess={this.props.onSuccess}
    />);
  }
}
