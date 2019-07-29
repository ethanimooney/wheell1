// @flow

import React from 'react';
import { t } from 'c-3po';


function getDisplayName(WrappedComponent: ReactClass<any>): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}


const defaultProps = {
  method: 'GET',
  query: {},
  headers: {},
  body: null,
  isLoading: false,
  isRequested: false,
};


type XHRDefaultProps = typeof defaultProps;


export type XHRState = {
  response: ?{},
  error: ?Error,
  xhr: ?XMLHttpRequest,
  isRequested: boolean,
  isLoading: boolean,
};


export type XHRSuccessCallback = ((result: {}) => void);
export type XHRErrorCallback = ((error: Error) => void);

export type XHRProps = {
  url: string,
  query?: { [string]: string },
  headers?: { [string]: string },
  body?: ?{},
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  onSuccess?: ?XHRSuccessCallback,
  onError?: ?XHRErrorCallback,
};


export type WrappedComponentType<D, P> = Class<React$Component<D, P & XHRState, any>>;


export default function createXHRComponent<D: {}, P: XHRProps>(
  WrappedComponent: WrappedComponentType<D, P>,
): Class<React$Component<D & XHRDefaultProps, P, XHRState>> {
  const wrappedDefaultProps: D = ((WrappedComponent.defaultProps: any): D);
  const wrapperDefaultProps = Object.assign({}, wrappedDefaultProps, defaultProps);
  const originalDisplayName = getDisplayName(WrappedComponent);

  return class WrapperComponent extends React.Component<D & XHRDefaultProps, P, XHRState> {
    static displayName = `XHRComponent(${originalDisplayName})`;
    static defaultProps: D & XHRDefaultProps = wrapperDefaultProps;
    props: P;
    state: XHRState;

    constructor(props) {
      super(props);
      this.state = { response: null, error: null, xhr: null, isLoading: false, isRequested: false };
    }

    render() {
      return (<WrappedComponent
        {...this.props}
        response={this.state.response}
        error={this.state.error}
        xhr={this.state.xhr}
        isRequested={this.state.isRequested}
        isLoading={this.state.isLoading}
      />);
    }

    sendRequest() {
      if (!this.props.url) { throw new Error('Need a request path.'); }
      const query = this.props.query || {};
      const queryString = Object.keys(query || {}).map(key => `${key}=${query[key]}`).join('&');
      const xhr = new XMLHttpRequest();
      const onError = (error) => {
        this.setState({ error });
        if (this.props.onError) this.props.onError(error);
      };
      xhr.addEventListener('load', () => {
        if (xhr.status >= 400) {
          onError(new Error(t`HTTP error from server.`));
          return;
        }
        try {
          const json = JSON.parse(xhr.responseText);
          this.setState({ response: json });
          if (this.props.onSuccess) this.props.onSuccess(json);
        } catch (error) {
          onError(error);
        }
      });

      xhr.addEventListener('error', () => onError(new Error('Transfer error.')));
      xhr.addEventListener('abort', () => onError(new Error('Transfer aborted.')));
      xhr.addEventListener('loadend', () => this.setState({ isLoading: false }));
      const url = `${this.props.url}?${queryString}`;

      xhr.open(this.props.method || 'GET', url);
      xhr.setRequestHeader('Accept', 'application/json');
      const headers = this.props.headers || {};
      Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]));
      this.setState({ isLoading: true });
      xhr.send(this.props.body ? JSON.stringify(this.props.body) : null);
      this.setState({ xhr, isRequested: true });
    }
  };
}
