// @flow
/* eslint jsx-a11y/no-static-element-interactions: 0 */

import React, { Component } from 'react';
import { t } from 'c-3po';
import zenscroll from 'zenscroll';

import type { PlaceInfo, PlaceInfoRelated } from '../model/PlaceInfo';
import {
  isAccessible,
  hasAdditionalAccessibilityProperties,
  humanizedCategory,
  accessibilitySummary,
} from '../model/PlaceInfo';

import InfoIcon from './InfoIcon';
import Distance from './Distance';
import PlaceIcon from './PlaceIcon';
import ExtraInfo from './ExtraInfo';
import InfoPageLink from './InfoPageLink';
import AccessibilityDetails from './AccessibilityDetails';


type State = {
  isExpanded: boolean;
};


type Props = {
  related: PlaceInfoRelated,
  apiBaseUrl: string,
  locale: string,
  placeInfo: PlaceInfo,
};


export default class Result extends Component<*, Props, State> {
  constructor(props: Props) { // eslint-disable-line no-useless-constructor
    super(props);
  }

  state = { isExpanded: false };

  element: HTMLElement;

  toggle() {
    this.setState({ isExpanded: !this.state.isExpanded });
    this.element.focus();
    setTimeout(() => zenscroll.intoView(this.element), 300);
  }

  collapse() { this.setState({ isExpanded: false }); }

  expand() {
    this.setState({ isExpanded: true });
    setTimeout(() => zenscroll.intoView(this.element), 300);
  }

  selectPreviousElement() {
    if (this.element.previousElementSibling instanceof HTMLElement) {
      this.element.previousElementSibling.focus();
    }
  }

  selectNextElement() {
    if (this.element.nextElementSibling instanceof HTMLElement) {
      this.element.nextElementSibling.focus();
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 13:
        this.toggle();
        event.preventDefault();
        break;
      case 38: // up
        this.selectPreviousElement();
        break;
      case 40: // down
        this.selectNextElement();
        break;
      case 37: // left
        this.collapse();
        break;
      case 39: // right
        this.expand();
        break;
      default: break;
    }
  }

  render() {
    let infoIconOrNothing;
    let distanceInfo;
    let details;

    const locale = this.props.locale;
    const related = this.props.related;
    const placeInfo = this.props.placeInfo;
    const geometry = placeInfo.geometry;
    const properties = placeInfo.properties;
    const distance = properties.distance;
    const id = `ac-details-${properties._id}`;
    const categoryName = humanizedCategory(properties);
    const isExpandable = hasAdditionalAccessibilityProperties(properties);
    const categoryLabel = categoryName ? `${t`Category`}: ${categoryName}.` : '';

    if (geometry) {
      distanceInfo = <Distance locale={locale} distance={distance} geometry={geometry} />;
    }

    if (isExpandable) {
      infoIconOrNothing = <InfoIcon role="presentation" />;
      details = (<div
        className="ac-details"
        aria-hidden={!this.state.isExpanded}
      >
        <ExtraInfo locale={locale} related={related} sourceId={properties.sourceId} />
        <AccessibilityDetails details={properties.accessibility} role="tree" locale={locale} />
      </div>);
    }

    return (<article
      className={`ac-result ${isAccessible(properties) ? 'is-accessible' : ''}`}
      aria-controls={isExpandable ? id : null}
      aria-expanded={isExpandable ? this.state.isExpanded : null}
      onTouchStart={isExpandable ? event => this.toggle(event) : null}
      onMouseDown={isExpandable ? event => this.toggle(event) : null}
      onKeyDown={event => this.handleKeyDown(event)}
      role="listitem"
      tabIndex="0"
      id={id}
      ref={(e) => { this.element = e; }}
    >
      <PlaceIcon category={properties.category || 'undefined'} apiBaseUrl={this.props.apiBaseUrl} />
      <header className="ac-result-name" role="heading">{properties.name}</header>
      <InfoPageLink related={related} properties={properties} />
      <section className="ac-result-category" aria-label={categoryLabel}>{categoryName}</section>
      {distanceInfo}
      <div className="ac-summary">{accessibilitySummary(properties)}{infoIconOrNothing}</div>
      {details}
    </article>);
  }
}
