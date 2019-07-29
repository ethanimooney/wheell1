// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import type { Props } from './App';

export default class AccessibilityCloud {
  static render(element: HTMLElement, props: Props) {
    // eslint-disable react/jsx-filename-extension
    ReactDOM.render(<App {...props} />, element);
  }
}

window.AccessibilityCloud = AccessibilityCloud;
if (typeof window.onAccessibilityCloudLoaded === 'function') {
  window.onAccessibilityCloudLoaded(AccessibilityCloud);
}
